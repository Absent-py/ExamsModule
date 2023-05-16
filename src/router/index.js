import { createWebHistory, createRouter } from 'vue-router'

// Home
import Home from '../views/Home.vue'


// Student

// Teacher
import MainTeacher  from '../views/Teacher/Main.vue'

const routes = [
  // Home
  {
    path: '/',
    component: Home,
  },
  
  {
    path: '/teacher/',
    component: MainTeacher,
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