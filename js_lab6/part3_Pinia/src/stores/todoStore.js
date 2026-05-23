import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    // State
    const tasks = ref([])

    const init = () => {
        const stored = localStorage.getItem('tasks')
        tasks.value = stored ? JSON.parse(stored) : []
    }


    const saveToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    const addTask = (title, description) => {
        const newId = tasks.value.length > 0
            ? Math.max(...tasks.value.map(t => t.id)) + 1
            : 1
        tasks.value.push({
            id: newId,
            title,
            description: description || '',
            completed: false
        })
        saveToLocalStorage()
    }

    const deleteTask = (id) => {
        tasks.value = tasks.value.filter(task => task.id !== id)
        saveToLocalStorage()
    }

    const toggleComplete = (id) => {
        const task = tasks.value.find(t => t.id === id)
        if (task) {
            task.completed = !task.completed
            saveToLocalStorage()
        }
    }

    const getTaskById = (id) => {
        return tasks.value.find(task => task.id === id)
    }

    init()

    return {
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
        getTaskById
    }
})