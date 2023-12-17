<template>
  <div>
    <Transition name="fade">
      <Modal
        :원룸들="원룸들"
        :누른거="누른거"
        :모달창열렸니="모달창열렸니"
        @closeModal="모달창열렸니 = false"
      />
    </Transition>

    <div class="menu">
      <a v-for="(a, i) in 메뉴들" :key="i">{{ a }}</a>
    </div>

    <Discount v-if="showDiscount == true" />

    <button @click="priceSort">가격순정렬</button>
    <button @click="priceSortReverse">가격역순정렬</button>
    <button @click="abcSort">가나다순정렬</button>
    <button @click="sortBack">되돌리기</button>

    <Card
      @openModal="
        모달창열렸니 = true;
        누른거 = $event;
      "
      :원룸="원룸"
      v-for="(원룸, i) in 원룸들"
      :key="i"
    />
  </div>
</template>

////////////////////////////// script //////////////////////////////////
<script>
import data from "./assets/oneroom.js";
import Discount from "./Discount.vue";
import Modal from "./Modal.vue";
import Card from "./Card.vue";

export default {
  name: "App",
  data() {
    return {
      showDiscount: true,
      누른거: 0,
      원룸들오리지널: [...data],
      원룸들: [...data],
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
    sortBack() {
      this.원룸들 = [...this.원룸들오리지널];
    },
    priceSort() {
      this.원룸들.sort(function (a, b) {
        return a.price - b.price;
      });
    },
    priceSortReverse() {
      this.원룸들.sort(function (a, b) {
        return b.price - a.price;
      });
    },
    abcSort() {
      this.원룸들.sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
    },
  },

  components: {
    Discount,
    Modal,
    Card,
  },
};
</script>

////////////////////////////// style //////////////////////////////////
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.room-img {
  width: 100%;
  margin-top: 40px;
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

.discount {
  background: #eee;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

.start {
  opacity: 0;
  transition: all 1s;
}

.end {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}
</style>
