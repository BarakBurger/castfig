const SHOTS = [];
const BG = '#f6f1e8';
const page = (c, t) => { c.fillStyle = BG; c.fillRect(0,0,W,H); text(c, t, W/2, 96, 54, INK, null, 0, 'Poppins', 700); };
const cap = (c, s, x, y) => text(c, s, x, y, 34, '#6b6058', null, 0, 'Poppins', 700);
const LEGS = { L: [.14, -.05], R: [-.1, -.04] };

SHOTS.push({ start: 0, end: 1, draw(ctx, lt) {
  page(ctx, 'RICH MAN  ·  GLAM WOMAN');
  castFig(ctx, Object.assign({}, RICH_MAN,   { x: 300, y: 880, s: 660, legs: LEGS, t: lt }));
  cap(ctx, "RICH_MAN", 300, 950);
  castFig(ctx, Object.assign({}, GLAM_WOMAN, { x: 790, y: 880, s: 660, legs: LEGS, t: lt }));
  cap(ctx, "GLAM_WOMAN", 790, 950);
  // the two together, as they would appear in a shot
  castFig(ctx, Object.assign({}, RICH_MAN,   { x: 400, y: 1800, s: 700, legs: LEGS, t: lt, prop: cashFan }));
  castFig(ctx, Object.assign({}, GLAM_WOMAN, { x: 760, y: 1800, s: 690, legs: LEGS, t: lt, flip: -1,
    arms: { L: [1.10, -.50], R: [.34, -.16] }, prop: champagne }));
  cap(ctx, "together, cash and champagne", 540, 1870);
} });

SHOTS.push({ start: 1, end: 2, draw(ctx, lt) {
  page(ctx, 'THE PARTS, on their own');
  const base = { build: 'athletic', skin: 'light', hair: 'crop', hairCol: 'darkBrown',
                 outfit: 'tee', cols: ['#4a7fd0','#4a7fd0'], legs: LEGS,
                 arms: { L: [.32,-.14], R: [.32,-.14] }, face: { eyes:'normal', mouth:'smile' } };
  const items = [
    ['shades',    { glasses: 'shades' }],
    ['earrings',  { earrings: 'drop', hair: 'bun', hairCol: 'black' }],
    ['pearls',    { necklace: 'pearls' }],
    ['gold chain',{ necklace: 'chain' }],
    ['fur',       { fur: true }],
    ['heels',     { heels: true, build: 'curvy', outfit: 'dress', cols: ['#8a3a52','#e8b43a'] }],
    ['watch',     { watch: true, arms: { L: [1.25,-.55], R: [.32,-.14] } }],
    ['nails',     { nails: '#c2283c', arms: { L: [1.3,-.6], R: [1.3,-.6] } }],
  ];
  items.forEach((it, i) => {
    const x = (W/4)*(i%4) + W/8, y = [840, 1700][Math.floor(i/4)];
    castFig(ctx, Object.assign({}, base, it[1], { x, y, s: 430, t: lt }));
    cap(ctx, it[0], x, y + 58);
  });
} });

SHOTS.push({ start: 2, end: 3, draw(ctx, lt) {
  page(ctx, 'NEW OUTFITS, and things to hold');
  const P = [
    ['pinstripe', { outfit: 'pinstripe', cols: ['#2b2a38','#e8e2d6'], build: 'broad' }],
    ['glam',      { outfit: 'glam', cols: ['#b4123f','#f2cf5a'], build: 'curvy', hair: 'longWavy', hairCol: 'platinum' }],
    ['cash',      { outfit: 'smart', cols: ['#36507e','#36507e'], prop: cashFan, arms: { L:[.32,-.14], R:[1.15,-.45] } }],
    ['champagne', { outfit: 'gown', cols: ['#2f4a44','#f2cf5a'], build: 'curvy', hair: 'bun', hairCol: 'auburn', prop: champagne, arms: { L:[.32,-.14], R:[1.10,-.50] } }],
    ['handbag',   { outfit: 'dress', cols: ['#8a3a52','#e8b43a'], build: 'curvy', hair: 'bob', hairCol: 'black', prop: handbag, arms: { L:[.30,-.10], R:[.32,-.14] } }],
    ['cigar',     { outfit: 'business', cols: ['#2b2a38','#8c2733'], build: 'broad', beard: 'short', prop: cigar, arms: { L:[.32,-.14], R:[1.15,-.45] } }],
  ];
  P.forEach((it, i) => {
    const x = (W/3)*(i%3) + W/6, y = [860, 1700][Math.floor(i/3)];
    castFig(ctx, Object.assign({ build:'athletic', skin:'light', hair:'crop', hairCol:'darkBrown',
      legs: LEGS, arms:{L:[.32,-.14],R:[.32,-.14]}, face:{eyes:'normal',mouth:'smile'} },
      it[1], { x, y, s: 470, t: lt }));
    cap(ctx, it[0], x, y + 58);
  });
} });
