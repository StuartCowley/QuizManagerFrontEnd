import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import VueAxios from "vue-axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

const store = new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		brandName: 'WebbiSkools',
		questions : new Array,
		rawQuizData: new Array,
		quizzes: new Array,
		modalOpen: false,
		requiredModal: {},
		currentUser: '',
		isLoggedIn: false,
		permission: ''
	},
	getters: {
		getBrand: state => {
			return state.brandName
		},
		getQuestions: state => {
			return state.questions
		},
		getQuizzes: state => {
			let allQuizzes = new Array;
			state.rawQuizData.forEach(quiz => {
				let quizObj = new Object();
				quizObj.title = quiz.quiz_title;
				let questions = state.questions.filter(question => question.quiz_id == quiz.id);
				quizObj.questions = questions;
				quizObj.id = quiz.id;
				allQuizzes.push(quizObj);
			})
			return allQuizzes;
		},
		getModalOpen: state => {
			return state.modalOpen
		},
		getModalInfo: state => {
			return state.requiredModal
		},
		getLoggedInStatus: state => {
			return state.isLoggedIn
		},
		getCurrentUser: state => {
			return state.currentUser
		},
		getPermissionLevel: state => {
			return state.permission
		},
	},

	mutations: {
		loadRawQuizData(state, payload) {
			state.rawQuizData = payload
		},
		loadQuestions(state, payload) {
			state.questions = payload
		},
		toggleModal(state) {
			state.modalOpen = !state.modalOpen
		},
		updateModal(state, payload) {
			state.requiredModal = payload
		},
		authUser(state, payload) {
			state.currentUser = payload
			state.isLoggedIn = true
		},
		updatePermission(state, payload) {
			state.permission = payload
		},
		updateStatus(state) {
			state.isLoggedIn = true
		},
		logoutUser(state) {
			state.isLoggedIn = false
			state.currentUser = ''
			state.permission = ''
		}
	},

	actions: {
		toggleModal({commit}) {
			commit('toggleModal')
		},
		updateModal(context, [title, type, id, content]) {
			let info = new Object;
			info.title = title;
			info.type = type;
			info.content = content;
			info.id = id;
			context.commit('updateModal', info)
		},
		loadRawQuizData({commit}) {
			Vue.axios.get('quizzes/get-all').then(result => {
				commit('loadRawQuizData', result.data);
			}).catch(error => {
				console.log(error);
			});
		},
		loadQuestions({commit}) {
			Vue.axios.get('questions/get-all').then(result => {
				commit('loadQuestions', result.data)
			}).catch(error => {
				console.log(error);
			});
		},

		deleteQuestion(context, id) {
			let addr = 'questions/' + id + '/delete';
			Vue.axios.delete(addr).then(result => {
				context.dispatch('loadQuestions');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},

		deleteQuiz(context, id) {
			let addr = 'quizzes/delete-quiz/' + id;
			Vue.axios.delete(addr).then(result => {
				context.dispatch('loadRawQuizData');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},

		deleteAnswer(context, [questionId, answers]) {
			let addr = 'questions/' + questionId + '/update';
			let body = new Object;
			body.question_answer_a = answers[0]
			body.question_answer_b = answers[1]
			body.question_answer_c = answers[2]
			body.question_answer_d = answers[3]
			body.question_answer_e = answers[4]
			Vue.axios.put(addr, body).then(result => {
				context.dispatch('loadQuestions');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},
		addQuiz(context, title) {
			let body = new Object;
			body.quiz_title = title
			Vue.axios.post('quizzes/add-quiz', body).then(result => {
				context.dispatch('loadRawQuizData');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},
		editQuiz(context, [id, title]) {
			let addr = 'quizzes/update-quiz/' + id;
			let body = new Object;
			body.quiz_title = title
			Vue.axios.put(addr, body).then(result => {
				context.dispatch('loadRawQuizData');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},
		editQuestionText(context, [id, question]) {
			let addr = 'questions/' + id + '/update-question';
			let body = new Object;
			body.question_text = question
			Vue.axios.put(addr, body).then(result => {
				context.dispatch('loadQuestions');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},
		addQuestion(context, [id, question, A, B, C, D, E]) {
			let body = new Object;
			body.quiz_id = id;
			body.question_text = question;
			body.question_answer_a = A;
			body.question_answer_b = B;
			body.question_answer_c = C;
			body.question_answer_d = D;
			body.question_answer_e = E;
			Vue.axios.post('questions/add-question', body).then(result => {
				context.dispatch('loadQuestions');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},
		editAnswers(context, [id, A, B, C, D, E]) {
			let addr = 'questions/' + id + '/update';
			let body = new Object();
			body.question_answer_a = A
			body.question_answer_b = B
			body.question_answer_c = C
			body.question_answer_d = D
			body.question_answer_e = E
			Vue.axios.put(addr, body).then(result => {
				context.dispatch('loadQuestions');
				console.log(result.data)
			}).catch(error => {
				console.log(error);
			})
		},
		userLogin(context, [user, pass]) {
			let addr = 'users/user=' + encodeURIComponent(user) + '&pass=' + pass;
			Vue.axios.get(addr).then(result => {
				let info = new Object();
				info.msg = 'Login Successful!'
				context.commit('authUser', user);
				context.commit('updatePermission', result.data.permission);
				context.commit('updateModal', info )
			}).catch(error => {
				if (error.request.status == 404) {
					let info = new Object();
					info.msg = 'Incorrect username or password'
					context.commit('updateModal', info )
				}
				console.log(error)
			})
		},
		userLogout({commit}) {
			commit('logoutUser')
		},
		updateStatus({commit}) {
			commit('updateStatus')
		}
	}
})

export default store
