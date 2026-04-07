/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpBranch2Stopped.module.scss';

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
        <p className={styles.title}>{t('glpBranch2Stopped.title')}</p>
        <p className={styles.description}>{t('glpBranch2Stopped.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpBranch2Stopped',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="fast">
            <span>📈</span> {t('glpBranch2Stopped.options.fast')}
          </Option>
          <Option value="little">
            <span>📊</span> {t('glpBranch2Stopped.options.little')}
          </Option>
          <Option value="no">
            <span>💪</span> {t('glpBranch2Stopped.options.no')}
          </Option>
          <Option value="fear">
            <span>😰</span> {t('glpBranch2Stopped.options.fear')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
