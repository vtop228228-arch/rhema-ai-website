import HeroMain from '@/components/sections/hero/HeroMain';
import Marquee from '@/components/ui/Marquee';
import ForWho from '@/components/sections/ForWho';
import ServicesTabs from '@/components/sections/ServicesTabs';
import PriceTable from '@/components/sections/PriceTable';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <div>
      <HeroMain />
      <Marquee />
      <ForWho />
      <ServicesTabs />
      <PriceTable />
      <ContactForm />
    </div>
  );
}
