import HeroCases from '@/components/sections/hero/HeroCases';
import Cases from '@/components/sections/Cases';
import ContactForm from '@/components/sections/ContactForm';
import GradientDivider from '@/components/ui/GradientDivider';

export const metadata = {
  title: 'Кейсы | Rhema AI',
  description: 'Проекты Rhema AI: JARVIS, ISnail Academy, SigmaUp, Besty — с честными цифрами.',
};

export default function CasesPage() {
  return (
    <div>
      <HeroCases />
      <GradientDivider />
      <Cases />
      <GradientDivider />
      <ContactForm />
    </div>
  );
}
