/* eslint-disable */
import React, { useState } from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import Button from 'src/onboarding/components/ui/button/Button';
import styles from './GlpAge.module.scss';

function Page() {
  const answer = useStore((state) => state.answer);
  const setAnswer = useStore((state) => state.setAnswer);
  const { onNext, onPrev, currentIndex } = useNav();
  const [val, setVal] = useState(answer ? Number(answer) : 35);

  const handleContinue = () => {
    setAnswer(String(val));
    Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
      page: 'glpAge',
      answer: String(val),
    });
    onNext();
  };

  return (
    <div className={styles.page}>
      {currentIndex !== 0 && (
        <div className={styles.back} onClick={onPrev}>
          <BackIcon />
        </div>
      )}
      <div className={styles.wrapperInfo}>
        <p className={styles.title}>{t('glpAge.title')}</p>
        <p className={styles.description}>{t('glpAge.subtitle')}</p>
      </div>
      <div className={styles.pickerWrap}>
        <div className={styles.picker}>
          <button className={styles.btn} onClick={() => setVal((v) => Math.max(18, v - 1))}>−</button>
          <div className={styles.value}>
            <span className={styles.num}>{val}</span>
          </div>
          <button className={styles.btn} onClick={() => setVal((v) => Math.min(80, v + 1))}>+</button>
        </div>
        <input
          className={styles.slider}
          type="range"
          min={18}
          max={80}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
        />
        <div className={styles.sliderLabels}>
          <span>18</span>
          <span>80</span>
        </div>
      </div>
      <div className={styles.btnWrap}>
        <Button onClick={handleContinue}>{t('glpAge.cta')}</Button>
      </div>
    </div>
  );
}

export default Page;
