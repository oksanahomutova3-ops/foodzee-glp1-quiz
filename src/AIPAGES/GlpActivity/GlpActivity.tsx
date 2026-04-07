/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpActivity.module.scss';

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
        <p className={styles.title}>{t('glpActivity.title')}</p>
        <p className={styles.description}>{t('glpActivity.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpActivity',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="none">
            <span>🪑</span> {t('glpActivity.options.none')}
          </Option>
          <Option value="low">
            <span>🚶</span> {t('glpActivity.options.low')}
          </Option>
          <Option value="moderate">
            <span>🏃</span> {t('glpActivity.options.moderate')}
          </Option>
          <Option value="high">
            <span>💪</span> {t('glpActivity.options.high')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
