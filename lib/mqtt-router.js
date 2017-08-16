const HashMap = require('hashmap');

class MqttRouter{
    constructor(){
        this.map = new HashMap();
    }

    on(action, actionHandler){
        this.map.set(action, actionHandler);
    }

    invoke(action){ 

		// Return the desired handler or the unknown handler
        return this.map.get(action) || this.map.get('unknown');     
	}

}

module.exports = new MqttRouter();
