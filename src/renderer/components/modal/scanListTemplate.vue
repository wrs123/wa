<template>
    <div>
        <Col span="24">
          <Row>
            <span class="temTitle">扫描端口：</span>
            <span class="temContent">{{data.port_list}}</span>
          </Row>
            <Row>
                <span class="temTitle">描述：</span>
                <span class="temContent">{{data.description}}</span></Row>
             <Row>
                <span class="temTitle">创建时间：</span>
                <span class="temContent">{{data.CreatedAt | formatTimer}}</span>
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
