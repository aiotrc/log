const HashMap = require('hashmap');

class MqttRouter{
    constructor(){
        this.map = new HashMap();
    }

    on(action, actionHandler){
        this.map.set(action, actionHandler);
    }

    invoke(action){
        return this.map.get(action) || this.map.get('unknown');     // Return the desired handler or the unknown handler
    }

}

module.exports = new MqttRouter();