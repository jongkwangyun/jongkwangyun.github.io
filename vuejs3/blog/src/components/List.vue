<template>
  <div>
    <div v-for="b in blog" :key="b.number">
      <h5 @click="$router.push(`/detail/${b.number}`)">
        {{ b.title }}
        <!-- <router-link :to="`/detail/${b.number}`">{{ b.title }}</router-link> -->
      </h5>
      <p>{{ b.content }}</p>
      <p>{{ b.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    blog: Array,
  },
};
</script>

<style></style>
