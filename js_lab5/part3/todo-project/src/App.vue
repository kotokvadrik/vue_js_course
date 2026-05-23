<template>
  <div class="container">
    <h1>Todo List</h1>

    <div class="new-task">
      <input
        v-model="newTask"
        placeholder="Новая задача"
        @keyup.enter="addTask"
      >
      <button @click="addTask">Добавить</button>
    </div>

    <p v-if="tasks.length === 0" class="empty">
      Список задач пуст
    </p>

    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <label class="task-content">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task)"
          >
          <span :class="{ done: task.completed }">
            {{ task.title }}
          </span>
        </label>

        <button class="delete-button" @click="openDelete(task)">
          Удалить
        </button>
      </li>
    </ul>

    <Popup :is-open="showPopup">
      <h2>Удалить задачу?</h2>
      <p v-if="taskToDelete">
        «{{ taskToDelete.title }}»
      </p>

      <div class="popup-actions">
        <button class="confirm-button" @click="deleteTask">
          Да, удалить
        </button>
        <button @click="closePopup">
          Отмена
        </button>
      </div>
    </Popup>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Popup from './components/Popup.vue'

const API = 'https://jsonplaceholder.typicode.com/todos'

const tasks = ref([])
const newTask = ref('')
const showPopup = ref(false)
const taskToDelete = ref(null)

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')

  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

async function addTask() {
  const title = newTask.value.trim()

  if (!title) return

  try {
    const response = await fetch(API, {
      method: 'POST',
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    tasks.value.push({
      id: Date.now(),
      apiId: data.id,
      title,
      completed: false
    })

    newTask.value = ''
    saveTasks()
  } catch (error) {
    alert(`Не удалось добавить задачу: ${error.message}`)
  }
}

async function toggleTask(task) {
  try {
    const response = await fetch(`${API}/${task.apiId ?? task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !task.completed
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    task.completed = !task.completed
    saveTasks()
  } catch (error) {
    alert(`Не удалось изменить задачу: ${error.message}`)
  }
}

function openDelete(task) {
  taskToDelete.value = task
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
  taskToDelete.value = null
}

async function deleteTask() {
  if (!taskToDelete.value) return

  try {
    const task = taskToDelete.value

    const response = await fetch(`${API}/${task.apiId ?? task.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    tasks.value = tasks.value.filter(currentTask => currentTask.id !== task.id)
    saveTasks()
    closePopup()
  } catch (error) {
    alert(`Не удалось удалить задачу: ${error.message}`)
  }
}
</script>

<style scoped>
.container {
  max-width: 680px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 24px;
}

.new-task {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.new-task input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.new-task button,
.confirm-button {
  background: #2676d9;
  color: white;
}

ul {
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.done {
  color: #777777;
  text-decoration: line-through;
}

.delete-button {
  background: #d64545;
  color: white;
}

.empty {
  color: #777777;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>