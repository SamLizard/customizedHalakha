<template>
    <v-row>
      <v-chip
        v-for="(tagKey, index) in tags"
        :key="index"
        :color="getTagColor(tagKey)"
        class="ma-1"
      >
        {{ $t("tags." + tagKey) }}
      </v-chip>
    </v-row>
  </template>
  
  <script setup lang="ts">
  import { getTagColor } from '../ts/utils';

  const props = defineProps<{
    tags: string[]
  }>()
  </script>
  
  <style scoped>
  .v-chip {
    display: inline-flex;
  }
  </style>
  