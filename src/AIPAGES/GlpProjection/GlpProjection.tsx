/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import Button from 'src/onboarding/components/ui/button/Button';
import { CHART_IMG } from '../_shared/images';
import styles from './GlpProjection.module.scss';

function Page() {
  const { onNext, onPrev, currentIndex } = useNav();

  return (
    <div className={styles.page}>
      {currentIndex !== 0 && (
        <div className={styles.back} onClick={onPrev}><BackIcon /></div>
      )}
      <div className={styles.content}>
        <p className={styles.title}>{t('glpProjection.title')}</p>
        <p className={styles.subtitle}>{t('glpProjection.subtitle')}</p>
        <img src={CHART_IMG} alt="" className={styles.chart} />
      </div>
      <div className={styles.btnWrap}>
        <Button onClick={() => { Analytics.trackEvent(`step${currentIndex+1}`,'complete',{page:'glpProjection'}); onNext(); }}>
          {t('glpProjection.cta')}
        </Button>
      </div>
    </div>
  );
}

export default Page;
