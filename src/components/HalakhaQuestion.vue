<template>
  <v-card class="question-component ms-4 px-xxl-12">
    <!-- Display Question -->
    <h2 class="question-title">{{ data.question }}</h2>

    <!-- Display Answers as clickable buttons/bubbles -->
    <!-- can be done differently - join the array to be string. remove the v-for... Ao the user anderstand both options are the same -->
    <div v-if="data.answers && Array.isArray(data.answers)" class="answer-options">
      <!-- class="answer-bubble" -->
      <div v-for="(answer, index) in data.answers" :key="index" class="answer-options">
        <template v-if="Array.isArray(answer.answer)">
          <v-btn v-for="(option, optionIndex) in answer.answer" :key="optionIndex" @click="selectAnswer(index)"
            size="large" class="bubble no-uppercase" varient="outlined" color="primary">
            {{ option }}
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="selectAnswer(index)"size="large" class="bubble no-uppercase" varient="outlined" color="primary">{{ answer.answer }}</v-btn>
        </template>
      </div>
    </div>

    <!-- Display Indications as bullet points, if present -->
    <!-- <ul v-if="data.indications && Array.isArray(data.indications)" class="indications">
      <li v-for="(indication, index) in data.indications" :key="index">
        {{ indication }}
      </li>
    </ul> -->

    <v-list v-if="data.indications && Array.isArray(data.indications)" class="indications">
      <v-list-item v-for="(indication, index) in data.indications" :key="index">
        <template v-slot:prepend>
          <v-icon icon="mdi-information-outline"></v-icon>
        </template>
        <v-list-item-content>{{ indication }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define the component props
// interface Answer {
//   answer: string | string[];
//   next?: any;
// }

interface QuestionData {
  answer: string | Array<string>;
  question: string;
  answers: QuestionData[];
  indications?: string[];
}

const props = defineProps<{ 
  data: { 
    type: QuestionData,
    required: true,
  } 
}>();

const emit = defineEmits<{ (e: 'select', index: number): void }>();

// // Manage current question data
// const currentData = props.data;

// Function to handle answer selection
const selectAnswer = (index: number) => {
  emit('select', index);
}
</script>

<style scoped>
.question-component {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 2vw;
}

.question-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

/* .answer-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  // gap: 2vw;
} */

.indications {
  /* list-style-type: disc;
  margin-left: 16px; */

  list-style-type: none;
  padding: 0;
  margin: 1rem 0 0 0;
  color: #666;
}

@media (max-width: 960px) {
  .question-component {
    width: 100%;
    margin-top: 1rem;
  }

  /* Allow answer options to take full width on small screens */
  .answer-options {
    display: block;
    max-height: 50vh; /* Limit height and allow scrolling */
    overflow-y: auto;
    padding-right: 1rem;
  }

  .bubble {
    display: block;
    width: 100%; /* Full width for better readability */
    margin-bottom: 0.5rem;
  }
}

.answer-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

:deep(.v-btn__content) {
  white-space: pre-wrap !important;
}
</style>
<style>
/* .bubble {
  border-radius: 20px;
  padding: 8px 16px;
} */
/* .bubble {
  border-radius: 24px;
  padding: 8px 16px;
  min-width: 100px;
  text-align: center;
  font-size: 0.9rem;
} */
.bubble {
  border-radius: 24px;
  padding: 8px 16px;
  font-size: 0.9rem;
  text-align: center;
  /* word-wrap: break-word; */
  white-space: normal; /* Allow text wrapping */
  min-width: 100px;
}

.no-uppercase {
  text-transform: unset !important;
}
</style>