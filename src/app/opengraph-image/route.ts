import ShareImage from '@/components/marketing/ShareImage';
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export function GET() { return ShareImage({ locale: 'ru' }); }
