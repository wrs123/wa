import Vue from 'vue'
import Router from 'vue-router'
import scanPage from '@/page/scan'
import assetPage from '@/page/asset'
import leakPage from '@/page/leak'
import reportPage from '@/page/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/scan',
      name: 'scan',
      component: scanPage,
      mate: {title: 'wa-扫描'}
    },
    {
      path: '/leak',
      name: 'leak',
      component: leakPage,
      mate: {title: 'wa-漏洞'}
    },
    {
      path: '/asset',
      name: 'asset',
      component: assetPage,
      mate: {title: 'wa-资产'}
    },
    {
      path: '/report',
      name: 'report',
      component: reportPage,
      mate: {title: 'wa-报告'}
    }
    ]
})
