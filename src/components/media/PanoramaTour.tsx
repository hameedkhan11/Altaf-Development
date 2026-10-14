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

// Serve pixel-identical lossless WebP panorama files directly, avoiding
// Next/Image recompression or resizing of the 360-degree textures.
const corridor = "/virtual-tour/corridor-lossless.webp";
const livingRoom = "/virtual-tour/living-room-lossless.webp";
const executiveRoom = "/virtual-tour/executive-room-lossless.webp";
const masterBedroom = "/virtual-tour/master-bedroom-lossless.webp";
// No new washroom panorama was supplied, so retain the existing original.
const masterWashroom = "/virtual-tour/master-bedroom-washroom.webp";
const balcony = "/virtual-tour/balcony-lossless.webp";

// Dimensions are in feet. Keep them separate from the image files so no text
// is baked into 360-degree imagery or obscured while users rotate the scene.
const roomDetails = [
  { name: "Executive Bedroom", size: "12 × 15" },
  { name: "Master Bedroom", size: "13 × 16" },
  { name: "Washroom", size: "6 × 9" },
  { name: "Kitchen", size: "10 × 12" },
  { name: "Living Area", size: "12 × 22" },
  { name: "Balcony", size: "5 × 17" },
  { name: "Laundry Room", size: "8 × 6" },
] as const;

const scenes = [
  { name: "Corridor", subtitle: "Private arrival", image: corridor, thumb: "/virtual-tour/corridor-updated-thumb.webp", size: null },
  { name: "Living Room", subtitle: "Contemporary living", image: livingRoom, thumb: "/virtual-tour/living-room-updated-thumb.webp", size: "12 × 22 ft" },
  { name: "Executive Bedroom", subtitle: "Refined comfort", image: executiveRoom, thumb: "/virtual-tour/executive-room-updated-thumb.webp", size: "12 × 15 ft" },
  { name: "Master Bedroom", subtitle: "Restful retreat", image: masterBedroom, thumb: "/virtual-tour/master-bedroom-updated-thumb.webp", size: "13 × 16 ft" },
  { name: "Master Washroom", subtitle: "Premium finishes", image: masterWashroom, thumb: "/virtual-tour/master-bedroom-washroom-thumb.webp", size: "6 × 9 ft" },
  { name: "Balcony", subtitle: "Open-air views", image: balcony, thumb: "/virtual-tour/balcony-updated-thumb.webp", size: "5 × 17 ft" },
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
    const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 1100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: false });
    // Retain retina sharpness while respecting mobile GPU limits.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 2 : 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Preserve the panorama photograph exactly: no scene exposure or tonemapping.
    renderer.toneMapping = THREE.NoToneMapping;
    host.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 128, 96);
    geometry.scale(-1, 1, 1);
    // Unlit material means virtual lighting cannot dim the uploaded photograph.
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
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

    let requestId = 0;
    let disposed = false;
    const applyTexture = (url: string) => {
      const myRequest = ++requestId;
      textureLoader.load(url, (texture) => {
        // A newer scene was requested while this one was loading: drop it.
        if (disposed || myRequest !== requestId) {
          texture.dispose();
          return;
        }
        // Some older phones only support 4096px textures. Downsample only
        // on those devices, so the 7K washroom remains full resolution on
        // capable GPUs and never turns into a black/failed scene on others.
        let usableTexture: THREE.Texture = texture;
        const image = texture.image as HTMLImageElement;
        const maxSize = renderer.capabilities.maxTextureSize;
        if (image.width > maxSize || image.height > maxSize) {
          const ratio = Math.min(maxSize / image.width, maxSize / image.height);
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(image.width * ratio);
          canvas.height = Math.floor(image.height * ratio);
          const context = canvas.getContext("2d");
          if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            usableTexture = new THREE.CanvasTexture(canvas);
            texture.dispose();
          }
        }
        usableTexture.colorSpace = THREE.SRGBColorSpace;
        usableTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 16);
        usableTexture.minFilter = THREE.LinearMipmapLinearFilter;
        usableTexture.magFilter = THREE.LinearFilter;
        usableTexture.generateMipmaps = true;
        // Upload before swapping so the current room stays visible during loading.
        renderer.initTexture(usableTexture);
        const previous = material.map;
        material.map = usableTexture;
        material.needsUpdate = true;
        previous?.dispose();
        host.classList.remove("is-loading");
      }, undefined, (error) => {
        if (disposed || myRequest !== requestId) return;
        console.error("Unable to load panorama texture:", url, error);
        host.classList.remove("is-loading");
        host.classList.add("tour-load-error");
      });
    };

    changeSceneRef.current = (url) => {
      host.classList.remove("tour-load-error");
      host.classList.add("is-loading");
      applyTexture(url);
      lat = 0;
      lon = 0;
    };

    // Fixed camera field of view: drag/rotate only, with no wheel or pinch zoom.
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

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
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
      disposed = true;
      requestId += 1;
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
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
    <>
    <div ref={viewerRef} className="tour-shell">
      <div ref={hostRef} className="tour-canvas is-loading" aria-label={`360 degree view of ${currentScene.name}`} />

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
        {currentScene.size && (
          <div className="scene-dimensions" aria-label={`Room dimensions ${currentScene.size}`}>
            <span>ROOM SIZE</span>
            <strong>{currentScene.size}</strong>
          </div>
        )}
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
            <img src={item.thumb} alt="" loading="lazy" decoding="async" width={115} height={72} />
            <span className="scene-tab-caption">
              <span className="scene-tab-name">{item.name}</span>
              {item.size && <span className="scene-tab-size">{item.size}</span>}
            </span>
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
            <h3 className="info-dimensions-title">MODEL APARTMENT DIMENSIONS</h3>
            <dl className="info-dimensions-list">
              {roomDetails.map((room) => (
                <div key={room.name}>
                  <dt>{room.name}</dt>
                  <dd>{room.size} ft</dd>
                </div>
              ))}
            </dl>
            <a href="/properties">VIEW PROPERTY DETAILS <ChevronRight /></a>
          </section>
        </div>
      )}
    </div>
    <section className="apartment-specs" aria-labelledby="apartment-specs-title">
      <div className="apartment-specs-heading">
        <p>THE RESIDENCES · APARTMENT 707</p>
        <h2 id="apartment-specs-title">Model Apartment Details</h2>
        <p>Explore the dimensions of every space in the model apartment.</p>
      </div>
      <div className="apartment-specs-grid">
        {roomDetails.map((room) => (
          <div className="apartment-spec" key={room.name}>
            <span className="apartment-spec-name">{room.name}</span>
            <strong>{room.size} <small>ft</small></strong>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}