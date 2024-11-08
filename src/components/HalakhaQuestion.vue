<template>
    <div class="question-component" :class="'m' + ($vuetify.locale.isRtl ? 'r' : 'l') + '-4'">
      <!-- Display Question -->
      <h2>{{ currentData.question }}</h2>
  
      <!-- Display Answers as clickable buttons/bubbles -->
      <div v-if="currentData.answers && Array.isArray(currentData.answers)" class="answer-options">
        <div
          v-for="(answer, index) in currentData.answers"
          :key="index"
          class="answer-bubble"
        >
          <template v-if="Array.isArray(answer.answer)">
            <v-btn
              v-for="(option, optionIndex) in answer.answer"
              :key="optionIndex"
              @click="selectAnswer(index)"
              class="bubble"
            >
              {{ option }}
            </v-btn>
          </template>
          <template v-else>
            <v-btn @click="selectAnswer(index)" class="bubble">{{ answer.answer }}</v-btn>
          </template>
        </div>
      </div>
  
      <!-- Display Indications as bullet points, if present -->
      <ul v-if="currentData.indications && Array.isArray(currentData.indications)" class="indications">
        <li v-for="(indication, index) in currentData.indications" :key="index">
          {{ indication }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  // Define the component props
  interface Answer {
    answer: string | string[];
    next?: any;
  }
  
  interface QuestionData {
    question: string;
    answers: Answer[];
    indications?: string[];
  }
  
  const props = defineProps<{ data: QuestionData }>();
  const emit = defineEmits<{ (e: 'select', index: number): void }>();
  
  // Manage current question data
  const currentData = props.data;
  
  // Function to handle answer selection
  function selectAnswer(index: number) {
    emit('select', index);
  }
  </script>
  
  <style scoped>
  .question-component {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .answer-options {
    display: flex;
    gap: 8px;
  }
  
  .bubble {
    border-radius: 20px;
    padding: 8px 16px;
  }
  
  .indications {
    list-style-type: disc;
    margin-left: 16px;
  }
  </style>
  