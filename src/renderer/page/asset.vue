<template>
  <div class="layout">
    <Layout>
      <custom-sidebar></custom-sidebar>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="asset-content">
          <div class="asset-tree">
            <Select v-model="activeTask.id" :label-in-value="true" @on-select="changeActiveTask">
              <Option v-for="(item,index) in taskList" :value="item.id" :key="item.index">{{ item.task_name }}</Option>
            </Select>
            <div style="height: 15px;"></div>
            <Tree :data="tree"
                  @on-toggle-expand="getAssetTypeList"
                  @on-select-change="getAssetList"
            ></Tree>
          </div>
          <div class="asset-detail">
            <div class="total-content">资产: <span class="text">{{activeTotal.assetTotal}}</span>, 端口: <span class="text">{{activeTotal.portTotal}}</span>, ip: <span class="text">{{activeTotal.ipTotal}}</span>, 漏洞: <span class="text">{{activeTotal.leakTotal}}</span></div>
            <div class="asset-table">
              <Table :loading="tableLoading" :columns="assetTable" :data="assetTableData" :height="tableContentHeight"></Table>
            </div>
            <div class="page-group">
              <Page :total="activeChild.total" :page-size=activeChild.limit @on-change="changePage" show-total/>
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
import tableListTemplate from '@/components/tableListTemplate';
import hostLayerTemplate from '@/components/hostLayerTemplate';

export default {
  name: "asset",
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
  data () {
    return {
      tableLoading: false,
      tableContentHeight: document.documentElement.clientHeight - 270,
      activeMenuItem: "2",
      activeChild: {
        page: 1,
        limit: 5,
        total: 0,
      },
      activeTotal: {
        assetTotal: 0,
        ipTotal: 0,
        leakTotal: 0,
        portTotal: 0
      },
      tree: [
        {
          title: '系统资产',
          key: 'system',
          expand: false,
          children: [{
            title: '',
            render: (h, {root, node, data}) => {
              return [
                h('Icon', {
                  props: {
                    type: 'ios-loading'
                  },
                  style: {
                    marginRight: '8px',
                    color: '#333'
                  }
                }),
                h('span', {
                  props: {
                  },
                  style: {
                    marginRight: '8px',
                    color: '#333'
                  }
                },'加载中...')
              ]
            }
          }]
        },
        {
          title: '端口资产',
          key: 'port',
          expand: false,
          children: [{
            title: '',
            render: (h, {root, node, data}) => {
              return [
                h('Icon', {
                  props: {
                    type: 'ios-loading'
                  },
                  style: {
                    marginRight: '8px',
                    color: '#333'
                  }
                }),
                h('span', {
                  props: {
                  },
                  style: {
                    marginRight: '8px',
                    color: '#333'
                  }
                },'加载中...')
              ]
            }
          }]
        }
      ],
      assetTable: [
        {
          title: 'IP',
          key: 'Ip',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return [
              h('span', {
                props: {

                },style: {'font-weight': 'bold'}
              }, params.row.Ip)
            ]
          }
        },
        {
          title: '端口',
          key: 'PortList',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return [
              h(tableListTemplate, {
                props: {
                  data: params.row.PortList
                }
              })
            ]
          }

        },
        {
          title: '服务',
          key: 'ServiceList',
          render: (h, params) => {
            return [
              h(tableListTemplate, {
                props: {
                  data: params.row.ServiceList
                }
              })
            ]
          }
        },
        {
          title: '协议',
          key: 'protocol',
          width: 100,
          align: 'center',
          render: (h, {root, node, data}) => {
            return [
              h('span', {
                props: {
                },
                style: {
                  marginRight: '8px',
                  color: '#333'
                }
              },'tcp')
            ]
          }
        },
        {
          title: '主机系统',
          key: 'system',
          align: 'center',
          width: 170,
          render: (h, params) => {
            return [
              h(hostLayerTemplate, {
                props: {
                  system: params.row.System,
                  service: params.row.Service
                }
              })
            ]
          }
        }
      ],
      assetTableData:[]
    }
  },
  watch: {
    tableContentHeight(val){
      this.tableContentHeight = val
    }
  },
  created() {
    this.getAssetList([{
      page: 1,
      limit: 5
    }])
  },
  methods: {
    ...mapActions('scan', ['setActiveTask']),
    changeActiveTask(data){
      let param = {
        id: data.value,
        task_name: data.label
      }
      this.setActiveTask(param)
    },
    changePage(data){
      this.activeChild.page = data
      console.log(this.activeChild)
     this.getAssetList([this.activeChild])
    },
    clickItem(res){
      if(res.name != this.$data.activeMenuItem){
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    },
    getAssetTypeList(re){
      Api.getAssetTypeList({type: re.key, taskId: this.activeTask.id}).then(res =>{
        if(res.code === 200){
          let data = []
          for(let item in res.result.name){
            data.push({title: res.result.name[item], type: res.result.type, page: 1, limit: 5})
          }
          if(re.key == 'system'){
            this.tree[0].children = data
          }else if(re.key == 'port'){
            this.tree[1].children = data
          }
        }
      })
    },
    getAssetList(re){
      this.tableLoading = true
      re = re[0]
      console.log(re)
      this.activeChild = re;
      let params = {
        type: re.type,
        value: re.title,
        taskId: this.activeTask.id,
        page: re.page,
        limit: re.limit
      }
      console.log(params)
      Api.getAssetList(params).then(res =>{
        let result = res.result
        console.log(res)
        let activeTotal = {
          assetTotal: result.assetTotal,
          ipTotal: result.ipTotal,
          leakTotal: result.leakTotal,
          portTotal: result.portTotal
        }
        //assetTableData
        this.activeChild.page = res.page
        this.activeChild.limit = res.limit
        this.activeChild.total = res.total
        this.activeTotal = activeTotal
        this.assetTableData = result.list
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$treeWidth: 250px;

.ivu-table-wrapper{
  border-left: 0;
  border-right: 0;
}

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
   overflow: auto;
 }

  .asset-content .asset-detail{
    height: 100%;
    width: calc(100% - #{$treeWidth+40px});
    background: white;
    border-radius: 4px;
    padding: 20px;
    position: relative;
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
    font-size:13px;
    font-weight: bold;
  }

  .asset-tree .ivu-tree-arrow{
    padding: 3px 0 3px 0;
  }

  .asset-tree .ivu-tree ul li{
    margin: 5px 0;
  }

  .asset-detail .page-group{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .asset-detail .total-content{
    font-size: 14px;
    //font-weight: bold;
    margin-bottom: 10px;
    color: $SubColor;
  }

  .asset-detail .total-content .text{
    font-weight: normal!important;
    color: $titleColor;
    font-size: 16px;
    font-weight: lighter;
  }
</style>
