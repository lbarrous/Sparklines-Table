export default class PublisherSubscriber {
    constructor() {
        this.events = {};
    }

    /**
     * Create a new event or push a new callback
     *
     * @param {string} event
     * @param {function} callback
     * @returns {number} A count of callbacks for this event
     */
    subscribe(event, callback) {

        let self = this;

        //we create a new event just in case we do not have already one with that `event` name
        if(!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }

        // We push a callback for the specific event if we already have it
        return self.events[event].push(callback);
    }

    /**
     * If the passed event has callbacks call them
     *
     * @param {string} event
     * @param {object} [data={}]
     * @returns {array} The callbacks for this event, or an empty array if no event exits
     */
    publish(event, data = {}) {
        let self = this;

        if(!self.events.hasOwnProperty(event)) {
            return [];
        }

        // Get each subscription and call its callback with the passed data
        return self.events[event].map(callback => callback(data));
    }
}