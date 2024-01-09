<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" v-model="keyword" />
    <div class="post-header" v-for="f in filteredFollowers" :key="f.id">
      <div class="profile" :style="`background-image: url(${f.image})`"></div>
      <span class="profile-name">{{ f.name }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import axios from "axios";

export default {
  name: "mypage",
  setup() {
    let follower = ref([]);
    let keyword = ref("");

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
      });
    });

    const filteredFollowers = computed(() => {
      const toLowerKeyword = keyword.value.toLowerCase();
      return follower.value.filter((e) =>
        e.name.toLowerCase().includes(toLowerKeyword)
      );
    });

    return { follower, keyword, filteredFollowers };
  },
  data() {
    return {};
  },
};
</script>

<style></style>
