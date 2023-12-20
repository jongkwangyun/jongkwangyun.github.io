<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ blog[$route.params.id].title }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">
        {{ blog[$route.params.id].date }}
      </h6>
      <p class="card-text">{{ blog[$route.params.id].content }}</p>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "detail",
  props: {
    blog: Array,
  },
};
</script>

<style></style>
