/* Fabrique l'image de partage (Open Graph) 1200 × 630 à partir du logo.
   L'ancienne image faisait 617 × 245 px : illisible sur WhatsApp et Messenger.
   Aucune dépendance : décodage et encodage PNG faits à la main via zlib. */
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';

function lirePng(chemin) {
  const buf = readFileSync(chemin);
  let pos = 8, largeur = 0, hauteur = 0, profondeur = 0, couleur = 0;
  const morceaux = [];
  while (pos < buf.length) {
    const taille = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + taille);
    if (type === 'IHDR') {
      largeur = data.readUInt32BE(0); hauteur = data.readUInt32BE(4);
      profondeur = data[8]; couleur = data[9];
    } else if (type === 'IDAT') morceaux.push(data);
    else if (type === 'IEND') break;
    pos += 12 + taille;
  }
  if (profondeur !== 8) throw new Error('Profondeur PNG non gérée : ' + profondeur);
  const canaux = { 0: 1, 2: 3, 4: 2, 6: 4 }[couleur];
  if (!canaux) throw new Error('Type de couleur non géré : ' + couleur);
  const brut = inflateSync(Buffer.concat(morceaux));
  const pas = largeur * canaux;
  const px = Buffer.alloc(hauteur * pas);
  let src = 0;
  for (let y = 0; y < hauteur; y++) {
    const filtre = brut[src++];
    const ligne = brut.subarray(src, src + pas); src += pas;
    const sortie = px.subarray(y * pas, y * pas + pas);
    const haut = y > 0 ? px.subarray((y - 1) * pas, (y - 1) * pas + pas) : null;
    for (let i = 0; i < pas; i++) {
      const a = i >= canaux ? sortie[i - canaux] : 0;
      const b = haut ? haut[i] : 0;
      const c = haut && i >= canaux ? haut[i - canaux] : 0;
      let v = ligne[i];
      if (filtre === 1) v += a;
      else if (filtre === 2) v += b;
      else if (filtre === 3) v += (a + b) >> 1;
      else if (filtre === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      sortie[i] = v & 0xff;
    }
  }
  return { largeur, hauteur, canaux, px };
}

function ecrirePng(chemin, largeur, hauteur, rgb) {
  const pas = largeur * 3;
  const brut = Buffer.alloc(hauteur * (pas + 1));
  for (let y = 0; y < hauteur; y++) {
    brut[y * (pas + 1)] = 0;
    rgb.copy(brut, y * (pas + 1) + 1, y * pas, y * pas + pas);
  }
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crcTable[n] = c >>> 0;
  }
  const crc = (b) => {
    let c = 0xffffffff;
    for (const o of b) c = crcTable[(c ^ o) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const morceau = (type, data) => {
    const t = Buffer.from(type, 'ascii');
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const cr = Buffer.alloc(4); cr.writeUInt32BE(crc(Buffer.concat([t, data])));
    return Buffer.concat([len, t, data, cr]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(largeur, 0); ihdr.writeUInt32BE(hauteur, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  writeFileSync(chemin, Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    morceau('IHDR', ihdr),
    morceau('IDAT', deflateSync(brut, { level: 9 })),
    morceau('IEND', Buffer.alloc(0))
  ]));
}

const L = 1200, H = 630;
const toile = Buffer.alloc(L * H * 3);

/* Fond : dégradé bleu nuit, plus clair vers le bas comme un crépuscule sur la mer. */
for (let y = 0; y < H; y++) {
  const t = y / (H - 1);
  const k = Math.pow(t, 1.7);
  for (let x = 0; x < L; x++) {
    const dx = (x / L - 0.5) * 2, dy = (y / H - 0.85) * 2;
    const halo = Math.max(0, 1 - Math.sqrt(dx * dx * 0.55 + dy * dy)) * 0.5;
    const i = (y * L + x) * 3;
    toile[i]     = Math.min(255, Math.round(7  + k * 30 + halo * 52));
    toile[i + 1] = Math.min(255, Math.round(18 + k * 52 + halo * 76));
    toile[i + 2] = Math.min(255, Math.round(26 + k * 68 + halo * 92));
  }
}

/* Filet d'or en cadre */
const or = [201, 162, 75];
const marge = 42;
for (let x = marge; x < L - marge; x++) {
  for (const y of [marge, H - marge - 1]) {
    const i = (y * L + x) * 3;
    toile[i] = or[0]; toile[i + 1] = or[1]; toile[i + 2] = or[2];
  }
}
for (let y = marge; y < H - marge; y++) {
  for (const x of [marge, L - marge - 1]) {
    const i = (y * L + x) * 3;
    toile[i] = or[0]; toile[i + 1] = or[1]; toile[i + 2] = or[2];
  }
}

/* Le logo, centré, à 62 % de la largeur utile */
const logo = lirePng('assets/logo/circe-beaulieu.png');
const cible = Math.round(L * 0.62);
const echelle = logo.largeur / cible;
const hCible = Math.round(logo.hauteur / echelle);
const x0 = Math.round((L - cible) / 2);
const y0 = Math.round((H - hCible) / 2);

for (let y = 0; y < hCible; y++) {
  for (let x = 0; x < cible; x++) {
    const sx = Math.min(logo.largeur - 1, Math.floor(x * echelle));
    const sy = Math.min(logo.hauteur - 1, Math.floor(y * echelle));
    const s = (sy * logo.largeur + sx) * logo.canaux;
    let r, g, b, a = 255;
    if (logo.canaux === 4) { r = logo.px[s]; g = logo.px[s + 1]; b = logo.px[s + 2]; a = logo.px[s + 3]; }
    else if (logo.canaux === 3) { r = logo.px[s]; g = logo.px[s + 1]; b = logo.px[s + 2]; }
    else { r = g = b = logo.px[s]; }
    if (a === 0) continue;
    const d = ((y0 + y) * L + (x0 + x)) * 3;
    if (d < 0 || d + 2 >= toile.length) continue;
    const k = a / 255;
    toile[d]     = Math.round(toile[d] * (1 - k) + r * k);
    toile[d + 1] = Math.round(toile[d + 1] * (1 - k) + g * k);
    toile[d + 2] = Math.round(toile[d + 2] * (1 - k) + b * k);
  }
}

ecrirePng('assets/og/circe-og.png', L, H, toile);
console.log('assets/og/circe-og.png — 1200 × 630 écrit');
