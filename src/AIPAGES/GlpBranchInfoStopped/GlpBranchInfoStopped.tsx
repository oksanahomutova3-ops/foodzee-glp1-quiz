/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import Button from 'src/onboarding/components/ui/button/Button';
import styles from './GlpBranchInfoStopped.module.scss';
import { WOMAN_FOOD } from '../_shared/images';

function Page() {
  const { onNext, onPrev, currentIndex } = useNav();

  return (
    <div className={styles.page}>
      {currentIndex !== 0 && (
        <div className={styles.back} onClick={onPrev}>
          <BackIcon />
        </div>
      )}
      <div className={styles.content}>
        <p className={styles.title}>{t('glpBranchInfoStopped.title')}</p>
        <p className={styles.subtitle}>{t('glpBranchInfoStopped.subtitle')}</p>
        <img src={WOMAN_FOOD} alt="" className={styles.image} />
      </div>
      <div className={styles.btnWrap}>
        <Button
          onClick={() => {
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', { page: 'glpBranchInfoStopped' });
            onNext();
          }}
        >
          {t('glpBranchInfoStopped.cta')}
        </Button>
      </div>
    </div>
  );
}

export default Page;
