<template>
 <Table
    :columns="table.columns"
    :data="table.data"
    width="600"
    size="small"
    ></Table>
</template>

<script>
import scanListTemplate from './scanListTemplate'
import {mapState,mapGetters,mapActions} from 'vuex';

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
                    key: 'type',
                    align: 'left'
                },{
                    title: '任务名称',
                    key: 'name'
                },{
                  title: '状态',
                  key: 'status'
              },{
                    title: '模式',
                    key: 'mode',

                },{
                    title: '漏洞',
                    key: 'leak',
                    width: '80'
                },{
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                      return h('div', [
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
                                this.$router.push("/page/asset")
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
                              this.confirm()
                            }
                          }
                        })
                      ]);
                    }
                }
            ],
            data: [
                {
                    type: 'mysql爆破',
                    ctime: '2021-09-12',
                    name: '任务1',
                    mode: '每天一次',
                    property: 5,
                    status: '运行中',
                    leak: 2,
                    id: 0
                },
              {
                type: 'mysql爆破',
                ctime: '2021-09-12',
                name: '任务1',
                mode: '每天一次',
                property: 5,
                status: '运行中',
                leak: 2,
                id: 0
              }
            ]
        }
    }
  },
  methods: {
    ...mapActions('modal', ['setShow']),
    confirm () {
      this.$Modal.confirm({
        title: '提示',
        okText: '删除',
        content: '<p>是否确定删除？</p>',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
