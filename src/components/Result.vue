<template>
  <div :class="modalClassList">
    <div class="modal_body">
      <div class="modal_header">
        <button class="btn btn-outline-danger" @click="closeModal">X</button>
      </div>
      <h1 class="mb-3">Modal</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">항목</th>
            <th scope="col">값</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">플레이시간</th>
            <td>{{ playTime }}</td>
          </tr>
          <tr>
            <th scope="row">현재까지 승리한 횟수</th>
            <td>{{ winCount }}</td>
          </tr>
          <tr>
            <th scope="row">현재까지의 워들 승률</th>
            <td>{{ winRate }}</td>
          </tr>
          <tr>
            <th scope="row">현재까지의 평균 시도 횟수</th>
            <td>{{ averageTrial }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn-primary btn" @click="goHome">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      isClose: false,
    };
  },
  computed: {
    playTime() {
      const wordleData = this.$store.getters.getWordles[this.$route.params.key];
      const time =
        (Date.parse(wordleData.end) - Date.parse(wordleData.start)) / 1000;
      return `${time}초`;
    },
    winCount() {
      return this.$store.getters.getTotalWinCount;
    },
    winRate() {
      const winRate =
        (this.$store.getters.getTotalWinCount /
          this.$store.getters.getTotalWordleCount) *
        100;
      return `${winRate.toFixed(3)}%`;
    },
    averageTrial() {
      const averageTrial =
        this.$store.getters.getTotalTrial /
        this.$store.getters.getTotalWordleCount;
      return averageTrial.toFixed(3);
    },
    modalClassList() {
      if (this.isClose) {
        return "modal_close";
      } else {
        return "modal_open";
      }
    },
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
    closeModal() {
      this.isClose = true;
    },
  },
};
</script>

<style scoped>
.modal_open {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal_close {
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

.modal_header {
  display: flex;
  justify-content: flex-end;
}
</style>
