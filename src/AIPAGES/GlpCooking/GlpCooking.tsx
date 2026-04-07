/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpCooking.module.scss';

function Page() {
  const answer = useStore((state) => state.answer);
  const setAnswer = useStore((state) => state.setAnswer);
  const { onNext, onPrev, currentIndex } = useNav();

  return (
    <div className={styles.page}>
      {currentIndex !== 0 && (
        <div className={styles.back} onClick={onPrev}>
          <BackIcon />
        </div>
      )}
      <div className={styles.wrapperInfo}>
        <p className={styles.title}>{t('glpCooking.title')}</p>
        <p className={styles.description}>{t('glpCooking.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpCooking',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="15">
            <span>⚡</span> {t('glpCooking.options.15')}
          </Option>
          <Option value="30">
            <span>👩‍🍳</span> {t('glpCooking.options.30')}
          </Option>
          <Option value="60">
            <span>🍳</span> {t('glpCooking.options.60')}
          </Option>
          <Option value="none">
            <span>🛒</span> {t('glpCooking.options.none')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
