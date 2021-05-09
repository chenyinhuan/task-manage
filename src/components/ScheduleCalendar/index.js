import calendar from './calendar'
export default {
  install(Vue) {
    Vue.component(calendar.name, calendar);
  },
};
