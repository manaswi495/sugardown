import {useCallback, useEffect, useState} from 'react';

type PainCard = {
  n: string;
  t: string;
  d: string;
};

const PAINS: PainCard[] = [
  {
    n: '01',
    t: 'Sugar spikes even after medicine',
    d: 'You take your pills on time. Yet the sugar report still disappoints.',
  },
  {
    n: '02',
    t: 'Exhausted by 2 PM every day',
    d: 'That afternoon crash. No energy to work, play or even talk.',
  },
  {
    n: '03',
    t: 'Sleepless nights worsening sugar',
    d: 'Poor sleep raises cortisol. Cortisol spikes blood sugar.',
  },
  {
    n: '04',
    t: 'Zero guidance on what to eat',
    d: 'Doctors say “eat less sugar.” No meal plan, no follow-up.',
  },
  {
    n: '05',
    t: 'Years on medicines with no end',
    d: 'Allopathic medicines manage. They don’t heal.',
  },
  {
    n: '06',
    t: 'Bought products. Got no support.',
    d: 'You ordered. It arrived. Then — silence.',
  },
];

type SlideState = {current: number; exiting: number | null};

export function HomePainStack() {
  const [slide, setSlide] = useState<SlideState>({
    current: 0,
    exiting: null,
  });

  useEffect(() => {
    if (slide.exiting === null) return;
    const t = window.setTimeout(() => {
      setSlide((s) => ({...s, exiting: null}));
    }, 600);
    return () => clearTimeout(t);
  }, [slide.exiting]);

  const goTo = useCallback((rawNext: number) => {
    const n = PAINS.length;
    const next = ((rawNext % n) + n) % n;
    setSlide((s) => {
      if (s.current === next) return s;
      return {current: next, exiting: s.current};
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => {
        const n = PAINS.length;
        const next = (s.current + 1) % n;
        return {current: next, exiting: s.current};
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const cardClass = (i: number) => {
    const n = PAINS.length;
    const {current, exiting} = slide;
    if (exiting !== null && i === exiting) {
      return 'review-stack-card pain-stack-card exit';
    }
    if (i === current) return 'review-stack-card pain-stack-card active';
    if (i === (current + 1) % n) return 'review-stack-card pain-stack-card next-1';
    if (i === (current + 2) % n) return 'review-stack-card pain-stack-card next-2';
    return 'review-stack-card pain-stack-card';
  };

  return (
    <div
      className="pain-slider-container"
      aria-roledescription="carousel"
      aria-label="Common diabetes struggles"
    >
      <div
        className="pain-slider-inner"
        onClick={() => goTo(slide.current + 1)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goTo(slide.current + 1);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Show next card"
      >
        {PAINS.map((x, i) => (
          <article key={x.n} className={cardClass(i)}>
            <div className="pain-stack-card-inner">
              <div className="pain-num">{x.n}</div>
              <div className="pain-title">{x.t}</div>
              <div className="pain-desc">{x.d}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="slider-nav">
        <button
          type="button"
          className="nav-btn"
          aria-label="Previous card"
          onClick={(e) => {
            e.stopPropagation();
            goTo(slide.current - 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="nav-btn"
          aria-label="Next card"
          onClick={(e) => {
            e.stopPropagation();
            goTo(slide.current + 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="slider-dots">
        {PAINS.map((x, i) => (
          <button
            key={x.n}
            type="button"
            className={`dot${i === slide.current ? ' active' : ''}`}
            aria-label={`Go to card ${x.n}`}
            aria-current={i === slide.current ? true : undefined}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
