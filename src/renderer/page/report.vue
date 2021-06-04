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
            <span class="text line u2">本次任务共发现 <span style="color: #2d8cf0;font-weight: bold;">{{reportData.assetNum}}</span>
              个资产，<span style="color: #2d8cf0;font-weight: bold;">{{reportData.aliveHost}}</span>
              个存活ip，<span style="color: #2d8cf0;font-weight: bold;">{{reportData.portNum}}</span>
              个开放端口。经详细分析，共<span style="color: #2d8cf0;font-weight: bold;">{{reportData.assetNum}}</span>个软件产品</span>
            <div class="total-count line">
              <div class="count-unit">
                <span class="count">{{reportData.assetNum}}</span>
                <span class="name">资产</span>
              </div>
              <div class="count-unit">
                <span class="count">{{reportData.aliveHost}}</span>
                <span class="name">存活IP</span>
              </div>
              <div class="count-unit">
                <span class="count">{{reportData.portNum}}</span>
                <span class="name">端口</span>
              </div>
              <div class="count-unit">
                <span class="count">{{reportData.vulNum}}</span>
                <span class="name">漏洞</span>
              </div>
          </div>
            <span class="title2 line u1">1.2 任务详情</span>
            <div class="line taskDetailsTable">
              <Table :columns="taskDetailsColumn" :data="reportData.taskInfo" :border="true"></Table>
            </div>
            <span class="title2 line u1">1.3 资产分布</span>
            <span class="title2 line u2">1.3.1 IP资产分布</span>
            <div class="line u2">
              <span class="title2">扫描网段：192.168.1.1</span>
              <div>
                <div>
                  <span class="died"></span>
                  <span>不存活</span>
                </div>
                <div>
                  <span class="died"></span>
                  <span>存活</span>
                </div>
              </div>
            </div>
            <div class="assetDistribute"></div>
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
import Api from "@/utils/api";
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
  name: "report",
  components: {
    'custom-sidebar':Sidebar,
    'custom-content':Content,
    'custom-footer': Footer,
    'custom-header': Header
  },
  computed: {
    ...mapGetters('scan',{
      activeTask: 'getActiveTask'
    }),
  },
  data () {
    return {
      reportData: {

      },
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
  created() {
    this.getReport()
  },
  methods: {
    getReport(){
      Api.getReport({taskId: this.activeTask.id}).then(res => {
        if(res.code === 200){
          console.log(res.result)
          this.reportData = res.result
        }
      })
    },
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
