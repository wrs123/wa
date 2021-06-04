<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content" id="reportContainer">
        <div class="report-content main-box">
          <div class="box-title">
            <span>测试报告</span>
            <div class="action-buttong">
              <Button icon="md-cloud-download" type="primary" @click="downloadReport()">下载</Button>
            </div>
          </div>
          <div class="box-content">
            <span class="title1 line">1. 概述</span>
            <span class="title2 line u1">1.1 任务信息</span>
            <span class="text line u2">本次任务共发现4个资产，1个存活ip，3个开放端口。经详细分析，共有1个硬件产品，0个软件产品</span>
            <div class="total-count line">
              <div class="count-unit">
                <span class="count">4</span>
                <span class="name">资产</span>
              </div>
              <div class="count-unit">
                <span class="count">4</span>
                <span class="name">存过ip</span>
              </div>
              <div class="count-unit">
                <span class="count">4</span>
                <span class="name">端口</span>
              </div>
              <div class="count-unit">
                <span class="count">4</span>
                <span class="name">漏洞</span>
              </div>
          </div>
            <span class="title2 line u1">1.2 任务详情</span>
            <div class="line taskDetailsTable">
              <Table :columns="taskDetailsColumn" :data="taskDetailsData" :border="true"></Table>
            </div>
            <span class="title2 line u1">1.3 风险分布</span>
            <span class="title2 line u1">1.4 资产分布</span>
            <span class="title2 line u2">1.4.1 IP资产分布</span>
            <span class="title2 line u2">1.4 资产分布</span>
        </div>
      </div>
      </div>
      <custom-footer></custom-footer>
    </Layout>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default {
  name: "report",
  components: {
    'custom-sidebar':Sidebar,
    'custom-content':Content,
    'custom-footer': Footer,
    'custom-header': Header
  },
  data () {
    return {
      activeMenuItem: "4",
      taskDetailsColumn: [
        {
          title: 'Name',
          key: 'name',
          className: 'title',
          width: 100
        },
        {
          title: 'value',
          key: 'value',
          className: 'value'
        }
      ],
      taskDetailsData: [{
        name: '任务名称',
        value: 'task99990'
      },{
        name: 'Ip',
        value: ''
      },{
        name: '端口',
        value: 'task99990'
      },
        {
          name: '漏洞',
          value: 'task99990'
        }]
    }
  },
  methods: {
    downloadReport(){
      console.log(this)
      window.print();
      // this.$getPdf('测试报告', '#reportContainer')
    },
    clickItem(res){
      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/style/report.scss";
</style>

<style lang="scss">
  .report-content .box-content .taskDetailsTable thead{
    display: none;
  }
  .report-content .box-content .taskDetailsTable .title{
    color: $contentColor;
    background: $backgroundColor;
  }
  .report-content .box-content .taskDetailsTable .value{
    color: $titleColor;
  }
</style>
