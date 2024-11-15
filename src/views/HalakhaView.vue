<template>
  <div>
    <div class="navigation-arrows">
      <v-btn :icon="'mdi-arrow-' + ($vuetify.locale.isRtl ? 'right' : 'left')" @click="goBackward" :disabled="currentIndex == 0" class="ms-2 arrow-button"></v-btn>
      <v-btn :icon="'mdi-arrow-' + ($vuetify.locale.isRtl ? 'left' : 'right')" @click="goForward" :disabled="currentIndex >= answersHistory.length - 1" class="me-2 arrow-button"></v-btn>
    </div>
    <!-- <halakha-question :data="trees[id].answers[0]" @select="answerSelection"></halakha-question> -->
    <halakha-question :data="currentData" @select="answerSelection"></halakha-question>
  </div>
</template>

<script setup lang="ts">
import trees from "../json/trees.json";
import HalakhaQuestion from "@/components/HalakhaQuestion.vue";
import { defineProps, ref, type Ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{ id: string }>();

var currentIndex: Ref<number> = ref(0);
const answersHistory: Ref<Array<object>> = ref([trees[props.id]]);
const currentData: Ref<object> = ref(answersHistory.value[0]);

const answerSelection = (index: number) => {
  // if (currentData.value.answers[index]) { TODO: if there is an id for the answer, check it is same id
  //   goForward();
  // }

  if (currentIndex.value < answersHistory.value.length - 1) {
    // remove future from history
    answersHistory.value.splice(currentIndex.value + 1);
  } 

  currentIndex.value++;

  answersHistory.value.push(currentData.value.answers[index]);
  currentData.value = answersHistory.value[currentIndex.value]; // make it computed???
};

const goBackward = () => { 
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentData.value = answersHistory.value[currentIndex.value];
  }
};

const goForward = () => { 
  if (currentIndex.value < answersHistory.value.length - 1) {
    currentIndex.value++;
    currentData.value = answersHistory.value[currentIndex.value];
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  console.log(event);
  if (event.metaKey && event.key === 'z' && !event.shiftKey) {
    goBackward();
  } else if ((event.metaKey && event.shiftKey && event.key === 'z') || (event.metaKey && event.key === 'y')) {
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 960px) {
  /* Position arrows at the same height as the component for large screens */
  .navigation-arrows {
    position: absolute;
    top: 50%; /* Align vertically with component */
    left: 0;
    right: 0;
    
    /* transform: translateY(-100%);
    transform: translateY(-20%);
    top: 100%;
    left: 0;
    right: 0; */
  }

  .arrow-button {
    margin: 0 2rem; /* Spacing for large screens */
  }
}

@media (max-width: 960px) {
  /* Place arrows above the component for small screens */
  .navigation-arrows {
    position: relative;
    top: 0;
    justify-content: space-between;
    margin-bottom: 1rem;
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