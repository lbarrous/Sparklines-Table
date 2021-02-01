import actions from './Actions';
import mutations from './Mutations';
import state from './State';
import Store from './Store';

const index = new Store({
    actions,
    mutations,
    state
});

export default index;