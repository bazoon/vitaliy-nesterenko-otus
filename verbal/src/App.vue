<template>
  <div id="app">
    <Container></Container>
  </div>
</template>

<script>
import Container from "./components/Container";

export default {
  name: "app",
  components: {
    Container
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
