import { Vologram } from "volograms-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import volUrl from "@/assets/1690983019490_ld?url";

// const x = import.meta.glob("@/assets/1690983019490_ld?url");
// console.log(volUrl);

// setup render, scene, light, orbitcontrol
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.add(new THREE.AmbientLight(0xffffff, 1));

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 2);
controls.target.set(0, 0.9, 0);
controls.update();

//setup some helper on the scene
scene.add(new THREE.AxesHelper(1));
scene.add(new THREE.GridHelper(10, 10));

// as a volograms takes time to be downloaded, display loading information
const updateLoading = (p, play) => {
  const el = document.getElementById("loading");
  el.innerText = Math.round(p * 100) + "%";

  if (window.location.hash) {
    vologram.elVideo.play();
  }

  if (p === 1.0) {
    //when loaded/100%
    // Play and unmute when clicking on canvas (because of Chrome policy; cannot be autoplay)
    renderer.domElement.onclick = (e) => {
      vologram.elVideo.muted = true;
      renderer.domElement.onclick = null;
    };
  }
};

// Play/Pause button and Sound/Mute button
document.getElementById("playpause").onclick = (e) =>
  vologram.elVideo.paused ? vologram.elVideo.play() : vologram.elVideo.pause();
document.getElementById("sound").onclick = (e) =>
  (vologram.elVideo.muted = !vologram.elVideo.muted);

let vologramUrl = ""; // Initialize the vologram URL

if (window.location.hash.includes("static")) {
  vologramUrl = "assets/left_1690983019490_ld"; // Set the URL for "left" pathname
} else if (window.location.hash.includes("left")) {
  vologramUrl = "assets/left_1690983019490_ld"; // Set the URL for "left" pathname
} else if (window.location.hash.includes("right")) {
  vologramUrl = "assets/right_1690983080648_ld"; // Set the URL for "right" pathname
} else if (window.location.hash.includes("head")) {
  vologramUrl = "assets/head_1690983148857_ld"; // Set the URL for "head" pathname
} else {
  vologramUrl = "assets/left_1690983019490_ld"; // Default URL if no specific pathname matches
}

// let url = "assets/1690983019490_ld";
let vologram = new Vologram(vologramUrl, updateLoading);
vologramUrl && scene.add(vologram);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
