<script setup lang="ts">
import { storeToRefs } from "pinia";
import { type SupportedLightType, useSettingsStore } from "../stores/settings";
import { models } from "../stores/models";
import DirectionalLightControl from "./DirectionalLightControl.vue";
import AmbientLightControl from "./AmbientLightControl.vue";
import HemisphereLightControl from "./HemisphereLightControl.vue";
import PointLightControl from "./PointLightControl.vue";
import SpotLightControl from "./SpotLightControl.vue";
import FogControl from "./FogControl.vue";
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

  if (lightType === "hemisphere-light") {
    settings.setHemisphereLight({});
    return;
  }

  if (lightType === "point-light") {
    settings.setPointLight({});
    return;
  }

  if (lightType === "spot-light") {
    settings.setSpotLight({});
    return;
  }
};
</script>

<template>
  <div class="max-h-screen m-2.5 mb-2 overflow-auto">
    <label for="model" class="block mb-2 text-sm font-medium text-gray-900"
      >Model</label
    >
    <select
      id="model"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="modelKey"
      @change="onUpdateModel()"
    >
      <option
        v-for="(model, key) in models"
        :key="key"
        :value="key"
        :select="key === modelKey"
      >
        {{ model.name }}
      </option>
    </select>

    <label for="light" class="block mt-2 mb-2 text-sm font-medium text-gray-900"
      >Light</label
    >
    <select
      id="light"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="lightType"
      @change="onUpdateLightType()"
    >
      <option :value="'none'" :select="lightType === 'none'">None</option>
      <option
        :value="'directional-light'"
        :select="lightType === 'directional-light'"
      >
        Directional light
      </option>
      <option :value="'ambient-light'" :select="lightType === 'ambient-light'">
        Ambient light
      </option>
      <option
        :value="'hemisphere-light'"
        :select="lightType === 'hemisphere-light'"
      >
        Hemisphere light
      </option>
      <option :value="'point-light'" :select="lightType === 'point-light'">
        Point light
      </option>
      <option :value="'spot-light'" :select="lightType === 'spot-light'">
        Spot light
      </option>
    </select>

    <div v-if="settingsLightType() === 'directional-light'">
      <DirectionalLightControl />
    </div>
    <div v-else=""></div>

    <div v-if="settingsLightType() === 'ambient-light'">
      <AmbientLightControl />
    </div>
    <div v-else=""></div>

    <div v-if="settingsLightType() === 'hemisphere-light'">
      <HemisphereLightControl />
    </div>

    <div v-if="settingsLightType() === 'point-light'">
      <PointLightControl />
    </div>
    <div v-else=""></div>

    <div v-if="settingsLightType() === 'spot-light'">
      <SpotLightControl />
    </div>
    <div v-else=""></div>

    <div
      class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300 after:content-['']"
    >
      Fog
    </div>
    <FogControl />
  </div>
</template>
