/* eslint-disable */
import React, { useState } from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import { useStore } from '../../store/store';
import { BackIcon } from 'src/onboarding/assets/icons/BackIcon';
import Button from 'src/onboarding/components/ui/button/Button';
import styles from './GlpWeight.module.scss';

function Page() {
  const answer = useStore((state) => state.answer);
  const setAnswer = useStore((state) => state.setAnswer);
  const { onNext, onPrev, currentIndex } = useNav();
  const [val, setVal] = useState(answer ? Number(answer) : 70);

  const HEIGHT_M = 1.65;
  const bmi = (val / (HEIGHT_M * HEIGHT_M)).toFixed(1);
  const bmiCategory = Number(bmi) < 18.5 ? 'underweight' : Number(bmi) < 25 ? 'normal' : Number(bmi) < 30 ? 'overweight' : 'obese';

  const handleContinue = () => {
    setAnswer(String(val));
    Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', { page: 'glpWeight', answer: String(val), bmi });
    onNext();
  };

  return (
    <div className={styles.page}>
      {currentIndex !== 0 && (
        <div className={styles.back} onClick={onPrev}><BackIcon /></div>
      )}
      <div className={styles.wrapperInfo}>
        <p className={styles.title}>{t('glpWeight.title')}</p>
        <p className={styles.description}>{t('glpWeight.subtitle')}</p>
      </div>
      <div className={styles.pickerWrap}>
        <div className={styles.picker}>
          <button className={styles.btn} onClick={() => setVal((v) => Math.max(40, v - 1))}>−</button>
          <div className={styles.value}>
            <span className={styles.num}>{val}</span>
            <p className={styles.unit}>kg</p>
          </div>
          <button className={styles.btn} onClick={() => setVal((v) => Math.min(200, v + 1))}>+</button>
        </div>
        <input className={styles.slider} type="range" min={40} max={200} value={val} onChange={(e) => setVal(Number(e.target.value))} />
        <div className={styles.sliderLabels}><span>40</span><span>200</span></div>
        <div className={styles.bmi}>
          <span className={styles.bmiLabel}>{t('glpWeight.bmiLabel')}: {bmi}</span>
          <span className={styles.bmiCategory}>{t(`glpWeight.bmi.${bmiCategory}`)}</span>
        </div>
      </div>
      <div className={styles.btnWrap}>
        <Button onClick={handleContinue}>{t('glpWeight.cta')}</Button>
      </div>
    </div>
  );
}

export default Page;
