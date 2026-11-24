const SHOTS = [];
const BG = '#f6f1e8';
const page = (ctx, title) => { ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H); text(ctx, title, W / 2, 96, 54, INK, null, 0, 'Poppins', 700); };
const cap = (ctx, s, x, y) => text(ctx, s, x, y, 34, '#6b6058', null, 0, 'Poppins', 700);
const ARMS = { L: [.32, -.14], R: [.32, -.14] };
const LEGS = { L: [.14, -.05], R: [-.1, -.04] };

// 1. the animals, standing up, dressed
SHOTS.push({ start: 0, end: 1, draw(ctx, lt) {
  page(ctx, 'ANIMALS');
  const A = ['bear', 'panda', 'whiteLion', 'lion', 'dog', 'cat'];
  const FIT = [['hoodie', ['#d8604e', '#d8604e']], ['tee', ['#2f63c9', '#2f63c9']],
               ['classic', ['#36507e', '#e8e2d6']], ['sport', ['#3fa35b', '#f2efe6']],
               ['shirt', ['#e8b43a', '#f6efe0']], ['knit', ['#9a6fd4', '#9a6fd4']]];
  A.forEach((k, i) => {
    const x = (W / 3) * (i % 3) + W / 6, y = [820, 1620][Math.floor(i / 3)];
    castFig(ctx, { x, y, s: 470, animal: k, outfit: FIT[i][0], cols: FIT[i][1],
      build: i === 0 ? 'broad' : i === 2 ? 'muscular' : 'athletic',
      arms: ARMS, legs: LEGS, t: lt });
    cap(ctx, k, x, y + 62);
  });
} });

// 2. the pets, on four legs
SHOTS.push({ start: 1, end: 2, draw(ctx, lt) {
  page(ctx, 'PETS, and a man with a dog');
  [['dog', 300], ['cat', 780]].forEach(([k, x]) => {
    petFig(ctx, { x, y: 640, s: 560, kind: k, t: lt });
    cap(ctx, k, x, 740);
  });
  castFig(ctx, { x: 400, y: 1560, s: 820, build: 'broad', hair: 'buzz', hairCol: '#3b2b22',
    beard: 'short', glasses: 'square', skin: 'tan', outfit: 'tee', cols: ['#2a6b63', '#2a6b63'],
    arms: { L: [.3, -.12], R: [1.1, -.40] }, legs: LEGS, face: { eyes: 'happy', mouth: 'grin' } });
  petFig(ctx, { x: 790, y: 1560, s: 420, kind: 'dog', t: lt });
  cap(ctx, 'at his feet, to scale', 540, 1700);
} });

// 3. cupid
SHOTS.push({ start: 2, end: 3, draw(ctx, lt) {
  page(ctx, 'CUPID');
  castFig(ctx, Object.assign({}, CUPID, { x: 300, y: 1000, s: 620, legs: LEGS, t: lt }));
  cap(ctx, 'cupid', 300, 1080);
  castFig(ctx, Object.assign({}, CUPID, { x: 790, y: 1000, s: 620, legs: LEGS, t: lt,
    build: 'athletic', skin: 'brown', hair: 'afro', hairCol: 'black' }));
  cap(ctx, 'another cupid', 790, 1080);
  // wings and halo on their own, and on an animal
  castFig(ctx, { x: 300, y: 1760, s: 560, build: 'curvy', hair: 'longWavy', hairCol: 'platinum',
    skin: 'fair', outfit: 'gown', cols: ['#eae6f5', '#f2cf5a'], wings: true, halo: true,
    arms: ARMS, legs: LEGS, t: lt, face: { eyes: 'happy', mouth: 'smile' } });
  cap(ctx, 'wings + halo', 300, 1840);
  castFig(ctx, { x: 790, y: 1760, s: 520, animal: 'panda', outfit: 'toga',
    cols: ['#fbf8f0', '#f2cf5a'], wings: true, halo: true, prop: cupidBow,
    arms: { L: [1.15, -1.05], R: [1.35, -.55] }, legs: LEGS, t: lt });
  cap(ctx, 'panda cupid', 790, 1840);
} });
