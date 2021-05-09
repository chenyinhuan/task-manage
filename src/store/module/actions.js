import types from './types';
import { routes } from '@/router'
export default {
  toggleSideBar({ commit }, params) {
    commit('TOGGLE_SIDEBAR')
  },
	generateRoutes({ commit }, roles) {
	  commit('SET_ROUTES', routes)
	}
};
