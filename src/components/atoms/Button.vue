<template>
	<!-- <button v-if="isDisabled" class="button button--disabled" disabled v-on:click.stop.prevent>
		{{text}}
	</button> -->
	<button class="button " >
		{{text}}
	</button>
</template>

<script>
export default {
	name: 'Button',
	props: {
		text: {
			type: String,
		},
		questionId: Number,
	},
}
</script>

<style lang="scss">
@import "../../scss/settings";

$c: '.button';

#{$c} {
	display: inline-block;
	padding-top: $btn-padding-top;
	padding-right: $btn-padding-right;
	padding-bottom: $btn-padding-bottom;
	padding-left: $btn-padding-left;
	font-family: $base-font-family;
	font-size: $btn-font-size;
	color: $background-color;
	background-color: $secondary-color;
	border-radius: 16px;
	border: solid 1px transparent;
	&:hover {
		cursor: pointer;
		background-color: $tertiary-color;
		border: solid 1px $tertiary-color;
	}
}

</style>
