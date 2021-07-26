<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content" id="reportContainer" :style="{'overflow': loading ? 'hidden': 'auto'}">
        <Spin size="large" fix v-if="loading">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
        <div class="report-content main-box">
          <div class="box-title">
            <span>{{activeTask.task_name}}报告</span>
            <div class="action-buttong">
              <Button icon="md-cloud-download" type="primary" @click="handleDown">下载</Button>
            </div>
          </div>
          <div class="box-content" id="demo">
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
              <Table :columns="taskDetailsColumn" :data="taskDetailsData" :border="true"></Table>
            </div>
            <span class="title2 line u1">1.3 资产分布</span>
            <span class="title2 line u2">1.3.1 软件资产分布</span>
            <div class="border soft-asset line">
              <div class="charts" id="softPie"></div>
              <div class="list">
                <assetPersentListTemplate :data="reportData.serviceData"></assetPersentListTemplate>
              </div>
            </div>
            <span class="title2 line u2">1.3.2 端口资产分布</span>
            <div class="border port-asset line">
              <div class="charts" id="portPie"></div>
              <div class="list">
                <assetPersentListTemplate :data="reportData.portData"></assetPersentListTemplate>
              </div>
            </div>
            <span class="title1 line ">2. 漏洞</span>
            <Table :columns="leakTable" :data="reportData.vul"></Table>
            <span class="title1 line ">2. 资产</span>
            <Table :columns="assetTable" :data="reportData.Assets"></Table>
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
import assetPersentListTemplate from '../components/reportTemplate/assetPersentListTemplate';
import leakListTemplate from "../components/leakLIstTemplate";
import tableListTemplate from '@/components/tableListTemplate';
import hostLayerTemplate from '@/components/hostLayerTemplate';
import htmlToPdf from '@/utils/htmlToPdf'

export default {
  name: "report",
  components: {
    'custom-sidebar':Sidebar,
    'custom-content':Content,
    'custom-footer': Footer,
    'custom-header': Header,
    'assetPersentListTemplate': assetPersentListTemplate
  },
  computed: {
    ...mapGetters('scan',{
      activeTask: 'getActiveTask'
    }),
  },
  data () {
    return {
      pdfUrl: '',
      pdfModal: false,
      leakTable: [
        {
          type: 'expand',
          width: 30,
          render: (h, params) => {
            return h(leakListTemplate, {
              props: {
                data : params.row
              }
            })
          }
        },
        {
          title: '漏洞poc',
          key: 'poc'
        },
        {
          title: 'IP',
          key: 'ip',
          render: (h, params) => {
            return h('span', {
              props: {
              }
            },params.row.ip==''?'--':params.row.ip)
          }
        },
        {
          title: '端口',
          key: 'port',
          width: 100,
          render: (h, params) => {
            return h('span', {
              props: {
              }
            },params.row.port==''?'--':params.row.port)
          }
        }
      ],
      assetTable: [
        {
          title: 'IP',
          key: 'Ip',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return [
              h('span', {
                props: {

                },style: {'font-weight': 'bold'}
              }, params.row.Ip)
            ]
          }
        },
        {
          title: '端口',
          key: 'PortList',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return [
              h(tableListTemplate, {
                props: {
                  data: params.row.PortList
                }
              })
            ]
          }

        },
        {
          title: '服务',
          key: 'ServiceList',
          render: (h, params) => {
            return [
              h(tableListTemplate, {
                props: {
                  data: params.row.ServiceList
                }
              })
            ]
          }
        },
        {
          title: '协议',
          key: 'Protocol',
          width: 100,
          align: 'center',
          render: (h, {root, node, data}) => {
            return [
              h('span', {
                props: {
                },
                style: {
                  marginRight: '8px',
                  color: '#333'
                }
              },'tcp')
            ]
          }
        },
        {
          title: '主机系统',
          key: 'System',
          align: 'center',
          width: 170,
          render: (h, params) => {
            return [
              h(hostLayerTemplate, {
                props: {
                  system: params.row.System,
                  service: params.row.Service
                }
              })
            ]
          }
        }
      ],
      loading: false,
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
      taskDetailsData: []
    }
  },
  created() {
    this.getReport()
  },
  methods: {
    handleDown () {
      this.$Message.info('生成报告中');
      htmlToPdf.downloadPDF(document.querySelector('#demo'), '扫描报告', (res) => {
        this.$Message.success('生成报告成功,导出中，清耐心等待');
      })


    },
    getReport(){
      if(!this.loading){
        this.loading = true
        Api.getReport({taskId: this.activeTask.id}).then(res => {
          if(res.code === 200){
            console.log(res.result)
            let result = res.result,
                taskInfo = result.taskInfo
            this.reportData = res.result
            this.taskDetailsData = [
              {
                name: '任务名',
                value: taskInfo.task_name
              },
              {
                name: 'IP',
                value: taskInfo.scan_ip
              },{
                name: '端口',
                value: taskInfo.port_list
              },{
                name: '漏洞',
                value: "社区版poc"
              }
            ]
            this.initCharts()
          }
          this.loading = false
        })
      }
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
    },
    initCharts(){
      // 基于准备好的dom，初始化echarts实例
      let softPie = this.$echarts.init(document.getElementById('softPie')),
          portPie = this.$echarts.init(document.getElementById('portPie'))
      let softPieOptions = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.reportData.serviceData
          }
        ]
      }
      let portPieOptions = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.reportData.portData
          }
        ]
      }
      // 绘制图表
      softPie.setOption(softPieOptions);
      portPie.setOption(portPieOptions);
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
