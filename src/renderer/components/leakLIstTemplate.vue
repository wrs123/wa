<template>
  <div>
    <Col span="24">
      <Row>
        <span class="temTitle">payload：</span>
        <span class="temContent">{{data.payload}}</span>
      </Row>
      <Row>
        <span class="temTitle">url：</span>
        <span class="temContent">{{data.url}}</span></Row>
      <Row>
        <span class="temTitle">cve编号：</span>
        <span class="temContent">{{data.url}}</span></Row>
    </Col>
  </div>
</template>

<script>
export default {
  name: "leakListTemplate",
  props:{
    data: {
      type: Object
    }
  },
  filters: {
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
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
