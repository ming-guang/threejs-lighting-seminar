<script setup lang="ts">
import { Color } from "three";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
const {
    lightType,
    directionalLightSettings,
    ambientLightSettings,
    hemisphereLightSettings,
    pointLightSettings,
    spotLightSettings,
    fogSettings,
} = storeToRefs(useSettingsStore());
function stringToColor(color: string): Color {
    return new Color(color);
}
</script>

<template>
    <TresDirectionalLight v-if="lightType === 'directional-light'" :position="directionalLightSettings.position"
        :intensity="directionalLightSettings.intensity" :color="stringToColor(directionalLightSettings.color)"
        :cast-shadow="true" />
    <TresGroup v-else></TresGroup>

    <TresAmbientLight v-if="lightType === 'ambient-light'" :intensity="ambientLightSettings.intensity"
        :color="stringToColor(ambientLightSettings.color)" :cast-shadow="true" />
    <TresGroup v-else></TresGroup>

    <TresHemisphereLight v-if="lightType === 'hemisphere-light'" :color="stringToColor(hemisphereLightSettings.skyColor)"
        :ground-color="stringToColor(hemisphereLightSettings.groundColor)" :intensity="hemisphereLightSettings.intensity"
        :cast-shadow="true" />
    <TresGroup v-else></TresGroup>

    <TresPointLight v-if="lightType === 'point-light'" :color="stringToColor(pointLightSettings.color)"
        :intensity="pointLightSettings.intensity" :distance="pointLightSettings.distance" :decay="pointLightSettings.decay"
        :position="pointLightSettings.position" :cast-shadow="true" />
    <TresGroup v-else></TresGroup>

    <TresSpotLight v-if="lightType === 'spot-light'" :color="stringToColor(spotLightSettings.color)"
        :intensity="spotLightSettings.intensity" :distance="spotLightSettings.distance" :angle="spotLightSettings.angle"
        :penumbra="spotLightSettings.penumbra" :decay="spotLightSettings.decay" :position="spotLightSettings.position"
        :cast-shadow="true" />
    <TresGroup v-else></TresGroup>

    <TresFog v-if="fogSettings.enabled" :color="stringToColor(fogSettings.color)" :near="fogSettings.near"
        :far="fogSettings.far" />
    <TresGroup v-else></TresGroup>
</template>
