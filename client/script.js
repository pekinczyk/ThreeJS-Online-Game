import { MeshBasicMaterial, TorusGeometry, Color, Mesh } from "three";
import { initAnimation } from "./src/animation";

import "./style.css";

console.log("Started!");

initAnimation({
  canvasSelector: "canvas.webgl",
  initScene: (scene) => {
    const material = new MeshBasicMaterial();
    material.color = new Color(0xff0000);
    // Mesh
    const sphere = new Mesh(new TorusGeometry(0.1, 0.005, 16, 100), material);

    scene.add(sphere);

    console.log(sphere);

    return { sphere };
  },
  socketEventServer: "ws://localhost:8080",
  tickFunction: ({ sphere, playerObject }) => {
    // Update objects
    // sphere.rotation.y = 0.1 * elapsedTime;
    // sphere.rotation.x = 2 * elapsedTime;

    sphere.position.x = playerObject.x;
    sphere.position.y = playerObject.y;

    // Update Orbital Controls
    // controls.update()
  }
});
