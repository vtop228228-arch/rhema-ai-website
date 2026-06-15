import HeroHowWeWork from '@/components/sections/hero/HeroHowWeWork';
import Myths from '@/components/sections/Myths';
import ServiceStep from '@/components/sections/ServiceStep';
import Process from '@/components/sections/Process';
import Cases from '@/components/sections/Cases';
import PatternCTA from '@/components/sections/PatternCTA';
import Stats from '@/components/sections/Stats';
// Отзывы скрыты до реальных клиентских — были выдуманы, нельзя публиковать
import Works from '@/components/sections/Works';
import DiagnosticPricing from '@/components/sections/DiagnosticPricing';
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
      <Myths />
      <ServiceStep />
      <Process />
      <Cases />
      <PatternCTA />
      <Stats />
      <Works />
      <DiagnosticPricing />
      <FAQ />
      <ContactForm />
    </div>
  );
}
