<template>
  <div class="custom-modal">
    <div class="header">
      <span class="title">{{value.title}}</span>
      <div class="closeButton" @click="close">
        <Icon type="md-close" />
      </div>
    </div>
    <div class="content">
      <AddTask v-if="value.type=='add'"></AddTask>
    </div>
  </div>
</template>

<script>
import AddTask from "./modal/addTask";

export default {
  name: "addScan",
  data(){
    return{
      value: this.data
    }
  },
  components: {
    AddTask
  },
  props:{
    data: {
      type: Object
    }
  },
  methods: {
    close(){
      this.$emit('close',"");
    }
  },
  watch: {
    data(newVal, oldVal){
      console.log(newVal, oldVal)
      this.value = newVal;
    }
  }
}
</script>

<style>
  .custom-modal{
    position: fixed;
    top: 100px;
    background: #fff;
    z-index: 999;
    right: 80px;
    /*left: 20px;*/
    bottom: 80px;
    border-radius: 5px;
    transition: all .3s;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.1);
    min-width: 200px;
  }

  .custom-modal .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e8eaec;

  }

  .custom-modal .header .title, .custom-modal .header .closeButton{
    padding: 10px;
    font-size: 15px;
  }

  .custom-modal .header .closeButton{
    font-size: 20px;
    cursor: pointer;
  }

  .custom-modal .content{
    padding: 5px;
  }
</style>
