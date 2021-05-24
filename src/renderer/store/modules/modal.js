const state={
  show: false,
  data: {
    title: '',
    type: ''
  }
};
const getters={
  getShow(state){
    return state.show;
  },
  getData(state){
    return state.data;
  }
};
const mutations={
  setShow(state,items){
    state.show = items
  },
  setData(state,items){
    state.data = items
  },
  setAll(state, items){
    state.data = items.data;
    state.show = items.show;
  }
};
const actions={
  setShow(context,item){
    context.commit('setShow',item);
  },
  setData(context,item){
    context.commit('setData',item);
  },
  setAll(context,item){
    context.commit('setAll',item);
  }
};
export default {
  namespaced:true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
