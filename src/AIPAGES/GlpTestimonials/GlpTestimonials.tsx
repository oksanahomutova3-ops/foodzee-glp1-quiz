/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import Button from 'src/onboarding/components/ui/button/Button';
import { REV1, REV2, REV3 } from '../_shared/images';
import styles from './GlpTestimonials.module.scss';

const REVIEWS = [
  { img: REV1, nameKey: 'r1Name', textKey: 'r1Text', detailKey: 'r1Detail' },
  { img: REV2, nameKey: 'r2Name', textKey: 'r2Text', detailKey: 'r2Detail' },
  { img: REV3, nameKey: 'r3Name', textKey: 'r3Text', detailKey: 'r3Detail' },
];
const DOUBLED = [...REVIEWS, ...REVIEWS, ...REVIEWS];

function Page() {
  const { onNext, onPrev, currentIndex } = useNav();

  return (
    <div className={styles.page}>
      {currentIndex !== 0 && (
        <div className={styles.back} onClick={onPrev}><BackIcon /></div>
      )}
      <div className={styles.content}>
        <p className={styles.title}>{t('glpTestimonials.title')}</p>
        <div className={styles.scrollWrap}>
          <div className={styles.scrollTrack}>
            {DOUBLED.map((r, i) => (
              <div key={i} className={styles.card}>
                <img src={r.img} alt="" className={styles.cardImg} />
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{t(`glpTestimonials.${r.nameKey}`)}</span>
                  <span className={styles.cardStars}>⭐⭐⭐⭐⭐</span>
                </div>
                <p className={styles.cardText}>{t(`glpTestimonials.${r.textKey}`)}</p>
                <span className={styles.cardDetail}>{t(`glpTestimonials.${r.detailKey}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.btnWrap}>
        <Button onClick={() => { Analytics.trackEvent(`step${currentIndex+1}`,'complete',{page:'glpTestimonials'}); onNext(); }}>
          {t('glpTestimonials.cta')}
        </Button>
      </div>
    </div>
  );
}

export default Page;
