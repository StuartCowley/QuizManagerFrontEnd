<template>
	<div class="quiz">
		<div class="quiz__heading-wrap">
			<div class="quiz__heading-title">{{title}}</div>
			<div v-if="permission=='edit'" class="quiz__button-wrap quiz__button-wrap--vertical">
				<Button text="Edit name" @click.native="editQuizName" />
				<Button text="Add question" @click.native="addQuestion" />
				<Button text="Delete quiz" @click.native="deleteQuestion" />
			</div>
		</div>
		<div class="quiz__question-wrap" v-for="(question, i) in questions" :key="i">
			<Question :quizId="id" :content="question" :permission="permission" :questionNumber="i+1" @updateModalInfo="updateModalInfo" />
		</div>
	</div>
</template>

<script>
import Button from '../atoms/Button'
import Question from './Question'

export default {
	name: 'Quiz',
	components: {
		Button,
		Question,
	},
	props: {
		id: {
			type: Number
		},
		title: {
			type: String
		},
		questions: {
			type: Array
		},
		permission: {
			type: String,
			default: 'restricted'
		}
	},
	methods: {
		editQuizName: function() {
			this.$store.dispatch('updateModal', ['Edit Title', 'editQuizTitle', this.id, this.title])
			this.$store.dispatch('toggleModal')
		},
		addQuestion: function() {
			this.$store.dispatch('updateModal', ['Add Question', 'addQuestion', this.id])
			this.$store.dispatch('toggleModal')
		},
		deleteQuestion: function() {
			this.$store.dispatch('deleteQuiz', this.id)
		},
		updateModalInfo: function() {
			this.$emit('openModal', 'editQuizTitle', this.id, this.title)
		}
	}
}
</script>

<style lang="scss">
@import '../../scss/settings';

$c: '.quiz';

#{$c} {
	background-color: $primary-color;
	padding-top: 24px;
	padding-bottom: 24px;
	padding-left: 24px;
	padding-right: 24px;
	&:not(:last-of-type) {
		margin-bottom: 40px;
	}
	.page-container {
		max-width: 1280px;
	}
	&__button-wrap {
		display: flex;
		align-items: center;
		.button:not(:last-of-type) {
			margin-right: 8px;
		}
		&--vertical {
			@media screen and (max-width: $breakpoint-tablet) {
				flex-direction: column;
				.button:not(:last-of-type) {
					margin-right: 0;
					margin-bottom: 4px;
				}
			}
		}
	}
	&__heading {
		&-wrap {
			padding-left: 24px;
			padding-right: 24px;
			display: flex;
			justify-content: space-between;
		}
		&-title {
			@include font-large;
			color: $background-color;
		}
	}
	&__question {

		&-wrap {
			&:not(:last-child):after {
				content: '';
				display: block;
				background-color: #06214D;
				height: 1px;
				margin-top: 2em;
				width: 96%;
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
}

</style>
