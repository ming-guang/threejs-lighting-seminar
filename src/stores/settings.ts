import * as THREE from "three";
import { defineStore } from "pinia";
import { ref } from "vue";

export type SupportedLightType = "none" | "directional-light";

export interface DirectionalLightSettings {
  color: string;
  intensity: number;
  position: THREE.Vector3;
}

export const useSettingsStore = defineStore("settings", () => {
  const modelKey = ref<string>("teapot");
  const lightType = ref<SupportedLightType>("directional-light");
  const directionalLightSettings = ref<DirectionalLightSettings>({
    color: "#FFFFFF",
    intensity: 1.0,
    position: new THREE.Vector3(-5, 5, 10),
  });

  function updateModel(key: string) {
    modelKey.value = key;
  }

  function setNoLight() {
    lightType.value = "none";
  }

  function setDirectionalLight({
    color,
    intensity,
    position,
  }: {
    color?: string,
    intensity?: number,
    position?: THREE.Vector3,
  }) {
    directionalLightSettings.value = {
      color: color ?? directionalLightSettings.value.color,
      intensity: intensity ?? directionalLightSettings.value.intensity,
      position: position ?? directionalLightSettings.value.position,
    };
    console.log(directionalLightSettings.value.color);
    lightType.value = "directional-light";
  }

  return {
    modelKey,
    lightType,
    directionalLightSettings,
    updateModel,
    setNoLight,
    setDirectionalLight,
  };
});
