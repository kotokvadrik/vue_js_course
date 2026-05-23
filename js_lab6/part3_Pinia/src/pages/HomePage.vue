<template>
  <div>
    <h2>Список задач</h2>
    <div v-if="tasks.length === 0">Нет задач. Добавьте первую!</div>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <input
          type="checkbox"
          :checked="task.completed"
          @change="store.toggleComplete(task.id)"
      />
      <span :class="{ completed: task.completed }">{{ task.title }}</span>
      <div class="task-actions">
        <router-link :to="`/task/${task.id}`">🔍 Подробно</router-link>
        <router-link :to="`/task/${task.id}/complete`">Завершить</router-link>
        <router-link :to="`/task/${task.id}/delete`">Удалить</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { tasks } = storeToRefs(store)
</script>

<style scoped>
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