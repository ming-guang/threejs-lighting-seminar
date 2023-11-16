<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const settings = useSettingsStore();
const { ambientLightSettings } = storeToRefs(settings);
import { ColorPicker } from "vue-accessible-color-picker";
let color: string = ambientLightSettings.value.color;
let intensity: number = ambientLightSettings.value.intensity;

const onChange = () => {
  settings.setAmbientLight({
    color,
    intensity,
  });
};

// @ts-expect-error
const colorChange = (e) => {
  color = e.colors.hex.substring(0, 7);
  onChange();
};
</script>

<template>
  <div class="mt-2">
    <label class="block mb-2 text-sm font-medium text-gray-900">Color</label>
    <ColorPicker alpha-channel="hide" @color-change="colorChange" />
  </div>

  <div class="mt-2">
    <label for="intensity" class="block mb-2 text-sm font-medium text-gray-900"
      >Intensity</label
    >
    <input
      id="intensity"
      v-model="intensity"
      type="range"
      min="0"
      max="1"
      step="0.01"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      @change="onChange()"
    />
  </div>
</template>
