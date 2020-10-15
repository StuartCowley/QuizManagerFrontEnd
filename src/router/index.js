import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import Welcome from '../components/molecules/Welcome'
import Login from '../components/organisms/Login'
import QuizCollection from '../components/organisms/QuizCollection'

Vue.use(Router)

const router = new Router ({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Welcome,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn == true) next({name: 'All Quizzes'})
				else next()
			}
		},
		{
			path: '/my-quizzes',
			name: 'All Quizzes',
			component: QuizCollection,
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn == false) next({name: 'Login'})
				else next()
			}
		}
	]
})

export default router;
