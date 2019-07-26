<template>
  <div class="page">
  <div class="header">
    <div class="header__close">
      <div class="header__x" v-on:click="exit"></div>
      Отмена
    </div>

    <div class="header__time">
      {{remainingTime}}
    </div>

  </div>

  <div class="operands">
    <div v-bind:key="index" v-for="(operand,index) in operands">
      <div v-if="index === 0 || isOperator(operand)">{{operand}}</div>
      <input v-if="index > 0 && !isOperator(operand)" v-on:click="setInputIndex($event)" v-bind:data-index="index" v-on:input="setOperand($event, index)" :value="operand"/>
    </div>
  </div>

  <div class="expression"> = {{evalExpression}}</div>
  <div class="calc">
    <div class="calc-row">
      <div v-bind:data-num="1" v-on:click="enterNumber($event)" class="calc-button">1</div>
      <div v-bind:data-num="2" v-on:click="enterNumber($event)" class="calc-button">2</div>
      <div v-bind:data-num="3" v-on:click="enterNumber($event)" class="calc-button">3</div>
      <div v-on:click="focusPrevInput" class="calc-button calc-button_last">&#60;</div>
    </div>

    <div class="calc-row">
      <div v-bind:data-num="4" v-on:click="enterNumber($event)" class="calc-button">4</div>
      <div v-bind:data-num="5" v-on:click="enterNumber($event)" class="calc-button">5</div>
      <div v-bind:data-num="6" v-on:click="enterNumber($event)" class="calc-button">6</div>
      <div v-on:click="focusNextInput" class="calc-button calc-button_last">&#62;</div>
    </div>

    <div class="calc-row">
      <div v-bind:data-num="7" v-on:click="enterNumber($event)" class="calc-button">7</div>
      <div v-bind:data-num="8" v-on:click="enterNumber($event)" class="calc-button">8</div>
      <div v-bind:data-num="9" v-on:click="enterNumber($event)" class="calc-button">9</div>
      <div class="calc-button calc-button_last">?</div>
    </div>

    <div class="calc-row">
      <div class="calc-button_empty"></div>
      <div v-bind:data-num="0" v-on:click="enterNumber($event)" class="calc-button">0</div>
      <div class="calc-button_empty"></div>
      <div class="calc-button calc-button_last" v-on:click="checkEqual">=</div>
      
      
    </div>
  </div>


  </div>
</template>

<script>
export default {
  name: "SecondPage",
  computed: {
    complexity: {
      get() {
        return this.$store.state.complexity;
      }
    },
    operands: {
      get() {
        return this.$store.state.operands;
      }
    },
    operators: {
      get() {
        return this.$store.state.operators;
      }
    },
    expression: {
      get() {
        const operands = this.$store.state.operands;
        const operators = this.$store.state.operators;

        const result = operators
          .reduce((a, e, i) => a.concat([operands[i], e]), [])
          .concat(operands[operands.length - 1]);

        return result;
      }
    },
    evalExpression: {
      get() {
        return this.$store.state.value;
      }
    },
    remainingTime: {
      get() {
        const time = this.$store.state.remainingTime;
        const min = (time / 60) ^ 0;
        const sec = time % 60;
        return `${min}:${sec}`;
      }
    }
  },
  methods: {
    enterNumber(e) {
      const focusedInput = this.getFocusedInput();
      const index = focusedInput.dataset.index;
      const operands = this.$store.state.operands;
      const num = e.target.dataset.num;
      operands[index] = operands[index] ? operands[index] + num : num;
      focusedInput.value =
        focusedInput === "0" ? num : focusedInput.value + num;
      this.$store.commit("setOperands", operands);
    },
    setInputIndex(e) {
      this.currentInput = +e.target.dataset.index;
    },
    getFocusedInput() {
      return document.querySelector(
        `.operands input[data-index="${this.currentInput}"`
      );
    },
    focusNextInput() {
      const focusedInput = this.getFocusedInput();
      const inputs = document.querySelectorAll(".operands input");
      const focusedIndex = [].indexOf.call(inputs, focusedInput);
      const nextInput = inputs[focusedIndex + 1];
      if (nextInput) {
        nextInput.focus();
        this.currentInput += 2;
      } else {
        const firstInput = inputs[0];
        firstInput.focus();
        this.currentInput = +firstInput.dataset.index;
      }
    },
    focusPrevInput() {
      const focusedInput = this.getFocusedInput();
      const inputs = document.querySelectorAll(".operands input");
      const focusedIndex = [].indexOf.call(inputs, focusedInput);
      const prevInput = inputs[focusedIndex - 1];
      if (prevInput) {
        prevInput.focus();
        this.currentInput -= 2;
      } else {
        const lastInput = inputs[inputs.length - 1];
        lastInput.focus();
        this.currentInput = +lastInput.dataset.index;
      }
    },
    setOperand(event, index) {
      const operands = this.$store.state.operands;
      operands[index] = +event.target.value;
      this.$store.commit("setOperands", operands);
    },
    isOperator(value) {
      return (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/" ||
        value === "**"
      );
    },
    checkEqual() {
      const operands = this.$store.state.operands;
      const operandsValue =
        operands && Array.isArray(operands) && eval(operands.join(""));
      const value = this.$store.state.value;
      this.$store.dispatch("prepareExample");

      if (value === operandsValue) {
        this.$store.commit("incCorrect");
      } else {
        this.$store.commit("incIncorrect");
      }
    },
    exit: function() {
      this.$router.push("/");
    }
  },
  data: function() {
    return {
      inputs: {
        currentInput: 0
      }
    };
  }
};
</script>


<style scoped>
.header {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  color: #c0c0c0;
}

.header__close {
  display: flex;
  align-items: center;
}

.header__x {
  cursor: pointer;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  position: relative;
}

.header__x:hover {
  opacity: 1;
}

.header__x:after,
.header__x:before {
  content: "";
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #333;
}

.header__x:before {
  transform: rotate(45deg);
}

.header__x:after {
  transform: rotate(-45deg);
}

.calc {
  display: flex;
  flex-direction: column;
}

.calc-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.calc-button {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #ff6f43;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 20px;
  box-shadow: 0px 9px 10px rgba(0, 0, 0, 0.5);
}

.calc-button:active {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
}

.calc-button_last {
  background-color: #7a7a7a;
}

.calc-button_empty {
  width: 50px;
  height: 50px;
}

.operands {
  display: flex;
  justify-content: space-between;
}

.operands input {
  width: 40px;
}

.expression {
  margin-bottom: 40px;
}
</style>
