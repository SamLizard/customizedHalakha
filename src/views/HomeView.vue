<template>
  <div>
    <!-- Filter Section -->
    <v-container>
      <v-row>
        <!-- Always visible filter -->
        <v-col cols="12" md="4">
          <v-text-field v-model="search" :label="$t('filters.searchMainTopic')" clearable hide-details="auto" :density="$vuetify.display.smAndUp ? 'default' : 'comfortable'" />
        </v-col>
        <!-- Additional filters with transition -->
        <v-expand-transition :duration="150">
          <v-col cols="12" md="8" v-show="showFilters || $vuetify.display.mdAndUp">
            <v-row>
              <v-col cols="12" md="6">
                <v-select v-model="selectedTags" :items="tags" :label="$t('filters.filterTags')" multiple clearable hide-details="auto" chips>
                  <template #chip="{ item }">
                    <v-chip :color="getTagColor(item.value)">{{ item.title }}</v-chip>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="selectedLanguage" item-title="text" item-value="lang" :items="languages" :label="$t('filters.filterLanguage')" clearable hide-details="auto">
                  <template #selection="{ item }">
                    <v-img :src="baseUrl + 'flags/' + item.value + '.svg'" min-width="48px" max-width="48px" />
                    <div class="ms-2">
                      {{ $t("language", 1, { locale: item.value }) }}
                    </div>
                  </template>
                  <template #item="{ item, props }">
                    <v-list-item v-bind="props">
                      <template #prepend>
                        <v-img :src="baseUrl + 'flags/' + item.value + '.svg'" class="me-2" min-width="48px" max-width="48px" />
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-expand-transition>
        <!-- Toggle button for additional filters -->
        <v-col cols="12" class="d-md-none">
          <v-btn @click="showFilters = !showFilters" :prepend-icon="showFilters ? 'mdi-chevron-up' : 'mdi-chevron-down'" density="compact" rounded>
            {{ showFilters ? $t('filters.hideAdvanced') : $t('filters.showAdvanced') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Topics Section -->
    <v-container>
      <v-expansion-panels v-model="panels">
        <v-expansion-panel v-for="(topic, index) in filteredTopics" :key="index">
          <v-expansion-panel-title>
            <div style="white-space: nowrap;">{{ $t("topics." + topic.mainTopic) }}</div>
            <tags-display :tags="topic.tags" class="my-2 ms-2" />
          </v-expansion-panel-title>
          <v-expansion-panel-text class="answer-options">
            <v-chip v-for="questionId in topic.questionsId" :key="questionId" class="mx-lg-6 mx-md-4 mx-sm-2 answer-chip" color="primary"
              variant="outlined" @click="goToNewView(questionId)">{{ questions[questionId].texts[$vuetify.locale.current]?.question || questions[questionId].texts[$vuetify.locale.fallback].question }}</v-chip>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import questions from '../json/questionInfos.json';
import TagsDisplay from '@/components/TagsDisplay.vue';
import topics from '../json/topics.json';
import { ref, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTagColor } from '../ts/utils';

const baseUrl: Ref<string> = ref(import.meta.env.BASE_URL);

const router = useRouter();
const goToNewView = (id: string) => {
  router.push({ name: 'halakha', params: { id } });
};

import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const t = i18n.t;

// Filter state
const search = ref('');
const selectedLanguage = ref<string | null>(i18n.locale.value);
const selectedTags = ref<string[]>([]);
const showFilters = ref(false);

interface LocaleItem {
  lang: string;
  text: string;
}

interface selectItem {
  title: string;
  value: string;
}

// Available filters
const tags = computed((): selectItem[] => {
  return Object.keys(i18n.messages.value[i18n.locale.value].tags).map((tagKey) => {
    return { title: t("tags." + tagKey) as string, value: tagKey };
  })
})
const languages = computed((): LocaleItem[] => {
  return i18n.availableLocales.map((lang) => {
    return { lang: lang, text: t("language", 1, { locale: lang }) as string };
  })
})

// Computed filtered topics
const filteredTopics = computed(() => {
  return topics.map(({questionsId, ...properties}) => {
    const filterQuestions = questionsId.filter((questionId) => {
      const matchesLanguage = !selectedLanguage.value || Object.keys(questions[questionId].texts).includes(selectedLanguage.value);
      const matchesTags = !selectedTags.value || selectedTags.value.every((tag) => questions[questionId].tags.includes(tag));

      return matchesLanguage && matchesTags;
    });
    
    return ({...properties, questionsId: filterQuestions});
  }).filter((topic) => {
    let matchesSearch = !search.value || Object.keys(i18n.messages.value).some((locale) => {
      return t("topics." + topic.mainTopic, 1, { locale }).toLowerCase().includes(search.value.toLowerCase());
    });
    if (!matchesSearch && topic.questionsId.length > 0) {
      matchesSearch = topic.questionsId.some((questionId) =>  Object.values(questions[questionId]["texts"]).map(({question}) => question).join(" ").toLowerCase().includes(search.value.toLowerCase()));
    }
    return matchesSearch && topic.questionsId.length > 0
  })
});

const panels: Ref<Array<number>> = ref([0]);
</script>

<style scoped>
.bubble {
  border-radius: 24px;
  padding: 8px 16px;
  font-size: 0.9rem;
  text-align: center;
  white-space: normal;
  min-width: 100px;
}
</style>
<!-- <style>
.custom-density {
  --v-input-control-height: 78px;
  --v-input-padding-top: 16px;
}

.custom-density .v-input__control {
  height: var(--v-input-control-height);
  padding-top: var(--v-input-padding-top);
}
</style> -->