<template>
  <div class="layout">
    <Layout>
      <custom-sidebar :type="type" ref="sidebar"></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div v-if="scanStatus!=2" class="content" 
      :style="{display: 'flex', 'justify-content': 'center', 'align-items': 'center'}">
        <div class="add">
          <div class="scan-button" @click="addScan">扫</div>
          <span class="text">点击按钮开始扫描</span>
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
      scanStatus: 0 //0未开始1进行中2已完成
    }
  },
  methods: {
    clickItem(res){
      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    },
    addScan(){
      console.log("扫")
      this.$nextTick(()=>{
        this.$refs.sidebar.showData = {
            title: '添加任务',
            type: 'add'
          }
          this.$refs.sidebar.show = true
      })
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

  .add .text{
    margin-top: 40px;
    color: $contentColor;
    font-size: 19px;
  }
  
  .add .scan-button{
    width: 100px;
    height: 100px;
   background-image: linear-gradient(rgba(45,140, 240,.8),$primaryColor);
    color: #fff;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: rgba(0,0,0,.3) 0px 0px 5px 1px;
    text-shadow: 0 -1px 1px rgba(0,0,0,.25);
  }
  .add .scan-button::before{
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
  .add .scan-button::after{
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


</style>
