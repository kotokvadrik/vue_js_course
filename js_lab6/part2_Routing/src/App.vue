<template>
  <div id="app">
    <nav>
      <router-link to="/"> Список задач</router-link> |
      <router-link to="/add"> Добавить задачу</router-link> |
      <router-link to="/about"> О нас</router-link>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 20px;
}
#app {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  color: #42b983;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: bold;
}
hr {
  margin-bottom: 20px;
}
button {
  background: #42b983;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
button.danger {
  background: #e74c3c;
}
input, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
.task-actions a {
  margin-left: 10px;
  font-size: 0.9rem;
}
</style>