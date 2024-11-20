import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function QRCodeRedirectPage({ params }: { params: { shortcode: string } }) {
  const { shortcode } = params;

  const qrCode = await prisma.qRCode.findUnique({
    where: { shortcode },
  });

  if (!qrCode || !qrCode.isActive) {
    redirect('/404');
  }

  await prisma.qRCode.update({
    where: { shortcode },
    data: { scanCount: qrCode.scanCount + 1 },
  });

  redirect(qrCode.url);

  return null;
}
