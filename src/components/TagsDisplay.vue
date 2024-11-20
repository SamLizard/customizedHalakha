<template>
  <div class="tags-container" :title="allTags" :class="$vuetify.display.smAndUp ? '' : 'scroll-overflow'">
    <v-chip
      v-for="(tagKey, index) in tags"
      :key="index"
      :color="getTagColor(tagKey)"
      class="tag-chip"
    >
      {{ $t("tags." + tagKey) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getTagColor } from '../ts/utils';

const props = defineProps<{
  tags: string[];
}>();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// Tooltip content for all tags
const allTags = computed(() => props.tags.map(tagKey => t("tags." + tagKey)).join(", "));
</script>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  text-overflow: ellipsis;
  align-items: center;
  max-width: 100%; /* Constrain width to available space */
}

.scroll-overflow {
  overflow: scroll;
}

.tag-chip {
  flex-shrink: 0; /* Prevent chips from shrinking */
  margin-right: 4px; /* Add spacing between tags */
  padding: 0 8px;
  white-space: nowrap; /* Keep tag text on one line */
}

.tags-container:hover {
  cursor: pointer; /* Indicate interactivity */
}
</style>
