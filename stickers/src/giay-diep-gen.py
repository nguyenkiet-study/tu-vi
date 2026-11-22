"""Generates the giấy điệp paper overlay for Tu Vi: a seamless 384px tile with transparent ground, warm paper fibres and
sparse shell-powder (điệp) glints. Drawn on a canvas in headless Chromium with a fixed seed, saved as PNG with alpha."""
import asyncio, base64, pathlib
from playwright.async_api import async_playwright

JS = r'''() => {
  const W = 384, H = 384, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  let s = 20261122; const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  function wrap(draw) { for (const dx of [-W, 0, W]) for (const dy of [-H, 0, H]) { g.save(); g.translate(dx, dy); draw(); g.restore(); } }
  // paper fibres: short warm strokes, mostly horizontal like dó bark paper
  for (let i = 0; i < 1400; i++) {
    const x = r() * W, y = r() * H, len = 4 + r() * 16, a = (r() - 0.5) * 0.9, w = 0.5 + r() * 0.9;
    const dark = r() < 0.7, alpha = dark ? 0.035 + r() * 0.05 : 0.05 + r() * 0.06;
    const col = dark ? `rgba(92,60,25,${alpha})` : `rgba(255,250,235,${alpha})`;
    wrap(() => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * len * 0.5, y + Math.sin(a) * len * 0.5 + (r() - 0.5) * 2, x + Math.cos(a) * len, y + Math.sin(a) * len); g.stroke(); });
  }
  // fine grain
  for (let i = 0; i < 5000; i++) {
    const x = r() * W, y = r() * H, al = 0.03 + r() * 0.05;
    g.fillStyle = r() < 0.6 ? `rgba(80,50,20,${al})` : `rgba(255,248,230,${al})`;
    g.fillRect(x, y, 1, 1);
  }
  // điệp shell powder: sparse pearly glints
  for (let i = 0; i < 260; i++) {
    const x = r() * W, y = r() * H, rad = 0.5 + r() * 1.3, al = 0.18 + r() * 0.3;
    wrap(() => { const gr = g.createRadialGradient(x, y, 0, x, y, rad * 2.2); gr.addColorStop(0, `rgba(255,255,250,${al})`); gr.addColorStop(1, 'rgba(255,255,250,0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad * 2.2, 0, Math.PI * 2); g.fill(); });
  }
  return c.toDataURL('image/png');
}'''

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        url = await pg.evaluate(JS)
        out = pathlib.Path(r'D:\tu-vi\stickers\src\giay-diep.png')
        out.write_bytes(base64.b64decode(url.split(',', 1)[1]))
        await b.close()
    print('wrote', out)

asyncio.run(main())
