<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const settings = useSettingsStore();
const { fogSettings } = storeToRefs(settings);
import { ColorPicker } from "vue-accessible-color-picker";
let enabled: boolean = fogSettings.value.enabled;
let color: string = fogSettings.value.color;
let near: number = fogSettings.value.near;
let far: number = fogSettings.value.far;

const onChange = () => {
  settings.updateFogSettings({
    enabled,
    color,
    near,
    far,
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
    <input
      id="enabled"
      type="checkbox"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      v-model="enabled"
      @change="onChange()"
    />
    <label for="enabled" class="ms-2 text-sm font-medium text-gray-900"
      >Enabled</label
    >
  </div>

  <div class="mt-2">
    <label class="block mb-2 text-sm font-medium text-gray-900">Color</label>
    <ColorPicker
      alpha-channel="hide"
      :color="fogSettings.color"
      @color-change="colorChange"
    />
  </div>

  <div class="mt-2">
    <label for="near" class="block mb-2 text-sm font-medium text-gray-900"
      >Near</label
    >
    <input
      type="number"
      id="near"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      min="0"
      v-model="near"
      @change="onChange()"
    />
  </div>

  <div class="mt-2">
    <label for="far" class="block mb-2 text-sm font-medium text-gray-900"
      >Far</label
    >
    <input
      type="number"
      id="far"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      min="0"
      v-model="far"
      @change="onChange()"
    />
  </div>
</template>
