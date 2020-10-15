<template>
	<div class="login">
		<Modal class="login__modal" v-if="showModal">
			<div class="login__modal-message">
				{{modalContent.msg}}
			</div>
			<div v-if="showButton" class="login__modal-button">
				<router-link :to="{name: 'All Quizzes'}">
					<Button @click.native="goToQuizzes" text="Go to quizzes" />
				</router-link>
			</div>
		</Modal>
		<div class="page-container">
			<div class="login__heading">
				Login:
			</div>
			<Form type="loginForm" />
		</div>
	</div>
</template>

<script>
import Form from '../molecules/Form'
import Modal from '../molecules/Modal'
import Button from '../atoms/Button'

export default {
	name: 'Login',
	components: {
		Form,
		Modal,
		Button
	},
	methods: {
		goToQuizzes() {
			this.$store.dispatch('toggleModal')
		},
	},
	computed: {
		showModal: function() {
			return this.$store.getters.getModalOpen
		},
		modalContent: function() {
			return this.$store.getters.getModalInfo
		},
		showButton: function() {
			return this.$store.getters.getLoggedInStatus
		}
	}

}
</script>

<style lang="scss">
@import '../../scss/settings';

$c: '.login';

#{$c} {
	.page-container {
		max-width: 848px;
		width: 100%;
	}
	&__heading {
		@include font-large;
	}
	&__modal {
		text-align: center;
		&-message {
			@include font-medium;
		}
	}
}

</style>
