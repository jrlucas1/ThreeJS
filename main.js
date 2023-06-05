import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Criando a cena
const scene = new THREE.Scene();
const loader = new GLTFLoader();

// Criando a câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Criando o renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criando a SkyBox
const skyBoxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyBoxMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('ceu.jpg'),
  side: THREE.BackSide
});
const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);

// Adicionando a SkyBox à cena
scene.add(skyBox);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

var controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
var rotationSpeed = 0.02;

function onKeyDown(event) {
    switch (event.keyCode) {
        case 37: // Left arrow key
            cube.rotation.y -= rotationSpeed;
            break;
        case 39: // Right arrow key
            cube.rotation.y += rotationSpeed;
            break;
    }
}

window.addEventListener('keydown', onKeyDown);

window.addEventListener('resize', onWindowResize);

animate();

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(20, 20, 10);
scene.add(light);



loader.load('scene.gltf', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 5;



