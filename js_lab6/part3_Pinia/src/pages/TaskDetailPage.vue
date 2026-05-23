<template>
  <div>
    <h2>Детали задачи</h2>
    <div v-if="task">
      <h3>{{ task.title }}</h3>
      <p><strong>Описание:</strong> {{ task.description || 'Нет описания' }}</p>
      <p><strong>Статус:</strong> {{ task.completed ? 'Выполнена' : 'Не выполнена' }}</p>
      <p><strong>ID:</strong> {{ task.id }}</p>
      <div>
        <button @click="handleComplete">Изменить статус</button>
        <button class="danger" @click="handleDelete">Удалить задачу</button>
        <router-link to="/">Назад к списку</router-link>
      </div>
    </div>
    <div v-else>
      <p>Задача не найдена.</p>
      <router-link to="/">На главную</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'

const route = useRoute()
const router = useRouter()
const store = useTodoStore()
const task = ref(null)

const loadTask = () => {
  const id = parseInt(route.params.id)
  task.value = store.getTaskById(id) || null
}

const handleDelete = () => {
  if (!task.value) return
  store.deleteTask(task.value.id)
  alert('Task deleted')
  router.push('/')
}

const handleComplete = () => {
  if (!task.value) return
  store.toggleComplete(task.value.id)
  alert('Task status has been changed')
}

onMounted(() => {
  loadTask()
  const path = route.path
  if (path.includes('/delete')) {
    if (task.value) handleDelete()
    else alert('Task not found')
  } else if (path.includes('/complete')) {
    if (task.value) handleComplete()
    else alert('Task not found')
  }
})
</script>

<style scoped>
button.danger {
  background: #e74c3c;
  margin-left: 10px;
}
button {
  background: #42b983;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>