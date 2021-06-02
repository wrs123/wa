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
      activeMenuItem: "4"
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
