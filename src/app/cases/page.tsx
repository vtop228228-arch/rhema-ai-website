import HeroCases from '@/components/sections/hero/HeroCases';
import Cases from '@/components/sections/Cases';
import Works from '@/components/sections/Works';
import ContactForm from '@/components/sections/ContactForm';
import GradientDivider from '@/components/ui/GradientDivider';

export const metadata = {
  title: 'Кейсы | Rhema AI',
  description: 'Реальные проекты Rhema AI: JARVIS, ISnail Academy, SigmaUp, LifesystemA.',
};

export default function CasesPage() {
  return (
    <div>
      <HeroCases />
      <GradientDivider />
      <Cases />
      <GradientDivider />
      <Works />
      <GradientDivider />
      <ContactForm />
    </div>
  );
}
