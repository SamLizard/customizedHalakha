<template>
  <div>
    <div>
      <halakha-question :data="trees[id]"></halakha-question>
    </div>
  </div>
</template>

<script setup lang="ts">
import trees from "../json/trees.json";
import HalakhaQuestion from "@/components/HalakhaQuestion.vue";
import { defineProps } from 'vue';

const props = defineProps<{ id: string }>();
</script>