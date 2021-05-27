<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="asset-content">
          <div class="asset-tree">
            <Select v-model="activeTask" size="small">
              <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div style="height: 10px;"></div>
            <Tree :data="tree"></Tree>
          </div>
          <div class="asset-detail">
            内容
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
          title: 'parent 1-1',
          expand: true,
          children: [
            {
              title: 'leaf 1-1-1'
            },
            {
              title: 'leaf 1-1-2'
            }
          ]
        },
        {
          title: 'parent 1-2',
          expand: true,
          children: [
            {
              title: 'leaf 1-2-1'
            },
            {
              title: 'leaf 1-2-1'
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
   padding: 20px;
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
    width: calc(100% - #{$treeWidth+60px});
    background: white;
    border-radius: 4px;
    padding: 20px;
  }
</style>
