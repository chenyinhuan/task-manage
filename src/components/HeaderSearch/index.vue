<template>
  <div :class="{'show':show}" class="header-search">
		<img src="@/images/my-task/search.png">
    <div class="header-search-select">
			
		</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data() {
    return {
      show: false
    }
  },
  computed: {
   
  },
  watch: {
    
  },
  mounted() {
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.header-search {
	img {
		width: 28px;
		height: 30px;
		margin-top: 20px;
	}
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
