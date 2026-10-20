export interface MatrixFeatureRow {
  name: string;
  description: string;
  free: string | boolean;
  premium: string | boolean;
}

export interface MatrixCategory {
  category: string;
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