import { createWebHistory, createRouter } from 'vue-router'

// Home
import Home from '../views/Home.vue'

// Student
import MainStudent  from '../views/Student/Main.vue'

// Teacher
import MainTeacher  from '../views/Teacher/Main.vue'
import ExamCreate from '../views/Teacher/ExamCreate.vue'
import ExamView from '../views/Teacher/ExamView.vue'

const routes = [
  // Home
  {
    path: '/',
    component: Home,
  },
  
  // Student
  {
    path: '/student/',
    component: MainStudent,
  },

  // Teacher
  {
    path: '/teacher/',
    component: MainTeacher,
  },
  {
    path: '/teacher/exam/create/',
    component: ExamCreate,
  },
  {
    path: '/teacher/exam/view/',
    component: ExamView,
  },

  // Auto redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;