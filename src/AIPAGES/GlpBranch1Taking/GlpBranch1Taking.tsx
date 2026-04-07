/* eslint-disable */
import React from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { Check } from '../../components/ui/check/Check';
import { Option } from '../../components/ui/check/Option';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import styles from './GlpBranch1Taking.module.scss';

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
        <p className={styles.title}>{t('glpBranch1Taking.title')}</p>
        <p className={styles.description}>{t('glpBranch1Taking.subtitle')}</p>
      </div>
      <div className={styles.controls}>
        <Check
          defaultValue={answer}
          onChange={(value) => {
            setAnswer(value);
            Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
              page: 'glpBranch1Taking',
              answer: value,
            });
            onNext();
          }}
        >
          <Option value="<1m">
            <span>🌱</span> {t('glpBranch1Taking.options.<1m')}
          </Option>
          <Option value="1-3m">
            <span>📊</span> {t('glpBranch1Taking.options.1-3m')}
          </Option>
          <Option value="3-6m">
            <span>📈</span> {t('glpBranch1Taking.options.3-6m')}
          </Option>
          <Option value=">6m">
            <span>⭐</span> {t('glpBranch1Taking.options.>6m')}
          </Option>
        </Check>
      </div>
    </div>
  );
}

export default Page;
