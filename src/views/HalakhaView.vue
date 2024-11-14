<template>
  <div>
    <div>
      <div>
        <v-btn icon="mdi-arrow-left" @click="goBackward" style="float: left;"></v-btn>
        <v-btn icon="mdi-arrow-right" @click="goForward" style="float: right;"></v-btn>
      </div>
      <!-- <halakha-question :data="trees[id].answers[0]" @select="answerSelection"></halakha-question> -->
      <halakha-question :data="currentData" @select="answerSelection"></halakha-question>
    </div>
  </div>
</template>

<script setup lang="ts">
import trees from "../json/trees.json";
import HalakhaQuestion from "@/components/HalakhaQuestion.vue";
import { defineProps, ref, type Ref } from 'vue';

const props = defineProps<{ id: string }>();

var currentIndex: number = 0;
const answersHistory: Ref<Array<object>> = ref([trees[props.id]]);
const currentData: Ref<object> = ref(answersHistory.value[0]);

const answerSelection = (index: number) => {
  answersHistory.value.push(currentData.value.answers[index]);
  currentIndex++;
  currentData.value = answersHistory.value[currentIndex]; // make it computed???
};

const goBackward = () => { 
  if (currentIndex > 0) {
    currentIndex--;
    currentData.value = answersHistory.value[currentIndex];
  }
};

const goForward = () => { 
  if (currentIndex < answersHistory.value.length - 1) {
    currentIndex++;
    currentData.value = answersHistory.value[currentIndex];
  }
};

// const goBackward = () => {
//   if (answersHistory.value.length > 1) {
//     currentData.value = answersHistory.value[answersHistory.value.length - 2];
//   }
// }

// const goToHistory = (historyPosition) => {
//   for (let i = 0; i < historyPosition; i++) {

//   }
// } 
</script>