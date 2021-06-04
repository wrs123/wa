<template>
  <div class="container">
    <div class="service" >
      <span v-if="service.length!=0" v-for="(item,index) in service" :key="index">{{item}}</span>
      <span v-if="service.length==0">--</span>
    </div>
    <div class="systems">
      <span>{{system}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "hostLayerTemplate",
  props:{
    system: {
      type: String
    },
    service: {
      type: Array
    }
  },
}
</script>

<style scoped>
  .container{
    margin: 10px 0;
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
  }

  .systems{
    padding: 2px;
    background: rgba(85, 100, 138, .2);
    font-weight: bold;
  }

  .service{
    padding: 2px;
    justify-content: center;
    display: flex;
    min-height: 50px;
    flex-direction: column;
    background: rgba(85, 100, 138, .07);
  }

  .service span{
    padding: 2px;
    background: #f5f7f9;
  }
</style>
