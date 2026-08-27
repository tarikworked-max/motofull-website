import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'MotoFull — Workshop Management for Motorcycle Service';

/** Sosyal paylaşım kartı. twitter:card summary_large_image olduğu için görsel zorunlu. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 90px',
          background: '#0a1120',
          backgroundImage:
            'radial-gradient(circle at 80% 15%, rgba(255,107,26,0.22), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 14,
              background: '#ff6b1a',
              color: '#0a1120',
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ color: '#e6edf7', fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            MotoFull
          </div>
        </div>
        <div
          style={{
            color: '#e6edf7',
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Workshop management for motorcycle service
        </div>
        <div style={{ color: '#94a3b8', fontSize: 30, marginTop: 28, maxWidth: 860 }}>
          Work orders, customers, inventory and AI-assisted diagnosis in one panel.
        </div>
        <div style={{ color: '#ff8c42', fontSize: 26, marginTop: 40, fontWeight: 600 }}>
          Free 7-day demo — no card required
        </div>
      </div>
    ),
    size
  );
}
