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
                    <span class="value">6</span>
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
                    <span class="value">6</span>
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
                    <span class="value">6</span>
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
                    <span class="value">6</span>
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
                  <Button type="primary" shape="circle" icon="ios-refresh" size="small"
                          :style="{position: 'absolute', right: '14px',top: '8px'}"></Button>
                </div>
                <div class="box-content" style="height: calc(100vh - 279px);">
                  11
                </div>
              </div>
            </Col>
            <Col span="6">
              <Row>
                <div class="real-message main-box">
                  <div class="box-title">
                    <span class="title-icon"><Icon type="ios-flash" style="font-size: 15px;"/></span>
                    实时数据
                  </div>
                  <div class="box-content" style="height: calc(100vh - 414px);">
                    暂无数据
                  </div>
                </div>
              </Row>
              <Row>
                <div class="real-message main-box">
                  <div class="box-content" style="height: 120px;">
                    暂无数据
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
    }
  },
  computed: {
    ...mapGetters('scan',{
      scanStatus: 'getStatus'
    })
  },
  methods: {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/style/scan.scss";
</style>
