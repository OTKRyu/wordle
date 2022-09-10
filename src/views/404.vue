<template>
  <div>
    <h1>404</h1>
    <p>단어를 찾을 수 없습니다.</p>
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
