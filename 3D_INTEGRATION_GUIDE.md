# 3D Visuals Integration Guide for Millennium Property Developers

This guide provides comprehensive instructions on how to integrate 3D visualizations into your property development website.

## 🎯 Overview

There are several approaches to integrating 3D visuals into your website:

### Option 1: Three.js (Recommended for Custom 3D)
**Best for:** Custom 3D models, architectural visualizations, interactive property tours

**Installation:**
```bash
npm install three @react-three/fiber @react-three/drei
```

**Basic Implementation:**

1. Create a 3D component file: `src/components/PropertyModel3D.tsx`

```tsx
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HouseModel() {
  const { scene } = useGLTF('/models/house.glb'); // Your 3D model file
  return <primitive object={scene} />;
}

export default function PropertyModel3D() {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <HouseModel />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
```

2. Use in your Astro page:

```astro
---
// In your .astro file
---

<section>
  <div id="3d-model-container"></div>
</section>

<script>
  import PropertyModel3D from '../components/PropertyModel3D';
  // Mount React component
</script>
```

### Option 2: Spline (Easy, No-Code Solution)
**Best for:** Quick implementation without coding 3D

**Steps:**
1. Create your 3D scene at https://spline.design
2. Export as web viewer
3. Embed the iframe or React component

**Example:**
```astro
<section class="py-20">
  <div class="container mx-auto">
    <h2>3D Property Visualization</h2>
    <iframe 
      src='https://my.spline.design/YOURSCENEID' 
      frameborder='0' 
      width='100%' 
      height='600px'
    ></iframe>
  </div>
</section>
```

### Option 3: SketchFab Embeds
**Best for:** Showcasing existing 3D models

**Steps:**
1. Upload your 3D model to SketchFab.com
2. Get the embed code
3. Add to your page

**Example:**
```astro
<div class="sketchfab-embed-wrapper">
  <iframe 
    title="Property Model" 
    frameborder="0" 
    allowfullscreen 
    mozallowfullscreen="true" 
    webkitallowfullscreen="true" 
    allow="autoplay; fullscreen; xr-spatial-tracking" 
    xr-spatial-tracking 
    execution-while-out-of-viewport 
    execution-while-not-rendered 
    web-share 
    src="https://sketchfab.com/models/YOUR_MODEL_ID/embed"
    class="w-full h-[600px] rounded-xl"
  ></iframe>
</div>
```

### Option 4: Babylon.js
**Best for:** Advanced architectural walkthroughs

**Installation:**
```bash
npm install @babylonjs/core @babylonjs/loaders
```

**Basic Implementation:**
```typescript
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

// Create scene
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Add camera
const camera = new BABYLON.ArcRotateCamera(
  'camera',
  0, 0, 10,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

// Add lighting
const light = new BABYLON.HemisphericLight(
  'light',
  new BABYLON.Vector3(0, 1, 0),
  scene
);

// Load 3D model
BABYLON.SceneLoader.Append('/models/', 'house.glb', scene);

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});
```

### Option 5: CSS 3D Transforms (Lightweight)
**Best for:** Simple 3D card effects, property cards

**Example:**
```astro
<style>
.property-card-3d {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.property-card-3d:hover {
  transform: rotateY(10deg) rotateX(5deg);
}

.property-image {
  transform: translateZ(50px);
}
</style>

<div class="property-card-3d">
  <img src="/property.jpg" class="property-image" alt="Property" />
</div>
```

## 🏗️ Implementation for Millennium Property Developers

### Recommended Approach for Your Site:

**For Property Showcases:**
1. Use **Spline** or **SketchFab** for individual property 3D models
2. Embed them in property detail pages

**For Interactive Floor Plans:**
1. Use **Three.js** with custom floor plan models
2. Allow users to rotate and explore layouts

**Example Integration in construction.astro:**

```astro
---
// construction.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import Navigation from "../components/Navigation.astro";
import Footer from "../components/Footer.astro";
---

<BaseLayout title="Construction & Design Services">
  <Navigation />
  
  <!-- 3D Visualization Section -->
  <section class="py-20 bg-brand-light-gray">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-brand-text mb-4">
          3D Visualization Gallery
        </h2>
        <p class="text-brand-text-light">
          Explore our projects in immersive 3D
        </p>
      </div>

      <!-- 3D Model Container -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div id="3d-viewer" class="w-full h-[600px]"></div>
      </div>

      <!-- Controls -->
      <div class="mt-8 text-center">
        <p class="text-sm text-brand-text-light">
          🖱️ Click and drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  </section>

  <Footer />
</BaseLayout>

<script>
  // Initialize Three.js or your chosen 3D library here
  // Or load Spline embed
</script>
```

## 📦 Getting Your 3D Models

### Where to Get 3D Models:

1. **Hire a 3D Artist**
   - Upwork, Fiverr, or local 3D modelers
   - Provide floor plans and photos
   - Get `.glb` or `.gltf` format files

2. **Create Your Own**
   - Use Blender (Free): https://www.blender.org/
   - Use SketchUp (Easier for architecture)
   - Export as `.glb` format

3. **Use Stock Models**
   - SketchFab marketplace
   - TurboSquid
   - CGTrader

## 🚀 Quick Start Steps

1. **Choose your approach** (I recommend Spline for quick start)
2. **Create or obtain 3D models** of your properties
3. **Add the 3D viewer component** to your pages
4. **Style and integrate** with your existing design

## 💡 Best Practices

- **Optimize models**: Keep polygon count under 50,000 for web
- **Compress textures**: Use tools like Squoosh.app
- **Add loading states**: 3D models can take time to load
- **Mobile optimization**: Consider simpler models for mobile devices
- **Fallback images**: Provide 2D images if 3D fails to load

## 🎨 Styling Tips for Your Brand

```css
/* Match your brand colors */
.model-container {
  background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
  border: 2px solid #00AEEF;
}

.loading-spinner {
  border-color: #00AEEF;
}
```

## 📞 Need Help?

For implementation assistance:
- Contact a Three.js developer
- Explore Spline.design tutorials
- Check Three.js documentation: https://threejs.org/docs/

---

**Next Steps:**
1. Decide which method suits your needs
2. Prepare your 3D models
3. Follow the implementation guide for your chosen method
