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
      <Input v-model="formItem.ip_address" type="textarea" placeholder="请输入ip地址" :autosize="true"></Input>
    </FormItem>
    <FormItem label="扫描类型：">
      <Select v-model="formItem.scan_model">
        <Option :value="item.value" v-for="(item, index) in scanTypeItems" :key="index" :label="item.name">{{item.name}}</Option>
      </Select>
    </FormItem>
    <FormItem label="端口类型：">
      <Select v-model="formItem.scan_port_type">
        <Option :value="item.value" v-for="(item, index) in portTypeItems" :key="index" :label="item.name">{{item.name}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="formItem.scan_port_type=='custom'">
      <Input v-model="formItem.custom_port" type="textarea" placeholder="请输入自定义端口" :rows="3"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" icon="ios-power" @click="startScan" size="large" long>
        <span>开始扫描</span>
      </Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: "addTask",
  data(){
    return {
      formItem: {
        task_name: '',
        ip_address: '',
        scan_model: '',
        scan_port_type: '',
        custom_port: ''
      },
      scanTypeItems:[
        {name: '全部', value: 'all'},
        {name: '端口', value: 'port'},
        {name: '存活', value: 'ping'},
        {name: '漏洞', value: 'vul'}
      ],
      portTypeItems: [
        {name: '全部', value: 'all'},
        {name: '常用', value: 'auto'},
        {name: 'web', value: 'web'},
        {name: '主机', value: 'host'},
        {name: '自定义', value: 'custom'}
      ]
    }
  },
  methods: {
    //开始扫描
    startScan(){
      let param = this.formItem
      if(param.scan_port_type != 'custom'){
        param.custom_port = ''
      }
      console.log(param, this.$route.path)
      //todo
    }
  },
  created() {
    //添加select默认选项
    this.formItem.scan_model = 'all';
    this.formItem.scan_port_type = 'all';
  }
}
</script>


