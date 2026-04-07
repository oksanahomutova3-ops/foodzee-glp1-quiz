/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpWater.module.scss';

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
        <p className={styles.title}>{t('glpWater.title')}</p>
        <p className={styles.description}>{t('glpWater.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpWater',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="low">
            <span>💧</span> {t('glpWater.options.low')}
          </Option>
          <Option value="ok">
            <span>💦</span> {t('glpWater.options.ok')}
          </Option>
          <Option value="good">
            <span>🌊</span> {t('glpWater.options.good')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
