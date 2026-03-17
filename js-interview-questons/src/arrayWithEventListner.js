Array.prototype.listner = {};

Array.prototype.addEventListener = function (event, callback) {
    if(!this.listner[event]){
        this.listner[event] = [];
    }
    this.listner[event].push(callback);
};

Array.prototype.pushWithEvent = function (event, value) {
    this.push(...value);
    this.triggerEvent(event, value);
};

Array.prototype.popWithEvent = function (event) {
    const poppedValue = this.pop();
    this.triggerEvent(event, poppedValue);
}


Array.prototype.triggerEvent = function (event, value) {
    if(this.listner[event]){
        this.listner[event].forEach(callback => callback(value));
    }
};

// Example Usage:
const myArray = [];
myArray.addEventListener("itemAdded", (value) => {
    console.log(`Item added: ${value}`);
});

myArray.addEventListener("itemRemoved", (value) => {
    console.log(`Item removed: ${value}`);
});

myArray.pushWithEvent("itemAdded", [1, 2, 3]); // Logs: Item added: 1, Item added: 2, Item added: 3
myArray.popWithEvent("itemRemoved"); // Logs: Item removed: 3
myArray.popWithEvent("itemRemoved"); // Logs: Item removed: 2
myArray.popWithEvent("itemRemoved"); // Logs: Item removed: 1