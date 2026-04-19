/* ══════════════════════════════════════════════════════════
   INTERACTIVE VARIANTS (sizes / colors / textures)
   Renders inside the product modal above the action buttons
═══════════════════════════════════════════════════════════ */

.variants-block {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 0;
}

.variant-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.variant-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}
.variant-label strong {
  color: #1B2D3E;
  font-weight: 700;
  font-size: 13px;
  text-transform: none;
  letter-spacing: 0;
}
body.dark .variant-label { color: #94a3b8; }
body.dark .variant-label strong { color: #e2e8f0; }

.variant-selected-value {
  color: #22B8CF;
  font-weight: 800;
  font-size: 13px;
  text-transform: none;
  letter-spacing: 0;
  font-feature-settings: 'tnum';
}

/* ── Size pills (stillbois style) ──────────────────────── */
.variant-sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.variant-size {
  padding: 9px 16px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #1B2D3E;
  cursor: pointer;
  font-family: 'Inter', monospace;
  transition: border-color 0.18s, background 0.18s, color 0.18s, transform 0.15s;
  user-select: none;
  white-space: nowrap;
}
.variant-size:hover {
  border-color: #22B8CF;
  transform: translateY(-1px);
}
.variant-size.active {
  background: #22B8CF;
  border-color: #22B8CF;
  color: #fff;
  box-shadow: 0 4px 10px rgba(34,184,207,0.30);
}
body.dark .variant-size {
  background: #1B2D3E;
  border-color: #374151;
  color: #e2e8f0;
}
body.dark .variant-size.active {
  background: #22B8CF;
  border-color: #22B8CF;
  color: #fff;
}

/* ── Color swatches ────────────────────────────────────── */
.variant-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.variant-color {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1.5px #e2e8f0;
  transition: box-shadow 0.18s, transform 0.15s;
  position: relative;
}
.variant-color:hover {
  transform: scale(1.08);
  box-shadow: 0 0 0 1.5px #22B8CF;
}
.variant-color.active {
  box-shadow: 0 0 0 2.5px #22B8CF;
}
.variant-color.active::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.9);
  pointer-events: none;
}

/* ── Texture swatches ──────────────────────────────────── */
.variant-textures {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.variant-texture {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: border-color 0.18s, transform 0.15s;
  position: relative;
}
.variant-texture:hover {
  border-color: #22B8CF;
  transform: translateY(-1px);
}
.variant-texture.active {
  border-color: #22B8CF;
  border-width: 2.5px;
  box-shadow: 0 4px 10px rgba(34,184,207,0.25);
}
.variant-texture.active::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  background: rgba(34,184,207,0.3);
}

/* ── Dimension summary card (shows width/depth/slots) ──── */
.variant-dims {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background: #f0f6fa;
  border-radius: 12px;
  padding: 12px;
  margin-top: 4px;
}
.variant-dim {
  text-align: center;
}
.variant-dim-label {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.variant-dim-value {
  font-size: 15px;
  font-weight: 800;
  color: #22B8CF;
  font-family: 'Inter', monospace;
  margin-top: 2px;
}
body.dark .variant-dims { background: #1B2D3E; }
body.dark .variant-dim-label { color: #94a3b8; }

/* ── Mobile ─────────────────────────────────────────────── */
@media (max-width: 480px) {
  .variant-size { padding: 8px 12px; font-size: 12px; }
  .variant-color { width: 30px; height: 30px; }
  .variant-texture { width: 42px; height: 42px; }
  .variant-dim-value { font-size: 13px; }
}
