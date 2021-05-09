import Vue from 'vue';

Vue.directive('dbClick', {
  inserted(el) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        el.style.cursor = 'not-allowed';
        setTimeout(() => {
          el.style.cursor = 'pointer';
          el.disabled = false;
        }, 1500);
      }
    });
  },
});

Vue.directive('loadmore', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-scrollbar__wrap');
      SELECTWRAP_DOM.addEventListener('scroll', function() {
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (CONDITION) {
          binding.value();
        }
      });
    }
  })