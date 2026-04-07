/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpGoal.module.scss';

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
        <p className={styles.title}>{t('glpGoal.title')}</p>
        <p className={styles.description}>{t('glpGoal.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpGoal',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="muscle">
            <span>💪</span> {t('glpGoal.options.muscle')}
          </Option>
          <Option value="protein">
            <span>🥩</span> {t('glpGoal.options.protein')}
          </Option>
          <Option value="plan">
            <span>🍽️</span> {t('glpGoal.options.plan')}
          </Option>
          <Option value="side">
            <span>🌿</span> {t('glpGoal.options.side')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
