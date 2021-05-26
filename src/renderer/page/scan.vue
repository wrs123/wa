<template>
  <div class="layout">
    <Layout>
      <custom-sidebar :type="type"></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <span>{{scanStatus}}</span>
      <div v-if="scanStatus != 2" class="content"
      :style="{display: 'flex', 'justify-content': 'center', 'align-items': 'center','flex-direction':'column'}">
        <div class="title" v-if="scanStatus==0">
          <span class="title-content">欢迎使用嗯扫</span>
        </div>
        <div class="add">
          <div :class="['scan-button',{'unStart':scanStatus==0,'starting':scanStatus==1,'reStart':scanStatus==2}]" @click="addScan">{{scanStatus==0?'扫':scanStatus==1?'扫描中...':'重扫'}}</div>
          <span class="text">{{scanStatus==0?'点击按钮开始扫描':scanStatus==1?'':''}}</span>
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
  .content .add{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content .title{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }

  .title .icon{
    font-size: 40px;
    font-weight: bold;
    color: $titleColor;
  }

  .title .title-content{
    font-size: 20px;
    color: $titleColor;
  }

  .add .text{
    margin-top: 40px;
    color: $contentColor;
    font-size: 19px;
  }

 .scan-button.unStart{
   font-size: 35px;
   width: 100px;
   height: 100px;
 }
  .scan-button.starting{
    font-size: 16px;
    width: 130px;
    height: 130px;
  }
  .scan-button.reStart {

  }

  .add .scan-button{
   background-image: linear-gradient(rgba(45,140, 240,.8),$primaryColor);
    color: #fff;
    border-radius: 50%;
    position: relative;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: width .7s, height .7s, font-size .3s;
    will-change: all;
    font-weight: 600;
    box-shadow: rgba(0,0,0,.3) 0px 0px 5px 1px;
    text-shadow: 0 -1px 1px rgba(0,0,0,.25);
  }

  .scan-button.starting:hover{
    background: $error;
  }
  .scan-button.starting:hover::before{
    content: "停止";
    display: block;
    position:absolute;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    top: 10px;
    background: $error;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    border-radius: 50%;
    border: 4px solid rgba(255,255,255, .35);
  }

  .scan-button.starting::before{
    content: "";
    display: block;
    position:absolute;
    z-index: 9;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    border-radius: 50%;
    border: 4px solid rgba(255,255,255, .35);
  }
  .scan-button.starting::after{
    content: "";
    display: block;
    position:absolute;
    z-index: 10;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    border-radius: 50%;
    border: 4px solid rgba(255,255,255, 1);
    border-bottom: none;
    border-left: none;
    border-top: none;
    animation-timing-function: cubic-bezier(0.55, 0.38, 0.21, 0.88);
    animation-duration: 2s;
    animation: rotate linear 3.5s infinite;
  }

  .scan-button.unStart::before{
    content: "";
      display: block;
      position:absolute;
      z-index: -2;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(45,140,240,.7);
      opacity: 0;
      animation: yls 1500ms linear infinite;
  }
  .scan-button.unStart::after{
      content: "";
      display: block;
      position:absolute;
      z-index: -2;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(45,140,240,.7);
      opacity: 0;
      animation: ylss 1500ms linear infinite;
  }
  @keyframes yls{
      0%{
          transform: scale(1);
          opacity:.5;
      }
      100%{
          transform: scale(2);
          opacity: 0;
      }
  }
  @keyframes ylss{
      0%{
          transform: scale(1);
          opacity:.5;
      }
      100%{
          transform: scale(1.5);
          opacity: 0;
      }
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }


</style>
