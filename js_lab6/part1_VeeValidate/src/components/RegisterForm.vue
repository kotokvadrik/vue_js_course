<template>
  <div class="register-container">
    <form @submit.prevent="handleSubmit">

      <div class="field">
        <label for="email">Email</label>
        <input
            id="email"
            type="email"
            v-model="email"
            :class="{
            'valid': isEmailValid && email !== '',
            'invalid': isEmailInvalid && email !== ''
          }"
            placeholder="ivan@example.com"
        />
        <span class="error-message">{{ emailError }}</span>
      </div>

      <div class="field">
        <label for="password">Пароль</label>
        <input
            id="password"
            type="password"
            v-model="password"
            :class="{
            'valid': isPasswordValid && password !== '',
            'invalid': isPasswordInvalid && password !== ''
          }"
            placeholder="Введите пароль"
        />
        <span class="error-message">{{ passwordError }}</span>
      </div>

      <div class="criteria-list">
        <div
            v-for="criterion in criteria"
            :key="criterion.name"
            :style="{ color: criterion.valid ? '#2e7d32' : '#d32f2f' }"
        >
          {{ criterion.text }}
        </div>
      </div>

      <div class="field checkbox">
        <label>
          <input type="checkbox" v-model="agreed" />
          I agree with license agreement
        </label>
      </div>

      <button type="submit" :disabled="!isFormValid">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup
      .string()
      .required('Введите email')
      .email('Введите корректный email'),

  password: yup
      .string()
      .required('Введите пароль')
      .min(8, 'Минимум 8 символов')
      .matches(/[0-9]/, 'Должна быть хотя бы одна цифра')
      .matches(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
      .matches(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Должен быть хотя бы один спецсимвол'),

  agreed: yup
      .boolean()
      .oneOf([true], 'Необходимо принять соглашение')
})

const { handleSubmit: submitForm } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    agreed: false
  }
})

const {
  value: email,
  errorMessage: emailError
} = useField('email', undefined, {
  validateOnValueUpdate: true
})

const {
  value: password,
  errorMessage: passwordError
} = useField('password', undefined, {
  validateOnValueUpdate: true
})

const {
  value: agreed
} = useField('agreed', undefined, {
  validateOnValueUpdate: true
})

const isEmailValid = computed(() => {
  return email.value !== '' && !emailError.value
})

const isEmailInvalid = computed(() => {
  return email.value !== '' && !!emailError.value
})

const isPasswordValid = computed(() => {
  return password.value !== '' && !passwordError.value
})

const isPasswordInvalid = computed(() => {
  return password.value !== '' && !!passwordError.value
})

const criteria = computed(() => [
  {
    name: 'minLen',
    text: '➜ Длина не менее 8',
    valid: password.value.length >= 8
  },
  {
    name: 'digit',
    text: '➜ Цифры',
    valid: /[0-9]/.test(password.value)
  },
  {
    name: 'lowercase',
    text: '➜ Буквы нижнего регистра',
    valid: /[a-z]/.test(password.value)
  },
  {
    name: 'uppercase',
    text: '➜ Буквы верхнего регистра',
    valid: /[A-Z]/.test(password.value)
  },
  {
    name: 'special',
    text: '➜ Спецсимволы',
    valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password.value)
  }
])

const isFormValid = computed(() => {
  return isEmailValid.value &&
      isPasswordValid.value &&
      agreed.value === true
})

const handleSubmit = submitForm((values) => {
  alert(`Регистрация успешна!\nEmail: ${values.email}\nПароль: ${values.password}`)
})
</script>

<style scoped>
.register-container {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: 0.2s;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input.valid {
  border-color: #2e7d32;
  background-color: #f1f9f0;
}

input.invalid {
  border-color: #d32f2f;
  background-color: #ffebee;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #d32f2f;
}

.criteria-list {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.checkbox {
  display: flex;
  align-items: center;
}
.checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.checkbox input {
  width: auto;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #2c6b4f;
  transform: scale(1.01);
}
</style>