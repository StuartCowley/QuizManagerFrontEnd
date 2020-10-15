<template>
	<div class="hero-banner">
		<div class="page-container">
			<div class="hero-banner__text-wrapper">
				<div class="hero-banner__text--strap" v-html="strap"></div>
				<div class="hero-banner__text--brand" v-html="brand"></div>
				<div class="hero-banner__text--application">Quiz Manager</div>
			</div>
			<Banner :img="img" />
			<div class="hero-banner__subtitle">
				Online educational solutions for education establishments and training providers
			</div>
		</div>
	</div>
</template>

<script>
import Banner from '../atoms/Banner'

export default {
	name: 'HeroBanner',
	components: {
		Banner
	},
	props: {
		img: {
			type: String
		},
		strap: {
			type: String,
			default: 'Welcome to'
		},
		brand: {
			type: String
		},
	}
}
</script>

<style lang="scss">
@import '../../scss/settings';

$c: '.hero-banner';

#{$c} {
	.page-container {
		position: relative;
		padding-top: 4em;
		padding-bottom: 4em;
	}
	&__text {
		&--strap {
			@include font-large;
		}
		&--brand,
		&--application {
			@include font-x-large;
		}
		&-wrapper {
			position: absolute;
			right: 4em;
			background-color: rgba($color: $background-color, $alpha: 0.75);
			border-radius: 20px;
			padding: 30px;
			text-align: center;
			color: $tertiary-color;
		}
	}
	&__subtitle {
		@include font-large;
		margin-top: 16px;
		color: $primary-color;
    text-align: center;
    margin-left: 1em;
    margin-right: 1em;
	}

}

</style>
