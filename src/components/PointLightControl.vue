<script setup lang="ts">
import * as THREE from "three";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const settings = useSettingsStore();
const { pointLightSettings } = storeToRefs(settings);
import { ColorPicker } from "vue-accessible-color-picker";
let color: string = pointLightSettings.value.color;
let intensity: number = pointLightSettings.value.intensity;
let distance: number = pointLightSettings.value.distance;
let decay: number = pointLightSettings.value.decay;
let { x, y, z } = pointLightSettings.value.position;

const onChange = () => {
  settings.setPointLight({
    color,
    intensity,
    distance,
    decay,
    position: new THREE.Vector3(x, y, z),
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
    <ColorPicker
      alpha-channel="hide"
      @color="color"
      @color-change="colorChange"
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
      max="100"
      step="0.01"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      @change="onChange()"
    />
  </div>

  <div class="mt-2">
    <label for="distance" class="block mb-2 text-sm font-medium text-gray-900"
      >Distance</label
    >
    <input
      id="distance"
      v-model="distance"
      type="range"
      min="0"
      max="1000"
      step="0.1"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      @change="onChange()"
    />
  </div>

  <div class="mt-2">
    <label for="decay" class="block mb-2 text-sm font-medium text-gray-900"
      >Decay</label
    >
    <input
      id="decay"
      v-model="decay"
      type="range"
      min="0"
      max="10"
      step="0.01"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      @change="onChange()"
    />
  </div>

  <div class="grid grid-cols-3 grid-gap-4">
    <div class="mt-2">
      <label for="x" class="block mb-2 text-sm font-medium text-gray-900"
        >x</label
      >
      <input
        type="number"
        id="x"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="x"
        @change="onChange()"
      />
    </div>
    <div class="mt-2">
      <label for="y" class="block mb-2 text-sm font-medium text-gray-900"
        >y</label
      >
      <input
        type="number"
        id="y"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="y"
        @change="onChange()"
      />
    </div>
    <div class="mt-2">
      <label for="z" class="block mb-2 text-sm font-medium text-gray-900"
        >z</label
      >
      <input
        type="number"
        id="z"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="z"
        @change="onChange()"
      />
    </div>
  </div>
</template>
