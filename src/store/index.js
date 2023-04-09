import { createStore } from 'vuex'

export default createStore({
  state: {
    imageURL: null,
    imageHeight: 0,
    imageWidth: 0
  },
  getters: {
  },
  mutations: {
    setImageURL(state, imageURL){
      state.imageURL = imageURL;
    },
    setImageSize(state, imageArr){
      state.imageHeight = imageArr[1];
      state.imageWidth = imageArr[0];
    }
  },
  actions: {
  },
  modules: {
  }
})
