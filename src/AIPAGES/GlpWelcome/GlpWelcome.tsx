/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import Button from 'src/onboarding/components/ui/button/Button';
import styles from './GlpWelcome.module.scss';
import { GLP_CARD } from '../_shared/images';

function Page() {
  const { onNext, currentIndex } = useNav();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <p className={styles.title}>{t('glpWelcome.title')}</p>
        <p className={styles.subtitle}>{t('glpWelcome.subtitle')}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.statValue}>{t('glpWelcome.stats.time')}</p>
            <p className={styles.statLabel}>{t('glpWelcome.stats.timeLabel')}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statValue}>{t('glpWelcome.stats.users')}</p>
            <p className={styles.statLabel}>{t('glpWelcome.stats.usersLabel')}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statValue}>{t('glpWelcome.stats.accuracy')}</p>
            <p className={styles.statLabel}>{t('glpWelcome.stats.accuracyLabel')}</p>
          </div>
        </div>
        <div className={styles.heroImage} style={{ backgroundImage: `url(${GLP_CARD})` }} />
      </div>
      <div className={styles.bottom}>
        <p className={styles.privacy}>{t('glpWelcome.privacy')}</p>
        <Button
          onClick={() => {
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', { page: 'glpWelcome' });
            onNext();
          }}
        >
          {t('glpWelcome.cta')}
        </Button>
      </div>
    </div>
  );
}

export default Page;
