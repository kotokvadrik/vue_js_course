<template>
  <div>
    <h2>Добавление задачи</h2>
    <form @submit.prevent="add">
      <input type="text" v-model="title" placeholder="Название задачи" required />
      <textarea v-model="description" placeholder="Описание (необязательно)"></textarea>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'

const title = ref('')
const description = ref('')
const router = useRouter()
const store = useTodoStore()

const add = () => {
  if (!title.value.trim()) return
  store.addTask(title.value, description.value)
  router.push('/')
}
</script>

<style scoped>
input, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>