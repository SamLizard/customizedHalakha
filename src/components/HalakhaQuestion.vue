<template>
  <div class="question-container" fill-height>
    <v-row align="center" justify="center" style="width: 100%;">
      <!-- Responsive Card -->
      <v-col :cols="12" :sm="8" :md="6" class="d-flex justify-center">
        <v-card :class="$vuetify.display.smAndUp ? 'large-screen-height' : 'small-screen-height'" class="question-card" :elevation="$vuetify.display.smAndUp ? '2' : '0'">
          <!-- Question Section -->
          <v-card-title class="question-title px-xs-0 px-sm-4 px-md-8 px-lg-10" :style="!data.question ? 'align-self: center;' : ''">
            {{ getText(data.question) || $t("indications") }}
          </v-card-title>

          <!-- Answers Section as Clickable Chips -->
          <v-card-text>
            <div v-if="data.answers && Array.isArray(data.answers)">
              <v-row dense>
                <v-col :cols="12" :sm="10" :md="8" :lg="6" class="answer-options offset-md-3 offset-md-2 offset-sm-1 offset-0">
                  <div v-for="(answer, index) in data.answers" :key="index" class="answer-options">
                    <template v-if="Array.isArray(answer.answer)">
                      <v-chip v-for="(option, optionIndex) in answer.answer" :key="optionIndex" class="answer-chip"
                        color="primary" variant="outlined" @click="selectAnswer(index)">{{ getText(option) }}</v-chip>
                    </template>
                    <template v-else>
                      <v-chip class="answer-chip" color="primary" variant="outlined" @click="selectAnswer(index)">{{ getText(answer.answer) }}</v-chip>
                    </template>
                  </div>
                </v-col>
              </v-row>
            </div>

            <!-- Indications Section -->
            <v-list v-if="data.indications && Array.isArray(data.indications)" class="indications">
              <v-list-item v-for="(indication, index) in data.indications" :key="index">
                <template v-slot:prepend>
                  <v-icon icon="mdi-information-outline" size="large"></v-icon>
                </template>
                <v-list-item-content>{{ getText(indication) }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <!-- <v-btn @click="data.answers.push({answers: 'a', indications: ['a']})">a</v-btn> -->
          <!-- Slot for Bottom Actions -->
          <v-card-actions class="actions-slot">
            <slot name="actions"></slot>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
interface QuestionData {
  answer: string | Array<string>;
  question: string;
  answers: QuestionData[];
  indications?: string[];
}

const props = defineProps<{
  data: {
    type: QuestionData,
    required: true,
  },
  texts: {
    type: object,
    required: true,
  }
}>();

// const emit = defineEmits<{ (e: 'select', index: number): void }>();
const emit = defineEmits<{
  select: [index: number]
}>();

// Function to handle answer selection
const selectAnswer = (index: number) => {
  emit('select', index);
};

import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const t = i18n.t;

const getText = (id: number | string): string => {
  try {
    if (typeof id === "number") {
      return props.texts[i18n.locale.value]?.[id] || props.texts[i18n.fallbackLocale.value]?.[id];
    } else if (typeof id === "string") {
      return t("texts." + id);
    }
  } catch {};

  return "";
};
</script>

<style scoped>
.question-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.question-card.small-screen-height {
  min-height: 55vh;
  max-height: 80vh;
}

.question-card.large-screen-height {
  min-height: 40vh;
  max-height: 60vh;
}

.question-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  white-space: normal;
}

.indications {
  margin-top: 1rem;
  color: #666;
}

.actions-slot {
  display: flex;
  justify-content: center;
  gap: 16px;
}

:deep(.v-list-item__prepend) {
  display: block !important;
}
</style>
<style>
.answer-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.answer-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.1s ease;
  white-space: normal;
  /* Allow multi-line text */
  text-align: center;
  word-wrap: break-word;
  height: auto !important;
  min-height: 48px;
  /* Ensure enough height for multi-line text */
  /* line-height: 1.4;  */
}

.answer-chip:hover {
  transform: scale(1.05);
}

.no-uppercase {
  text-transform: unset !important;
}
</style>