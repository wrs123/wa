<template>
  <div class="layout">
    <Layout>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        设置
      </div>
      <custom-footer></custom-footer>
    </Layout>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default {
  name: "config",
  components: {
    'custom-sidebar':Sidebar,
    'custom-footer': Footer,
    'custom-header': Header
  },
  data () {
    return {
      activeMenuItem: "0"
    }
  },
  methods: {
    clickItem(res){

      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
