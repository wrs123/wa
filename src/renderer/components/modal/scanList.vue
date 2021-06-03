<template>
 <div class="scan-list">
   <Table
     :columns="table.columns"
     :data="taskList"
     width="600"
     size="small"
   ></Table>
 </div>
</template>

<script>
import scanListTemplate from './scanListTemplate'
import {mapState,mapGetters,mapActions} from 'vuex';
import Api from "@/utils/api";

export default {
  name: "scanList",
  components: {scanListTemplate},
  data(){
    return {
        table: {
            columns: [
                  {
                      type: 'expand',
                      width: 30,
                      render: (h, params) => {
                          return h(scanListTemplate, {
                              props: {
                                  data : params.row
                              }
                          })
                      }
                  },
                  {
                    title: '任务类型',
                    width: '100',
                    key: 'task_type',
                    align: 'left',
                    render: (h, params) => {
                      return h('span', {
                      },'资产绘测')
                    }
                },{
                    title: '任务名称',
                    key: 'task_name',
                    width: '300'
                },{
                  title: '状态',
                  key: 'status',
                  width: 100,
                  align: 'center',
                render: (h, params) => {
                  console.log(params)
                  return h('Tag', {
                    props: {
                      color: params.row.status===1? 'success': params.row.status===2?'primary': 'error',
                    },
                  },params.row.status===1? '运行中': params.row.status===2?'已结束': '失败')
                }
                },{
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                      return h('div', {style: {display: 'flex'}},[
                        h('Tooltip', {attrs:{
                            content:'资产',
                            placement: 'top'
                        }},[
                          h('Button', {
                            props: {
                              type: 'text',
                              size: 'small',
                              icon: 'md-apps'
                            },
                            on: {
                              click: ()=>{
                                this.setShow(false)
                                console.log(params)
                                this.setActiveTask(params.row)
                                if(this.$route.path != '/page/asset'){
                                  this.$router.push("/page/asset")
                                }
                              }
                            }
                          })
                        ]),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small',
                            icon: 'md-trash'
                          },
                          on: {
                            click: ()=>{
                              this.confirm(params.row)
                            }
                          }
                        })
                      ]);
                    }
                }
            ]
        }
    }
  },
  computed: {
    ...mapGetters('scan',{
      taskList: 'getTaskList'
    }),

  },
  methods: {
    ...mapActions('modal', ['setShow']),
    ...mapActions('scan', ['setActiveTask']),
    ...mapActions('scan', ['setTaskList']),
    confirm (id) {
      this.$Modal.confirm({
        title: '提示',
        okText: '删除',
        content: '<p>是否确定删除？</p>',
        onOk: () => {
          Api.deleteTask({id: id.id}).then(res => {
            if(res.code == 200){
              this.$Message.success(res.message);
              let that = this
              Api.getTaskList({}).then(res => {
                if(res.code == 200){
                  this.setTaskList(res.result)
                }
              })
            }
          })
        },
        onCancel: () => {
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .ivu-table-wrapper{
    border-left: 0;
    border-right: 0;
  }
</style>


