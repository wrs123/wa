<template>
  <Form :model="formItem"
        :style="{width:'360px'}"
        label-position="left"
        :label-width="90"
  >
    <FormItem label="任务名称：">
      <Input v-model="formItem.input" placeholder="请输入任务名称"></Input>
    </FormItem>
    <FormItem label="ip地址：">
      <Input v-model="formItem.input" type="textarea" placeholder="请输入任务名称" :autosize="true"></Input>
    </FormItem>
    <FormItem label="端口类型：">
      <Select v-model="formItem.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="扫描类型：">
      <Select v-model="formItem.scan_port_type">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button type="primary" icon="ios-power" @click="" size="large" long>
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
        input: '',
        select: '',
        scan_port_type: '',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      selectItems:[
        {name: ''}
      ]
    }
  }
}
</script>


