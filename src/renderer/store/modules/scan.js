const state={
  scanStatus: 0, //0未开始1进行中2已完成
  activeTask: {},
  taskList:[]
};
const getters={
  getStatus(state){ //承载变化的collects
    return state.scanStatus;
  },
  getActiveTask(state){ //承载变化的collects
    return state.activeTask;
  },
  getTaskList(state){ //承载变化的collects
    return state.taskList;
  },
};
const mutations={
  setScanStatus(state,items){ //如何变化collects,插入items
    state.scanStatus = items
  },
  setActiveTask(state,items){ //如何变化collects,插入items
    state.activeTask = items
  },
  setTaskList(state,items){ //如何变化collects,插入items
    state.taskList = items
  }
};

const actions={
  setScanStatus(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('setScanStatus',item);
  },
  setActiveTask(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('setActiveTask',item);
  },
  setTaskList(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('setTaskList',item);
  }
};
export default {
  namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
