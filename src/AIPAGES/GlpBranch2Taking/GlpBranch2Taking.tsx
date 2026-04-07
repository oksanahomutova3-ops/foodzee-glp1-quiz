/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpBranch2Taking.module.scss';

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
        <p className={styles.title}>{t('glpBranch2Taking.title')}</p>
        <p className={styles.description}>{t('glpBranch2Taking.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpBranch2Taking',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="nausea">
            <span>🤢</span> {t('glpBranch2Taking.options.nausea')}
          </Option>
          <Option value="muscle">
            <span>💪</span> {t('glpBranch2Taking.options.muscle')}
          </Option>
          <Option value="energy">
            <span>😴</span> {t('glpBranch2Taking.options.energy')}
          </Option>
          <Option value="food">
            <span>😰</span> {t('glpBranch2Taking.options.food')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
