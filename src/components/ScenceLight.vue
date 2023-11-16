<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const { lightType, directionalLightSettings, ambientLightSettings } =
  storeToRefs(useSettingsStore());
</script>

<template>
  <TresDirectionalLight
    v-if="lightType === 'directional-light'"
    :position="directionalLightSettings.position"
    :intensity="directionalLightSettings.intensity"
    :color="directionalLightSettings.color"
    :cast-shadow="true"
  />
  <TresAmbientLight
    v-if="lightType === 'ambient-light'"
    :intensity="ambientLightSettings.intensity"
    :color="ambientLightSettings.color"
    :cast-shadow="true"
  />
</template>
