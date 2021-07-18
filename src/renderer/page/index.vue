<template>
  <div class="flashContent">
    <span class="logo"><img src="../assets/images/logo.png" alt=""><span>砺器</span></span>
    <span class="status">{{message}}</span>
  </div>
</template>

<script>
import Api from "@/utils/api";
import {mapState,mapGetters,mapActions} from 'vuex';

export default{

  name: "index",
  data(){
    return {
      message: '正在初始化.....'
    }
  },
  methods: {
    ...mapActions('scan', ['setTaskList']),
    ...mapActions('scan', ['setActiveTask']),
    init(){
      Api.getTaskList().then(res => {
        if(res.code == 200){
          let result = res.result
          console.log(result)
          this.setTaskList(result)
          this.setActiveTask(result[0])
          this.message = '初始化成功'
          let that = this
          setTimeout(()=>{
            that.$router.push("/page/scan")
          },100)
        }
      })
    }
  },
  created() {
    let that = this
    this.init()


  }
}
</script>

<style lang="scss" scoped>
.flashContent{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.flashContent .logo{
  font-size: 85px;
  color: $titleColor;
  font-weight: bold;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.logo img{
  width: 100px;
  height: 100px;
}

.logo span{
  margin-left: 10px;
  line-height: 1;
}

.flashContent .status{
  font-size: 18px;
  color: $contentColor;
}
</style>
