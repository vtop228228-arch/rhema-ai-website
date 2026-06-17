import HeroCases from '@/components/sections/hero/HeroCases';
import Cases from '@/components/sections/Cases';
import Works from '@/components/sections/Works';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = {
  title: 'Кейсы | Rhema AI',
  description: 'Реальные проекты Rhema AI: JARVIS, ISnail Academy, SigmaUp, LifesystemA. Конкретные задачи и результаты.',
};

export default function CasesPage() {
  return (
    <div>
      <HeroCases />
      <Cases />
      <Works />
      <ContactForm />
    </div>
  );
}
