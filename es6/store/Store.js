import PublisherSubscriber from '../core/PublisherSubscriber';
import { STORE_STATUS } from '../constants';

export default class Store {
    constructor(params) {
        let self = this;

        self.actions = {};
        self.mutations = {};
        self.state = {};

        self.status = STORE_STATUS.FREE;

        // Attach our PublisherSubscriber
        self.events = new PublisherSubscriber();

        if(params.hasOwnProperty('actions')) {
            self.actions = params.actions;
        }

        if(params.hasOwnProperty('mutations')) {
            self.mutations = params.mutations;
        }

        // Set our state to be a Proxy (Better to track every time we change it)
        self.state = new Proxy((params.state || {}), {
            set: function(state, key, value) {
                state[key] = value;

                console.log(`stateChange: ${key}: ${value}`);

                // Publish the change event for the components that are listening
                self.events.publish('stateChange', self.state);

                // Avoid changing the state directly
                if(self.status !== STORE_STATUS.MUTATION) {
                    console.warn(`You should use a mutation to set ${key}`);
                }

                // Reset the status ready for the next operation
                self.status = STORE_STATUS.FREE;

                return true;
            }
        });
    }

    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     */
    dispatch(actionKey, payload) {

        let self = this;

        if(typeof self.actions[actionKey] !== 'function') {
          console.error(`Action "${actionKey} doesn't exist.`);
          return false;
        }

        console.groupCollapsed(`ACTION: ${actionKey}`);

        self.status = STORE_STATUS.ACTION;

        // Actually call the action and pass it the Store context and whatever payload was passed
        self.actions[actionKey](self, payload);

        console.groupEnd();

        return true;
    }

    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     */
    commit(mutationKey, payload) {
        let self = this;

        if(typeof self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        self.status = STORE_STATUS.MUTATION;

        // Get a new version of the state by running the mutation and storing the result of it
        let newState = self.mutations[mutationKey](self.state, payload);

        // Merge the old and new together to create a new state and set it
        self.state = Object.assign(self.state, newState);

        return true;
    }
}