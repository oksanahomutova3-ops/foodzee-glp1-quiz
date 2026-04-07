/* eslint-disable */
import React, { useState } from 'react';
import { t } from '@web-solutions/module-localization';
import Analytics from '@web-solutions/module-analytics';
import { useNav } from '../../hooks/nav';
import Button from 'src/onboarding/components/ui/button/Button';
import { DR_IMG, BODY_IMG, FACES_IMG, DIAGRAM_IMG, EAT1_IMG, EAT2_IMG, EAT3_IMG, EAT4_IMG } from '../_shared/images';
import styles from './GlpPaywall.module.scss';

const MEALS = [
  { img: EAT1_IMG, meal: 'Greek yogurt with chia seeds', type: 'Breakfast', cal: '400 kcal' },
  { img: EAT2_IMG, meal: 'Beef stroganoff with barley', type: 'Lunch', cal: '500 kcal' },
  { img: EAT3_IMG, meal: 'Toast with berries and cream', type: 'Snack', cal: '320 kcal' },
  { img: EAT4_IMG, meal: 'Turkey wrap with cucumber', type: 'Dinner', cal: '420 kcal' },
  { img: EAT1_IMG, meal: 'Overnight oats with banana', type: 'Breakfast', cal: '380 kcal' },
  { img: EAT2_IMG, meal: 'Chicken bowl with quinoa', type: 'Lunch', cal: '480 kcal' },
  { img: EAT3_IMG, meal: 'Avocado toast with egg', type: 'Snack', cal: '350 kcal' },
  { img: EAT4_IMG, meal: 'Turkey wrap with cucumber', type: 'Dinner', cal: '420 kcal' },
  { img: EAT1_IMG, meal: 'Greek yogurt with chia seeds', type: 'Breakfast', cal: '400 kcal' },
  { img: EAT2_IMG, meal: 'Beef stroganoff with barley', type: 'Lunch', cal: '500 kcal' },
  { img: EAT3_IMG, meal: 'Toast with berries and cream', type: 'Snack', cal: '320 kcal' },
  { img: EAT4_IMG, meal: 'Turkey wrap with cucumber', type: 'Dinner', cal: '420 kcal' },
];

function Page() {
  const { currentIndex } = useNav();
  const [plan, setPlan] = useState('year');

  const handleStart = () => {
    Analytics.trackEvent(`step${currentIndex + 1}`, 'complete', { page: 'glpPaywall', plan });
  };

  return (
    <div className={styles.page}>
      {/* Hero title */}
      <p className={styles.title}>{t('glpPaywall.title')}</p>

      {/* Personal goals - blurred */}
      <div className={styles.dashboard}>
        <div className={styles.dashboardPhoto} style={{ backgroundImage: `url(${BODY_IMG})` }} />
        <div className={styles.dashboardData}>
          <p className={styles.dashboardTitle}>{t('glpPaywall.dashboard.title')}</p>
          {['calories','protein','metabolic','nutrients','hydration'].map((k) => (
            <div key={k} className={styles.dashboardItem}>
              <p className={styles.dashboardLabel}>{t(`glpPaywall.dashboard.${k}`)}</p>
              <p className={styles.dashboardValue}>{t(`glpPaywall.dashboard.${k}Value`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      {[
        { id: 'week', hasTag: false },
        { id: 'year', hasTag: true },
        { id: 'month', hasTag: false },
      ].map((p) => (
        <div key={p.id} className={styles.planCardWrap}>
          {p.hasTag && <span className={styles.planTag}>{t('glpPaywall.plans.yearTag')}</span>}
          <div
            className={`${styles.planCard} ${plan === p.id ? styles.planActive : ''}`}
            onClick={() => setPlan(p.id)}
          >
            <div className={styles.planInfo}>
              <p className={styles.planName}>{t(`glpPaywall.plans.${p.id}Name`)}</p>
              <p className={styles.planSub}>{t(`glpPaywall.plans.${p.id}Sub`)}</p>
            </div>
            <div className={`${styles.planBadge} ${plan === p.id ? styles.planBadgeActive : ''}`}>
              <p className={styles.planBadgePrice}>{t(`glpPaywall.plans.${p.id}Price`)}</p>
              <p className={styles.planBadgeSub}>{t(`glpPaywall.plans.${p.id}Period`)}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Doctor endorsement */}
      <div className={styles.doctor}>
        <div className={styles.doctorInfo}>
          <p className={styles.doctorName}>{t('glpPaywall.doctor.name')}</p>
          <p className={styles.doctorRole}>{t('glpPaywall.doctor.role')}</p>
        </div>
        <div className={styles.doctorPhoto} style={{ backgroundImage: `url(${DR_IMG})` }} />
        <div className={styles.doctorQuote}>
          <p className={styles.doctorText}>{t('glpPaywall.doctor.quote')}</p>
        </div>
      </div>

      {/* 7-day meal plan - scrolling blurred cards */}
      <div className={styles.mealSection}>
        <p className={styles.mealTitle}>{t('glpPaywall.meals.title')}</p>
        <div className={styles.mealScroll}>
          <div className={styles.mealTrack}>
            {MEALS.map((m, i) => (
              <div key={i} className={styles.mealCard}>
                <div className={styles.mealImgWrap}>
                  <img src={m.img} alt="" className={styles.mealImg} />
                </div>
                <div className={styles.mealBlur}>
                  <p className={styles.mealName}>{m.meal}</p>
                  <div className={styles.mealMeta}>
                    <span>{m.type}</span>
                    <span>{m.cal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal text */}
      <div className={styles.legal}>
        <p className={styles.legalAccept}>{t('glpPaywall.legal.accept')}</p>
        <p className={styles.legalTerms}>{t('glpPaywall.legal.terms')}</p>
      </div>

      {/* Diagram */}
      <img src={DIAGRAM_IMG} alt="" className={styles.diagram} />

      {/* Features */}
      <p className={styles.sectionTitle}>{t('glpPaywall.features.title')}</p>
      <div className={styles.featuresList}>
        {['f1','f2','f3','f4','f5'].map((k) => (
          <div key={k} className={styles.featureItem}>
            <span className={styles.featureIcon}>{t(`glpPaywall.features.${k}Icon`)}</span>
            <div>
              <p className={styles.featureTitle}>{t(`glpPaywall.features.${k}`)}</p>
              <p className={styles.featureDesc}>{t(`glpPaywall.features.${k}Desc`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews - green bg */}
      <div className={styles.reviews}>
        <p className={styles.reviewsTitle}>{t('glpPaywall.reviews.title')}</p>
        {['r1','r2','r3'].map((k) => (
          <div key={k} className={styles.reviewCard}>
            <span className={styles.reviewStars}>★★★★★</span>
            <p className={styles.reviewText}>{t(`glpPaywall.reviews.${k}Text`)}</p>
            <p className={styles.reviewName}>{t(`glpPaywall.reviews.${k}Name`)}</p>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div className={styles.social}>
        <div className={styles.socialContent}>
          <p className={styles.socialNumber}>{t('glpPaywall.social.number')}</p>
          <p className={styles.socialLabel}>{t('glpPaywall.social.label')}</p>
        </div>
        <img src={FACES_IMG} alt="" className={styles.socialImg} />
      </div>

      {/* Guarantee */}
      <div className={styles.guarantee}>
        <p className={styles.guaranteeIcon}>🤝</p>
        <p className={styles.guaranteeTitle}>{t('glpPaywall.guarantee.title')}</p>
        <p className={styles.guaranteeText}>{t('glpPaywall.guarantee.text')}</p>
      </div>

      {/* Sticky CTA */}
      <div className={styles.sticky}>
        <Button onClick={handleStart}>{t('glpPaywall.cta')}</Button>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerContact}>{t('glpPaywall.footer.contact')}</p>
        <p className={styles.footerAddress}>{t('glpPaywall.footer.address')}</p>
      </div>
    </div>
  );
}

export default Page;
