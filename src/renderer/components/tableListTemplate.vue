<template>
  <div class="list">
    <div class="item"
      v-for="(item, index) in data"
         :key="index"
    >
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "tableListTemplate",
  props:{
    data: {
      type: Array
    }
  },
}
</script>
<style lang="scss" scoped>
  .list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 0;
  }

  .item{
    padding: 2px 0;
  }
</style>
