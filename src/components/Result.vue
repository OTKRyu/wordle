<template>
  <div class="modal">
    <div class="modal_body">
      <h1>Modal</h1>
      <p>플레이시간 : {{ playTime }}</p>
      <hr />
      <p>현재까지 승리한 횟수: {{ winCount }}</p>
      <hr />
      <p>현재까지의 워들 승률: {{ winRate }}</p>
      <hr />
      <p>현재까지의 평균 시도 횟수: {{ averageTrial }}</p>
      <br />
      <button class="btn-primary btn" @click="goHome">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      playTime: 1,
      winCount: 1,
      winRate: 100,
      averageTrial: 5,
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal_body {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30rem;
  height: 30rem;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
}
</style>
