
class Wrapper{



    post(data){
        

        
        try{
            process.send(JSON.stringify(data))
        }
        catch(e){
            //console.error(e)
        }
    }

    add(data){

        if(!this.queue)
            this.queue = [];

        this.queue.push(data);
    }

    encapsulateValue(val){

        if(typeof(val) === 'object')
            return {};

        return val;
    }

    rightOperator(hash, value){
        
        //this.add({method: "rightOperator", args: [hash, this.encapsulateValue(value)]})
        this.post({
            "method": "rightOperator", args: [hash, this.encapsulateValue(value)]
        })

        return value;
    }
    leftOperator(hash, value){

        //this.add({method: "leftOperator", args: [hash, this.encapsulateValue(value)]})
        this.post({
            "method": "leftOperator", args: [hash, this.encapsulateValue(value)]
        })

        return value;
    }

    genericRecord(hash, value, repr){

        //this.add({method: "genericRecord", args: [hash, this.encapsulateValue(value)]})
        this.post({
            "method": "genericRecord", args: [hash, this.encapsulateValue(value)]
        })
        return value;
    }


    _wrapUpdateExpression(hash, value, repr){

        //this.add({method: "_wrapUpdateExpression", args: [hash, this.encapsulateValue(value)]})
        this.post({
            "method": "_wrapUpdateExpression", args: [hash, this.encapsulateValue(value)]
        })
        return value;
    }


    _wrapFunCall(hash, value, repr){

        //this.add({method: "_wrapFunCall", args: [hash, this.encapsulateValue(value)]})
        this.post({
            "method": "_wrapFunCall", args: [hash, this.encapsulateValue(value)]
        })
        return value;
    }

    close(){
        this.post({method: 'close', args: [this.queue]})
    }

}


module.exports = new Wrapper()