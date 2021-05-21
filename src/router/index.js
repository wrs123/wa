import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/page/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage,
      mate: {title: '主页'}
    }
    ]
})
