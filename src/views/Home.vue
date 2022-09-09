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
      />
      <button class="btn btn-primary" type="button" id="button-addon2">
        생성
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      key: "",
      matched: false,
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
