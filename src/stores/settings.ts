import * as THREE from "three";
import { defineStore } from "pinia";
import { ref } from "vue";

export type SupportedLightType =
  | "none"
  | "directional-light"
  | "ambient-light"
  | "hemisphere-light";

export interface DirectionalLightSettings {
  color: string;
  intensity: number;
  position: THREE.Vector3;
}

export interface AmbientLightSettings {
  color: string;
  intensity: number;
}

export interface HemisphereLightSettings {
  skyColor: string;
  groundColor: string;
  intensity: number;
}

export const useSettingsStore = defineStore("settings", () => {
  const modelKey = ref<string>("teapot");
  const lightType = ref<SupportedLightType>("directional-light");
  const directionalLightSettings = ref<DirectionalLightSettings>({
    color: "#FFFFFF",
    intensity: 1.0,
    position: new THREE.Vector3(-5, 5, 10),
  });
  const ambientLightSettings = ref<AmbientLightSettings>({
    color: "#FFFFFF",
    intensity: 1.0,
  });
  const hemisphereLightSettings = ref<HemisphereLightSettings>({
    skyColor: "#90D7EC",
    groundColor: "#FFFFFF",
    intensity: 1.0,
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
    color?: string;
    intensity?: number;
    position?: THREE.Vector3;
  }) {
    directionalLightSettings.value = {
      color: color ?? directionalLightSettings.value.color,
      intensity: intensity ?? directionalLightSettings.value.intensity,
      position: position ?? directionalLightSettings.value.position,
    };
    lightType.value = "directional-light";
  }

  function setAmbientLight({
    color,
    intensity,
  }: {
    color?: string;
    intensity?: number;
  }) {
    ambientLightSettings.value = {
      color: color ?? ambientLightSettings.value.color,
      intensity: intensity ?? ambientLightSettings.value.intensity,
    };
    lightType.value = "ambient-light";
  }
  function setHemisphereLight({
    skyColor,
    groundColor,
    intensity,
  }: {
    skyColor?: string;
    groundColor?: string;
    intensity?: number;
  }) {
    hemisphereLightSettings.value = {
      skyColor: skyColor ?? hemisphereLightSettings.value.skyColor,
      groundColor: groundColor ?? hemisphereLightSettings.value.groundColor,
      intensity: intensity ?? hemisphereLightSettings.value.intensity,
    };
    lightType.value = "hemisphere-light";
  }

  return {
    modelKey,
    lightType,
    directionalLightSettings,
    ambientLightSettings,
    hemisphereLightSettings,
    updateModel,
    setNoLight,
    setDirectionalLight,
    setAmbientLight,
    setHemisphereLight,
  };
});
