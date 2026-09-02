// Shareable end-of-game image — a self-contained Canvas 2D renderer (no
// external library, no server round-trip) that turns a game result into a
// portrait 1080x1350 PNG designed to be screenshotted/shared, then offers it
// as a browser download via a throwaway <a download> link.

function shareCardImageSrc(card) {
  if (REAL_ART_IDS.has(card.id)) return `art/${card.id}.${REAL_ART_IDS.get(card.id)}`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(generativeCardArtSvg(card))}`;
}

function loadImageAsync(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawImageCover(ctx, img, x, y, w, h) {
  const ir = img.width / img.height, tr = w / h;
  let sx, sy, sw, sh;
  if (ir > tr) { sh = img.height; sw = sh * tr; sx = (img.width - sw) / 2; sy = 0; }
  else { sw = img.width; sh = sw / tr; sx = 0; sy = (img.height - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function wrapText(ctx, text, cx, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, cx, y + i * lineHeight));
  return lines.length;
}

const SHARE_FONT = '-apple-system, "Segoe UI", Roboto, Arial, sans-serif';
const SHARE_PALETTE = {
  win: { base: '#0b1f16', glow: 'rgba(95,191,111,', accent: '#5fbf6f' },
  loss: { base: '#22090f', glow: 'rgba(224,85,111,', accent: '#e0556f' },
  draw: { base: '#221a09', glow: 'rgba(255,180,84,', accent: '#ffb454' },
};

function drawStatChips(ctx, W, y, chips, accent) {
  const chipW = 306, gap = 22;
  const totalW = chips.length * chipW + (chips.length - 1) * gap;
  let x = W / 2 - totalW / 2;
  ctx.textAlign = 'center';
  for (const c of chips) {
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    roundRectPath(ctx, x, y, chipW, 104, 16);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.font = `800 42px ${SHARE_FONT}`;
    ctx.fillText(c.value, x + chipW / 2, y + 54);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = `600 16px ${SHARE_FONT}`;
    ctx.fillText(c.label, x + chipW / 2, y + 82);
    x += chipW + gap;
  }
}

// payload: { result: 'win'|'loss'|'draw', title, subtitle, mvpCardId, chips,
//            achievementLabel? }
async function buildShareCardDataUrl(payload) {
  const W = 1080, H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const palette = SHARE_PALETTE[payload.result] || SHARE_PALETTE.draw;

  ctx.fillStyle = palette.base;
  ctx.fillRect(0, 0, W, H);
  let g = ctx.createRadialGradient(W / 2, 130, 20, W / 2, 130, 760);
  g.addColorStop(0, `${palette.glow}0.55)`);
  g.addColorStop(1, `${palette.glow}0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  let vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.78);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = `700 32px ${SHARE_FONT}`;
  ctx.fillText('R H   C A R D', W / 2, 88);

  ctx.shadowColor = palette.accent;
  ctx.shadowBlur = 44;
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 104px ${SHARE_FONT}`;
  ctx.fillText(payload.title.toUpperCase(), W / 2, 224);
  ctx.shadowBlur = 0;

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `500 29px ${SHARE_FONT}`;
  wrapText(ctx, payload.subtitle, W / 2, 278, 860, 37);

  const mvpCard = CARDS_BY_ID[payload.mvpCardId];
  const artSize = 440, artX = W / 2 - artSize / 2, artY = 350;
  if (mvpCard) {
    try {
      const img = await loadImageAsync(shareCardImageSrc(mvpCard));
      ctx.save();
      roundRectPath(ctx, artX, artY, artSize, artSize, 26);
      ctx.clip();
      drawImageCover(ctx, img, artX, artY, artSize, artSize);
      ctx.restore();
    } catch (e) { /* no art available — ring/labels still render below */ }
    ctx.lineWidth = 6;
    ctx.strokeStyle = DOMAIN_COLORS[mvpCard.domain] || palette.accent;
    roundRectPath(ctx, artX, artY, artSize, artSize, 26);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = `700 22px ${SHARE_FONT}`;
    ctx.fillText('CARTE MVP', W / 2, artY + artSize + 46);
    ctx.fillStyle = '#ffffff';
    ctx.font = `800 38px ${SHARE_FONT}`;
    ctx.fillText(mvpCard.name, W / 2, artY + artSize + 90);
  }

  const statsY = artY + artSize + (mvpCard ? 140 : 40);
  drawStatChips(ctx, W, statsY, payload.chips, palette.accent);

  let footerY = statsY + 160;
  if (payload.achievementLabel) {
    ctx.fillStyle = palette.accent;
    ctx.font = `700 27px ${SHARE_FONT}`;
    ctx.fillText(`🏆 ${payload.achievementLabel}`, W / 2, footerY);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.42)';
  ctx.font = `500 21px ${SHARE_FONT}`;
  ctx.fillText('Jeu de cartes SIRH — RH CARD', W / 2, H - 44);

  return canvas.toDataURL('image/png');
}

async function downloadShareCard(payload, buttonEl) {
  const originalLabel = buttonEl ? buttonEl.textContent : '';
  if (buttonEl) { buttonEl.disabled = true; buttonEl.textContent = 'Génération…'; }
  try {
    const dataUrl = await buildShareCardDataUrl(payload);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `rhcard-${payload.result}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) {
    flashError("Impossible de générer l'image.");
  } finally {
    if (buttonEl) { buttonEl.disabled = false; buttonEl.textContent = originalLabel; }
  }
}
