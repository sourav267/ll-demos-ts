interface IEventEmitter {
    on(eventName: string, listener: Function): IEventEmitter;
    off(eventName: string, listener: Function): IEventEmitter;
    emit(eventName: string, ...args: Array<any>): boolean;
}

export default class JsEventEmitter implements IEventEmitter {
    _events: Record<string, Array<Function>>;

    constructor() {
        // Avoid creating objects via `{}` to exclude unwanted properties
        // on the prototype (such as `.toString`).
        this._events = Object.create(null);
    }

    on(eventName: string, listener: Function): IEventEmitter {
        if (!Object.hasOwn(this._events, eventName)) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(listener);
        return this;
    }

    off(eventName: string, listener: Function): IEventEmitter {
        // Ignore non-existing eventNames.
        if (!Object.hasOwn(this._events, eventName)) {
            return this;
        }

        const listeners = this._events[eventName];

        // Find only first instance of the listener.
        const index = listeners.findIndex(
            (listenerItem) => listenerItem === listener,
        );

        if (index < 0) {
            return this;
        }

        this._events[eventName].splice(index, 1);
        return this;
    }

    emit(eventName: string, ...args: Array<any>): boolean {
        // Return false for non-existing eventNames or events without listeners.
        if (
            !Object.hasOwn(this._events, eventName) ||
            this._events[eventName].length === 0
        ) {
            return false;
        }

        // Make a clone of the listeners in case one of the listeners
        // mutates this listener array.
        const listeners = this._events[eventName].slice();
        listeners.forEach((listener) => {
            listener.apply(null, args);
        });

        return true;
    }
}

const eventEmitter = new JsEventEmitter();

const listener1 = (data: any) => {
    console.log('Received data:', data);
}

const listener2 = (data: any) => {
    console.log('Received data:', data);
}

eventEmitter.on('data', listener1);
eventEmitter.on('data', listener2);
eventEmitter.off('data', listener1);

eventEmitter.emit('data', { id: 1, message: 'Hello World' });
