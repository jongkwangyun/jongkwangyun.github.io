<template>
  <div>
    <div class="black-bg" v-if="모달창열렸니">
      <div class="white-bg">
        <h4>상세페이지임</h4>
        <p>상세페이지내용임</p>
        <button @click="모달창열렸니 = false">닫기</button>
      </div>
    </div>

    <div class="menu">
      <a v-for="(a, i) in 메뉴들" :key="i">{{ a }}</a>
    </div>

    <div v-for="(e, i) in 원룸들.length" :key="i">
      <img :src="원룸들[i].image" alt="" class="room-img" />
      <h4>{{ 원룸들[i].title }}</h4>
      <p>{{ 원룸들[i].price }} 원</p>
    </div>
  </div>
</template>

<script>
import data from "./assets/oneroom.js";

export default {
  name: "App",
  data() {
    return {
      원룸들: data,
      모달창열렸니: false,
      신고수: [0, 0, 0],
      메뉴들: ["Home", "shop", "About"],
      products: ["역삼동원룸", "천호동원룸", "마포구원룸"],
      prices: [50, 60, 70],
    };
  },
  methods: {
    increase() {
      this.신고수++;
    },
  },

  components: {},
};
</script>

<style>
.room-img {
  width: 100%;
  margin-top: 40px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
