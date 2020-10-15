<template>
	<div class="quiz-collection">

		<Modal v-if="showModal">
			<Form />
		</Modal>

		<div class="page-container">
			<div class="quiz-collection__heading-wrap">
				<div class="quiz-collection__heading-title">All Quizzes</div>
				<div v-if="permissionLevel=='edit'" class="quiz-collection__heading-button">
					<Button text="Add quiz" @click.native="refreshModal" />
				</div>
			</div>
			<div class="quiz-collection__wrap">
				<Quiz v-for="(quiz, i) in quizzes" :key="i"
				:id="quiz.id"
				:title="quiz.title"
				:questions="quiz.questions"
				:permission="permissionLevel"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Button from '../atoms/Button'
import Quiz from '../molecules/Quiz'
import Modal from '../molecules/Modal'
import Form from '../molecules/Form'

export default {
	name: 'QuizCollection',
	components: {
		Button,
		Quiz,
		Modal,
		Form,
	},
	methods: {
		refreshModal() {
			this.$store.dispatch('updateModal', ['Add Quiz', 'addQuiz'])
			this.$store.dispatch('toggleModal')
		},
	},
	created() {
		this.$store.dispatch('loadRawQuizData');
		this.$store.dispatch('loadQuestions');
	},
	computed: {
		quizzes: function() {
			return this.$store.getters.getQuizzes;
		},
		showModal: function() {
			return this.$store.getters.getModalOpen;
		},
		requiredModal: function() {
			return this.$store.getters.getModalInfo;
		},
		permissionLevel: function () {
			return this.$store.getters.getPermissionLevel
		}
	},
}
</script>

<style lang="scss">
@import '../../scss/settings';

$c: '.quiz-collection';

#{$c} {
	.page-container {
		max-width: 1360px;
	}
	&__heading {
		&-wrap {
			display: flex;
			justify-content: space-between;
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 24px;
		}
		&-title {
			@include font-large;
		}
	}
}

</style>
