export interface MatrixFeatureRow {
  name: string;
  description: string;
  basic: string | boolean;
  plus: string | boolean;
  elite: string | boolean;
}

export interface MatrixCategory {
  category: string;
  icon?: string;
  features: MatrixFeatureRow[];
}

export interface PricingTiersProps {
  className?: string;
}

export type LandingPricingProps = PricingTiersProps;

export interface PricingComparisonMatrixProps {
  className?: string;
}

export interface PricingViewProps {
  className?: string;
}
