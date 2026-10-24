export interface RoutineItem {
  id: string;
  category: string;
  name: string;
  color: string;
}

export interface RoutineDay {
  id: string;
  day: string;
  fullDay: string;
  occasion: string;
  vibe: string;
  items: RoutineItem[];
}

export interface HowItWorksStepsProps {
  className?: string;
}

export type LandingHowItWorksProps = HowItWorksStepsProps;

export interface HowItWorksRoutineProps {
  className?: string;
}

export interface HowItWorksDigitizeGuideProps {
  className?: string;
}

export interface HowItWorksVisualShowcaseProps {
  className?: string;
}

export interface HowItWorksViewProps {
  className?: string;
}
