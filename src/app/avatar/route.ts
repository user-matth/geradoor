import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawName = searchParams.get("name") ?? "A";
  const name = rawName.toUpperCase().slice(0, 2);

  const background = searchParams.get("background") ?? "27272a";
  const color = searchParams.get("color") ?? "fff";

  const rawFontSize = parseFloat(searchParams.get("font-size") ?? "0.5");
  const isValidFontSize = !Number.isNaN(rawFontSize);
  const computedFontSize = isValidFontSize ? 32 * rawFontSize : 16;

  const defaultDimension = 64;
  var width = defaultDimension;
  var height = defaultDimension;

  const ratioParam = searchParams.get("aspectRatio");
  if (ratioParam) {
    let ratio = parseFloat(ratioParam);
    if (ratioParam.includes("/")) {
      const [num, den] = ratioParam.split("/");
      ratio = parseFloat(num) / parseFloat(den);
    }
    if (!Number.isNaN(ratio) && ratio > 0) {
      height = width / ratio;
    }
  }

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
