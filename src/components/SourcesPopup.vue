<template>
	<v-dialog v-model="dialog" max-width="600">
		<v-card>
			<v-card-title class="d-flex justify-space-between align-center">
				<v-icon color="primary" start>mdi-format-quote-close</v-icon>
				<span>{{ $t("sources.title") }}</span>
				<v-btn icon="mdi-close" @click="closeDialog" elevation="0"></v-btn>
			</v-card-title>

			<v-divider></v-divider>

			<v-card-text>
				<div>
					<p>
						<strong>{{ $t("sources.globalSource") }}:</strong> {{ globalText }}
					</p>
					<p v-if="specificText">
						<strong>{{ $t("sources.specificSource") }}:</strong> {{ specificText }}
					</p>
				</div>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
	globalText: {
		type: string,
		default: "",
	};
	specificText?: string;
}>();

const dialog = ref(false);

const openDialog = () => {
	dialog.value = true;
};

const closeDialog = () => {
	dialog.value = false;
};

const toggleDialog = () => {
	dialog.value = !dialog.value;
};

defineExpose({
	openDialog,
	closeDialog,
	toggleDialog,
});
</script>