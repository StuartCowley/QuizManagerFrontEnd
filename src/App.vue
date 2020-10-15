<template>
	<div id="app" class="app">
		<Header />
		<HeroBanner img="banner-image.jpg" strap="Welcome to" :brand="brandName" />
		<div class="app__body">
			<router-view />
		</div>
		<div class="app__footer">
			<div class="page-container">
				&copy; {{brandName}}
			</div>
		</div>
	</div>
</template>

<script>
import Header from './components/organisms/Header'
import HeroBanner from './components/organisms/HeroBanner'

export default {
	name: 'App',
	components: {
		Header,
		HeroBanner
	},
	computed: {
		brandName: function() {
			return this.$store.getters.getBrand
		},
		localLoggedIn: function() {
			return this.$store.getters.getLoggedInStatus
		},
		storageLoggedIn: function() {
			return localStorage.loggedIn
		},
	},
}
</script>

<style lang="scss">
@import "scss/settings";

$c: '.app';

#{$c} {
	height: 100vh;
	display: flex;
	flex-direction: column;
	padding-top: #{$header-height};
	color: $primary-color;
	font-family: $base-font-family;
	font-size: #{$base-font-size}px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	&__body {
		flex-grow: 1;
		margin-top: 16px;
		margin-bottom: 64px;
	}
	&__footer {
		width: 100%;
		padding-top: 24px;
		padding-bottom: 24px;
		@include font-small;
		text-align: center;
	}
}

</style>
