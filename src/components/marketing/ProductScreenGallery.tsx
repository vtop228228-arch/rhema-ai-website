'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import type { CaseImage } from '@/lib/case-images';
import type { SiteLocale } from '@/lib/seo';
import c from './ProductCases.module.css';

export type ProductScreen = {
  shot: CaseImage;
  label: string;
  title: string;
  text: string;
  crop: { top: number; bottom: number; left?: number; right?: number };
};

export function ProductScreenImage({ screen, locale, hero = false }: { screen: ProductScreen; locale: SiteLocale; hero?: boolean }) {
  const { shot, crop } = screen;
  const width = shot.width - (crop.left ?? 0) - (crop.right ?? 0);
  const height = shot.height - crop.top - crop.bottom;
  const style = {
    '--screen-ratio': `${width} / ${height}`,
    '--screen-width': `${shot.width / width * 100}%`,
    '--screen-top': `${-crop.top / height * 100}%`,
    '--screen-left': `${-(crop.left ?? 0) / width * 100}%`,
  } as CSSProperties;

  return <a className={c.screenFrame} href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`${shot[locale]}. ${locale === 'en' ? 'Open the full-size original' : 'Открыть оригинал полностью'}`}>
    <span className={c.screenViewport} style={style}>
      <Image src={shot.src} alt={shot[locale]} width={shot.width} height={shot.height} sizes={hero ? '(max-width: 600px) 280px, 320px' : '(max-width: 600px) calc(100vw - 88px), 360px'} preload={hero} />
    </span>
    <span className={c.screenZoom} aria-hidden="true">↗</span>
  </a>;
}

export default function ProductScreenGallery({ screens, locale }: { screens: ProductScreen[]; locale: SiteLocale }) {
  const [active, setActive] = useState(0);
  const screen = screens[active];
  const en = locale === 'en';

  return <div className={c.screenShowcase}>
    <div className={c.screenNavigation}>
      <span className={c.eyebrow}>{en ? 'Explore the interface' : 'Знакомство с интерфейсом'}</span>
      <div className={c.screenOptions} aria-label={en ? 'Choose a product screen' : 'Выбор экрана продукта'}>
        {screens.map((item, index) => <button type="button" key={item.shot.src} className={c.screenOption} onClick={() => setActive(index)} aria-pressed={index === active} aria-controls="product-screen-preview">
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong><span className={c.screenOptionArrow} aria-hidden="true">↗</span>
        </button>)}
      </div>
      <div className={c.screenExplanation} aria-live="polite" aria-atomic="true"><h3>{screen.title}</h3><p>{screen.text}</p></div>
      <a className={c.originalLink} href={screen.shot.src} target="_blank" rel="noopener noreferrer">{en ? 'Open the original screen' : 'Открыть экран полностью'}<span aria-hidden="true">↗</span></a>
    </div>
    <div className={c.screenStage} id="product-screen-preview">
      <div className={c.stageTopline}><span>{screen.label}</span><span>{String(active + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</span></div>
      <figure className={c.focusedScreen} key={screen.shot.src}><ProductScreenImage screen={screen} locale={locale} /><figcaption>{screen.shot.demo ? (en ? 'Demo names and amounts' : 'Имена и суммы — для примера') : (en ? 'Actual product interface' : 'Реальный интерфейс продукта')}</figcaption></figure>
    </div>
  </div>;
}
