import HeroMain from '@/components/sections/hero/HeroMain';
import Marquee from '@/components/ui/Marquee';
import ServicesSimple from '@/components/sections/ServicesSimple';
import ResultsPreview from '@/components/sections/ResultsPreview';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import GradientDivider from '@/components/ui/GradientDivider';

export default function Home() {
  return (
    <div>
      <HeroMain />
      <Marquee />
      <GradientDivider />
      <ServicesSimple />
      <GradientDivider />
      <ResultsPreview />
      <GradientDivider />
      <FAQ />
      <GradientDivider />
      <ContactForm />
    </div>
  );
}
