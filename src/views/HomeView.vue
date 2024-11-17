<template>
  <div>
    <!-- should display the possibilities -->
    <!-- the router push to halakha -->
    <!-- add some filters: language, tag, text contained in main question -->
     <div v-for="topic in topics" :key="topic.mainTopic" class="ms-4">
       <h2>{{ $t("topics." + topic.mainTopic) }}</h2>
       <tags-display :tags="topic.tags" class="my-2"></tags-display>
       <v-btn @click="goToNewView(topic.questionId)" class="mt-2 bubble">{{ $t(`topicsQuestion.${topic.mainTopic}.${topic.questionId}`) }}</v-btn>
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
<style scoped>
.bubble {
  border-radius: 24px;
  padding: 8px 16px;
  font-size: 0.9rem;
  text-align: center;
  /* word-wrap: break-word; */
  white-space: normal;
  /* Allow text wrapping */
  min-width: 100px;
}
</style>