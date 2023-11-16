import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const modelKey = ref<string>("teapot");

  function updateModel(key: string) {
    modelKey.value = key;
  }

  return { modelKey, updateModel };
});
