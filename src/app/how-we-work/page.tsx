import HeroHowWeWork from '@/components/sections/hero/HeroHowWeWork';
import Process from '@/components/sections/Process';
import DiagnosticPricing from '@/components/sections/DiagnosticPricing';
import Stats from '@/components/sections/Stats';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = {
  title: 'Как мы работаем | Rhema AI',
  description: 'Диагностика бизнеса за 3 дня. Находим потери, строим AI-системы, масштабируем.',
};

export default function HowWeWork() {
  return (
    <div>
      <HeroHowWeWork />
      <Process />
      <DiagnosticPricing />
      <Stats />
      <FAQ />
      <ContactForm />
    </div>
  );
}
