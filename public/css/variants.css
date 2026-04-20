/* ═══════════════════════════════════════════════════
   VERONA TOOLS — Interactive Variants
   Supports: volume, size, length, color
   Mobile-first, teal theme
═══════════════════════════════════════════════════ */

.variants-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0 8px;
  border-top: 1px solid #f1f5f9;
}

.variant-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.variant-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.variant-type-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
}
.variant-selected-badge {
  font-size: 13px;
  font-weight: 800;
  color: #22B8CF;
  background: rgba(34,184,207,0.08);
  padding: 2px 10px;
  border-radius: 20px;
  transition: all 0.2s ease;
}
body.dark .variant-type-label { color: #64748b; }
body.dark .variant-selected-badge { background: rgba(34,184,207,0.15); }

.variant-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.variant-pill {
  padding: 9px 18px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #1B2D3E;
  cursor: pointer;
  font-family: 'Inter', system-ui, sans-serif;
  transition: border-color 0.18s, background 0.18s, color 0.18s, transform 0.15s, box-shadow 0.18s;
  user-select: none;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.variant-pill:hover { border-color: #22B8CF; transform: translateY(-1px); }
.variant-pill:active { transform: scale(0.96); }
.variant-pill.active {
  background: #22B8CF;
  border-color: #22B8CF;
  color: #fff;
  box-shadow: 0 4px 12px rgba(34,184,207,0.35);
}
body.dark .variant-pill { background: #1B2D3E; border-color: #334155; color: #e2e8f0; }
body.dark .variant-pill.active { background: #22B8CF; border-color: #22B8CF; color: #fff; }

.variant-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.variant-color-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  border: 2.5px solid #fff;
  box-shadow: 0 0 0 1.5px #e2e8f0;
  transition: box-shadow 0.18s, transform 0.15s;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  flex-shrink: 0;
}
.variant-color-btn:hover { transform: scale(1.1); box-shadow: 0 0 0 2px #22B8CF; }
.variant-color-btn:active { transform: scale(0.95); }
.variant-color-btn.active { box-shadow: 0 0 0 2.5px #22B8CF; }
.variant-color-btn.active::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.9);
  pointer-events: none;
}

.variant-dims-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background: #f0f6fa;
  border-radius: 12px;
  padding: 12px;
  margin-top: 4px;
}
.variant-dim-item { text-align: center; }
.variant-dim-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
.variant-dim-value { font-size: 16px; font-weight: 800; color: #22B8CF; font-feature-settings: 'tnum'; margin-top: 2px; }
body.dark .variant-dims-card { background: #1B2D3E; }

@media (max-width: 480px) {
  .variant-pill { padding: 10px 14px; font-size: 13px; }
  .variant-color-btn { width: 40px; height: 40px; }
  .variant-dim-value { font-size: 15px; }
  .variants-block { gap: 14px; padding: 14px 0 6px; }
}
