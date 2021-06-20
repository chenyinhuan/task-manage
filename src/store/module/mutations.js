import types from './types';
import Cookies from 'js-cookie'

export default {
  [types.TOGGLE_SIDEBAR](state, payload) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  [types.SET_ROUTES](state, payload) {
    state.permissionRoutes = payload;
  },
  [types.SET_ACTION](state, payload) {
    state.action = payload;
  },
  [types.SET_ACTIVEMENU](state, payload) {
    console.log(payload)
    Cookies.set('activeMenu', payload);
    state.sidebar.activeMenu = payload;
  },
};
