<template>
    <div>
        <Col span="24">
            <Row>
                <span class="temTitle">漏洞类型：</span>
                <span class="temContent">{{data.type}}</span></Row>
             <Row>
                <span class="temTitle">创建时间：</span>
                <span class="temContent">{{data.ctime}}</span>
             </Row>
        </Col>
    </div>
</template>

<script>
export default {
  name: "scanListTemplate",
  props:{
      data: {
          type: Object
      }
  },
}
</script>
<style lang="scss" scoped>
    .temTitle{
        color: $titleColor;
        font-weight: bold;
        font-size: 11px
    }
    .temContent{
      font-size: 11px;
    }
</style>
