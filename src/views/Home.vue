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
      <button @click="goStart" class="btn btn-primary mb-3">시작하기</button>
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="5글자 단어를 입력해주세요"
        aria-label="wordle input"
        v-model="newWord"
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
    <div>
      <ul>
        <li v-for="(value, key) in wordles" :key="key" class="m-3">
          <button :id="key" @click="goWordle" class="btn btn-primary">
            {{ key }}
          </button>
        </li>
      </ul>
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
      newWord: "",
    };
  },
  computed: {
    wordles() {
      return this.$store.getters.getWordles;
    },
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
    goStart() {
      this.$router.push("/Wordle/113318802");
    },
    createWordle() {
      if (this.newWord.length !== 5) {
        alert("워들은 5글자 영어 단어만 등록 가능합니다.");
        this.newWord = "";
      }
      checkWord(this.newWord)
        .then(() => {
          this.patchNewWordle();
        })
        .catch((err) => {
          alert("존재하는 단어가 아닙니다");
          console.log(err);
          this.newWord = "";
        });
    },
    patchNewWordle() {
      const key = hash(this.newWord);
      if (!this.$store.getters.getWordles[key]) {
        const newState = {
          word: this.newWord,
          trials: [],
          start: null,
          end: null,
        };
        const newWordles = {
          ...this.$store.getters.getWordles,
          [key]: newState,
        };
        this.$store.dispatch("patchWordles", newWordles);
        alert("생성되었습니다!");
        this.newWord = "";
      } else {
        alert("이미 있는 단어입니다.");
        this.newWord = "";
      }
    },
    goWordle(event) {
      console.log(event.target.id);
      this.$router.push(`/wordle/${event.target.id}`);
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
