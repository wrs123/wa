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

export default {
  name: "scanList",
  components: {scanListTemplate},
  data(){
    return {
        table: {
            columns: [
                {
                    type: 'expand',
                    width: 50,
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
                    key: 'type'
                },{
                    title: '任务名称',
                    key: 'name'
                },{
                    title: '模式',
                    type: 'mode'
                },{
                    title: '资产',
                    key: 'property'
                },{
                    title: '漏洞',
                    key: 'leak'
                },{
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                      return h('div', [
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small',
                            icon: 'md-more'
                          }
                        }),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small',
                            icon: 'md-trash'
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
                    id: 0
                }
            ]
        }
    }
  }
}
</script>

<style scoped>

</style>
