import { createStore } from 'vuex';
import auth_store from './stores/auth_store';

export default createStore({
  modules: {
    auth_store
  }
})