<template>
	<div class="form-wrap">

		<template v-if="type=='loginForm'">
			<form class="form" v-on:submit.prevent="login" method="post">
				<label class="label" for="username">Name:</label>
				<input v-model="firstField" class="input-box" type="text" placeholder="Enter Username" name="username" id="username" required>

				<label class="label" for="password">Password:</label>
				<input v-model="password" class="input-box" type="password" placeholder="Enter Password" name="password" id="password" required>

				<div class="form__button" type="submit" name="submit" value="Login">
					<Button text="Login" />
				</div>
			</form>
		</template>

		<template v-if="modalInfo.type=='addQuiz'">
			<form class="form" v-on:submit.prevent="addQuiz" method="post">
				<label class="label" for="quiz-title">Quiz Title:</label>
				<input v-model="firstField" class="input-box" type="text" placeholder="Enter Quiz Title" name="quiz-title" id="quiz-title" required>

				<div class="form__button" type="submit" name="submit" value="Submit">
					<Button text="Submit" />
				</div>
			</form>
		</template>

		<template v-if="modalInfo.type=='editQuizTitle'">
			<form class="form" v-on:submit.prevent="editQuizTitle" method="post">
				<div class="label">Current title: {{modalInfo.content}}</div>
				<label class="label" for="quiz-title">New Quiz Title:</label>
				<input v-model="firstField" class="input-box" type="text" placeholder="Enter New Quiz Title" name="quiz-title" id="quiz-title" required>

				<div class="form__button" type="submit" name="submit" value="Submit">
					<Button text="Submit" />
				</div>
			</form>
		</template>

		<template v-if="modalInfo.type=='editQuestion'">
			<form class="form" v-on:submit.prevent="editQuestion" method="post">
				<div class="label">Current question: {{modalInfo.content}}</div>
				<label class="label" for="quiz-title">New Question Text:</label>
				<input v-model="firstField" class="input-box" type="text" placeholder="Enter New Question" name="quiz-title" id="quiz-title" required>

				<div class="form__button" type="submit" name="submit" value="Submit">
					<Button text="Submit" />
				</div>
			</form>
		</template>

		<template v-if="modalInfo.type=='addQuestion'">
			<form class="form" v-on:submit.prevent="addQuestion" method="post">
				<label class="label" for="quiz-title">New Question:</label>
				<input v-model="firstField" class="input-box" type="text" placeholder="Enter Quiz Title" name="quiz-title" id="quiz-title" required>

				<label class="label" for="answer-a">Answer A:</label>
				<input v-model="answerA" class="input-box" type="text" placeholder="Enter Option" name="answer-a" id="answer-option-a" required>

				<label class="label" for="answer-b">Answer B:</label>
				<input v-model="answerB" class="input-box" type="text" placeholder="Enter Option" name="answer-b" id="answer-option-b" required>

				<label class="label" for="answer-c">Answer C:</label>
				<input v-model="answerC" class="input-box" type="text" placeholder="Enter Option" name="answer-c" id="answer-option-c" required>

				<label class="label" for="answer-d">Answer D:</label>
				<input v-model="answerD" class="input-box" type="text" placeholder="Enter Option" name="answer-d" id="answer-option-d">

				<label class="label" for="answer-e">Answer E:</label>
				<input v-model="answerE" class="input-box" type="text" placeholder="Enter Option" name="answer-e" id="answer-option-e">

				<!-- <label class="label" for="correct-answer">Correct Answer (Enter A, B, C, D or E):</label>
				<input v-model="correctAnswer" class="input-box" type="text" placeholder="Enter Correct Option" name="correct-answer" id="correct-answer"> -->

				<div class="form__button" type="submit" name="submit" value="Submit">
					<Button text="Submit" />
				</div>
			</form>
		</template>

		<template v-if="modalInfo.type=='editAnswers'">
			<form class="form" v-on:submit.prevent="editAnswers" method="post">
				<div class="label">Question: {{modalInfo.content}}</div>

				<label class="label" for="answer-a">Answer A:</label>
				<input v-model="answerA" class="input-box" type="text" placeholder="Enter Option" name="answer-a" id="answer-option-a" required>

				<label class="label" for="answer-b">Answer B:</label>
				<input v-model="answerB" class="input-box" type="text" placeholder="Enter Option" name="answer-b" id="answer-option-b" required>

				<label class="label" for="answer-c">Answer C:</label>
				<input v-model="answerC" class="input-box" type="text" placeholder="Enter Option" name="answer-c" id="answer-option-c" required>

				<label class="label" for="answer-d">Answer D:</label>
				<input v-model="answerD" class="input-box" type="text" placeholder="Enter Option" name="answer-d" id="answer-option-d">

				<label class="label" for="answer-e">Answer E:</label>
				<input v-model="answerE" class="input-box" type="text" placeholder="Enter Option" name="answer-e" id="answer-option-e">

				<!-- <label class="label" for="correct-answer">Correct Option (MUST be A, B, C, D or E):</label>
				<input v-model="correctAnswer" class="input-box" type="text" pattern="[A-Z]{1}" placeholder="Enter A, B, C, D or E" name="correct-answer" id="correct-answer" required> -->

				<div class="form__button" type="submit" name="submit" value="Submit">
					<Button text="Submit" />
				</div>
			</form>
		</template>


	</div>
</template>

<script>
import Button from '../atoms/Button'

export default {
	name: 'Form',
	components: {
		Button,
	},
	data() {
		return {
			firstField: '',
			answerA: '',
			answerB: '',
			answerC: '',
			answerD: '',
			answerE: '',
			password: '',
		}
	},
	props: {
		type: String,
	},
	created() {
		this.answerA = this.originalAnswers.answerA
		this.answerB = this.originalAnswers.answerB
		this.answerC = this.originalAnswers.answerC
		this.answerD = this.originalAnswers.answerD
		this.answerE = this.originalAnswers.answerE
		this.firstField = this.modalInfo.content
	},
	methods: {
		addQuiz() {
			this.$store.dispatch('addQuiz', this.firstField)
			this.$store.dispatch('toggleModal')
		},
		editQuizTitle() {
			this.$store.dispatch('editQuiz', [this.modalInfo.id, this.firstField])
			this.$store.dispatch('toggleModal')
		},
		editQuestion() {
			this.$store.dispatch('editQuestionText', [this.modalInfo.id, this.firstField])
			this.$store.dispatch('toggleModal')
		},
		addQuestion() {
			this.$store.dispatch('addQuestion', [this.modalInfo.id, this.firstField, this.answerA, this.answerB, this.answerC, this.answerD, this.answerE])
			this.$store.dispatch('toggleModal')
			this.$store.dispatch('updateModal', ['', '', '', '' ])
		},
		editAnswers() {
			this.$store.dispatch('editAnswers', [this.modalInfo.id, this.answerA, this.answerB, this.answerC, this.answerD, this.answerE])
			this.$store.dispatch('toggleModal')
		},
		login() {
			this.$store.dispatch('userLogin', [this.firstField, this.password])
			this.$store.dispatch('toggleModal')
		}
	},
	computed: {
		modalInfo: function() {
			return this.$store.getters.getModalInfo
		},
		originalAnswers: function() {
			let questions = this.$store.getters.getQuestions;
			let question = questions.filter(q => q.id == this.modalInfo.id);
			if (question.length == 0) {
				return question
			}
			let info = new Object();
			info.answerA = question[0].question_answer_a;
			info.answerB = question[0].question_answer_b;
			info.answerC = question[0].question_answer_c;
			info.answerD = question[0].question_answer_d;
			info.answerE = question[0].question_answer_e;
			return info
		},
	}
}
</script>

<style lang="scss">
@import '../../scss/settings';

$c: '.form';

#{$c} {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 32px;
	padding-right: 32px;
	padding-bottom: 32px;
	padding-left: 32px;

	.label {
		@include font-small;
		text-align: center;
		color: $background-color;
	}
	.input-box {
		@include font-small;
		max-width: 480px;
		width: 100%;
		margin-bottom: 1em;
	}

	&-wrap {
		background-color: $primary-color;
		border: 1px solid $tertiary-color;
	}
}

</style>
