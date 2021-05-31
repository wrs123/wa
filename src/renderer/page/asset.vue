<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="asset-content">
          <div class="asset-tree">
            <Select v-model="activeTask" >
              <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div style="height: 15px;"></div>
            <Tree :data="tree"></Tree>
          </div>
          <div class="asset-detail">
            暂无数据
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
  name: "asset",
  components: {
    'custom-sidebar':Sidebar,
    'custom-content':Content,
    'custom-footer': Footer,
    'custom-header': Header
  },
  data () {
    return {
      activeMenuItem: "2",
      tree: [
        {
          title: 'parent',
          expand: true,
          children: [
            {
              title: 'leaf'
            },
            {
              title: 'leaf'
            }
          ]
        },
        {
          title: 'parent',
          expand: true,
          children: [
            {
              title: 'leaf'
            },
            {
              title: 'leaf'
            }
          ]
        }
      ],
      activeTask: 0,
      taskList: [
        {
          value: 0,
          label: '全部资产'
        },
        {
          value: 1,
          label: '任务1'
        },{
          value: 2,
          label: '任务2'
        }
      ]
    }
  },
  methods: {
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
$treeWidth: 250px;

 .asset-content{
   width: 100%;
   height: 100%;
   padding: 20px 10px;
   display: flex;
   justify-content: space-around;
 }

 .asset-content .asset-tree {
   height: 100%;
   width: $treeWidth;
   background: white;
   border-radius: 4px;
   padding: 20px;
 }

  .asset-content .asset-detail{
    height: 100%;
    width: calc(100% - #{$treeWidth+40px});
    background: white;
    border-radius: 4px;
    padding: 20px;
  }
</style>
<style lang="scss">
  .asset-tree .ivu-select-selection{
    border: none;
    box-shadow: none!important;
    background: transparent;
  }
  .asset-tree .ivu-select-selection div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .asset-tree .ivu-select-selection div span.ivu-select-selected-value{
    padding-right: 5px;
    font-size: 20px;
    font-weight: bold;
  }

  .asset-tree .ivu-select-selection div i.ivu-icon{
    position: static;
    line-height: 0px;
  }

  .asset-tree .ivu-select-dropdown{
    min-width: 110px!important;
  }

  .asset-tree .ivu-tree-title{
    width: 100%;
    padding: 3px 0 3px 5px;
  }

  .asset-tree .ivu-tree-arrow{
    padding: 3px 0 3px 0;
  }

  .asset-tree .ivu-tree ul li{
    margin: 5px 0;
  }
</style>
