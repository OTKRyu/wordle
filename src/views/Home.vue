<template>
  <div id="home">
    <div class="title-row">
      <div class="title-box" style="background-color: yellow">W</div>
      <div class="title-box" style="background-color: grey">O</div>
      <div class="title-box" style="background-color: green">R</div>
      <div class="title-box" style="background-color: yellow">D</div>
      <div class="title-box" style="background-color: yellow">L</div>
      <div class="title-box" style="background-color: grey">E</div>
    </div>
    <div style="margin-top: 100px">
      <button @click="goTutorial" class="btn btn-primary mb-3">시작하기</button>
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="5글자 단어를 입력해주세요"
        aria-label="wordle input"
        v-model="newWordle"
      />
      <button
        class="btn btn-primary"
        type="button"
        id="button-addon2"
        @click="createWordle"
      >
        생성
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { hash, checkWord } from "../commons/utils";

export default {
  name: "Home",
  data() {
    return {
      key: "",
      matched: false,
      newWordle: "",
    };
  },
  methods: {
    insertWaiting() {
      const waiting = document.querySelector("h2");
      if (waiting === null) {
        let template;
        template = "<h2>matching progressing...</h2>";
        document
          .querySelector("#home")
          .insertAdjacentHTML("beforeend", template);
      }
    },
    goTutorial() {
      this.$router.push({ name: "Wordle" });
    },
    async createWordle() {
      console.log(this.newWordle);
      if (this.newWordle.length !== 5) {
        alert("워들은 5글자 영어 단어만 등록 가능합니다.");
        this.newWordle = "";
      }
      checkWord(this.newWordle)
        .then(() => {
          const key = hash(this.newWordle);
          console.log(key);
        })
        .catch((err) => {
          alert("존재하는 단어가 아닙니다");
          console.log(err);
          this.newWordle = "";
        });
    },
  },
};
</script>
<style scoped>
.title-row {
  display: flex;
}

.title-box {
  border: 2px solid gray;
  border-radius: 3px;
  margin: 2px;
  font-size: 2.5rem;
  font-weight: 700;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
</style>
