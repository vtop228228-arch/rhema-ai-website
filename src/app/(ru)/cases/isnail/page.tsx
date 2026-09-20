import IsnailCase, { isnailTitle, isnailDescription } from '@/components/marketing/IsnailCase';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({title:isnailTitle.ru,description:isnailDescription.ru,path:'/cases/isnail'});
export default function Page(){return <IsnailCase/>;}
