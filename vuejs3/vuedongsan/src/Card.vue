<template>
  <div>
    <img :src="원룸.image" alt="" class="room-img" />
    <h4 @click="sendOpenModalAndId">{{ 원룸.title }}</h4>
    <p>{{ 원룸.price }} 원</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    원룸: Object,
  },
  methods: {
    sendOpenModalAndId() {
      this.$emit("openModal", this.원룸.id);
    },
  },
};
</script>

<style></style>
