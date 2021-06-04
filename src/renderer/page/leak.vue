<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="leak-content">
          <div class="leak-tree">
            <Select v-model="activeTask.id" :label-in-value="true" @on-select="changeActiveTask">
              <Option v-for="(item , index) in taskList" :value="item.id" :key="index">{{ item.task_name }}</Option>
            </Select>
            <div style="height: 15px;"></div>
            <div class="leak-select">
              <div :class="['leak-select-item',{'active': item.id==activeLeak.id}]"
                   v-for="(item, index) in leakTypeList" :key="item.id"
                  @click="changeType(item)"
              >
                {{item.name}}
              </div>
            </div>
          </div>
          <div class="leak-detail">
            <Table :loading="tableLoading" :columns="leakTable" :data="leakTableData" :height="tableContentHeight"></Table>
            <div class="page-group">
              <Page :total="activeLeak.total" :page-size="activeLeak.limit" @on-change="changePage" show-total/>
            </div>
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
import {mapState,mapGetters,mapActions} from 'vuex';
import Api from "@/utils/api";
import leakListTemplate from "../components/leakListTemplate";

export default {
  name: "leak",
  components: {
    'custom-sidebar':Sidebar,
    'custom-content':Content,
    'custom-footer': Footer,
    'custom-header': Header
  },
  computed: {
    ...mapGetters('scan',{
      activeTask: 'getActiveTask'
    }),
    ...mapGetters('scan',{
      taskList: 'getTaskList'
    })
  },
  watch: {
    tableContentHeight(val) {
      this.tableContentHeight = val
    }
  },
  created() {
    //获取漏洞类型数据
    this.getLeakType()
  },
  data () {
    return {
      tableLoading: false,
      tableContentHeight: document.documentElement.clientHeight - 240,
      activeMenuItem: "3",
      leakTypeList: [],
      activeLeak: {},
      leakTable: [
        {
          type: 'expand',
          width: 30,
          render: (h, params) => {
            return h(leakListTemplate, {
              props: {
                data : params.row
              }
            })
          }
        },
      {
        title: '漏洞poc',
        key: 'poc'
      },
      {
        title: 'IP',
        key: 'ip',
        render: (h, params) => {
          return h('span', {
            props: {
            }
          },params.row.ip==''?'--':params.row.ip)
        }
      },
      {
        title: '端口',
        key: 'port',
        width: 100,
        render: (h, params) => {
          return h('span', {
            props: {
            }
          },params.row.port==''?'--':params.row.port)
        }
      }
    ],
      leakTableData: []
    }
  },
  methods: {
    ...mapActions('scan', ['setActiveTask']),
    changePage(data){
      this.activeLeak.page = data
      this.getLeakList(this.activeLeak)
    },
    getLeakType(){
      Api.getLeakType({taskId: this.activeTask.id, type: 'vul'}).then(res => {
        if(res.code == 200){
          let list = []
          for(let i in res.result){
            list.push({
              id: i,
              name: res.result[i],
              page: 1,
              limit: 5
            });
          }
          this.leakTypeList = list
          this.activeLeak = list[0]
          console.log(list[0].name)
          this.getLeakList({page:1,limit: 5, name: list[0].name})
        }
      })
    },
    changeActiveTask(data){
      console.log(data)
      let param = {
        id: data.value,
        task_name: data.label
      }
      this.setActiveTask(param)
    },
    clickItem(res){
      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    },
    changeType(item){
      if(this.activeLeak.id != item.id){
        this.activeLeak = item
        this.getLeakList(item)
      }

    },
    getLeakList(item){
      if(!this.tableLoading){
        this.tableLoading = true
        console.log(item)
        let params = {
          taskId: this.activeTask.id,
          page: item.page,
          limit: item.limit,
          value: item.name
        }
        Api.getLeakList(params).then(res => {
          if(res.code === 200){
            console.log(res)
            this.leakTableData = res.result
            this.activeLeak.total = res.total
          }
          this.tableLoading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/style/leak.scss";
</style>
