<template>
  <div>
    <Result v-if="this.isEnd"></Result>
    <div class="title-row">
      <div class="title-box" style="background-color: grey">W</div>
      <div class="title-box" style="background-color: green">O</div>
      <div class="title-box" style="background-color: grey">R</div>
      <div class="title-box" style="background-color: yellow">D</div>
      <div class="title-box" style="background-color: green">L</div>
      <div class="title-box" style="background-color: grey">E</div>
    </div>
    <div id="game-board">
      <div class="letter-row">
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
      </div>
      <div class="letter-row">
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
      </div>
      <div class="letter-row">
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
      </div>
      <div class="letter-row">
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
      </div>
      <div class="letter-row">
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
      </div>
      <div class="letter-row">
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
        <div class="letter-box"></div>
      </div>
    </div>
    <div id="keyboard-cont" style="margin-top: 30px">
      <div class="first-row">
        <button class="keyboard-button" @click="onClick">q</button>
        <button class="keyboard-button" @click="onClick">w</button>
        <button class="keyboard-button" @click="onClick">e</button>
        <button class="keyboard-button" @click="onClick">r</button>
        <button class="keyboard-button" @click="onClick">t</button>
        <button class="keyboard-button" @click="onClick">y</button>
        <button class="keyboard-button" @click="onClick">u</button>
        <button class="keyboard-button" @click="onClick">i</button>
        <button class="keyboard-button" @click="onClick">o</button>
        <button class="keyboard-button" @click="onClick">p</button>
      </div>
      <div class="second-row">
        <button class="keyboard-button" @click="onClick">a</button>
        <button class="keyboard-button" @click="onClick">s</button>
        <button class="keyboard-button" @click="onClick">d</button>
        <button class="keyboard-button" @click="onClick">f</button>
        <button class="keyboard-button" @click="onClick">g</button>
        <button class="keyboard-button" @click="onClick">h</button>
        <button class="keyboard-button" @click="onClick">j</button>
        <button class="keyboard-button" @click="onClick">k</button>
        <button class="keyboard-button" @click="onClick">l</button>
      </div>
      <div class="third-row">
        <button class="keyboard-button" @click="onClick">Del</button>
        <button class="keyboard-button" @click="onClick">z</button>
        <button class="keyboard-button" @click="onClick">x</button>
        <button class="keyboard-button" @click="onClick">c</button>
        <button class="keyboard-button" @click="onClick">v</button>
        <button class="keyboard-button" @click="onClick">b</button>
        <button class="keyboard-button" @click="onClick">n</button>
        <button class="keyboard-button" @click="onClick">m</button>
        <button class="keyboard-button" @click="onClick">Enter</button>
      </div>
    </div>
  </div>
</template>

<script>
import Result from "../components/Result.vue";
import { checkWord } from "../commons/utils";
// @ is an alias to /src
export default {
  name: "Wordle",
  components: {
    Result,
  },
  data() {
    return {
      answerCount: {},
      currentGuess: [],
      inputLetterCount: 0,
      guessCount: 0,
      isEnd: false,
    };
  },
  computed: {
    wordles() {
      return this.$store.getters.getWordles;
    },
    answer() {
      const answer = this.wordles[this.$route.params.hash].word;
      return answer;
    },
  },
  methods: {
    insertLetter(pressedKey) {
      if (this.inputLetterCount === 5) {
        return;
      }
      pressedKey = pressedKey.toLowerCase();

      let row = document.getElementsByClassName("letter-row")[this.guessCount];
      if (row) {
        let box = row.children[this.inputLetterCount];
        box.textContent = pressedKey;
        box.classList.add("filled-box");
        this.currentGuess.push(pressedKey);
        this.inputLetterCount += 1;
      }
    },
    deleteLetter() {
      let row = document.getElementsByClassName("letter-row")[this.guessCount];
      let box = row.children[this.inputLetterCount - 1];
      box.textContent = "";
      box.classList.remove("filled-box");
      this.currentGuess.pop();
      this.inputLetterCount -= 1;
    },
    checkGuess(guess) {
      let guessString = "";

      if (guess) {
        guessString = guess;
      } else {
        for (const val of this.currentGuess) {
          guessString += val;
        }
      }

      if (guessString.length !== 5) {
        alert("5글자 단어만 제출할 수 있습니다.");
        return;
      }

      checkWord(guessString)
        .then(() => {
          this.paintColor(guessString);
        })
        .catch(() => {
          alert("단어를 차을 수 없습니다.");
          return;
        });
    },
    paintColor(guessString) {
      let row = document.getElementsByClassName("letter-row")[this.guessCount];
      let rightGuess = Array.from(this.answer);

      for (let i = 0; i < 5; i++) {
        let letterColor = "";
        let box = row.children[i];
        let letter = guessString[i];

        if (letter === rightGuess[i]) {
          letterColor = "green";
          this.answerCount[letter] -= 1;

          box.style.backgroundColor = letterColor;
          box.innerText = letter;
          this.shadeKeyBoard(letter, letterColor);
        }
      }

      for (let i = 0; i < 5; i++) {
        if (i < 5) {
          let letterColor = "";
          let box = row.children[i];
          let letter = guessString[i];

          if (guessString[i] !== rightGuess[i]) {
            let letterPosition = rightGuess.indexOf(letter);
            if (letterPosition !== -1 && this.answerCount[letter] > 0) {
              letterColor = "yellow";
              this.answerCount[letter] -= 1;
            } else {
              letterColor = "grey";
            }
            box.innerText = letter;
            box.style.backgroundColor = letterColor;
            this.shadeKeyBoard(letter, letterColor);
          }
        }
      }
      this.checkEnd(guessString);
      this.guessCount += 1;
      this.currentGuess = [];
      this.inputLetterCount = 0;
    },
    checkEnd(guessString) {
      this.resetanswerCount();
      this.updateState(guessString);
      if (guessString === this.answer) {
        alert("정답입니다!");
      } else if (this.guessCount === 5) {
        alert(`정답은 ${this.answer.toUpperCase()}였습니다.`);
      }
    },
    updateState(guessString) {
      const hash = this.$route.params.hash;
      const newState = {
        ...this.wordles[hash],
      };
      if (!newState.end) {
        newState.trials[this.guessCount] = guessString;
        if (guessString === this.answer) {
          newState.end = new Date();
          this.isEnd = true;
          this.$store.dispatch("patchTotalWordleCount");
          this.$store.dispatch("patchTotalWinCount");
          this.$store.dispatch("patchTotalTrial", this.guessCount + 1);
        } else if (this.guessCount === 5) {
          newState.end = new Date();
          this.isEnd = true;
          this.$store.dispatch("patchTotalWordleCount");
          this.$store.dispatch("patchTotalTrial", 6);
        } else if (this.guessCount === 0) {
          newState.start = new Date();
        }
        const newWordles = {
          ...this.wordles,
          [hash]: newState,
        };
        this.$store.dispatch("patchWordles", newWordles);
      } else {
        this.isEnd = true;
      }
    },
    shadeKeyBoard(letter, color) {
      for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
          let oldColor = elem.style.backgroundColor;
          if (oldColor === "green") {
            return;
          }
          if (oldColor === "yellow" && color !== "green") {
            return;
          }
          elem.style.backgroundColor = color;
          break;
        }
      }
    },
    onClick(e) {
      let pressedKey = String(e.target.textContent);
      this.error = false;
      this.errorMsg = "";
      if (pressedKey === "Del" && this.inputLetterCount !== 0) {
        this.deleteLetter();
        return;
      }

      if (pressedKey === "Enter") {
        this.checkGuess();
        return;
      }

      if (
        pressedKey.length === 1 &&
        pressedKey.charCodeAt(0) > 96 &&
        pressedKey.charCodeAt(0) < 123
      ) {
        this.insertLetter(pressedKey);
      } else {
        return;
      }
    },
    onKeyup(e) {
      this.error = false;
      this.errorMsg = "";
      let pressedKey = String(e.key);
      if (pressedKey === "Backspace" && this.inputLetterCount !== 0) {
        this.deleteLetter();
        return;
      }

      if (pressedKey === "Enter") {
        this.checkGuess();
        return;
      }

      if (
        pressedKey.length === 1 &&
        pressedKey.charCodeAt(0) > 96 &&
        pressedKey.charCodeAt(0) < 123
      ) {
        this.insertLetter(pressedKey);
      }
      if (
        pressedKey.length === 1 &&
        pressedKey.charCodeAt(0) > 64 &&
        pressedKey.charCodeAt(0) < 91
      ) {
        this.insertLetter(pressedKey);
      }
    },
    resetanswerCount() {
      this.answerCount = {};
      for (let i = 0; i < 5; i++) {
        if (this.answerCount[this.answer[i]]) {
          this.answerCount[this.answer[i]] += 1;
        } else {
          this.answerCount[this.answer[i]] = 1;
        }
      }
    },
  },
  mounted() {
    const answer = this.wordles[this.$route.params.hash].word;
    if (!answer) {
      this.$router.push({ name: "error_404" });
    }
    document.addEventListener("keyup", this.onKeyup);
    this.resetanswerCount();
    const trials = this.wordles[this.$route.params.hash].trials;
    for (let i = 0; i < trials.length; i++) {
      console.log(trials);
      this.checkGuess(trials[i]);
    }
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyup);
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.boxInput {
  width: 50px;
  height: 50px;
  font-size: 40px;
  text-align: center;
}

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

.turn-box {
  border: 2px solid gray;
  border-radius: 3px;
  margin: 2px;
  font-size: 2.5rem;
  font-weight: 700;
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}

#game-board {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.letter-box {
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

.filled-box {
  border: 2px solid black;
}

.letter-row {
  display: flex;
}

.title-row {
  display: flex;
  justify-content: center;
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

#keyboard-cont {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#keyboard-cont div {
  display: flex;
}

.second-row {
  margin: 0.5rem 0;
}

.keyboard-button {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  margin: 0 2px;
  border-radius: 15%;
  cursor: pointer;
  text-transform: uppercase;
}

.error-row {
  margin: 0.5rem 0;
  color: red;
}
</style>
