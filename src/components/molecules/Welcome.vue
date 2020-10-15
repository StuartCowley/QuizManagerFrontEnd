<template>
	<div class="welcome">
		<div class="page-container">
			<div class="welcome__heading">
				Welcome message here
			</div>
			<div class="welcome__subheading">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ratione, aut officia soluta nisi neque minus minima corporis distinctio, odio dolores suscipit in omnis quas numquam. Eos laboriosam modi atque nisi. Necessitatibus veritatis deleniti excepturi expedita in at saepe delectus.
			</div>
			<div class="welcome__button">
				<router-link v-if="!isLoggedIn" to="/login">
					<Button text="Login" />
				</router-link>
				<router-link v-if="isLoggedIn" to="/my-quizzes">
					<Button text="To the quizzes" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Button from '../atoms/Button'

export default {
	name: 'Welcome',
	components: {
		Button,
	},
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.getLoggedInStatus
		},
	},

}
</script>

<style lang="scss">
@import '../../scss/settings';
$c: '.welcome';

#{$c} {
	&__heading {
		@include font-x-large;
		text-align: center;
		margin-bottom: 3rem;
	}
	&__subheading {
		@include font-medium;
		text-align: center;
		margin-bottom: 3rem;
	}
	&__button {
		text-align: center;
	}
}

</style>
