<template>
	<div class="banner" :style="{ backgroundImage: `url(${image})`}"></div>
</template>

<script>
export default {
	name: 'Banner',
	props: {
		img: {
			type: String
		}
	},
	computed: {
		image() {
			return require(`../../assets/${this.img}`)
		}
	}
}
</script>

<style lang="scss">
$c: '.banner';

#{$c} {
	background-size: cover;
	&::before {
		content: '';
		display: block;
		padding-top: 36.3%
	}
}

</style>
