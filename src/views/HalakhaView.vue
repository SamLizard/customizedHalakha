<template>
  <div>
    <!-- {{ currentData }} -->
    <halakha-question :data="currentData" :texts="texts" @select="answerSelection">
      <template #actions>
        <div class="navigation-arrows">
          <v-btn :icon="'mdi-arrow-' + ($vuetify.locale.isRtl ? 'right' : 'left')" @click="goBackward"
            :disabled="currentIndex == 0" class="ms-2 arrow-button"></v-btn>
          <v-btn v-if="currentData.indications && Array.isArray(currentData.indications)" 
                  icon="mdi-format-quote-close"
                  @click="sourcesRef.openDialog()"></v-btn>
          <v-btn :icon="'mdi-arrow-' + ($vuetify.locale.isRtl ? 'left' : 'right')" @click="goForward"
            :disabled="currentIndex >= answersHistory.length - 1" class="me-2 arrow-button"></v-btn>
        </div>
      </template>
    </halakha-question>
    <sources-popup ref="sourcesRef" :globalText="questions[id].texts[$vuetify.locale.current].sources" :specificText="currentSources"></sources-popup>
  </div>
</template>

<script setup lang="ts">
import trees from "../json/trees.json";
import allTexts from "../json/texts.json";
import questions from "../json/questionInfos.json";

import HalakhaQuestion from "@/components/HalakhaQuestion.vue";
import SourcesPopup from "@/components/SourcesPopup.vue";
import { ref, type Ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps<{ id: string }>();

const texts: Ref<object> = ref(allTexts[props.id]);

const sourcesRef = ref();

var currentIndex: Ref<number> = ref(0);
const answersHistory: Ref<Array<object>> = ref([trees[props.id]]);

const answerSelection = (index: number) => {
  // if (currentData.value.answers[index]) { TODO: if there is an id for the answer, check it is same id
  //   goForward();
  // }

  if (currentIndex.value < answersHistory.value.length - 1) {
    // remove future from history
    answersHistory.value.splice(currentIndex.value + 1);
  }

  answersHistory.value.push(currentData.value.answers[index]);
  currentIndex.value++;
  // currentData.value = answersHistory.value[currentIndex.value]; // make it computed???
};

const currentData = computed(() => {
  return answersHistory.value[currentIndex.value];
});

import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const currentSources = computed(() => {
  return currentData.value.sources ? texts.value[i18n.locale.value][currentData.value.sources] : "";
});

const goBackward = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goForward = () => {
  if (currentIndex.value < answersHistory.value.length - 1) {
    currentIndex.value++;
  }
};

const isMac = navigator.platform.toLowerCase().includes('mac');
const handleKeydown = (event: KeyboardEvent) => {
  const isMainKey = (isMac && event.metaKey) || (!isMac && event.ctrlKey)
  if ((isMainKey) && event.key === 'z' && !event.shiftKey) {
    goBackward();
  } else if (isMainKey && (event.shiftKey && event.key.toLowerCase() === 'z') || (event.key === 'y')) {
    goForward();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
<style scoped>
/* .navigation-arrows {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
} */

/* @media (max-width: 960px) {
  .navigation-arrows {
    flex-direction: column;
    gap: 1rem;
  }
} */

.navigation-arrows {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  padding: 0 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 960px) {
  .arrow-button {
    margin: 0 2rem;
    /* Spacing for large screens */
  }
}

.arrow-button {
  color: #1976d2;
  background-color: transparent;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.arrow-button:disabled {
  color: #bdbdbd;
}

.arrow-button:hover:not(:disabled) {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>