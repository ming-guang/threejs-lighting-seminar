<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const { lightType, directionalLightSettings } = storeToRefs(useSettingsStore());
</script>

<template>
    <TresDirectionalLight v-if="lightType === 'directional-light'" :position="directionalLightSettings.position"
        :intensity="directionalLightSettings.intensity" :color="directionalLightSettings.color" :cast-shadow="true" />
</template>
