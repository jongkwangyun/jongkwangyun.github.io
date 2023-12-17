<template>
  <div class="black-bg" v-if="모달창열렸니">
    <div class="white-bg">
      <img :src="원룸들[누른거].image" style="width: 100%" />
      <h4>{{ 원룸들[누른거].title }}</h4>
      <p>{{ 원룸들[누른거].content }}</p>
      <input v-model="month" />
      <p>{{ month }}개월 선택함 : {{ 원룸들[누른거].price * month }} 원</p>
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",

  data() {
    return {
      month: 1,
    };
  },

  watch: {
    month(a) {
      const isNotNum = new RegExp(/\D/).test(a);
      if (isNotNum || a < 1 || a > 12) {
        alert("숫자만 입력하라");
        this.month = 1;
      }
    },
  },

  beforeUpdate() {
    if (this.month == 2) {
      alert("2는 입력 마쇼");
      this.month = 3;
    }
  },

  props: {
    원룸들: Array,
    누른거: Number,
    모달창열렸니: Boolean,
  },
};
</script>

<style></style>
