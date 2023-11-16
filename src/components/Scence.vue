<script setup lang="ts">
import { useLoader } from "@tresjs/core";
import { OrbitControls, vLightHelper } from "@tresjs/cientos";
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Shape } from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader";
import { models } from "../stores/models";
const gl = {
  clearColor: "#2D2D2E",
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
};
const modelKey = "teapot";
const model = await models[modelKey]!.loadObject();
</script>

<template>
  <TresCanvas v-bind="gl" shadows alpha>
    <TresPerspectiveCamera :position="[-5, 5, 10]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresGroup>
      <Suspense>
        <primitive :object="model" />
      </Suspense>
      <TresMeshStandardMaterial color="red" />
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
