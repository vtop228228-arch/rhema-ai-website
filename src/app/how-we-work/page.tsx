import HeroHowWeWork from '@/components/sections/hero/HeroHowWeWork';
import Process from '@/components/sections/Process';
import Cases from '@/components/sections/Cases';
import DiagnosticPricing from '@/components/sections/DiagnosticPricing';
import Stats from '@/components/sections/Stats';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import GradientDivider from '@/components/ui/GradientDivider';

export const metadata = {
  title: 'Как мы работаем | Rhema AI',
  description: 'Диагностика бизнеса за 3 дня. Находим потери, строим AI-системы, масштабируем.',
};

export default function HowWeWork() {
  return (
    <div>
      <HeroHowWeWork />
      <GradientDivider />
      <Process />
      <GradientDivider />
      <Cases />
      <GradientDivider />
      <DiagnosticPricing />
      <GradientDivider />
      <Stats />
      <GradientDivider />
      <FAQ />
      <GradientDivider />
      <ContactForm />
    </div>
  );
}
