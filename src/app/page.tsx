import HeroMain from '@/components/sections/hero/HeroMain';
import Marquee from '@/components/ui/Marquee';
import ServicesTabs from '@/components/sections/ServicesTabs';
import ForWho from '@/components/sections/ForWho';
import HowItWorks from '@/components/sections/HowItWorks';
import FullCycle from '@/components/sections/FullCycle';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <div>
      <HeroMain />
      <Marquee />
      <ServicesTabs />
      <ForWho />
      <HowItWorks />
      <FullCycle />
      <FAQ />
      <ContactForm />
    </div>
  );
}
