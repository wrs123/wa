<template>
  <div class="">
    <div class="sidebar">
      <Tooltip :content="item.tip" placement="left-start"  v-for="(item, index) in itemList" v-bind:key="index">
        <div :class="['sidebar-items', {'add-button':index==0}, {'active':item.isActive}]" @click="itemClick(item)">
          <Icon :type="item.icon" />
        </div>
      </Tooltip>
    </div>
    <AddScan @close="closeModel" :display="show" :data="showData"></AddScan>
  </div>
</template>

<script>
import AddScan from "./addScan";
import {mapState,mapGetters,mapActions} from 'vuex';
import Api from "@/utils/api";

export default {
  name: "sidebar",
  data () {
    return {
      itemList: [{icon: 'md-add', tip: '添加任务', type: 'add', isActive: false},
        {icon: 'md-time', tip: '任务列表', type: 'list', isActive: false}]
    }
  },
  computed: {
    ...mapGetters('modal',{
      show: 'getShow',
      showData: 'getData'
    }),
  },
  components: {
    AddScan
  },
  methods: {
    ...mapActions('scan', ['setTaskList']),
    ...mapActions('modal',['setShow','setData']),
    itemClick(item){
      console.log(item)
      let itemList = this.$data.itemList,
          newList = [],
        showData = {}
      for(let i in itemList){
        showData = {
          title: item.tip,
          type: item.type
        }
        if(itemList[i].type == item.type && item.type != 'add'){
          itemList[i].isActive = true
          newList.push(itemList[i])
          continue
        }
        Api.getTaskList({}).then(res => {
          if(res.code == 200){
            console.log(res)
            this.setTaskList(res.result)
          }
        })
        itemList[i].isActive = false
        newList.push(itemList[i])
      }
      this.$data.itemList = newList
      this.setData(showData)
      this.openModel()


    },
    closeModel(){
      this.setShow(false)
    },
    openModel(){
      let that = this
      this.closeModel()
      setTimeout(function(){
        that.setShow(true)
      },1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar{
    position: fixed;
    padding: 5px 0;
    right: 10px;
    top: 30%;
    z-index: 999999;
    background: #fff;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,.08);
    display: flex;
    flex-direction: column;
  }

  .sidebar .add-button{
    background: #2d8cf0;
    box-shadow: 0 5px 5px rgba(0,0,0,.1);
    border-radius: 50%;
    padding: 5px!important;
    margin: 10px 7px;
  }

  .sidebar .active{
    background: #e8eaec!important;
  }

  .sidebar .add-button i{
    color: #fff!important;
  }

  .sidebar .sidebar-items{
    padding: 12px;
    cursor: pointer;
    transition: all .3s;
    will-change: color, background;
  }
  .sidebar .sidebar-items>i{
    font-size: 25px;
    color: $titleColor;
  }

</style>
