<template>
  <div class="sidebar">
    <div class="sidebar-items" v-for="(item, index) in itemList" v-bind:key="index">
      <Icon :type="item" />
    </div>
  </div>

</template>

<script>
export default {
  name: "sidebar",
  data () {
    return {
      itemList: ['md-add', 'md-time']
    }
  },
}
</script>

<style scoped>

</style>
