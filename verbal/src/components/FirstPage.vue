<template>
  <div class="page">
    <h1>Привет</h1>
    <div>
      Добро пожаловать!
      <div class="options">
          <div class="option">
            <input type="range" min="1" max="15" v-model="time" class="slider"/>
            <div>
              Длительность {{time}} мин.
            </div>
          </div>
          <div class="option">
            <input type="range" min="1" max="15" v-model="complexity" class="slider"/>
            <div>
              Сложность {{complexity}}
            </div>
          </div>

          <div class="operations">
            <div class="operation">
              <input type="checkbox" v-model="hasSummation"> Суммирование 
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasDivision"> Вычитание
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasMultiplication"> Умножение
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasSubtraction"> Вычитание
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasDivision"> Деление
            </div>
            <div class="operation">
              <input type="checkbox" v-model="hasPower"> Возведение в степень
            </div>
          </div>

          <div class="footer">
            <button>Play</button>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstPage",
  data: function() {
    return {
      time: 0,
      complexity: 0,
      hasSummation: false,
      hasSubtraction: false,
      hasMultiplication: false,
      hasDivision: false,
      hasPower: false
    };
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
