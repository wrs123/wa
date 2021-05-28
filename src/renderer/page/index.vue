<template>
  <center>加载中...请稍等,2s后跳转</center>
</template>

<script>
export default {
  name: "index",
  created() {
    let that = this
    setTimeout(()=>{
      that.$router.push("/page/scan")
    },2000)

  }
}
</script>

<style scoped>

</style>
