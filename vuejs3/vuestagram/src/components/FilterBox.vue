<template>
  <div
    @click="fire"
    :class="`${필터} filter-item`"
    :style="`background-image: url(${imgUrl})`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "filterbox",
  methods: {
    fire() {
      this.emitter.emit("filtered", this.필터);
    },
  },
  props: {
    imgUrl: String,
    필터: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
