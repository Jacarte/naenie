
const names = ['jon', 'sam', 'cersei', 'lisa', 'arya', 'joffrey', 'ned', 'bran'];
const lastNames = ['lannister', 'snow', 'stark', 'storm', 'tyrell', 'tully', 'baratheon', 'targaryen'];

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
function get_password_word(n){
    var data1 = ['a','e','i','o','u'];
    var data2 = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
    var data3 = ['bl','br','cl','cr','dr','dw','fl','fr','gl','gr','gw','kn','kr','kw','mr','ph','pl','pn','pr','ps','sc','sh','sk','sl','sm','sn','sp','st','sv','sw','tr','ts','wh'];

    var str = '';
    var last;

    for(var i = 0; i < n; i++){
        var type = getRandomInt(1, 10);
        //avoiding some cases
        if(last == 3)
            type = 1;
        if(last == 2)
            type = 1;
        if(last == 1 && getRandomInt(1, 2) == 1)
            type = 2;
        //generate
        if(type < 4){ //40%
            str += data1[getRandomInt(0, data1.length-1)];
            last = 1;
            }
        else if(type < 9){  //40%
            str += data2[getRandomInt(0, data2.length-1)];
            last = 2;
            }
        else{ //20%
            str += data3[getRandomInt(0, data3.length-1)];
            last = 3;
            }
        }
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
    }

function generateRandomWASMWrapperName(n?: number){

    //const i1 = Math.ceil(Math.random()*names.length);
    //const i2 = Math.ceil(Math.random()*lastNames.length);

    //return `ww_${names[i1]}_${lastNames[i2]}`
    return get_password_word(n || 10)
}

export default generateRandomWASMWrapperName;