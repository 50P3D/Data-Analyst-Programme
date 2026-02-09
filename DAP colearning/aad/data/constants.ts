import { Algorithms, PerformanceMetric, RadarFeature, TreeStyles } from './types';

export const algorithms: Algorithms = {
    CatBoost: {
        name: 'CatBoost',
        color: '#FFCC00',
        year: '2017',
        developer: 'Yandex',
        strengths: [
            'Excellent with categorical features',
            'Robust against overfitting',
            'Good default parameters',
            'Handles missing values well'
        ],
        weaknesses: [
            'Slower than LightGBM on large datasets',
            'Less flexible tree structure',
            'Memory intensive'
        ],
        bestFor: 'Datasets with many categorical features and when you need robust, out-of-the-box performance'
    },
    LightGBM: {
        name: 'LightGBM',
        color: '#3498DB',
        year: '2017',
        developer: 'Microsoft',
        strengths: [
            'Extremely fast training speed',
            'Low memory usage',
            'Excellent accuracy',
            'Handles large datasets well'
        ],
        weaknesses: [
            'Can overfit on small datasets',
            'Sensitive to parameters',
            'Less stable than XGBoost'
        ],
        bestFor: 'Large datasets where speed is critical and you have time to tune hyperparameters'
    },
    XGBoost: {
        name: 'XGBoost',
        color: '#E74C3C',
        year: '2014',
        developer: 'Chen & Guestrin',
        strengths: [
            'Most widely used and tested',
            'Excellent documentation',
            'Strong community support',
            'Great balance of speed and accuracy'
        ],
        weaknesses: [
            'Slower than LightGBM',
            'Higher memory usage',
            'Requires more tuning than CatBoost'
        ],
        bestFor: 'General purpose use, competitions, and when you need stable, reliable results'
    }
};

export const performanceData: PerformanceMetric[] = [
    { metric: 'Speed', CatBoost: 70, LightGBM: 95, XGBoost: 75 },
    { metric: 'Accuracy', CatBoost: 88, LightGBM: 90, XGBoost: 92 },
    { metric: 'Memory', CatBoost: 65, LightGBM: 90, XGBoost: 70 },
    { metric: 'Ease of Use', CatBoost: 95, LightGBM: 70, XGBoost: 80 },
    { metric: 'Categorical Support', CatBoost: 100, LightGBM: 75, XGBoost: 60 }
];

export const radarData: RadarFeature[] = [
    { feature: 'Training Speed', CatBoost: 70, LightGBM: 95, XGBoost: 75 },
    { feature: 'Inference Speed', CatBoost: 85, LightGBM: 90, XGBoost: 80 },
    { feature: 'Accuracy', CatBoost: 88, LightGBM: 90, XGBoost: 92 },
    { feature: 'Memory Efficiency', CatBoost: 65, LightGBM: 90, XGBoost: 70 },
    { feature: 'Ease of Use', CatBoost: 95, LightGBM: 70, XGBoost: 80 },
    { feature: 'Categorical Handling', CatBoost: 100, LightGBM: 75, XGBoost: 60 },
    { feature: 'Documentation', CatBoost: 85, LightGBM: 80, XGBoost: 95 },
    { feature: 'Community Support', CatBoost: 75, LightGBM: 85, XGBoost: 95 }
];

export const treeStyles: TreeStyles = {
    CatBoost: {
        desc: 'Symmetric (Oblivious) Trees',
        detail: 'All nodes at the same level use the same split criterion'
    },
    LightGBM: {
        desc: 'Leaf-wise Growth',
        detail: 'Grows trees by splitting the leaf with maximum delta loss'
    },
    XGBoost: {
        desc: 'Level-wise Growth',
        detail: 'Grows trees level by level, splitting all nodes at each level'
    }
};
