// 集成封装的选择组件
import scheduleCalendar from './ScheduleCalendar';

const components = [scheduleCalendar];
const install = (Vue) => {
	if (install.installed) return;
	components.forEach((component) => {
		Vue.use(component);
	});
};

export default install;
