// A character sheet for cast3d: one row per set, so the kit can be read at a glance.
import * as THREE from 'three';
import { makeFigure3D, STAND3, BUILD3_LIST, OUTFIT3_LIST, HAIR3_LIST } from './cast3d.js';

export const DURATION = 4.0;
export const CAPTIONS = [];
export const FADES = [];

// three across, two deep: a portrait frame will not take six in a line
function row(scene, items, z, make) {
  const gap = 1.12;
  items.forEach((it, i) => {
    const f = make(it, i);
    f.setPose(STAND3);
    const c = i % 3, r = Math.floor(i / 3);
    f.root.position.set((c - 1) * gap, 0, z - r * 1.9);
    f.root.rotation.y = -0.16 + (c - 1) * 0.12;
    scene.add(f.root);
  });
}

function sheet({ makeStage }, kind) {
  const scene = makeStage({ shadowSize: 5, sun: 2.5 });
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  if (kind === 'builds') {
    row(scene, BUILD3_LIST, 0, (b) => makeFigure3D({
      build: b, skin: 'light', hair: 'crop', hairCol: 'darkBrown',
      outfit: 'tee', cols: ['#2f63c9', '#2f63c9'] }));
  } else if (kind === 'outfits') {
    row(scene, OUTFIT3_LIST, 0, (o, i) => makeFigure3D({
      build: i % 2 ? 'curvy' : 'athletic', skin: ['light','tan','fair','deep','olive','brown'][i],
      hair: ['crop','long','buzz','bun','quiff','afro'][i], hairCol: 'darkBrown',
      outfit: o, cols: [['#2f63c9','#eef1f5'],['#d8604e','#f6e9d6'],['#3fa35b','#3fa35b'],
                        ['#9a6fd4','#7a4bc4'],['#2b2a38','#8c2733'],['#c2566f','#e8b43a']][i] }));
  } else {
    row(scene, HAIR3_LIST.filter(h => h !== 'none'), 0, (h, i) => makeFigure3D({
      build: i % 2 ? 'curvy' : 'athletic', skin: ['fair','tan','light','deep','olive','brown'][i],
      hair: h, hairCol: ['darkBrown','auburn','black','platinum','ginger','blonde'][i],
      beard: ['short','none','full','none','stubble','none'][i],
      glasses: [null,'round',null,'shades',null,'square'][i],
      outfit: 'tee', cols: [['#4a7fd0','#4a7fd0'],['#c2566f','#c2566f'],['#3fa35b','#3fa35b'],
                            ['#e8b43a','#e8b43a'],['#7a4bc4','#7a4bc4'],['#36507e','#36507e']][i] }));
  }
  camera.position.set(0, 2.35, 7.7);
  camera.lookAt(0, 0.95, -0.95);
  return { scene, camera, update: () => ({ dof: { focus: 8.2, aperture: 0.0004, maxblur: 0.005 } }) };
}

export const SHOTS = [
  { start: 0.0, end: 1.33, build: (c) => sheet(c, 'builds') },
  { start: 1.33, end: 2.66, build: (c) => sheet(c, 'outfits') },
  { start: 2.66, end: 5.0, build: (c) => sheet(c, 'hair') },
];
