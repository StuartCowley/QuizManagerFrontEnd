<template>
	<div class="header">
		<div class="page-container">
			<div class="header__logo" v-html="require('../../assets/company-logo.svg')"></div>
			<div v-if="isLoggedIn" class="header__greeting">Hello, {{currentUser}}</div>
			<router-link :to="{name: 'Login'}">
				<Button v-if="isLoggedIn" @click.native="logout" text="Logout" />
			</router-link>
		</div>
	</div>
</template>

<script>
import Button from '../atoms/Button'

export default {
	name: 'Header',
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.getLoggedInStatus
		},
		currentUser: function() {
			return this.$store.getters.getCurrentUser
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('userLogout')
			this.$store.dispatch('updateModal', ['', '', '', ''])
			localStorage.clear()
		}
	},
	components: {
		Button,
	}
}
</script>

<style lang="scss">
@import "../../scss/settings";

$c: '.header';

#{$c} {
	position: fixed;
	height: #{$header-height};
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background-color: $primary-color;
	color: $secondary-color;
	.page-container {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__greeting {
		@include font-medium;
		color: $tertiary-color;
	}
	&__logo {
		width: $logo-width;
		color: $background-color;
		path {
			fill: currentColor;
		}
	}
}

</style>
