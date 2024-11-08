<template>
    <v-row>
      <v-chip
        v-for="(tagKey, index) in tags"
        :key="index"
        :color="getRandomColor()"
        class="ma-1"
      >
        {{ $t("tags." + tagKey) }}
      </v-chip>
    </v-row>
  </template>
  
  <script setup lang="ts">
  import { PropType } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VChip, VRow } from 'vuetify/components'
  
  const props = defineProps<{
    tags: string[]
  }>()
  
  const { t } = useI18n()
  
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  </script>
  
  <style scoped>
  .v-chip {
    display: inline-flex;
  }
  </style>
  