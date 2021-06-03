<template>
  <Form :model="formItem"
        :style="{width:'360px'}"
        label-position="left"
        :label-width="90"
  >
    <FormItem label="任务名称：">
      <Input v-model="formItem.task_name" placeholder="请输入任务名称"></Input>
    </FormItem>
    <FormItem label="ip地址：">
      <Input v-model="formItem.scan_ip" type="textarea" placeholder="请输入ip地址" :autosize="true"></Input>
    </FormItem>
    <FormItem label="端口类型：">
      <Select v-model="formItem.scan_port_id"
              @on-open-change="getPortTypeList">
        <Option :value="item.id" v-for="(item, index) in portTypeItems" :key="index" :label="item.name">{{item.name}}</Option>
      </Select>
    </FormItem>
    <FormItem label="任务描述：">
      <Input v-model="formItem.description" type="textarea" placeholder="请输入任务描述" :rows="3"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" icon="ios-power" @click="startScan" size="large" long>
        <span>开始扫描</span>
      </Button>
    </FormItem>
  </Form>
</template>

<script>
import { mapActions } from 'vuex'
import Api from "@/utils/api"

export default {
  name: "addTask",
  data(){
    return {
      formItem: {
        task_name: '',
        scan_ip: '',
        task_type: "1",
        description: '',
        scan_port_id: ''
      },
      portTypeItems: [
        {name: '加载中...', id: ''},
      ]
    }
  },
  methods: {
    ...mapActions('scan', ['setScanStatus']),
    ...mapActions('modal', ['setAll']),
    getPortTypeList(data){

      if(data){
        console.log(data)
        Api.getPortTypeList({}).then(res => {

          if(res.code == 200){
            console.log(res.result)
            this.portTypeItems = res.result
          }
        })
      }
    },
    //开始扫描
    startScan(){
      let param = this.formItem
      console.log(param)
      Api.postTask(param).then(res =>{
        console.log(res)
        if(res.code == 200){
          this.$Message.success(res.message);
          this.setScanStatus(1)
          this.setAll({data: {title: '',name: ''},show: false})
        }else{
          this.$Message.warning(res.message);
        }
      })
      //
      // if(this.$route.path!='/page/scan'){
      //   this.$router.push('/page/scan');
      // }
    }
  }
}
</script>


