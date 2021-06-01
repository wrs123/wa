<template>
  <div class="layout">
    <Layout>
      <custom-header v-bind:activeName="activeMenuItem" @clickItem="clickItem"></custom-header>
      <div class="content">
        <div class="config-content">
          <div class="main-box">
            <div class="box-title">
<!--              <Icon type="md-settings" />-->
              <span>设置</span>
            </div>
            <div class="box-content">
              <div style="display: flex;height: calc(100vh - 270px);">
                <div class="selectBar">
                  <div :class="['select-items', {'active':activeConfigType==item.id}]"
                       v-for="item in configTypeList"
                       :key="item.id"
                       @click="activeConfigType=item.id"
                  >
                    {{item.name}}
                  </div>
                </div>
                <div class="config-form">
                  <Form :model="formItem"
                        label-position="right"
                        :label-width="100"
                        v-if="activeConfigType==1"
                  >
                    <FormItem label="扫描端口列表：">
                      <Input v-model="formItem.task_name" type="textarea" placeholder="请输入端口集，使用英文','分隔"></Input>
                    </FormItem>
                    <FormItem v-if="formItem.scan_port_type=='custom'">
                      <Input v-model="formItem.custom_port" type="textarea" placeholder="请输入自定义端口" :rows="3"></Input>
                    </FormItem>
                  </Form>
                  <Form v-if="activeConfigType==2">
                    <FormItem label="上传字典：">
                      <Upload action="">
                        <Button icon="ios-cloud-upload-outline">Upload files</Button>
                      </Upload>
                    </FormItem>
                    <FormItem>
                      <div :class="['uploadedFile',{'cursorPointer':formItem.dictionaryUrl!=''}]">
                        无字典上传
                        <a href="dictionaryUrl" v-if="formItem.dictionaryUrl!=''"></a>
                      </div>
                    </FormItem>
                  </Form>
                </div>
              </div>
              <div class="save-button">
                <Button type="primary" icon="md-construct" @click="saveConfig()" size="large" long>
                  <span>保存设置</span>
                </Button>
              </div>
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
        portList: '',
        dictionaryUrl: 'd',
        file: ''

      },
      configTypeList: [
        {
          name: '扫描设置',
          id: '1'
        },{
          name: '字典设置',
          id: '2'
        }
      ],
      activeConfigType: 1
    }
  },
  methods: {
    clickItem(res){

      if(res.name != this.$data.activeMenuItem){
        console.log(res)
        this.$data.activeMenuItem = res.name
        this.$router.push({path: '/page'+res.path})
      }
    },
    upload(){

    },
    //保存设置
    saveConfig(){
      const msg = this.$Message.loading({
        content: '保存中...',
        duration: 0
      });

      setTimeout(msg, 3000);

    }
  }
}
</script>

<style lang="scss" scoped>
  .config-content{
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .config-content .box-content{
    width: 700px;
    min-width: 700px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .config-content .config-form{
    width: calc(100% - 180px);
    height: 100%;
    padding: 20px;
  }

  .main-box .box-title{
    padding: 20px 0 10px 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-title{
    border-bottom: 1px solid $dividerColor;
  }

  .box-title span{
    font-weight: bold;
  }

  .main-box .box-content{
    //padding: 30px 20px 20px 20px;
  }

  .box-content .selectBar{
    height: auto;
    width: 180px;
    border-right: 1px solid $dividerColor;
    padding: 20px;
  }

  .selectBar .select-items{
    width: 100%;
    padding: 5px 5px 5px 10px;
    margin-bottom: 8px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }

  .selectBar .active{
    background: $primaryColor;
    color: #fff;
  }

  .config-content .save-button{
    width: 100%;
    display: flex;
    padding: 10px 20px;
    border-top: 1px solid $dividerColor;
    justify-content: center;
  }

  .config-content .uploadedFile{
    width: 100%;
    padding: 5px 5px 5px 15px;
    border: 1px solid $borderColor;
    border-radius: 5px;
    font-size: 14px;
  }

  .cursorPointer{
    cursor: pointer;
  }
</style>
