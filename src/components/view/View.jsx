import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const View = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const loadingManager = new THREE.LoadingManager();
        const progressBar = document.getElementById('progress-bar');
        loadingManager.onProgress = function(url, loaded, total) {
            progressBarContainer.style.display = 'flex'
            progressBar.value  = (loaded / total) * 100;
        }
        const progressBarContainer = document.querySelector('.progress-bar-container');
        loadingManager.onLoad = function() {
            progressBarContainer.style.display = 'none';
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const floorRadius = 3;
        const floorSegments = 32;
        const floor = new THREE.Mesh(
            new THREE.CircleGeometry(floorRadius, floorSegments),
            new THREE.MeshStandardMaterial({
                color: '#d6deec',
                metalness: 0,
                roughness: 0.1,
            })
        );
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        const hemiLight = new THREE.HemisphereLight('0xffffff', '0xffffff', 1.5);
        hemiLight.position.set(10, 30, 0);
        scene.add(hemiLight);

        const loader = new GLTFLoader(loadingManager);
        loader.load('/models/puma_suede/scene.gltf', (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            renderer.render(scene, camera);
        });

        camera.position.z = 5;
        camera.position.y = 3;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;

        controls.addEventListener('change', () => {
            renderer.render(scene, camera);
        });

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                overflow: 'hidden',
                height: '80vh',
            }}
        />
    );
};

export default View;
