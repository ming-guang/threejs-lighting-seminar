<script setup lang="ts">
import { storeToRefs } from "pinia";
import { type SupportedLightType, useSettingsStore } from "../stores/settings";
import { models } from "../stores/models";
import DirectionalLightControl from "./DirectionalLightControl.vue";
import AmbientLightControl from "./AmbientLightControl.vue";
const settings = useSettingsStore();
const settingsRef = storeToRefs(settings);

const settingsLightType = () => settingsRef.lightType.value;

let lightType: SupportedLightType = settings.lightType;
let modelKey = settings.modelKey;
const onUpdateModel = () => {
    settings.updateModel(modelKey);
};
const onUpdateLightType = () => {
    if (lightType === "none") {
        settings.setNoLight();
        return;
    }

    if (lightType === "directional-light") {
        settings.setDirectionalLight({});
        return;
    }

    if (lightType === "ambient-light") {
        settings.setAmbientLight({});
        return;
    }
};
</script>

<template>
    <div class="m-2.5">
        <label for="model" class="block mb-2 text-sm font-medium text-gray-900">Model</label>
        <select id="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="modelKey" @change="onUpdateModel()">
            <option v-for="(model, key) in models" :key="key" :value="key" :select="key === modelKey">
                {{ model.name }}
            </option>
        </select>

        <label for="light" class="block mt-2 mb-2 text-sm font-medium text-gray-900">Light</label>
        <select id="light"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="lightType" @change="onUpdateLightType()">
            <option :value="'none'" :select="lightType === 'none'">None</option>
            <option :value="'directional-light'" :select="lightType === 'directional-light'">Directional light</option>
            <option :value="'ambient-light'" :select="lightType === 'ambient-light'">Ambient light</option>
        </select>

        <div v-if="settingsLightType() === 'directional-light'">
            <DirectionalLightControl />
        </div>
        <div v-else=""></div>

        <div v-if="settingsLightType() === 'ambient-light'">
            <AmbientLightControl />
        </div>
        <div v-else=""></div>
    </div>
</template>
