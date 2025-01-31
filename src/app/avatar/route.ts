import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // -- Name --
  const rawName = searchParams.get("name") ?? "A";
  const name = rawName.toUpperCase().slice(0, 2);

  // -- Colors --
  const background = searchParams.get("background") ?? "27272a";
  const color = searchParams.get("color") ?? "fff";

  // -- Font Size Logic (scale factor) --
  const rawFontSize = parseFloat(searchParams.get("font-size") ?? "0.5");
  const isValidFontSize = !Number.isNaN(rawFontSize);
  const computedFontSize = isValidFontSize ? 32 * rawFontSize : 16;

  // -- Aspect Ratio --
  // Default is 64×64
  const defaultDimension = 64;
  const width = defaultDimension;

  // Attempt to parse aspectRatio (e.g. 16/9 or 1.777)
  const ratioParam = searchParams.get("aspectRatio");
  let ratio = NaN;

  if (ratioParam) {
    // If it contains "/", parse as fraction
    if (ratioParam.includes("/")) {
      const [num, den] = ratioParam.split("/");
      ratio = parseFloat(num) / parseFloat(den);
    } else {
      // Otherwise parse as float
      ratio = parseFloat(ratioParam);
    }
  }

  const isValidRatio = !Number.isNaN(ratio) && ratio > 0;
  // If ratio is valid, height = width / ratio; else the defaultDimension
  const height = isValidRatio ? width / ratio : defaultDimension;

  // -- SVG --
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      version="1.1"
    >
      <rect
        fill="#${background}"
        x="0"
        y="0"
        width="${width}"
        height="${height}"
      />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        alignment-baseline="middle"
        dominant-baseline="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
        font-size="${computedFontSize}"
        fill="#${color}"
        font-weight="400"
      >
        ${name}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
