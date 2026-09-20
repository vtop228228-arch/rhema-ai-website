import IsnailCase, { isnailTitle, isnailDescription } from '@/components/marketing/IsnailCase';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({title:isnailTitle.en,description:isnailDescription.en,path:'/cases/isnail',locale:'en'});
export default function Page(){return <IsnailCase locale="en"/>;}
