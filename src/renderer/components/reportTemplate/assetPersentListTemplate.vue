<template>
  <div class="assetPersentListTemplate-container" v-if="typeof data != 'undefined'">
    <Table stripe :columns="columns" :data="datas" :border="false" height="130"></Table>
    <div class="total">总共：{{total}}</div>
  </div>
</template>

<script>
import leakListTemplate from "../leakLIstTemplate";

export default {
  name: "assetPersentListTemplate",
  data(){
    return {
      datas: '',
      total: 40,
      columns: [{
        title: '',
        key: 'name'
      },
        {
          title: '',
          key: 'value'
        },
        {
          title: '',
          key: 'percent',
          render: (h, params) => {
            return h('span', {
              props: {
              }
            },parseInt(params.row.percent)+'%')
          }
        }]
    }
  },
  props:{
    data: {
      type: Array
    }
  },
  created() {
    console.log(this.data)
  },
  watch: {
    data(val, oldVal){
      let total = 0;

      for(let i in val){
        total += val[i].value
      }
      this.total = total
      for(let i in val){
        val[i]['percent'] = (val[i].value / total)*100
      }
      this.datas = val
    }
  }
}
</script>

<style scoped>
  .list{
    width: 100%;
  }

  .name{
    display: inline-block;
    width: 80px;
  }
  .value{
    width: 40px;
  }

  .total{
    display: flex;
    justify-content: center;
    background: #f2f2f2;
  }
</style>

<style>
.assetPersentListTemplate-container thead{
  display: none;
}

.assetPersentListTemplate-container .ivu-table td, .ivu-table th{
  height: 10px!important;
}
</style>
