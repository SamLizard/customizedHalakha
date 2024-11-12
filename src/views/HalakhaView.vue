<template>
  <div>
    <div>
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

const currentData: Ref<object> = ref(trees[props.id]);
const answersHistory: Ref<Array<string>> = ref([]);

const answerSelection = (index: number) => {
  currentData.value = currentData.value.answers[index];
  answersHistory.value.push(index);
}
</script>