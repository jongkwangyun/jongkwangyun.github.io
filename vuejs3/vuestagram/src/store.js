import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "Kim",
      age: 20,
      likes: 36,
      likeoper: 1,
      // more: {},
      keyword: "",
    };
  },
  mutations: {
    setMore(state, data) {
      state.more = data;
    },
    이름변경(state) {
      state.name = "park";
    },
    나이먹기(state, payload = 1) {
      state.age += payload;
    },
    likeup(state) {
      state.likes += state.likeoper;
      state.likeoper *= -1;
    },
  },
  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((a) => {
        console.log(a.data);
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
