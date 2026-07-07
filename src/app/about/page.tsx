import HeroAbout from '@/components/sections/hero/HeroAbout';
import WhoWeAre from '@/components/sections/WhoWeAre';
import Flagship from '@/components/sections/Flagship';
import ContactForm from '@/components/sections/ContactForm';
import GradientDivider from '@/components/ui/GradientDivider';

export const metadata = {
  title: 'О Rhema AI | AI-агентство Владислава Грижака',
  description: 'Небольшая команда, которая строит AI-системы для малого и среднего бизнеса — и сама работает на тех же инструментах.',
};

export default function About() {
  return (
    <div>
      <HeroAbout />
      <GradientDivider />
      <WhoWeAre />
      <GradientDivider />
      <Flagship />
      <GradientDivider />
      <ContactForm />
    </div>
  );
}
