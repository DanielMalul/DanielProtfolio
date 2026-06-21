/**
 * Removes white/near-white background from an image using BFS flood fill
 * starting from all 4 corners. Returns a data URL with proper alpha channel.
 */
export function removeWhiteBackground(imgSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      const visited = new Uint8Array(w * h);

      // ── BFS flood-fill from 4 corners ──────────────────────────
      const queue = [[0,0],[w-1,0],[0,h-1],[w-1,h-1]];
      queue.forEach(([x,y]) => { visited[y*w+x] = 1; });

      let qi = 0;
      while (qi < queue.length) {
        const [x, y] = queue[qi++];
        const di = (y * w + x) * 4;
        const r = d[di], g = d[di+1], b = d[di+2];
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        const saturation = Math.max(r,g,b) - Math.min(r,g,b);

        // Stop at character pixels (dark or saturated)
        if (brightness < 160 || saturation > 45) continue;

        // Smooth fade: very white = fully transparent, near edge = partial
        const alpha = Math.round(Math.max(0, (160 - brightness) / 160 * 255));
        d[di+3] = alpha;

        // Push neighbours
        for (const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]]) {
          const nx = x+dx, ny = y+dy;
          if (nx>=0 && nx<w && ny>=0 && ny<h) {
            const ni = ny*w+nx;
            if (!visited[ni]) { visited[ni]=1; queue.push([nx,ny]); }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imgSrc;
  });
}

/**
 * React hook: loads & processes an image src, returning a transparent data URL.
 * Shows null until processing completes.
 */
import { useState, useEffect } from 'react';

export function useTransparentImg(src) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    removeWhiteBackground(src).then((dataUrl) => {
      if (!cancelled) setUrl(dataUrl);
    });
    return () => { cancelled = true; };
  }, [src]);
  return url;
}
