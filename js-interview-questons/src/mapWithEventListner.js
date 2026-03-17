class StoreData{
    constructor(){
        this.data = {};
        this.listener = {};
    }

    add(key,value){
        const oldValue = this.data[key];
        const keyExists = key in this.data;
        this.data[key] = value;

        if(keyExists && oldValue !== value){
            this.trigger(key,oldValue,value);
        }
    }

    on(event,callback){
        if(!this.listener[event]){
            this.listener[event] = [];
        }
        this.listener[event].push(callback);
    }

    trigger(key,oldValue,newValue){
        const eventToFire = `change:${key}`;

        if(this.listener[eventToFire]){
            this.listener[eventToFire].forEach(callback => callback(oldValue,newValue, key));
        }

        if(this.listener[key]){
            this.listener[key].forEach(callback => callback(oldValue,newValue, key));
        }
    }
}


const store = new StoreData();

// 1. Setup Listeners
store.on("age", (oldVal, newVal) => {
    console.log(`Listener [age]: Updated from ${oldVal} to ${newVal}`);
});

store.on("change:age", (oldVal, newVal) => {
    console.log(`Listener [change:age]: Value moved to ${newVal}`);
});

// 2. Initial Add (No trigger because keyExists is false)
console.log("Action: Adding age 25...");
store.add("age", 25); 

// 3. Update Add (Trigger fires!)
console.log("\nAction: Updating age to 30...");
store.add("age", 30); 

// 4. Same Value Add (No trigger because oldValue === value)
console.log("\nAction: Setting age to 30 again...");
store.add("age", 30);