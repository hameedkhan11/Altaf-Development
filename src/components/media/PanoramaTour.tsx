"use client";

import "./panorama-tour.css";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Info,
  MousePointer2,
  Pause,
  Play,
  X,
} from "lucide-react";
import * as THREE from "three";

const corridor = "/virtual-tour/corridor.jpg";
const livingRoom = "/virtual-tour/living room 2.jpg";
const executiveRoom = "/virtual-tour/Executive room.jpg";
const masterBedroom = "/virtual-tour/Master bed.jpg";
const masterWashroom = "/virtual-tour/Master Bedroom washroom.jpg";
const balcony = "/virtual-tour/Balcony.jpg";

const scenes = [
  { name: "Corridor", subtitle: "Private arrival", image: corridor },
  { name: "Living Room", subtitle: "Contemporary living", image: livingRoom },
  { name: "Executive Room", subtitle: "Refined comfort", image: executiveRoom },
  { name: "Master Bedroom", subtitle: "Restful retreat", image: masterBedroom },
  { name: "Master Washroom", subtitle: "Premium finishes", image: masterWashroom },
  { name: "Balcony", subtitle: "Open-air views", image: balcony },
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function PanoramaTour() {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const changeSceneRef = useRef<(url: string) => void>(() => undefined);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(72, 1, 0.1, 1100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 128, 96);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    let lon = 0;
    let lat = 0;
    let dragging = false;
    let pointerX = 0;
    let pointerY = 0;
    let startLon = 0;
    let startLat = 0;
    let frame = 0;
    const textureLoader = new THREE.TextureLoader();

    const applyTexture = (url: string) => {
      textureLoader.load(url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        const previous = material.map;
        material.map = texture;
        material.needsUpdate = true;
        previous?.dispose();
        host.classList.remove("is-loading");
      });
    };

    changeSceneRef.current = (url) => {
      host.classList.add("is-loading");
      applyTexture(url);
      lat = 0;
      lon = 0;
    };

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      autoRotateRef.current = false;
      setAutoRotate(false);
      setHintVisible(false);
      pointerX = event.clientX;
      pointerY = event.clientY;
      startLon = lon;
      startLat = lat;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      lon = (pointerX - event.clientX) * 0.11 + startLon;
      lat = (event.clientY - pointerY) * 0.11 + startLat;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    applyTexture(scenes[0].image);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (autoRotateRef.current && !dragging) lon += 0.025;
      lat = clamp(lat, -75, 75);
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta),
      );
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      material.map?.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const selectScene = (index: number) => {
    const next = (index + scenes.length) % scenes.length;
    const selectedScene = scenes[next] ?? scenes[0];
    setSceneIndex(next);
    setHintVisible(false);
    changeSceneRef.current(selectedScene.image);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await viewerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  };

  const currentScene = scenes[sceneIndex] ?? scenes[0];

  return (
    <div ref={viewerRef} className="tour-shell">
      <div ref={hostRef} className="tour-canvas is-loading" aria-label={`360 degree view of ${currentScene.name}`} />
      <div className="tour-shade" aria-hidden="true" />

      <header className="tour-header">
        <a className="brand-lockup" href="https://www.altafdevelopments.com/" target="_blank" rel="noreferrer">
          <span className="brand-mark">A</span>
          <span><strong>ALTAF</strong><small>DEVELOPMENTS</small></span>
        </a>
        <div className="header-actions">
          <button className="icon-control" type="button" aria-label="About this residence" title="About" onClick={() => setInfoOpen(true)}><Info /></button>
          <button className="icon-control" type="button" aria-label="Enter fullscreen" title="Fullscreen" onClick={toggleFullscreen}><Expand /></button>
        </div>
      </header>

      <section className="scene-heading" aria-live="polite">
        <p>THE RESIDENCES · MODEL APARTMENT</p>
        <h2 className="scene-title">{currentScene.name}</h2>
        <span>{currentScene.subtitle}</span>
      </section>

      {hintVisible && (
        <div className="drag-hint"><MousePointer2 /><span>Drag to look around</span></div>
      )}

      <nav className="side-controls" aria-label="View controls">
        <button className="icon-control" type="button" aria-label={autoRotate ? "Pause rotation" : "Start rotation"} title={autoRotate ? "Pause rotation" : "Start rotation"} onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? <Pause /> : <Play />}</button>
      </nav>

      <button className="scene-arrow scene-arrow-left" type="button" aria-label="Previous room" onClick={() => selectScene(sceneIndex - 1)}><ChevronLeft /></button>
      <button className="scene-arrow scene-arrow-right" type="button" aria-label="Next room" onClick={() => selectScene(sceneIndex + 1)}><ChevronRight /></button>

      <div className="scene-strip" role="tablist" aria-label="Rooms">
        {scenes.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={sceneIndex === index}
            className={sceneIndex === index ? "scene-tab is-active" : "scene-tab"}
            onClick={() => selectScene(index)}
          >
            <img src={item.image} alt="" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <footer className="tour-footer">
        <span>{String(sceneIndex + 1).padStart(2, "0")}</span>
        <i />
        <span>{String(scenes.length).padStart(2, "0")}</span>
      </footer>

      {infoOpen && (
        <div className="info-scrim" role="dialog" aria-modal="true" aria-labelledby="tour-info-title">
          <section className="info-panel">
            <button className="icon-control info-close" type="button" aria-label="Close information" onClick={() => setInfoOpen(false)}><X /></button>
            <p>ALTAF DEVELOPMENTS</p>
            <h2 id="tour-info-title">The Residences</h2>
            <p className="info-copy">A considered expression of contemporary living in Faisal Hills, Islamabad. Explore the crafted finishes, flowing spaces and architectural details of apartment 707.</p>
            <a href="/properties">VIEW PROPERTY DETAILS <ChevronRight /></a>
          </section>
        </div>
      )}
    </div>
  );
}