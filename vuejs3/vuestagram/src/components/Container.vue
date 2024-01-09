<template>
  <div>
    <div v-if="step == 0">
      <Post :post="post" v-for="(post, i) in instaData" :key="i" />
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div
        class="upload-image"
        :class="filter"
        :style="`background-image:url(${imgUrl})`"
      ></div>
      <div class="filters">
        <FilterBox
          v-for="(필터, i) in 필터들"
          :key="i"
          :imgUrl="imgUrl"
          :필터="필터"
          >{{ 필터 }}
        </FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div
        class="upload-image"
        :class="filter"
        :style="`background-image:url(${imgUrl})`"
      ></div>
      <div class="write">
        <textarea
          class="write-box"
          @input="$emit('update:content', $event.target.value)"
        ></textarea>
      </div>
    </div>

    <!-- mypage -->
    <div v-if="step == 3"><MyPage /></div>
  </div>
</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import MyPage from "./MyPage.vue";

export default {
  data() {
    return {
      filter: "",
      필터들: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
    };
  },
  components: {
    Post,
    FilterBox,
    MyPage,
  },
  props: {
    instaData: Array,
    step: Number,
    imgUrl: String,
  },
  mounted() {
    this.emitter.on("filtered", (e) => {
      this.filter = e;
    });
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
