<template>
  <div class="page">
    <h1>Привет</h1>
    <div>
      Добро пожаловать на {{dayCount}} тренировочный день.
      Ваш последний результат:
      решено {{correct}} из {{total}}. Точность {{accuracy}} %.
      <div class="options">
          <div class="option">
            <input type="range" min="1" max="15" v-model="time" class="slider"/>
            <div>
              Длительность {{time}} мин.
            </div>
          </div>
          <div class="option">
            <input type="range" min="1" max="3" v-model="complexity" class="slider"/>
            <div>
              Сложность {{complexity}}
            </div>
          </div>

          <div class="operations">
            <div class="operation">
              <input type="checkbox" v-model="hasSummation"> Суммирование 
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasSubtraction"> Вычитание
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasMultiplication"> Умножение
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasDivision"> Деление
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasPower"> Возведение в степень
            </div>
          </div>

          <div class="footer">
            <button v-on:click="play">Play</button>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstPage",
  methods: {
    play: function() {
      this.$router.push("play");
      this.$store.dispatch("play");
    }
  },
  computed: {
    correct: {
      get() {
        return this.$store.state.correct;
      }
    },
    total: {
      get() {
        return this.$store.state.correct + this.$store.state.incorrect;
      }
    },
    accuracy: {
      get() {
        const result = Math.round(
          100 * (this.$store.state.correct / this.total)
        );

        return Number.isNaN(result) ? 0 : result;
      }
    },
    dayCount: {
      get() {
        return this.$store.state.dayCount;
      }
    },
    time: {
      get() {
        return Math.round(this.$store.state.remainingTime / 60);
      },
      set(value) {
        this.$store.commit("setTime", value * 60);
      }
    },
    complexity: {
      get() {
        return this.$store.state.complexity;
      },
      set(value) {
        this.$store.commit("setComplexity", value);
      }
    },
    hasSummation: {
      get() {
        return this.$store.state.hasSummation;
      },
      set(value) {
        this.$store.commit("setSummation", value);
      }
    },
    hasSubtraction: {
      get() {
        return this.$store.state.hasSubtraction;
      },
      set(value) {
        this.$store.commit("setSubtraction", value);
      }
    },
    hasMultiplication: {
      get() {
        return this.$store.state.hasMultiplication;
      },
      set(value) {
        this.$store.commit("setMultiplication", value);
      }
    },
    hasDivision: {
      get() {
        return this.$store.state.hasDivision;
      },
      set(value) {
        this.$store.commit("setDivision", value);
      }
    },
    hasPower: {
      get() {
        return this.$store.state.hasPower;
      },
      set(value) {
        this.$store.commit("setPower", value);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.option {
  margin-bottom: 20px;
}
.operation {
  margin-bottom: 10px;
}

.opeation:last-child {
  margin-bottom: 0;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.slider {
  width: 400px;
}

.options {
  margin-top: 40px;
}
</style>
