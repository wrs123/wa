<template>
  <div class="layout">
    <Modal
      v-model="addModal"
      title="Common Modal dialog box title"
      @on-ok="addPortConfig"
    >
      <Form :model="formItem" :label-width="80">
        <FormItem label="端口类型">
          <Input v-model="portConfig.name" placeholder="请输入端口类型"></Input>
        </FormItem>
        <FormItem label="端口列表">
          <Input v-model="portConfig.port_list" type="textarea" :row="2" placeholder="请输入端口列表，使用，分隔"></Input>
        </FormItem>
      </Form>
    </Modal>
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
                        class="scanConfig"
                  >
                    <span class="title">扫描端口列表：</span>
                    <div class="scan-list">
                      <div style="padding: 10px 0;">
                        <Button type="primary" icon="md-add-circle" @click="addModal = true">添加</Button>
                      </div>
                      <Table border :columns="scanTableColumn" :data="portConfigList"></Table>
                    </div>
                    <FormItem v-if="formItem.scan_port_type=='custom'">
                      <Input v-model="formItem.custom_port" type="textarea" placeholder="请输入自定义端口" :rows="3"></Input>
                    </FormItem>
                  </Form>
                  <Form v-if="activeConfigType==2">
                    <FormItem label="上传字典：">
                      <Upload action="http://10.31.16.198:19999/api/v1/config/uploadDictConfig">
                        <Button icon="ios-cloud-upload-outline">上传文件</Button>
                      </Upload>
                    </FormItem>
                    <FormItem>
                      <div :class="['uploadedFile',{'cursorPointer':formItem.dictionaryUrl.fileName!=''}]">
                        <span v-if="formItem.dictionaryUrl.fileName==''"></span>
                        <a  v-if="formItem.dictionaryUrl.fileName!=''">{{formItem.dictionaryUrl.fileName}}</a>
                      </div>
                    </FormItem>
                  </Form>
                </div>
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
import Api from "@/utils/api";

export default {
  name: "config",
  components: {
    'custom-sidebar':Sidebar,
    'custom-footer': Footer,
    'custom-header': Header
  },
  created() {
    this.getPortList()
    this.getDicUrl()
  },
  data () {
    return {
      addModal: false,
      activeMenuItem: "0",
      formItem: {
        portList: '',
        dictionaryUrl: {
          fileName: '',
          url: ''
        },
        file: ''
      },
      dicUrl: '',
      scanTableColumn: [
        {
          title: '端口类型',
          key: 'name',
          width: 85,
          align: 'center'
        },
        {
          title: '端口集',
          key: 'port_list'
        },
        {
          title: 'Action',
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.portConfig = params.row
                    this.addModal = true
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deletePortConfig(params.row)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      scanTableData: [ {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park'
      },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }],
      configTypeList: [
        {
          name: '扫描设置',
          id: '1'
        },{
          name: '字典设置',
          id: '2'
        }
      ],
      activeConfigType: 1,
      portConfig:{
        name: '',
        port_list: '',
        id: ''
      },
      portConfigList: []
    }
  },
  methods: {
    getDicUrl(){
      console.log(11)
      Api.getDicUrl({}).then(res => {
        if(res.code == 200){
          console.log(res)
            this.formItem.dictionaryUrl = res.result
        }
      })
    },
    deletePortConfig(res){
      console.log(this.portConfig)
      Api.deletePortConfig(res).then(res => {
        if(res.code === 200){
          this.$Message.success("删除成功")
          this.getPortList()
        }
      })
    },
    addPortConfig(){
      console.log()
      Api.postPortConfig(this.portConfig).then(res => {
        if(res === 200){
          this.portConfig = {
            name: '',
            port_list: '',
            id: ''
          }
        }
        this.$Message.success("操作成功")
        this.getPortList()
      })

    },
    getPortList(){
      Api.getPortConfigList({page:1,limit:99999999}).then(res => {
        if(res.code === 200){
          console.log(res.result)
          this.portConfigList = res.result
        }
      })
    },
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
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .config-content .config-form{
    width: calc(100% - 180px);
    height: 100%;
    padding: 20px;
    overflow: auto;
  }

  .config-content .main-box{
    width: 100%;
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

  .scanConfig .title{
    font-size: 14px;
  }

  .scanConfig .scan-list{

  }
</style>
