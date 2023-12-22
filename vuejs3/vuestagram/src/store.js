import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "Kim",
      age: 20,
      likes: 36,
      likeoper: 1,
    };
  },
  mutations: {
    이름변경(state) {
      state.name = "park";
    },
    나이먹기(state, payload) {
      state.age += payload;
    },
    likeup(state) {
      state.likes += state.likeoper;
      state.likeoper = -state.likeoper;
    },
  },
});

export default store;
