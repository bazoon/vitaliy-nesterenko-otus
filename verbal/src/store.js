import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

const stats = JSON.parse(localStorage.getItem("stats"));
const today = new Date();
const day = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;
const dayCount = stats && Object.keys(stats).length;

const defaultState = {
  today: day,
  dayCount,
  remainingTime: 30,
  complexity: 2,
  hasSummation: true,
  hasSubtraction: true,
  hasMultiplication: false,
  hasDivision: false,
  hasPower: false,
  operands: [],
  operators: [],
  value: undefined,
  correct: (stats && stats[day] && stats[day].correct) || 0,
  incorrect: (stats && stats[day] && stats[day].incorrect) || 0
};

export default new Vuex.Store({
  state: {
    ...defaultState
  },
  mutations: {
    clearState: function(state) {
      Object.assign(state, defaultState);
    },
    setTime: function(state, time) {
      state.remainingTime = time;
    },
    setComplexity: function(state, complexity) {
      state.complexity = +complexity;
    },
    setSummation: function(state, hasSummation) {
      state.hasSummation = hasSummation;
    },
    setSubtraction: function(state, hasSubtraction) {
      state.hasSubtraction = hasSubtraction;
    },
    setMultiplication: function(state, hasMultiplication) {
      state.hasMultiplication = hasMultiplication;
    },
    setDivision: function(state, hasDivision) {
      state.hasDivision = hasDivision;
    },
    setPower: function(state, hasPower) {
      state.hasPower = hasPower;
    },
    setOperands: function(state, operands) {
      state.operands = operands;
    },
    clearInterval: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = undefined;
    },
    finish: function(state) {
      const { today, correct, incorrect } = state;

      const stats = {
        [today]: {
          correct,
          incorrect
        }
      };
      localStorage.setItem("stats", JSON.stringify(stats));
    },
    setValue: function(state, value) {
      state.value = value;
    },
    incCorrect: function(state) {
      state.correct += 1;
    },
    incIncorrect: function(state) {
      state.incorrect += 1;
    }
  },
  actions: {
    play: function(store) {
      this.dispatch("prepareExample");
      this.commit("setTime", store.state.remainingTime);
      this.dispatch("startCountdown");
    },
    stop: function() {
      router.push("/");
    },
    prepareExample: function(store) {
      const {
        complexity,
        hasSummation,
        hasSubtraction,
        hasMultiplication,
        hasDivision,
        hasPower
      } = store.state;

      const operators = [];
      if (hasSummation) {
        operators.push("+");
      }

      if (hasSubtraction) {
        operators.push("-");
      }

      if (hasMultiplication) {
        operators.push("*");
      }

      if (hasDivision) {
        operators.push("/");
      }

      if (hasPower) {
        operators.push("**");
      }

      const operands = [];
      for (let i = 0; i < complexity; i++) {
        operands.push(randomInteger(5 * complexity, 10 * complexity));
        operands.push(operators[randomInteger(0, operators.length - 1)]);
      }
      operands.push(randomInteger(5 * complexity, 10 * complexity));

      store.commit("setValue", eval(operands.join("")));

      for (let i = 2; i < operands.length; i += 2) {
        operands[i] = 0;
      }

      store.commit("setOperands", operands);
    },
    startCountdown: function(store) {
      this.commit("clearInterval");
      this.intervalId = setInterval(() => {
        if (store.state.remainingTime === 0) {
          this.commit("clearInterval");
          this.commit("finish");
          this.dispatch("stop");
          return;
        }
        store.commit("setTime", store.state.remainingTime - 1);
      }, 1000);
    }
  }
});

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
