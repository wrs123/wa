<template>
  <div class="layout">
    <Layout>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="config-content">
          <div class="main-box">
<!--            <div class="box-title">-->
<!--&lt;!&ndash;              <Icon type="md-settings" />&ndash;&gt;-->
<!--              <span>设置</span>-->
<!--            </div>--> 
            <div class="box-content">
              <Form :model="formItem"
                    label-position="right"
                    :label-width="100"
              >
                <FormItem label="扫描ip列表：">
                  <Input v-model="formItem.task_name" type="textarea" placeholder="请输入ip集，使用英文','分隔"></Input>
                </FormItem>
                <FormItem label="扫描端口列表：">
                  <Input v-model="formItem.task_name" type="textarea" placeholder="请输入端口集，使用英文','分隔"></Input>
                </FormItem>
                <FormItem v-if="formItem.scan_port_type=='custom'">
                  <Input v-model="formItem.custom_port" type="textarea" placeholder="请输入自定义端口" :rows="3"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" icon="md-construct" @click="startScan" size="large" long>
                    <span>保存设置</span>
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
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
      activeMenuItem: "0",
      formItem: {
        task_name: '',
        ip_address: '',
        scan_model: '',
        scan_port_type: '',
        custom_port: ''
      },
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
  .config-content{
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  .config-content .main-box{
    width: 600px;
    height: 100%;
    min-width: 300px;
  }

  .main-box .box-title{
    padding: 20px 0 10px 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-title span{
    font-weight: bold;
  }

  .main-box .box-content{
    padding: 30px 20px 20px 20px;
  }

</style>
