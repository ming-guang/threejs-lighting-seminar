<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const settings = useSettingsStore();
const { hemisphereLightSettings } = storeToRefs(settings);
import { ColorPicker } from "vue-accessible-color-picker";
let skyColor: string = hemisphereLightSettings.value.skyColor;
let groundColor: string = hemisphereLightSettings.value.groundColor;
let intensity: number = hemisphereLightSettings.value.intensity;

const onChange = () => {
  settings.setHemisphereLight({
    skyColor,
    groundColor,
    intensity,
  });
};

// @ts-expect-error
const skyColorChange = (e) => {
  skyColor = e.colors.hex.substring(0, 7);
  onChange();
};

// @ts-expect-error
const groundColorChange = (e) => {
  groundColor = e.colors.hex.substring(0, 7);
  onChange();
};
</script>

<template>
  <div class="mt-2">
    <label class="block mb-2 text-sm font-medium text-gray-900"
      >Sky color</label
    >
    <ColorPicker
      alpha-channel="hide"
      :color="skyColor"
      @color-change="skyColorChange"
    />
  </div>

  <div class="mt-2">
    <label class="block mb-2 text-sm font-medium text-gray-900"
      >Ground color</label
    >
    <ColorPicker
      alpha-channel="hide"
      :color="groundColor"
      @color-change="groundColorChange"
    />
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
