/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpBranch1Stopped.module.scss';

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
        <p className={styles.title}>{t('glpBranch1Stopped.title')}</p>
        <p className={styles.description}>{t('glpBranch1Stopped.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpBranch1Stopped',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="cost">
            <span>💰</span> {t('glpBranch1Stopped.options.cost')}
          </Option>
          <Option value="side">
            <span>🤢</span> {t('glpBranch1Stopped.options.side')}
          </Option>
          <Option value="goal">
            <span>✅</span> {t('glpBranch1Stopped.options.goal')}
          </Option>
          <Option value="insurance">
            <span>🔄</span> {t('glpBranch1Stopped.options.insurance')}
          </Option>
          <Option value="other">
            <span>🤔</span> {t('glpBranch1Stopped.options.other')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
