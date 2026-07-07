import HeroMain from '@/components/sections/hero/HeroMain';
import ServicesSimple from '@/components/sections/ServicesSimple';
import ResultsPreview from '@/components/sections/ResultsPreview';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import GradientDivider from '@/components/ui/GradientDivider';

export default function Home() {
  return (
    <div>
      <HeroMain />
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
