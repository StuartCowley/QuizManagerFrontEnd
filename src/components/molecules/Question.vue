<template>
	<div class="question">
		<div class="question__heading-wrap question__heading-wrap--add-radius">
			<div  @click="questionClicked" class="question__heading">Q{{questionNumber}}: {{content.question_text}}</div>
			<div v-if="permission=='edit'" class="question__button-wrap question__button-wrap--vertical" >
				<Button class="question__button" @click.native="editQuestion" text="Edit" />
				<Button class="question__button" @click.native="deleteQuestion" text="Delete" :questionId="content.id" />
			</div>
		</div>

		<div class="question__answer-block" :class="{'question__answer-block--is-open': isOpen}">
			<ul v-if="permission=='view' || permission=='edit'" class="question__answer-content">
				<li class="question__answer-content-line" v-for="(answer, i) in answers" :key="i">
					<div class="text">{{answerPrefixes[i]}}. {{answer}}</div>
					<Button v-if="permission=='edit'" @click.native="deleteAnswer(answers[i])" text="Delete" />
				</li>
			</ul>

			<div v-if="permission=='edit'" class="question__answer-edit">
				<div class="question__button-wrap">
					<Button class="question__button" @click.native="editAnswers" text="Edit Answers" />
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Button from '../atoms/Button'

export default {
	name: 'Question',
	data() {
		return {
			answerPrefixes: ['A', 'B', 'C', 'D', 'E'],
			isOpen: false,
		}
	},
	components: {
		Button,
	},
	methods: {
		deleteQuestion: function() {
			let id = this.content.id
			this.$store.dispatch('deleteQuestion', id);
		},
		deleteAnswer: function(toDelete) {
			if(this.answers.length<4) {
				alert('Cannot delete option, all questions must have at least 3 possible answers')
			} else {
				let arr = this.answers.filter(ans => ans !== toDelete)
				while (arr.length<5) {
					arr.push('')
				}
				this.$store.dispatch('deleteAnswer', [this.content.id, arr]);
			}
		},
		questionClicked() {
			this.isOpen = !this.isOpen
		},
		editQuestion: function() {
			this.$store.dispatch('updateModal', ['Edit question', 'editQuestion', this.content.id, this.content.question_text])
			this.$store.dispatch('toggleModal')
		},
		editAnswers: function() {
			this.$store.dispatch('updateModal', ['Edit Answers', 'editAnswers', this.content.id, this.content.question_text])
			this.$store.dispatch('toggleModal')
		}
	},
	computed: {
		answers: function() {
			let ans = new Array;
			if (this.content.question_answer_a) { ans.push(this.content.question_answer_a) }
			if (this.content.question_answer_b) { ans.push(this.content.question_answer_b) }
			if (this.content.question_answer_c) { ans.push(this.content.question_answer_c) }
			if (this.content.question_answer_d) { ans.push(this.content.question_answer_d) }
			if (this.content.question_answer_e) { ans.push(this.content.question_answer_e) }
			return ans;
		}
	},
	props: {
		quizId : {
			type: Number,
		},
		permission: {
			type: String,
			default: 'restricted',
		},
		content: {
			type: Object,
		},
		questionNumber: {
			type: Number,
		}
	}
}
</script>

<style lang="scss">
@import '../../scss/settings';

$c: '.question';

#{$c} {
	padding-top: 24px;
	padding-bottom: 24px;
	padding-left: 24px;
	padding-right: 24px;
	&:not(:last-of-type) {
		margin-bottom: 40px;
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
		@include font-small;
		flex-grow: 1;
		color: $tertiary-color;
		margin-right: 40px;
		&-wrap {
			padding-top: 16px;
			padding-right: 16px;
			padding-bottom: 16px;
			padding-left: 16px;
			display: flex;
			background-color: $background-color;
			&--add-radius {
				border-radius: 16px;
			}
		}
	}
	&__answer {
		&-block {
			overflow: hidden;
			width: 80%;
			margin-left: auto;
			margin-right: auto;
			transition: max-height 0.5s ease-in-out 0.1s;
			height: auto;
			max-height: 0;
			&--is-open {
				max-height: 500px;
			}
			@media screen and (max-width: $breakpoint-tablet){
				width: 95%;
			}
		}
		&-edit {
			justify-content: flex-end;
			padding-left: 64px;
			padding-right: 64px;
			background-color: rgba(251, 252, 255, 0.75);
			padding-top: 16px;
			padding-bottom: 16px;
			display: flex;
			@media screen and (max-width: $breakpoint-tablet) {
				padding-left: 16px;
				padding-right: 16px;
			}
		}
		&-content {
			padding-top: 16px;
			padding-bottom: 16px;
			padding-left: 64px;
			padding-right: 64px;
			background-color: $background-color-semi-opaque;
			margin-top: 0;
			margin-bottom: 0;
			@media screen and (max-width: $breakpoint-tablet) {
				padding-left: 16px;
				padding-right: 16px;
			}
			&-line {
				display: flex;
					align-items: center;
					margin-bottom: 1em;
					color: $tertiary-color;
					.text {
						@include font-small;
						flex-grow: 1;
						margin-right: 40px;
					}
			}
		}
	}
}

</style>
