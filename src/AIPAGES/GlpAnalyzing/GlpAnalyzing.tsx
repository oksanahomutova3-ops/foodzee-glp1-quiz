/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { t } from '@web-solutions/module-localization';
import { useNav } from '../../hooks/nav';
import styles from './GlpAnalyzing.module.scss';

function Page() {
  const { onNext } = useNav();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [800, 1600, 2400, 3200].map((delay, i) =>
      setTimeout(() => setPhase(i + 1), delay)
    );
    const navTimer = setTimeout(() => onNext(), 4200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(navTimer);
    };
  }, [onNext]);

  const phases = [
    t('glpAnalyzing.phases.analyzing'),
    t('glpAnalyzing.phases.comparing'),
    t('glpAnalyzing.phases.calculating'),
    t('glpAnalyzing.phases.building'),
  ];

  return (
    <div className={styles.page}>
      <div className={styles.ring}>
        <svg viewBox="0 0 150 150" className={styles.svg}>
          <circle cx="75" cy="75" r="65" fill="none" stroke="#f2f3f5" strokeWidth="8" />
          <circle
            cx="75" cy="75" r="65" fill="none" stroke="#00ce00" strokeWidth="8"
            strokeDasharray={408}
            strokeDashoffset={408 - 408 * phase * 0.25}
            strokeLinecap="round"
            className={styles.progress}
          />
        </svg>
        <span className={styles.pct}>{phase * 25}%</span>
      </div>
      <div className={styles.phases}>
        {phases.map((p, i) => (
          <div key={i} className={`${styles.phaseItem} ${i < phase ? styles.done : ''}`}>
            <span className={styles.icon}>{i < phase ? '✓' : '○'}</span>
            <span>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
