import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Kare marka işareti. public/brand/logo.png bir kelime işareti (640x114), favicon'a uygun değil. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a1120',
          color: '#ff6b1a',
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        M
      </div>
    ),
    size
  );
}
