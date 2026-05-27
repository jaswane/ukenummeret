import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2456A6",
          color: "#F6F1E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 130,
          fontWeight: 600,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        U
      </div>
    ),
    { ...size }
  );
}
