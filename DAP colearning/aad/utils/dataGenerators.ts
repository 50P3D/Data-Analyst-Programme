import { AlgorithmName, DataPoint } from '../types';

export const generateDecisionBoundary = (algorithm: AlgorithmName): DataPoint[] => {
    const points: DataPoint[] = [];

    for (let x = 0; x <= 100; x += 2) {
        let y: number;

        switch (algorithm) {
            case 'CatBoost':
                // More structured, stepped boundary
                if (x < 30) y = 60;
                else if (x < 50) y = 45;
                else if (x < 70) y = 35;
                else y = 25;
                y += Math.sin(x / 10) * 3;
                break;

            case 'LightGBM':
                // More aggressive, complex boundary
                y = 50 + Math.sin(x / 8) * 20 + Math.cos(x / 15) * 10 - x * 0.2;
                break;

            case 'XGBoost':
                // Balanced, smooth boundary
                y = 55 + Math.sin(x / 10) * 15 - x * 0.25;
                break;

            default:
                y = 50;
        }

        points.push({ x, y });
    }

    return points;
};

export const generateClass1Data = (): DataPoint[] => {
    const points: DataPoint[] = [];

    for (let i = 0; i < 30; i++) {
        points.push({
            x: Math.random() * 80 + 10,
            y: Math.random() * 30 + 10
        });
    }

    return points;
};

export const generateClass2Data = (): DataPoint[] => {
    const points: DataPoint[] = [];

    for (let i = 0; i < 30; i++) {
        points.push({
            x: Math.random() * 80 + 10,
            y: Math.random() * 30 + 60
        });
    }

    return points;
};
