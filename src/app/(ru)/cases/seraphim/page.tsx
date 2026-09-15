import SeraphimCase, { seraphimTitle, seraphimDescription } from '@/components/marketing/SeraphimCase';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({title:seraphimTitle.ru,description:seraphimDescription.ru,path:'/cases/seraphim'});
export default function Page(){return <SeraphimCase/>;}
