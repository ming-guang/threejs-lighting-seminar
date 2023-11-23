<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const {
  lightType,
  directionalLightSettings,
  ambientLightSettings,
  hemisphereLightSettings,
  pointLightSettings,
} = storeToRefs(useSettingsStore());
</script>

<template>
  <TresDirectionalLight
    v-if="lightType === 'directional-light'"
    :position="directionalLightSettings.position"
    :intensity="directionalLightSettings.intensity"
    :color="directionalLightSettings.color"
    :cast-shadow="true"
  />
  <TresGroup v-else></TresGroup>

  <TresAmbientLight
    v-if="lightType === 'ambient-light'"
    :intensity="ambientLightSettings.intensity"
    :color="ambientLightSettings.color"
    :cast-shadow="true"
  />
  <TresGroup v-else></TresGroup>

  <TresHemisphereLight
    v-if="lightType === 'hemisphere-light'"
    :color="hemisphereLightSettings.skyColor"
    :ground-color="hemisphereLightSettings.groundColor"
    :intensity="hemisphereLightSettings.intensity"
    :cast-shadow="true"
  />
  <TresGroup v-else></TresGroup>

  <TresPointLight
    v-if="lightType === 'point-light'"
    :color="pointLightSettings.color"
    :intensity="pointLightSettings.intensity"
    :distance="pointLightSettings.distance"
    :decay="pointLightSettings.decay"
    :position="pointLightSettings.position"
  />
  <TresGroup v-else></TresGroup>
</template>
