import request from "@/utils/request"

const api = {
  /**
   * 创建任务
   * @param params
   * @returns {*}
   */
  createTask(params) {
    return new Promise((resolve, reject) => {
      request.post('/task/createTask', params).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * 任务列表
   * @param params
   * @returns {boolean|Promise<AxiosResponse<any>>|*}
   */
  getTaskList(params) {
    return new Promise((resolve, reject) => {
      request.get('/task/getAllTask', {params: params}).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * 删除任务
   * @param params
   * @returns {boolean|Promise<AxiosResponse<any>>|*}
   */
  deleteTask(params) {
    return new Promise((resolve, reject) => {
      request.post('/task/deleteTask', params).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * 获取资产类型
   * @param params
   * @returns {*}
   */
  getAssetTypeList(params){
    return new Promise((resolve, reject) => {
      request.get('/assets/getAssetsType', {params: params}).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * 获取资产列表
   * @param params
   * @returns {*}
   */
  getAssetList(params){
    return new Promise((resolve, reject) => {
      request.get('/assets/getAssetsList', {params: params}).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * getPortTypeList
   * @param params
   * @returns {Promise<unknown>}
   */
  getPortTypeList(params){
    return new Promise((resolve, reject) => {
      request.get('/port/getPort', {params: params}).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * 创建任务
   * @param param
   */
  postTask(params){
    return new Promise((resolve, reject) => {
      request.post('/vul/getVulType', params).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
  /**
   * 控制台详情数据
   * @param params
   * @returns {Promise<unknown>}
   */
  getBoardDetails(params){
    return new Promise((resolve, reject) => {
      request.get('/board/getDetail', {params: params}).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
  /**
   * 获取 board主图表
   * @param params
   * @returns {Promise<unknown>}
   */
  getBoardChart(params){
    return new Promise((resolve, reject) => {
      request.get('/board/getPieData', {params: params}).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
  /**
   * 获取最新漏洞列表
   * @param params
   * @returns {Promise<unknown>}
   */
  getLatestLeakList(params){
    return new Promise((resolve, reject) => {
      request.get('/xray/getLatestVul', {params: params}).then(res =>{
        resolve(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   * 获取报告数据
   * @param params
   * @returns {Promise<unknown>}
   */
  getReport(params){
    return new Promise((resolve, reject) => {
      request.get('/report/getReportData', {params: params}).then(res =>{
        resolve(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   *  获取漏洞类型列表
   * @param params
   * @returns {Promise<unknown>}
   */
  getLeakType(params){
    return new Promise((resolve, reject) => {
      request.get('/vul/getVulType', {params: params}).then(res =>{
        resolve(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },

  /**
   *  获取漏洞列表
   * @param params
   * @returns {Promise<unknown>}
   */
  getLeakList(params){
    return new Promise((resolve, reject) => {
      request.get('/vul/getVulListByPage', {params: params}).then(res =>{
        resolve(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
  /**
   * 设置自定义端口
   * @param params
   * @returns {Promise<unknown>}
   */
  setPortConfigList(params){
    return new Promise((resolve, reject) => {
      request.post('/port/cratePort', params).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
  /**
   * 修改自定义端口
   * @param params
   * @returns {Promise<unknown>}
   */
  editPortConfigList(params){
    return new Promise((resolve, reject) => {
      request.post('/port/updatePort', params).then(res =>{
        resolve(res)
        console.log(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
  /**
   *
   * @param params
   * @returns {Promise<unknown>}
   */
  getPortConfigList(params){
    return new Promise((resolve, reject) => {
      request.get('/port/getPortByPage', {params: params}).then(res =>{
        resolve(res)
      }).catch( err =>{
        reject(err)
      })
    })
  },
}

export default api
