<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls, vLightHelper } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
import { BasicShadowMap, NoToneMapping, Shape } from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader";
import { models } from "../stores/models";
import { useSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref } from "vue";
import type { ShallowRef } from "vue";
import { shallowRef } from "vue";

interface ModelData {
  name: string;
  model: THREE.Object3D;
}

const gl = {
  clearColor: "#2D2D2E",
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
};
const settings = useSettingsStore();
const { modelKey } = storeToRefs(settings);
const model = ref<ModelData | null>(null);
let key: string = Date.now.toString();
watch(
  modelKey,
  async (modelKey) => {
    model.value = Object.freeze({
      name: modelKey,
      model: await models[modelKey]!.loadObject(),
    });
    key = Date.now().toString();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <TresCanvas v-bind="gl" shadows alpha>
    <TresPerspectiveCamera :position="[-5, 5, 10]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresGroup v-if="model !== null">
      <Suspense>
        <primitive :object="model.model" :key="key" />
      </Suspense>
    </TresGroup>
    <TresDirectionalLight
      :position="[5, 5, 5]"
      :intensity="1.5"
      cast-shadow
      v-light-helper
    />

    <TresMesh :rotate-x="-Math.PI / 2" receive-shadow>
      <TresPlaneGeometry :args="[15, 15]" />
      <TresMeshStandardMaterial color="white" />
    </TresMesh>
  </TresCanvas>
</template>
