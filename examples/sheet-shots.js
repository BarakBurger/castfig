const SHOTS = [];
const BG = '#f6f1e8';
const page = (ctx, title) => {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  text(ctx, title, W / 2, 96, 54, INK, null, 0, 'Poppins', 700);
};
const cap = (ctx, str, x, y) => text(ctx, str, x, y, 34, '#6b6058', null, 0, 'Poppins', 700);

const FACE = { eyes: 'normal', mouth: 'smile' };
const ARMS = { L: [.32, -.14], R: [.32, -.14] };
const LEGS = { L: [.14, -.05], R: [-.1, -.04] };

function cell(ctx, i, cols, rowY, o) {
  const colW = W / cols, x = colW * (i % cols) + colW / 2, y = rowY[Math.floor(i / cols)];
  castFig(ctx, Object.assign({ x, y, face: FACE, arms: ARMS, legs: LEGS }, o));
  return [x, y];
}

// 1. the six builds, same tee, same hair
SHOTS.push({ start: 0, end: 1, draw(ctx) {
  page(ctx, 'BUILDS');
  BUILD_LIST.forEach((b, i) => {
    const [x, y] = cell(ctx, i, 3, [760, 1560], { s: 500, build: b, outfit: 'tee', cols: ['#2f63c9','#2f63c9'], hair: 'crop', hairCol: 'darkBrown' });
    cap(ctx, b, x, y + 70);
  });
} });

// 2. every outfit on an athletic build
SHOTS.push({ start: 1, end: 2, draw(ctx) {
  page(ctx, 'OUTFITS  ·  athletic');
  OUTFIT_LIST.forEach((k, i) => {
    const [x, y] = cell(ctx, i, 4, [500, 940, 1380, 1820, 2260], { s: 330, build: 'athletic', outfit: k, cols: PAL.blue, hair: 'quiff', hairCol: 'black' });
    cap(ctx, k, x, y + 52);
  });
} });

// 3. every outfit on a curvy build
SHOTS.push({ start: 2, end: 3, draw(ctx) {
  page(ctx, 'OUTFITS  ·  curvy');
  OUTFIT_LIST.forEach((k, i) => {
    const [x, y] = cell(ctx, i, 4, [500, 940, 1380, 1820, 2260], { s: 330, build: 'curvy', outfit: k, cols: ['#b8476a', '#e8c9a0'], hair: 'longWavy', hairCol: 'chestnut' });
    cap(ctx, k, x, y + 52);
  });
} });

// 4. the hairstyles
SHOTS.push({ start: 3, end: 4, draw(ctx) {
  page(ctx, 'HAIR  ·  16 styles');
  HAIR_LIST.forEach((k, i) => {
    const [x, y] = cell(ctx, i, 5, [520, 960, 1400, 1840], { s: 300, build: i % 2 ? 'curvy' : 'athletic', outfit: 'tee', cols: i % 2 ? ['#e0646a', '#e0646a'] : PAL.blue, hair: k, hairCol: 'darkBrown' });
    cap(ctx, k, x, y + 48);
  });
} });

// 5. the hair colours
SHOTS.push({ start: 4, end: 5, draw(ctx) {
  page(ctx, 'HAIR COLOURS');
  Object.keys(HAIRCOL).forEach((k, i) => {
    const [x, y] = cell(ctx, i, 5, [460, 860, 1260, 1660, 2060], { s: 250, build: 'curvy', outfit: 'tee', cols: ['#cfc8bd', '#cfc8bd'], hair: 'long', hairCol: k });
    cap(ctx, k, x, y + 42);
  });
} });

// 5b. the two shortlists
SHOTS.push({ start: 5, end: 6, draw(ctx) {
  page(ctx, 'THE TWO SHORTLISTS');
  text(ctx, 'woman', W / 2, 300, 44, '#6b6058', null, 0, 'Poppins', 700);
  HAIRCOL_WOMEN.forEach((k, i) => {
    const colW = W / 4, x = colW * i + colW / 2;
    castFig(ctx, { x, y: 820, s: 380, build: 'curvy', outfit: 'dress', cols: ['#b8476a', '#e8c9a0'], hair: 'longWavy', hairCol: k, face: FACE, arms: ARMS, legs: LEGS });
    cap(ctx, k, x, 880);
  });
  text(ctx, 'man', W / 2, 1200, 44, '#6b6058', null, 0, 'Poppins', 700);
  HAIRCOL_MEN.forEach((k, i) => {
    const colW = W / 4, x = colW * i + colW / 2;
    castFig(ctx, { x, y: 1720, s: 380, build: 'athletic', outfit: 'classic', cols: ['#2f63c9', '#e9e4da'], hair: 'quiff', hairCol: k, face: FACE, arms: ARMS, legs: LEGS });
    cap(ctx, k, x, 1780);
  });
} });

// 6. the skin tones
SHOTS.push({ start: 6, end: 7, draw(ctx) {
  page(ctx, 'SKIN');
  SKIN_LIST.forEach((k, i) => {
    const [x, y] = cell(ctx, i, 4, [760, 1560], { s: 420, build: 'athletic', outfit: 'trunks', cols: PAL.blue, hair: 'crop', hairCol: 'black', skin: k });
    cap(ctx, k, x, y + 62);
  });
} });

// 7. the claim: build slim + hat none is the pack's figure, pixel for pixel
SHOTS.push({ start: 7, end: 8, draw(ctx) {
  page(ctx, 'drawStick  vs  castFig slim');
  const opt = { s: 620, cols: PAL.red, hat: 'none', belt: false, face: FACE, arms: ARMS, legs: LEGS };
  drawStick(ctx, Object.assign({ x: 300, y: 900 }, opt));
  cap(ctx, 'drawStick', 300, 980);
  castFig(ctx, Object.assign({ x: 780, y: 900, build: 'slim' }, opt));
  cap(ctx, 'castFig', 780, 980);
  // and overlaid, one in outline only
  drawStick(ctx, Object.assign({}, opt, { x: 540, y: 1750 }));
  castFig(ctx, Object.assign({}, opt, { x: 540, y: 1750, build: 'slim', alpha: .5, cols: ['#00c2ff', '#00c2ff'] }));
  cap(ctx, 'the two on top of each other', 540, 1830);
} });
