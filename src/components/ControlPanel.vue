<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
import { models } from "../stores/models";
const settings = useSettingsStore();
const settingsRef = storeToRefs(settings);

let modelKey = settings.modelKey;
const onUpdateModel = () => {
  settings.updateModel(modelKey);
};
</script>

<template>
  <div class="m-2.5">
    <label for="model" class="block mb-2 text-sm font-medium text-gray-900"
      >Model</label
    >
    <select
      id="model"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="modelKey"
      @change="onUpdateModel()"
    >
      <option
        v-for="(model, key) in models"
        :key="key"
        :value="key"
        :select="key === modelKey"
      >
        {{ model.name }}
      </option>
    </select>
  </div>
</template>
