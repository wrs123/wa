<template>
  <Header :style="{position: 'fixed', width: '100%'}">
    <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="clickItem">
      <div class="layout-logo"><img src="../assets/images/logo.png" alt=""><span>砺器</span></div>
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          控制台
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-archive"></Icon>
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
      <div class="layout-button" @click="clickItem('5')">
        <Icon type="md-settings" />
      </div>
    </Menu>
  </Header>
</template>

<script>
export default {
  name: "customHeader",
  props: ['activeName'],
  methods: {
    clickItem(name){
      let pathMap = {
        "1": '/scan',
        "2": '/asset',
        "3": '/leak',
        "4": '/report',
        "5": '/config'
      }

      this.$emit('clickItem',{name: name, path: pathMap[name]});
    }
  }
}
</script>

<style lang="scss">

.layout-logo{
  width: 100px;
  height: 30px;
  background: transparent;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-logo img{
  width: 35px;
  height: 35px;
}


.layout-nav{
  width: 420px;
  margin: 0 auto;
}

.layout-logo span{
  color: $titleColor;
  display: inline;
  line-height: 17px;
  font-size: 20px;
  padding-left: 5px;
  font-weight: bold;
}

.layout-button{
  cursor: pointer;
  position: absolute;
  right: 20px;
  display: flex;
  top: calc(50% - 10.5px);;
  color: $contentColor;
  font-size: 18px;
  padding: 3px;
  border: 1px solid $contentColor;
  border-radius: 50%;
}
.ivu-menu, .ivu-layout-header{
  background: #fff!important;
  box-shadow: 0 1px 4px rgba(0,21,41,.08)!important;
  z-index: 5;
}

.ivu-menu{
  box-shadow: none!important;
}
</style>
