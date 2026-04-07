/* eslint-disable */
import React, { useState } from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import Button from 'src/onboarding/components/ui/button/Button';
import styles from './GlpGoalWeight.module.scss';

function Page() {
  const answer = useStore((state) => state.answer);
  const setAnswer = useStore((state) => state.setAnswer);
  const { onNext, onPrev, currentIndex } = useNav();
  const [val, setVal] = useState(answer ? Number(answer) : 55);

  const handleContinue = () => {
    setAnswer(String(val));
    Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', {
      page: 'glpGoalWeight',
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
        <p className={styles.title}>{t('glpGoalWeight.title')}</p>
        <p className={styles.description}>{t('glpGoalWeight.subtitle')}</p>
      </div>
      <div className={styles.pickerWrap}>
        <div className={styles.picker}>
          <button className={styles.btn} onClick={() => setVal((v) => Math.max(30, v - 1))}>−</button>
          <div className={styles.value}>
            <span className={styles.num}>{val}</span>
            <p className={styles.unit}>kg</p>
          </div>
          <button className={styles.btn} onClick={() => setVal((v) => Math.min(200, v + 1))}>+</button>
        </div>
        <input
          className={styles.slider}
          type="range"
          min={30}
          max={200}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
        />
        <div className={styles.sliderLabels}>
          <span>30</span>
          <span>200</span>
        </div>
      </div>
      <div className={styles.btnWrap}>
        <Button onClick={handleContinue}>{t('glpGoalWeight.cta')}</Button>
      </div>
    </div>
  );
}

export default Page;
