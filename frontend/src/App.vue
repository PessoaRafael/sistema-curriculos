<template>
  <div id="app">
    <CurriculoForm />
  </div>
</template>

<script>
import CurriculoForm from './components/CurriculoForm.vue'

export default {
  name: 'App',
  components: {
    CurriculoForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>