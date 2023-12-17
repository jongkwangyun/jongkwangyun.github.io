<template>
  <div class="discount">
    <h4>지금 결제하면 {{ dcNum }} % 할인</h4>
  </div>
</template>

<script>
export default {
  name: "Discount",

  data() {
    return {
      dcNum: 30,
    };
  },

  mounted() {
    const discountDown = setInterval(() => {
      if (this.dcNum == 0) {
        clearInterval(discountDown);
        return;
      }
      this.dcNum--;
    }, 1000);
    discountDown();
  },
};
</script>

<style></style>
