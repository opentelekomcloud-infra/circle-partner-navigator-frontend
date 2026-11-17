# Vendored Cap solver assets

`@cap.js/widget` fetches its WebAssembly solver from `cdn.jsdelivr.net` by
default. `components/Captcha.jsx` points the widget at the copies below
instead, so the portal loads no third-party assets and its CSP can stay
`'self'`.

| File | Source | Version |
|---|---|---|
| `public/cap/cap_wasm_bg.wasm` | `@cap.js/wasm` npm package, `browser/cap_wasm_bg.wasm` | 0.0.8 |
| `public/cap/hashwx.wasm` | `@cap.js/wasm` npm package, `browser/hashwx.wasm` | 0.0.8 |
| `public/cap/pako_inflate.min.js` | `pako` npm package, `dist/pako_inflate.min.js` | 2.1.0 |

SHA-256:

    e4f3c00246a775193661f9277ca1288cd310a6514de166ecc2176ccd26fb06a9  cap_wasm_bg.wasm
    b1a0dbb3ef444d3c7069e0a5e0a0273ffa4cf8fef62cbbe43761c02f7cd6aff5  hashwx.wasm
    fa226c8e1e3556993260e6a5c1fe94e225da59b3418a06811fdc51d308f8bb43  pako_inflate.min.js

The widget pins `0.0.8` as its `WASM_VERSION`. When `@cap.js/widget` is
upgraded, check that version in `node_modules/@cap.js/widget/src/cap.js` and
refresh these files (and the table above) from the matching npm packages.
`pako` is only loaded by the widget's decompression fallback for browsers
without `DecompressionStream`.
