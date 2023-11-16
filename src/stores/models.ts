import { useLoader } from "@tresjs/core";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

export class SimpleModel {
  constructor(public readonly path: string) {}

  async loadObject(): Promise<THREE.Object3D> {
    // @ts-expect-error
    const object = await useLoader(OBJLoader, this.path);
    object.traverse((node: THREE.Mesh) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return object;
  }
}

export const models: { [key: string]: SimpleModel } = {
  teapot: new SimpleModel("assets/models/teapot.obj"),
  spoon: new SimpleModel("assets/models/spoon.obj"),
  teacup: new SimpleModel("assets/models/teacup.obj"),
};
