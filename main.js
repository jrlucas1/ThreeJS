import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createSkyBox } from './skybox'


// Criando a cena
const scene = new THREE.Scene();
const loader = new GLTFLoader();
var keyboard = {};
var figura;

document.addEventListener('keydown', function (event) {
    keyboard[event.keyCode] = true;
});

document.addEventListener('keyup', function (event) {
    keyboard[event.keyCode] = false;
});

// Criando a câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Criando o renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criando a SkyBox

createSkyBox('sky', 70).then(sky => {
    console.log("O céu foi criado!")
    scene.add(sky);
})

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

var controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    switch (true) {
        case keyboard[37]:
            figura.position.x -= 0.1;
            break;

        case keyboard[39]:
            figura.position.x += 0.1;
            break;

        case keyboard[38]:
            figura.position.y += 0.1;
            break;

        case keyboard[40]:
            figura.position.y -= 0.1;
            break;
        
        case keyboard[65]:
            figura.rotation.y += 0.02;
            break;
        
        case keyboard[68]:
            figura.rotation.y -= 0.02;
            break;
        
        case keyboard[83]:
            figura.rotation.x -= 0.02;
            break;
        
        case keyboard[87]:
            figura.rotation.x += 0.02;
            break;

        default:
            break;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('resize', onWindowResize);

animate();

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(20, 20, 10);
scene.add(light);



loader.load('scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    figura = gltf.scene;
}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 8;



