<template>
  <div>
    <h1>404</h1>
    <p>찾으시는 주소는 없는 주소입니다.</p>
    <button class="btn btn-primary" @click="goHome">돌아가기</button>
  </div>
</template>

<script>
export default {
  name: "error_404",
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
