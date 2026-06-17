import HeroAbout from '@/components/sections/hero/HeroAbout';
import ComparisonTable from '@/components/sections/ComparisonTable';
import Flagship from '@/components/sections/Flagship';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = {
  title: 'О Rhema AI | AI-агентство Владислава Грижака',
  description: 'Команда AI-специалистов, которая диагностирует бизнес и строит продающие AI-системы за 3-6 недель.',
};

export default function About() {
  return (
    <div>
      <HeroAbout />
      <ComparisonTable />
      <Flagship />
      <ContactForm />
    </div>
  );
}
