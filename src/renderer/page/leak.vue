<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="leak-content">
          <div class="leak-tree">
            <Select v-model="activeTask" >
              <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div style="height: 15px;"></div>
            <div class="leak-select">
              <div :class="['leak-select-item',{'active': item.id==activeLeak}]"
                   v-for="item in leakTypeList" :key="item.id"
                  @click="chooseLeakType(item)"
              >
                {{item.name}}
              </div>
            </div>
          </div>
          <div class="leak-detail">
            <Table :columns="leakTable" :data="leakTableData" :height="tableContentHeight"></Table>
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
  name: "leak",
  components: {
    'custom-sidebar':Sidebar,
    'custom-content':Content,
    'custom-footer': Footer,
    'custom-header': Header
  },
  data () {
    return {
      activeMenuItem: "3",
      tree: [
        {
          title: 'xss注入',
          expand: true,
        },
        {
          title: '弱密码',
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
          label: '全部'
        },
        {
          value: 1,
          label: '任务1'
        },{
          value: 2,
          label: '任务2'
        }
      ],
      leakTypeList: [
        {
          id: 0,
          name: 'xss注入'
        },{
          id: 1,
          name: '弱口令'
        },{
          id: 2,
          name: 'MS107-010'
        }
      ],
      activeLeak: 0,
      leakTable: [
      {
        title: '漏洞名称',
        key: 'name'
      },
      {
        title: 'IP',
        key: 'port'
      },
      {
        title: '端口',
        key: 'address'
      }
    ],
      leakTableData: [
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
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
    },
    chooseLeakType(item){
      console.log(item)
      if(this.activeLeak != item.id){
        this.activeLeak = item.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/style/leak.scss";
</style>
