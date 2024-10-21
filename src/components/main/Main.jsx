import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useNavigate } from "react-router-dom";

import './main.css';
import Button from '../shared/button/Button';

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const cubeContainerRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  const navigate = useNavigate();

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
    cameraRef.current = camera;
    camera.position.set(-2.5, 0, 4);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    cubeContainerRef.current.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const loader = new GLTFLoader(loadingManager);
    loader.load('/models/puma_suede/scene.gltf', (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;
      scene.add(model);

      model.rotation.x = 0.8;
      model.rotation.y = Math.PI + 2;
      model.rotation.z = 0.5;

      renderer.render(scene, camera);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
      
      tl
      .to(model.position, {
        x: -5,
        y: 0,
        z: 0,
        duration: 3,
      })
      .to(model.rotation, {
        x: 0,
        y: Math.PI/2,
        z: 0,
      })
      .to(model.position, {
        x: 0,
        y: 0,
        z: 0,
      })
      
      .to(model.rotation, {
        x: Math.PI/2,
        y: 0,
        z: 0.5,
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (rendererRef.current) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <main className="main">
      <div className='model' ref={cubeContainerRef}></div>

      <section className="main__section container">
      <div className="w-50">
            <p>Puma's Sneakers</p>
            <h2>Classic Sneakers</h2>
            <p>Discover the world's best & most stylish sneakers</p>
        </div>
        <div className="w-50"></div>
      </section>

      <section className="main__section container">
        <div className="w-50"></div>
        <div className="w-50">
            <h2>About the Sneakers</h2>
            <p>Each sneaker has been individually crafted and perfected by our team of expert designers with a commitment to quality and style.</p>
            <p>Don't just take our word for it; listen to the client testimonials, and you'll see what we can deliver.</p>
        </div>
      </section>

      <section className="main__section container">
        <div className="w-50">
            <p>Want to see the sneakers? Check them out in 3D!</p>
            <p>More modifications are coming soon, but until then, enjoy browsing our selection of various sneakers.</p>
            <Button onClick={() => navigate('/view')}>OPEN 3D</Button>
        </div>
        <div className="w-50"></div>
      </section>
    </main>
  );
};

export default Main;
