export interface Algorithm {
    name: string;
    color: string;
    year: string;
    developer: string;
    strengths: string[];
    weaknesses: string[];
    bestFor: string;
}

export interface Algorithms {
    CatBoost: Algorithm;
    LightGBM: Algorithm;
    XGBoost: Algorithm;
}

export interface PerformanceMetric {
    metric: string;
    CatBoost: number;
    LightGBM: number;
    XGBoost: number;
}

export interface RadarFeature {
    feature: string;
    CatBoost: number;
    LightGBM: number;
    XGBoost: number;
}

export interface TreeStyle {
    desc: string;
    detail: string;
}

export interface TreeStyles {
    CatBoost: TreeStyle;
    LightGBM: TreeStyle;
    XGBoost: TreeStyle;
}

export interface DataPoint {
    x: number;
    y: number;
}

export type AlgorithmName = 'CatBoost' | 'LightGBM' | 'XGBoost';
export type TabName = 'overview' | 'performance' | 'comparison' | 'boundaries' | 'trees' | 'demo';
