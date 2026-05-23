<template>
  <div class="app-container">
    <h1> 100 независимых кликеров</h1>
    <div class="clickers-grid">
      <Clicker
          v-for="i in 100"
          :key="i"
          :amount="(i % 3) + 1"
          @button-clicked="showAlert(i)"
      >
        <span style="display: flex; align-items: center; gap: 6px;">
          🖱️ +{{ (i % 3) + 1 }}
        </span>
      </Clicker>
    </div>
  </div>
</template>

<script setup>
import Clicker from './components/Clicker.vue';

const showAlert = (index) => {
  alert(`Clicker ${index} clicked!`);
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #eef2f3;
  font-family: 'Segoe UI', Roboto, sans-serif;
}
.app-container {
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 20px;
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
.clickers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
</style>
