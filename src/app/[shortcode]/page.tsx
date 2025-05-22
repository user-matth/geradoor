import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function QRCodeRedirectPage({
  params,
}: {
  params: Promise<{ shortcode: string }>;
}) {
  // await the params promise before using .shortcode
  const { shortcode } = await params;

  const qrCode = await prisma.qRCode.findUnique({
    where: { shortcode },
  });

  if (!qrCode || !qrCode.isActive) {
    redirect('/404');
    return null;
  }

  await prisma.qRCode.update({
    where: { shortcode },
    data: { scanCount: qrCode.scanCount + 1 },
  });

  redirect(qrCode.url);
  return null;
}
