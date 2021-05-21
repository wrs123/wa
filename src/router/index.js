import Vue from 'vue'
import Router from 'vue-router'
import scanPage from '@/page/scan'
import assetPage from '@/page/asset'
import leakPage from '@/page/leak'
import reportPage from '@/page/report'
import indexPage from '@/page/index'
import configPage from '@/page/config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'scan',
      component: indexPage,
      mate: {title: 'wa-index'}
    },
    {
      path: '/page/scan',
      name: 'scan',
      component: scanPage,
      mate: {title: 'wa-扫描'}
    },
    {
      path: '/page/leak',
      name: 'leak',
      component: leakPage,
      mate: {title: 'wa-漏洞'}
    },
    {
      path: '/page/asset',
      name: 'asset',
      component: assetPage,
      mate: {title: 'wa-资产'}
    },
    {
      path: '/page/report',
      name: 'report',
      component: reportPage,
      mate: {title: 'wa-报告'}
    },
    {
      path: '/page/config',
      name: 'config',
      component: configPage,
      mate: {title: 'wa-设置'}
    },
    ]
})
