<template>
  <div>
    
    <div class="modal-mask" v-if="show" @click="close"></div>

  <transition name="big">
      <div class="custom-modal" v-if="show">
        <div class="header">
          <span class="title">{{value.title}}</span>
          <div class="closeButton" @click="close">
            <Icon type="md-close" />
          </div>
        </div>
        <div class="modal-content">
          <AddTask v-if="value.type=='add'"></AddTask>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AddTask from "./modal/addTask";

export default {
  name: "addScan",
  data(){
    return{
      value: this.data,
      show: this.display
    }
  },
  components: {
    AddTask
  },
  props:{
    data: {
      type: Object
    },
    display: {
      type: Boolean
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
    },
    display(newVal, oldVal){
      console.log(newVal, oldVal)
      this.show = newVal;
    }
  }
}
</script>

<style>
  .modal-mask{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.1);
    position: fixed;
    z-index: 9;
  }
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
    overflow: hidden;
    box-sizing: border-box;
  }

  .custom-modal .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e8eaec;

  }

  .custom-modal .header .title, .custom-modal .header .closeButton{
    padding: 10px 20px;
    font-size: 15px;
  }

  .custom-modal .header .closeButton{
    font-size: 20px;
    cursor: pointer;

  }

  .custom-modal .modal-content{
    padding: 20px;
    height: calc(100% - 51px);
    overflow: auto;
  }

</style>
