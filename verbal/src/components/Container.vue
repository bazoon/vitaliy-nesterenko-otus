<template>
  <div class="container">
    <div class="wrap"> 
      <first-page></first-page>
    </div>
  </div>
</template>

<script>
import FirstPage from "./FirstPage";

export default {
  name: "Container",
  components: {
    FirstPage
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: #ccc;
  min-height: 100vh;
  width: 100%;
}

.wrap {
  min-height: 100vh;
  padding: 40px;
  background-color: #ffffff;
  max-width: 400px;
  width: 400px;
  margin: 0 auto;
}
</style>
