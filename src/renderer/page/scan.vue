<template>
  <div class="layout">
    <Layout>
      <custom-sidebar :type="type"></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
<!--      <div v-if="scanStatus != 2" class="content"-->
<!--      :style="{display: 'flex', 'justify-content': 'center', 'align-items': 'center','flex-direction':'column'}">-->
<!--        <div class="title" v-if="scanStatus==0">-->
<!--          <span class="title-content">欢迎使用嗯扫</span>-->
<!--        </div>-->
<!--        <div class="add">-->
<!--          <div :class="['scan-button',{'unStart':scanStatus==0,'starting':scanStatus==1,'reStart':scanStatus==2}]" @click="addScan">{{scanStatus==0?'扫':scanStatus==1?'扫描中...':'重扫'}}</div>-->
<!--          <span class="text">{{scanStatus==0?'点击按钮开始扫描':scanStatus==1?'':''}}</span>-->
<!--        </div>-->
<!--      </div>-->
      <div class="content">
        <div class="scan-header">
          <Row :gutter="15" type="flex" justify="space-around" align="middle">
            <Col :span="6">
              <div class="main-box">
                <div class="header-item box-content">
                  <Icon type="ios-archive" />
                  <div class="con">
                    <span class="name">资产</span>
                    <span class="value">{{boardData.detail.assetNum}}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col :span="6" >
              <div class="main-box">
                <div class="header-item box-content">
                  <Icon type="md-ionic" />
                  <div class="con">
                    <span class="name">存活</span>
                    <span class="value">{{boardData.detail.aliveHostNum}}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col :span="6" >
              <div class="main-box">
                <div class="header-item box-content">
                  <Icon type="md-git-network" />
                  <div class="con">
                    <span class="name">端口</span>
                    <span class="value">{{boardData.detail.portNum}}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col :span="6">
              <div class="main-box">
                <div class="header-item box-content">
                  <Icon type="ios-bug" />
                  <div class="con">
                    <span class="name">漏洞</span>
                    <span class="value">{{boardData.detail.vulNum}}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="18">
              <div class="detail-data main-box">
                <div class="box-title">
                  <span class="title-icon">
                    <Icon type="ios-stats"/>
                  </span>
                  详细信息
                  <Button type="primary" shape="circle" icon="md-refresh" size="small"
                          :style="{position: 'absolute', right: '14px',top: '8px',
                          display: 'flex','justify-content': 'center', 'align-items': 'center'}" @click="initChar()"></Button>
                </div>
                <div class="box-content" id="chartsContainer" style="height: calc(100vh - 279px);display: flex;flex-direction: column;">

                </div>
              </div>
            </Col>
            <Col span="6">
              <Row>
                <div class="real-message main-box">
                  <div class="box-title">
                    <span class="title-icon"><Icon type="ios-flash" style="font-size: 15px;"/></span>
                    最新漏洞
                  </div>
                  <div class="box-content" style="height: calc(100vh - 414px);display: flex;flex-direction: column; padding: 15px;">
                    <div class="leak-item" v-for="(item, index) in boardData.leakList" :key="index">
                      <span class="leak">{{item.poc}}</span>
                      <Tooltip :content="item.url" :style="{width: '50%'}" placement="top">
                        <span class="url">{{item.url}}</span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <div class="real-message main-box">
                  <div class="box-content" style="height: 120px;display: flex; justify-content: space-around;">
                    <div style="display: flex; flex-direction: column;align-items: center">
                      <i-circle v-bind:percent="system.cpuUsed" :size="80" dashboard>
                        <span class="demo-circle-inner" style="font-size:24px">{{system.cpuUsed}}%</span>
                      </i-circle>
                      <span>CPU占用</span>
                    </div>
                    <div style="display: flex; flex-direction: column;align-items: center">
                      <i-circle v-bind:percent="system.memoryUsed" :size="80" dashboard>
                        <span class="demo-circle-inner" style="font-size:24px">{{system.memoryUsed}}%</span>
                      </i-circle>
                      <span>内存占用</span>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <custom-footer></custom-footer>
    </Layout>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Api from "@/utils/api";

export default {
  name: 'scan',
  components: {
   'custom-sidebar':Sidebar,
   'custom-content':Content,
   'custom-footer': Footer,
   'custom-header': Header
  },
  data () {
    return {
      activeMenuItem: "1",
      type: '',
      system: {
        cpuUsed: 0,
        memoryUsed: 0
      },
      boardData: {
        detail: {
          assetNum: 0,
          aliveHostNum: 0,
          portNum: 0,
          vulNum: 0,
        },
        leakList: [{
          url: '',
          poc: '暂无数据'
        }],
        leakPie: [{value: 1048, name: '漏洞数'},
          {value: 735, name: '正常数'}],
        portPie: [{value: 1048, name: '80端口'},
          {value: 300, name: '22端口'}],
        portData: [],
        serviceData: [],
        vulData: [],
        sysData: [],
        vulSortData: {
          row: [],
          column: []
        }
      }
    }
  },
  mounted(){
    // //初始化图表
    // this.$nextTick(() => {
    //   this.initChar()
    // });
  },
  computed: {
    ...mapGetters('scan',{
      scanStatus: 'getStatus'
    }),
    ...mapGetters('scan',{
      activeTask: 'getActiveTask'
    })
  },
  created() {
    let that = this;

    this.init()
    setInterval(()=> {
      that.getSystemInfo()
    },300)
  },
  methods: {
    init(){
      let that = this
      Api.getBoardDetails({taskId: this.activeTask.id}).then(res =>{
        if(res.code == 200){
          this.boardData.detail = res.result
        }
      })
      Api.getBoardChart({taskId: this.activeTask.id}).then(res =>{
        if(res.code == 200){
          console.log(res)
          let result = res.result
          let portDataList = [],
              serviceData = [],
              sysData = [],
              vulData = [],
              vulSortDataRow = [],
            vulSortDataColumn = []
           for(let item in result.portData){
             portDataList.push({
               name: item+'端口',
               value: result.portData[item]
             })
           }
           this.boardData.portData = portDataList

          for(let item in result.serviceData){
            serviceData.push({
              name: item+'服务',
              value: result.serviceData[item]
            })
          }
          this.boardData.serviceData = serviceData

          for(let item in result.sysData){
            sysData.push({
              name: item,
              value: result.sysData[item]
            })
          }
          this.boardData.sysData = sysData

          for(let item in result.vulData){
            vulData.push({
              name: item,
              value: result.vulData[item]
            })
          }
          this.boardData.vulData = vulData

          for(let item in result.vulSortData){
            vulSortDataRow.push(item);
            vulSortDataColumn.push(result.vulSortData[item])
          }
          this.boardData.vulSortData = {row: vulSortDataRow, column: vulSortDataColumn}
            this.initChar()
        }
      })
      Api.getLatestLeakList({taskId: this.activeTask.id}).then(res =>{
        console.log(res)
        if(res.code == 200){
          this.boardData.leakList= res.result
        }
      })
    },
    getSystemInfo(){
      let cpu = process.getCPUUsage(),
          memory = process.getSystemMemoryInfo(),
          memoryUsed = (1- (memory.free / memory.total))*100
      this.system.cpuUsed = parseInt(cpu.percentCPUUsage)
      this.system.memoryUsed = parseInt(memoryUsed);
    },
    clickItem(res){
      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    },
    ...mapActions('modal',['setAll']),
    ...mapActions('scan', ['setScanStatus']),
    addScan(){
      if(this.scanStatus != 1){
        let param = {
          data: {title: '添加任务',
            type: 'add'},
          show: true
        }
        this.setAll(param)
      }else if(this.scanStatus= 1){
        this.setScanStatus(0)
      }
    },
    //初始化图表
    initChar(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chartsContainer'))
      let myChartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '45%',
          bottom: 30,
          left: 40,
          right: 30
        },
        xAxis: {
          type: 'category',
          data: this.boardData.vulSortData.row,
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['漏洞数'],
          right: 10
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            top: '0',
            radius: '25%',
            center: ['15%', '20%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 7,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                position: 'inside'
              }
            },
            data: this.boardData.portData
          },
          {
            name: '访问来源',
            type: 'pie',
            top: '0',
            radius: '25%',
            center: ['38%', '20%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 7,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                position: 'inside'
              }
            },
            data: this.boardData.serviceData
          },
          {
            name: '访问来源',
            type: 'pie',
            top: '0',
            radius: '25%',
            center: ['62%', '20%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 7,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                position: 'inside'
              }
            },
            data: this.boardData.sysData
          },
          {
            name: '访问来源',
            type: 'pie',
            top: '0',
            radius: '25%',
            center: ['86%', '20%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 7,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                position: 'inside'
              }
            },
            data: this.boardData.vulData
          },
          {
            name: '漏洞数',
            data: this.boardData.vulSortData.column,
            type: 'bar',
            barWidth : '50%',
            showBackground: true,
            // smooth: 'true',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            },
          }]
      }
      // 绘制图表
      myChart.setOption(myChartOptions);
    },
    reloadCharts(){
      console.log(22)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/style/scan.scss";
</style>
