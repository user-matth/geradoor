import { NextResponse } from 'next/server';
import { generateCPF, formatCPF } from '@/app/utils/cpf_gen';
import { rateLimit } from '@/app/utils/rateLimit';

const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_COUNT = 50;

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '127.0.0.1';

  const rateLimitResult = rateLimit(ip, {
    limit: RATE_LIMIT_COUNT,
    windowMs: RATE_LIMIT_WINDOW,
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    );
  }

  const rawCPF = generateCPF();
  const formattedCPF = formatCPF(rawCPF);

  return NextResponse.json({
    cpf: formattedCPF,
  });
}
