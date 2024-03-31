import { createStore } from 'vuex';
import auth_store from './stores/auth_store';
import products_store from './stores/products_store';

export default createStore({
  modules: {
    auth_store,
    products_store,
  }
})