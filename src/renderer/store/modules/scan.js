const state={
  scanStatus: 0, //0未开始1进行中2已完成
  activeMission: ''
};
const getters={
  getStatus(state){ //承载变化的collects
    return state.scanStatus;
  },
  getActiveMission(state){ //承载变化的collects
    return state.activeMission;
  }
};
const mutations={
  setScanStatus(state,items){ //如何变化collects,插入items
    state.scanStatus = items
  },
  setActiveMission(state,items){ //如何变化collects,插入items
    state.activeMission = items
  }
};

const actions={
  setScanStatus(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('setScanStatus',item);
  },
  setActiveMission(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('setActiveMission',item);
  }
};
export default {
  namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
