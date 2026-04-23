# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
```

No lint or test scripts are configured.

## Architecture

A 3D subway-tunnel portfolio built with React + Three.js. The user scrolls through a procedurally generated tunnel; the camera animates to face each project's poster on the wall, then an HTML overlay appears with project details.

### Scroll → Camera → UI pipeline

1. `App.jsx` wraps the scene in `ScrollControls` (drei), which exposes a 0–1 scroll offset.
2. `cameraKeyframes.js` pre-computes a keyframe sequence for all projects at mount time. `evaluateCamera(offset)` returns the interpolated position + quaternion for any given scroll offset.
3. `CameraRig.jsx` reads the scroll offset every frame, calls `evaluateCamera`, and lerps/slerps the Three.js camera toward the target (position lerp α = 0.08, rotation slerp α = 0.06).
4. When the camera enters the **HOLD** phase for a project, `Scene.jsx` sets `activeProjectIndex` via a callback, which causes the matching `Poster` to render its `ProjectOverlay` HTML.

### Four-phase animation cycle (per project)

Defined in `src/config/scene.js` as fractions of each project's scroll budget:

| Phase | Default share | Effect |
|---|---|---|
| TRAVEL | 40% | Camera moves forward through tunnel |
| ROTATE_IN | 20% | Camera turns to face the wall poster |
| HOLD | 15% | Camera holds; overlay visible |
| ROTATE_OUT | 20% | Camera turns back to face forward |
| PAUSE | 5% | Brief gap before next project |

### Key files

| File | Role |
|---|---|
| `src/utils/cameraKeyframes.js` | Core animation logic — keyframe generation and evaluation |
| `src/config/scene.js` | Scene dimensions, phase fractions, lerp constants |
| `src/data/projects.js` | Project data array (title, tags, links, wall side, image) |
| `src/components/scene/CameraRig.jsx` | Per-frame camera interpolation |
| `src/components/posters/Poster.jsx` | 3D poster mesh + conditional HTML overlay |
| `src/components/scene/environment/` | Tunnel geometry: walls, floor, ceiling, lights |

### Environment construction

`Hallway.jsx` assembles `WallTiles` (canvas-generated tile textures), `FloorMaterial`, `CeilingPanels`, and `LightingRig` (point lights + emissive strips every 6 units). Tunnel dimensions: 6 units wide × 4 units tall; projects spaced 12 units apart.

### Deployment

`vercel.json` contains a single SPA rewrite rule (`"/(.*)" → "/"`). Deploy by pushing to the connected Vercel project; no special build flags needed.

## Path alias

`@/` resolves to `./src` (configured in `vite.config.js`).
