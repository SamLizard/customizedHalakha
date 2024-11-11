<template>
  <div>
    <div>
      <halakha-question :data="trees[id]" @select="answerSelection"></halakha-question>
    </div>
  </div>
</template>

<script setup lang="ts">
import trees from "../json/trees.json";
import HalakhaQuestion from "@/components/HalakhaQuestion.vue";
import { defineProps, ref, type Ref } from 'vue';

const props = defineProps<{ id: string }>();

const answersHistory: Ref<Array<string>> = ref([]);

const answerSelection = (index: string) => {
  answersHistory.value.push(index);
}
</script>