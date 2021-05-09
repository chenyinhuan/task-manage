<template>
	<div style="padding: 0px 17px 0px 35px;"  @click="toggleClick">
		<div class="hamburger">
			<img src="@/images/my-task/humberger.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Hamburger',
		props: {
			isActive: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toggleClick() {
				this.$emit('toggleClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hamburger {
		display: inline-block;
		vertical-align: middle;
		width: 27px;
		height: 22px;
		img {
			width: 27px;
			height: 22px;
		}
	}

	.hamburger.is-active {
		transform: rotate(180deg);
	}
</style>
