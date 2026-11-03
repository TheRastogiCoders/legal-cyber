import {
  ARTICLES,
  AUDIENCES,
  EXPERIENCE,
  FAQS,
  GLOSSARY,
  PRACTICE_AREAS,
  SITE,
  STATS,
  STEPS,
  WHY,
} from './content';
import { ARTICLE_IMAGES, IMAGES, PRACTICE_IMAGES } from './images';
import { PAGE_COPY } from './pages';

export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export const DEFAULT_CONTENT = clone({
  site: SITE,
  images: IMAGES,
  practiceImages: PRACTICE_IMAGES,
  articleImages: ARTICLE_IMAGES,
  stats: STATS,
  why: WHY,
  steps: STEPS,
  practiceAreas: PRACTICE_AREAS,
  audiences: AUDIENCES.map((item, i) => ({
    ...item,
    image: [
      PRACTICE_IMAGES['cyber-crime-online-fraud'],
      PRACTICE_IMAGES['bank-account-unfreeze'],
      PRACTICE_IMAGES['merchant-payment-gateway-holds'],
      PRACTICE_IMAGES['dpdp-compliance'],
      PRACTICE_IMAGES['fintech-banking'],
      PRACTICE_IMAGES.international,
    ][i] || IMAGES.contact,
  })),
  experienceItems: EXPERIENCE,
  articles: ARTICLES,
  faqs: FAQS,
  glossary: GLOSSARY,
  ...PAGE_COPY,
});
