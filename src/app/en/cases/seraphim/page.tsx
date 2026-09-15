import SeraphimCase, { seraphimTitle, seraphimDescription } from '@/components/marketing/SeraphimCase';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({title:seraphimTitle.en,description:seraphimDescription.en,path:'/cases/seraphim',locale:'en'});
export default function Page(){return <SeraphimCase locale="en"/>;}
