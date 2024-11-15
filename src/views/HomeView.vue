<template>
  <div>
    <!-- should display the possibilities -->
     <!-- the router push to halakha -->
     <div v-for="topic in topics" class="ms-4">
       <h2>{{ topic.mainTopic }}</h2>
       <tags-display :tags="topic.tags" class="my-2"></tags-display>
       <v-btn @click="goToNewView(topic.questionId)" class="mt-2 bubble">{{ topic.question }}</v-btn>
      </div>
  </div>
</template>

<script setup lang="ts">
import TagsDisplay from '@/components/TagsDisplay.vue';
import topics from '../json/topics.json';

import { useRouter } from 'vue-router';

const router = useRouter();
const goToNewView = (id: string) => {
  router.push({ name: 'halakha', params: { id } });
};
</script>
