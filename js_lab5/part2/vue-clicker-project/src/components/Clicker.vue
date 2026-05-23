<template>
  <div class="clicker-card">
    <div class="score">{{ score }}</div>
    <button class="click-btn" @click="handleClick">
      <slot>+{{ amount }}</slot>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  amount: {
    type: Number,
    default: 1
  }
});


const emit = defineEmits(['button-clicked']);

const score = ref(0);

const handleClick = () => {
  score.value += props.amount;
  emit('button-clicked');
};
</script>

<style scoped>
.clicker-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: 0.1s;
}
.score {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}
.click-btn {
  background: #42b983;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 6px 12px;
  border-radius: 30px;
  cursor: pointer;
  width: 100%;
}
.click-btn:hover {
  background: #2c6b4f;
}
</style>