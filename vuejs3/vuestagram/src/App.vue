<template>
  <div>
    <div class="header">
      <ul class="header-button-left">
        <li>Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li @click="step++" v-if="step < 2">Next</li>
        <li v-if="step == 2" @click="publish">발행</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>

    <h4>안녕 {{ $store.state.name }}({{ $store.state.age }})</h4>
    <button @click="$store.commit('이름변경')">이름변경</button>
    <button @click="나이먹기(5)">나이먹기</button>

    <Container
      :instaData="instaData"
      :step="step"
      :imgUrl="imgUrl"
      :content="content"
      @update:content="content = $event"
    />

    <p>{{ $store.state.more }}</p>
    <button @click="$store.dispatch('getData')">더보기</button>

    <div class="footer">
      <ul class="footer-button-plus">
        <input @change="upload" type="file" id="file" class="inputfile" />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import posting from "./assets/posting.js";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      instaData: posting,
      moreCount: 0,
      step: 0,
      imgUrl: "",
      content: "",
      filter: "",
    };
  },
  mounted() {
    this.emitter.on("filtered", (필터) => {
      this.filter = 필터;
    });
  },
  components: {
    Container,
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    ...mapState(["name", "age", "likes"]),
    ...mapState({ 내이름: "name" }),
  },
  methods: {
    ...mapMutations(["setMore", "좋아요", "나이먹기"]),

    publish() {
      var 내게시물 = {
        name: "Kim Hyun",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imgUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.content,
        filter: this.filter,
      };
      this.instaData.unshift(내게시물);
      this.step = 0;
    },
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`)
        .then((결과) => {
          this.moreCount++;
          this.instaData.push(결과.data);
        });
    },
    upload(e) {
      let 파일 = e.target.files;
      let url = URL.createObjectURL(파일[0]);
      this.imgUrl = url;
      this.step++;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
