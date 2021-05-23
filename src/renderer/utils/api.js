import request from "@/utils/request"

const api = {
  /**
   * 创建任务
   * @param params
   * @returns {*}
   */
  createTask(params) {
    return request.get('/task/createTask', { params: params })
  },

  /**
   * 任务列表
   * @param params
   * @returns {boolean|Promise<AxiosResponse<any>>|*}
   */
  getTaskList(params) {
    return request.post('/task/getTaskList', params)
  },

  /**
   * 删除任务
   * @param params
   * @returns {boolean|Promise<AxiosResponse<any>>|*}
   */
  deleteTask(params) {
    return request.post('/task/DeleteTask', params)
  }
}

export default api
