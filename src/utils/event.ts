

class Event {
    private _events: object;
    private _maxListeners: number;
    constructor() {
        this._events = Object.create(null);
        this._maxListeners = 1000;
    }
    public  on(event, listener) {
        return this.addListener(event, listener)
    }

    public emit(event, ...rest) {
        const events = this._events[event];
        // const
        if (events) {
            return this._perform(events, rest)
        }
    }

    _perform(events, rest) {
        events.forEach(fn => fn.apply(this, rest))

        const { _maxListeners } = this

        if (!(_maxListeners !== 0 || _maxListeners !== Infinity)) {
            if (events.length > _maxListeners) {
                console.error(
                    'MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 event listeners added. Use emitter.setMaxListeners() to increase limit'
                )
            }
        }

        return true
    }
    addListener(event, listener) {
        return this._bind('_events', event, listener)
    }
    _bind(type, event, listener, method = 'push') {
        const events = this[type][event]

        this[type][event]?.[method](listener) || (this[type][event] = [listener])

        return this
    }
}

export default Event;