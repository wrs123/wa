<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><span>嗯扫</span></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              扫描
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              资产
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              漏洞
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              报告
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="content">
        <Content></Content>
      </Content>
      <Footer class="layout-footer-center">2021 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'

export default {
  name: 'index',
  components: {
   Sidebar,
   Content
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/style/index.scss";
</style>
