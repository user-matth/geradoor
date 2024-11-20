import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function QRCodeRedirectPage({ params }: any) {
  const { shortcode } = params;

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
