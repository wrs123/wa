<template>
  <div class="layout">
    <Layout>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <custom-content class="content" v-bind:activeName="activeMenuItem" >
      </custom-content>
      <custom-footer></custom-footer>
    </Layout>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default {
  name: 'scan',
  components: {
   'custom-sidebar':Sidebar,
   'custom-content':Content,
   'custom-footer': Footer,
   'custom-header': Header
  },
  data () {
    return {
      activeMenuItem: "1"
    }
  },
  methods: {
    clickItem(res){

      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: res.path})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/style/index.scss";
</style>
