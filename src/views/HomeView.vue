<template>
  <div>
    <!-- Filter Section -->
    <v-container class="my-4">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="search" :label="$t('filters.searchMainTopic')" clearable hide-details="auto" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="selectedTags" :items="tags" :label="$t('filters.filterTags')" multiple clearable
            hide-details="auto" chips>
            <template #chip="{ item }">
              <v-chip :color="getTagColor(item.value)">{{ item.title }}</v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="selectedLanguage" item-title="text" item-value="lang" :items="languages"
            :label="$t('filters.filterLanguage')" clearable hide-details="auto">
            <template #selection="{ item }">
              <v-img :src="'/flags/' + item.value + '.svg'" min-width="48px" max-width="48px" />
              <div class="ms-2">
                {{ $t("language", 1, { locale: item.value }) }}
              </div>
            </template>
            <template #item="{ item, props }">
              <v-list-item v-bind="props">
                <template #prepend>
                  <v-img :src="'/flags/' + item.value + '.svg'" class="me-2" min-width="48px" max-width="48px" />
                </template>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

      </v-row>
    </v-container>

    <!-- Topics Section -->
    <v-container>
      <v-expansion-panels v-model="panels">
        <v-expansion-panel v-for="(topic, index) in filteredTopics" :key="index">
          <v-expansion-panel-title>
            {{ $t("topics." + topic.mainTopic) }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="item in topic.items" :key="item.questionId" class="ms-4">
              <tags-display :tags="item.tags" class="my-2" />
              <v-btn @click="goToNewView(item.questionId)" class="mt-2 bubble">
                {{ $t(`topicsQuestion.${topic.mainTopic}.${item.questionId}`) }}
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import TagsDisplay from '@/components/TagsDisplay.vue';
import topics from '../json/topics.json';
import { ref, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTagColor } from '../ts/utils';

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

interface LocaleItem {
  lang: string;
  text: string;
}

interface selectItem {
  title: string;
  value: string;
}

// Available filters
// const tags = Array.from(new Set(topics.flatMap((topic) => topic.tags)));
// const tags = Object.keys(i18n.messages.value[i18n.locale.value].tags);
const tags = computed((): selectItem[] => {
  return Object.keys(i18n.messages.value[i18n.locale.value].tags).map((tagKey) => {
    return { title: t("tags." + tagKey) as string, value: tagKey };
  })
})
// const languages = Array.from(new Set(topics.flatMap((t) => t.supportedLanguages))).map((lang) => { title: t(lang)});
const languages = computed((): LocaleItem[] => {
  return i18n.availableLocales.map((lang) => {
    return { lang: lang, text: t("language", 1, { locale: lang }) as string };
  })
})

// Computed filtered topics
const filteredTopics = computed(() => {
  const groupedTopics = topics.reduce((acc: Record<string, any>, topic) => {
    if (!acc[topic.mainTopic]) {
      acc[topic.mainTopic] = {
        mainTopic: topic.mainTopic,
        items: [],
      };
    }
    acc[topic.mainTopic].items.push(topic);
    return acc;
  }, {});

  const groupedArray = Object.values(groupedTopics);

  return groupedArray.filter((topic: any) => {
    const matchesSearch =
      !search.value ||
      t("topics." + topic.mainTopic).toLowerCase().includes(search.value.toLowerCase());
    const matchesLanguage =
      !selectedLanguage.value ||
      topic.items.some((item: any) =>
        item.supportedLanguages.includes(selectedLanguage.value)
      );
    const matchesTags =
      !selectedTags.value.length ||
      topic.items.some((item: any) =>
        selectedTags.value.every((tag) => item.tags.includes(tag))
      );
    return matchesSearch && matchesLanguage && matchesTags;
  });
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