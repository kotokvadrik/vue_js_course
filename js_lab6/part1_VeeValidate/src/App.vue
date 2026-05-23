<template>
  <div class="app">
    <h1>📝 Регистрация</h1>
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterForm from './components/RegisterForm.vue'
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #e9ecef;
  font-family: 'Segoe UI', Roboto, sans-serif;
}
.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}
h1 {
  text-align: center;
  color: #2c3e50;
}
</style>