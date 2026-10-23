import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title")?.slice(0, 100) || "HAVEN Estates Addis";
    const location = searchParams.get("location")?.slice(0, 60) || "Addis Ababa, Ethiopia";
    const propertyType = searchParams.get("type")?.slice(0, 40) || "Exclusive Sanctuary";
    const price = searchParams.get("price")?.slice(0, 40);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#252723",
            padding: "60px 80px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#F7F5F0",
            position: "relative",
          }}
        >
          {/* Subtle clay background decoration */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(194, 120, 3, 0.25) 0%, rgba(37, 39, 35, 0) 70%)",
            }}
          />

          {/* Top Bar: Brand mark and property category */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#E9D8C4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#252723",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                H
              </div>
              <span
                style={{
                  fontSize: "24px",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#F7F5F0",
                }}
              >
                HAVEN ESTATES
              </span>
            </div>

            <div
              style={{
                fontSize: "16px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "8px 18px",
                backgroundColor: "rgba(233, 216, 196, 0.12)",
                borderRadius: "30px",
                border: "1px solid rgba(233, 216, 196, 0.25)",
                color: "#E9D8C4",
              }}
            >
              {propertyType}
            </div>
          </div>

          {/* Middle: Title & Location */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C27803",
                fontWeight: 600,
              }}
            >
              {location}
            </div>
            <div
              style={{
                fontSize: title.length > 40 ? "54px" : "66px",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                maxWidth: "960px",
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Bar: Price & Assurance */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "1px solid rgba(247, 245, 240, 0.15)",
              paddingTop: "24px",
              width: "100%",
            }}
          >
            <div>
              {price ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#E9D8C4", opacity: 0.8 }}>
                    Guide Price
                  </span>
                  <span style={{ fontSize: "36px", fontWeight: 600, color: "#E9D8C4" }}>
                    {price}
                  </span>
                </div>
              ) : (
                <div style={{ fontSize: "20px", color: "#E9D8C4", fontStyle: "italic" }}>
                  Curated Architectural Sanctuaries in Addis Ababa
                </div>
              )}
            </div>

            <div
              style={{
                fontSize: "14px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#A88752",
              }}
            >
              haven-estates.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Error generating OG image";
    return new Response(`Failed to generate the image: ${errorMsg}`, {
      status: 500,
    });
  }
}
