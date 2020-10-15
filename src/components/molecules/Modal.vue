<template>
	<div class="modal">
		<div class="modal__background">
			<div class="page-container">
				<div class="modal__close-up" @click="closeModal">X</div>
				<div class="modal__title">{{modalInfo.title}}</div>
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Modal',
	methods: {
		closeModal() {
			this.$store.dispatch('toggleModal')
		}
	},
	computed: {
		modalInfo: function() {
			return this.$store.getters.getModalInfo
		}
	}
}
</script>

<style lang="scss">
@import '../../scss/settings';
$c: '.modal';

#{$c} {
	.page-container {
		position: relative;
		max-width: $max-width;
		padding-left: 96px;
		padding-right: 96px;
		padding-top: 48px;
		padding-bottom: 48px;
		@include font-x-large;
		z-index: 100;
	}
	&__title {
		text-align: center;
		@include font-large;
	}
	&__close-up {
		position: absolute;
		top: 12px;
		right: 96px;
		@include font-medium;
	}
	&__background {
		position: absolute;
		top: 50%;
		left: 48px;
		right: 48px;
		width: 75%;
		transform: translateY(-50%);
		max-width: $max-width;
		margin-left: auto;
		margin-right: auto;
		border: 2px solid $tertiary-color;
		background-color: $primary-color;
		opacity: 0.9;
		z-index: 100;
		box-shadow: 0px 0px 32px black;
		border-radius: 96px;
	}
	position: fixed;
	top: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	z-index: 100;
	background-color: $background-color-semi-opaque;
}

</style>
