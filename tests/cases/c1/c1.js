var Express = require('express');
var Http = require('http');
var Https = require('https');
var Fs = require('fs');
var WebSocketServer = require('ws').Server;
var NetfluxSrv = require('./node_modules/chainpad-server/NetfluxWebsocketSrv');
var Package = require('./package.json');
var Path = require("path");
var nThen = require("nthen");

var config;
try {
    config = require('./config/config');
} catch (e) {
    console.log("You can customize the configuration by copying config/config.example.js to config/config.js");
    config = require('./config/config.example');
}

if (config.adminEmail === 'i.did.not.read.my.config@cryptpad.fr') {
    console.log("You can configure the administrator email (adminEmail) in your config/config.js file");
}

var websocketPort = config.websocketPort || config.httpPort;
var useSecureWebsockets = config.useSecureWebsockets || false;

// This is stuff which will become available to replify
const debuggableStore = new WeakMap();
const debuggable = function (name, x) {
    if (name in debuggableStore) {
        try { throw new Error(); } catch (e) {
            console.error('cannot add ' + name + ' more than once [' + e.stack + ']');
        }
    } else {
        debuggableStore[name] = x;
    }
    return x;
};
debuggable('global', global);
debuggable('config', config);

// support multiple storage back ends
var Storage = require(config.storage||'./storage/file');

var app = debuggable('app', Express());

var httpsOpts;

var DEV_MODE = !!process.env.DEV
if (DEV_MODE) {
    console.log("DEV MODE ENABLED");
}

var FRESH_MODE = !!process.env.FRESH;
var FRESH_KEY = '';
if (FRESH_MODE) {
    console.log("FRESH MODE ENABLED");
    FRESH_KEY = +new Date();
}
config.flushCache = function () {
    FRESH_KEY = +new Date();
};


const clone = (x) => (JSON.parse(JSON.stringify(x)));

var setHeaders = (function () {
    if (typeof(config.httpHeaders) !== 'object') { return function () {}; }

    const headers = clone(config.httpHeaders);
    if (config.contentSecurity) {
        headers['Content-Security-Policy'] = clone(config.contentSecurity);
        if (!/;$/.test(headers['Content-Security-Policy'])) { headers['Content-Security-Policy'] += ';' }
        if (headers['Content-Security-Policy'].indexOf('frame-ancestors') === -1) {
            // backward compat for those who do not merge the new version of the config
            // when updating. This prevents endless spinner if someone clicks donate.
            // It also fixes the cross-domain iframe.
            headers['Content-Security-Policy'] += "frame-ancestors *;";
        }
    }
    const padHeaders = clone(headers);
    if (config.padContentSecurity) {
        padHeaders['Content-Security-Policy'] = clone(config.padContentSecurity);
    }
    if (Object.keys(headers).length) {
        return function (req, res) {
            const h = [
                    /^\/pad(2)?\/inner\.html.*/,
                    /^\/sheet\/inner\.html.*/,
                    /^\/common\/onlyoffice\/.*\/index\.html.*/
                ].some((regex) => {
                    return regex.test(req.url)
                }) ? padHeaders : headers;
            for (let header in h) { res.setHeader(header, h[header]); }
        };
    }
    return function () {};
}());

(function () {
if (!config.logFeedback) { return; }

const logFeedback = function (url) {
    url.replace(/\?(.*?)=/, function (all, fb) {
        config.log.feedback(fb, '');
    });
};

app.head(/^\/common\/feedback\.html/, function (req, res, next) {
    logFeedback(req.url);
    next();
});
}());

app.use(function (req, res, next) {
    setHeaders(req, res);
    if (/[\?\&]ver=[^\/]+$/.test(req.url)) { res.setHeader("Cache-Control", "max-age=31536000"); }
    next();
});

app.use(Express.static(__dirname + '/www'));

Fs.exists(__dirname + "/customize", function (e) {
    if (e) { return; }
    console.log("Cryptpad is customizable, see customize.dist/readme.md for details");
});

// FIXME I think this is a regression caused by a recent PR
// correct this hack without breaking the contributor's intended behaviour.

var mainPages = config.mainPages || ['index', 'privacy', 'terms', 'about', 'contact'];
var mainPagePattern = new RegExp('^\/(' + mainPages.join('|') + ').html$');
app.get(mainPagePattern, Express.static(__dirname + '/customize'));
app.get(mainPagePattern, Express.static(__dirname + '/customize.dist'));

app.use("/blob", Express.static(Path.join(__dirname, (config.blobPath || './blob')), {
    maxAge: DEV_MODE? "0d": "365d"
}));
app.use("/datastore", Express.static(Path.join(__dirname, (config.filePath || './datastore')), {
    maxAge: "0d"
}));
app.use("/block", Express.static(Path.join(__dirname, (config.blockPath || '/block')), {
    maxAge: "0d",
}));

app.use("/customize", Express.static(__dirname + '/customize'));
app.use("/customize", Express.static(__dirname + '/customize.dist'));
app.use("/customize.dist", Express.static(__dirname + '/customize.dist'));
app.use(/^\/[^\/]*$/, Express.static('customize'));
app.use(/^\/[^\/]*$/, Express.static('customize.dist'));

if (config.privKeyAndCertFiles) {
    var privKeyAndCerts = '';
    config.privKeyAndCertFiles.forEach(function (file) {
        privKeyAndCerts = privKeyAndCerts + Fs.readFileSync(file);
    });
    var array = privKeyAndCerts.split('\n-----BEGIN ');
    for (var i = 1; i < array.length; i++) { array[i] = '-----BEGIN ' + array[i]; }
    var privKey;
    for (var i = 0; i < array.length; i++) {
        if (array[i].indexOf('PRIVATE KEY-----\n') !== -1) {
            privKey = array[i];
            array.splice(i, 1);
            break;
        }
    }
    if (!privKey) { throw new Error("cannot find private key"); }
    httpsOpts = {
        cert: array.shift(),
        key: privKey,
        ca: array
    };
}

var admins = [];
try {
    admins = (config.adminKeys || []).map(function (k) {
        k = k.replace(/\/+$/, '');
        var s = k.split('/');
        return s[s.length-1].replace(/-/g, '/');
    });
} catch (e) { console.error("Can't parse admin keys"); }

// TODO, cache this /api/config responses instead of re-computing it each time
app.get('/api/config', function(req, res){
    // TODO precompute any data that isn't dynamic to save some CPU time
    var host = req.headers.host.replace(/\:[0-9]+/, '');
    res.setHeader('Content-Type', 'text/javascript');
    res.send('define(function(){\n' + [
        'var obj = ' + JSON.stringify({
            requireConf: {
                waitSeconds: 600,
                urlArgs: 'ver=' + Package.version + (FRESH_KEY? '-' + FRESH_KEY: '') + (DEV_MODE? '-' + (+new Date()): ''),
            },
            removeDonateButton: (config.removeDonateButton === true),
            allowSubscriptions: (config.allowSubscriptions === true),
            websocketPath: config.useExternalWebsocket ? undefined : config.websocketPath,
            // FIXME don't send websocketURL if websocketPath is provided. deprecated.
            websocketURL:'ws' + ((useSecureWebsockets) ? 's' : '') + '://' + host + ':' +
                websocketPort + '/cryptpad_websocket',
            httpUnsafeOrigin: config.httpUnsafeOrigin,
            adminEmail: config.adminEmail,
            adminKeys: admins,
        }, null, '\t'),
        'obj.httpSafeOrigin = ' + (function () {
            if (config.httpSafeOrigin) { return '"' + config.httpSafeOrigin + '"'; }
            if (config.httpSafePort) {
                return "(function () { return window.location.origin.replace(/\:[0-9]+$/, ':" +
                    config.httpSafePort + "'); }())";
            }
            return 'window.location.origin';
        }()),
        'return obj',
        '});'
    ].join(';\n'));
});

var four04_path = Path.resolve(__dirname + '/customize.dist/404.html');
var custom_four04_path = Path.resolve(__dirname + '/customize/404.html');

var send404 = function (res, path) {
    if (!path && path !== four04_path) { path = four04_path; }
    Fs.exists(path, function (exists) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (exists) { return Fs.createReadStream(path).pipe(res); }
        send404(res);
    });
};

app.use(function (req, res, next) {
    res.status(404);
    send404(res, custom_four04_path);
});

var httpServer = httpsOpts ? Https.createServer(httpsOpts, app) : Http.createServer(app);

httpServer.listen(config.httpPort,config.httpAddress,function(){
    var host = config.httpAddress;
    var hostName = !host.indexOf(':') ? '[' + host + ']' : host;

    var port = config.httpPort;
    var ps = port === 80? '': ':' + port;

    console.log('[%s] server available http://%s%s', new Date().toISOString(), hostName, ps);
});
if (config.httpSafePort) {
    Http.createServer(app).listen(config.httpSafePort, config.httpAddress);
}

var wsConfig = { server: httpServer };

var rpc;
var historyKeeper;

var log;

// Initialize tasks, then rpc, then store, then history keeper and then start the server
var nt = nThen(function (w) {
    // set up logger
    var Logger = require("./lib/log");
    //console.log("Loading logging module");
    Logger.create(config, w(function (_log) {
        log = config.log = _log;
    }));
}).nThen(function (w) {
    var Tasks = require("./storage/tasks");
    //log.debug('loading task scheduler');
    Tasks.create(config, w(function (e, tasks) {
        config.tasks = tasks;
    }));
}).nThen(function (w) {
    if (config.useExternalWebsocket) { return; }
    Storage.create(config, w(function (_store) {
        config.store = _store;
    }));
}).nThen(function (w) {
    config.rpc = typeof(config.rpc) === 'undefined'? './rpc.js' : config.rpc;
    if (typeof(config.rpc) !== 'string') { return; }
    // load pin store...
    var Rpc = require(config.rpc);
    Rpc.create(config, debuggable, w(function (e, _rpc) {
        if (e) {
            w.abort();
            throw e;
        }
        rpc = _rpc;
    }));
}).nThen(function () {
    if (config.useExternalWebsocket) { return; }
    var HK = require('./historyKeeper.js');
    var hkConfig = {
        tasks: config.tasks,
        rpc: rpc,
        store: config.store
    };
    historyKeeper = HK.create(hkConfig);
}).nThen(function () {
    if (config.useExternalWebsocket) { return; }
    if (websocketPort !== config.httpPort) {
        log.debug("setting up a new websocket server");
        wsConfig = { port: websocketPort};
    }
    var wsSrv = new WebSocketServer(wsConfig);
    NetfluxSrv.run(wsSrv, config, historyKeeper);
});

if (config.debugReplName) {
    require('replify')({ name: config.debugReplName, app: debuggableStore });
}