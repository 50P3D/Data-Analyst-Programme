import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    Scatter,
    ComposedChart
} from 'recharts';
import '../styles/TreeVisualization.css';

interface Step {
    step: number;
    title: string;
    description: string;
    visual: string;
    code?: string;
}

export const gradientBoostingSteps: Step[] = [
    {
        step: 1,
        title: "Initialize with Base Prediction",
        description: "Start with a simple prediction - typically the mean of all target values. This is our baseline model (F₀).",
        visual: "base",
        code: `// Initial prediction (mean)
F₀(x) = mean(y) = 5.0

// For dataset: [3, 4, 5, 6, 7]
// Initial prediction: 5.0 for all samples`
    },
    {
        step: 2,
        title: "Calculate Residuals",
        description: "Compute the errors (residuals) between actual values and current predictions. These residuals show what we need to improve.",
        visual: "residuals",
        code: `// Residuals = Actual - Predicted
residual₁ = 3 - 5 = -2
residual₂ = 4 - 5 = -1
residual₃ = 5 - 5 =  0
residual₄ = 6 - 5 =  1
residual₅ = 7 - 5 =  2`
    },
    {
        step: 3,
        title: "Build Tree on Residuals",
        description: "Train a new decision tree to predict the residuals (not the original targets). This tree learns the patterns in our errors.",
        visual: "tree",
        code: `// Tree learns to predict residuals
Tree₁ predicts:
  - Sample 1: -1.8  (actual residual: -2)
  - Sample 2: -0.9  (actual residual: -1)
  - Sample 3:  0.1  (actual residual:  0)
  - Sample 4:  1.1  (actual residual:  1)
  - Sample 5:  1.9  (actual residual:  2)`
    },
    {
        step: 4,
        title: "Update Predictions",
        description: "Add the new tree's predictions to our current model, multiplied by a learning rate (η). This gradually improves our predictions.",
        visual: "update",
        code: `// Update: F₁(x) = F₀(x) + η × Tree₁(x)
// With learning rate η = 0.1

F₁(x₁) = 5.0 + 0.1 × (-1.8) = 4.82
F₁(x₂) = 5.0 + 0.1 × (-0.9) = 4.91
F₁(x₃) = 5.0 + 0.1 × (0.1)  = 5.01
F₁(x₄) = 5.0 + 0.1 × (1.1)  = 5.11
F₁(x₅) = 5.0 + 0.1 × (1.9)  = 5.19`
    },
    {
        step: 5,
        title: "Iterate the Process",
        description: "Repeat steps 2-4 for many iterations (100-1000+). Each new tree corrects the mistakes of the previous ensemble.",
        visual: "iterate",
        code: `// After iteration m:
F_m(x) = F_{m-1}(x) + η × Tree_m(x)

// Final prediction after M trees:
F_M(x) = F₀(x) + η × Σ(Tree_m(x))
         where m = 1 to M

// Each tree focuses on different errors`
    },
    {
        step: 6,
        title: "Final Ensemble Model",
        description: "The final model is an ensemble of all trees. Each contributes a small correction, resulting in accurate predictions.",
        visual: "ensemble",
        code: `// Final Gradient Boosting Model:
Prediction = Initial + Learning_Rate × (
  Tree₁ + Tree₂ + Tree₃ + ... + Tree_n
)

// Strong learner from weak learners!
// Accuracy improves with each iteration`
    }
];

interface StepVisualizationProps {
    step: number;
}

export const StepVisualization: React.FC<StepVisualizationProps> = ({ step }) => {
    const currentStep = gradientBoostingSteps[step - 1];

    const renderVisual = () => {
        switch (currentStep.visual) {
            case 'base':
                return (
                    <svg viewBox="0 0 600 200" className="demo-svg">
                        <rect x="50" y="50" width="500" height="100" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" rx="5" />
                        <text x="300" y="90" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0369a1">
                            F₀(x) = 5.0
                        </text>
                        <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#075985">
                            Initial Prediction (Mean of Target Values)
                        </text>
                    </svg>
                );

            case 'residuals':
                return (
                    <svg viewBox="0 0 600 250" className="demo-svg">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
                            </marker>
                        </defs>
                        {[
                            { x: 80, actual: 80, pred: 120, residual: -2 },
                            { x: 180, actual: 100, pred: 120, residual: -1 },
                            { x: 280, actual: 120, pred: 120, residual: 0 },
                            { x: 380, actual: 140, pred: 120, residual: 1 },
                            { x: 480, actual: 160, pred: 120, residual: 2 }
                        ].map((item, idx) => (
                            <g key={idx}>
                                <circle cx={item.x} cy={item.actual} r="6" fill="#16a34a" />
                                <circle cx={item.x} cy={item.pred} r="6" fill="#2563eb" />
                                <line
                                    x1={item.x} y1={item.pred}
                                    x2={item.x} y2={item.actual}
                                    stroke="#dc2626" strokeWidth="2"
                                    strokeDasharray="5,5"
                                    markerEnd="url(#arrowhead)"
                                />
                                <text x={item.x} y="200" textAnchor="middle" fontSize="12" fill="#374151">
                                    {item.residual > 0 ? '+' : ''}{item.residual}
                                </text>
                            </g>
                        ))}
                        <circle cx="550" cy="30" r="5" fill="#16a34a" />
                        <text x="560" y="35" fontSize="12">Actual</text>
                        <circle cx="550" cy="50" r="5" fill="#2563eb" />
                        <text x="560" y="55" fontSize="12">Predicted</text>
                    </svg>
                );

            case 'tree':
                return (
                    <svg viewBox="0 0 500 280" className="demo-svg">
                        <circle cx="250" cy="40" r="30" fill="#8b5cf6" stroke="#000" strokeWidth="2" />
                        <text x="250" y="33" textAnchor="middle" fontSize="12" fontWeight="bold">Tree</text>
                        <text x="250" y="48" textAnchor="middle" fontSize="11">on Residuals</text>

                        <line x1="250" y1="70" x2="150" y2="120" stroke="#000" strokeWidth="2" />
                        <line x1="250" y1="70" x2="350" y2="120" stroke="#000" strokeWidth="2" />

                        <circle cx="150" cy="130" r="25" fill="#a78bfa" stroke="#000" strokeWidth="2" />
                        <text x="150" y="135" textAnchor="middle" fontSize="11" fontWeight="bold">Split</text>

                        <circle cx="350" cy="130" r="25" fill="#a78bfa" stroke="#000" strokeWidth="2" />
                        <text x="350" y="135" textAnchor="middle" fontSize="11" fontWeight="bold">Split</text>

                        <line x1="150" y1="155" x2="100" y2="200" stroke="#000" strokeWidth="2" />
                        <line x1="150" y1="155" x2="200" y2="200" stroke="#000" strokeWidth="2" />
                        <line x1="350" y1="155" x2="300" y2="200" stroke="#000" strokeWidth="2" />
                        <line x1="350" y1="155" x2="400" y2="200" stroke="#000" strokeWidth="2" />

                        {[
                            { x: 100, y: 210, val: '-1.8' },
                            { x: 200, y: 210, val: '-0.9' },
                            { x: 300, y: 210, val: '1.1' },
                            { x: 400, y: 210, val: '1.9' }
                        ].map((leaf, idx) => (
                            <g key={idx}>
                                <rect x={leaf.x - 25} y={leaf.y} width="50" height="35" fill="#c4b5fd" stroke="#000" strokeWidth="2" rx="5" />
                                <text x={leaf.x} y={leaf.y + 22} textAnchor="middle" fontSize="13" fontWeight="bold">{leaf.val}</text>
                            </g>
                        ))}
                    </svg>
                );

            case 'update':
                return (
                    <svg viewBox="0 0 600 200" className="demo-svg">
                        <rect x="50" y="30" width="150" height="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="5" />
                        <text x="125" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">F₀(x)</text>
                        <text x="125" y="75" textAnchor="middle" fontSize="12" fill="#1e40af">Old Prediction</text>

                        <text x="235" y="65" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#059669">+</text>

                        <rect x="270" y="30" width="150" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" rx="5" />
                        <text x="345" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">η × Tree(x)</text>
                        <text x="345" y="70" textAnchor="middle" fontSize="11" fill="#15803d">Learning Rate</text>
                        <text x="345" y="85" textAnchor="middle" fontSize="11" fill="#15803d">× Tree Output</text>

                        <text x="300" y="125" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#374151">↓</text>

                        <rect x="200" y="140" width="200" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="5" />
                        <text x="300" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b45309">F₁(x) = F₀(x) + η × Tree₁(x)</text>
                        <text x="300" y="180" textAnchor="middle" fontSize="12" fill="#92400e">New Improved Prediction</text>
                    </svg>
                );

            case 'iterate':
                return (
                    <svg viewBox="0 0 600 280" className="demo-svg">
                        {[1, 2, 3, 4].map((i) => (
                            <g key={i}>
                                <circle
                                    cx={50 + i * 120}
                                    cy="80"
                                    r="35"
                                    fill={`hsl(${240 + i * 30}, 70%, ${60 + i * 5}%)`}
                                    stroke="#000"
                                    strokeWidth="2"
                                />
                                <text
                                    x={50 + i * 120}
                                    y="75"
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="bold"
                                >
                                    Tree {i}
                                </text>
                                <text
                                    x={50 + i * 120}
                                    y="90"
                                    textAnchor="middle"
                                    fontSize="10"
                                >
                                    Iteration {i}
                                </text>
                                {i < 4 && (
                                    <path
                                        d={`M ${90 + i * 120} 80 L ${130 + i * 120} 80`}
                                        stroke="#000"
                                        strokeWidth="2"
                                        fill="none"
                                        markerEnd="url(#arrow)"
                                    />
                                )}
                            </g>
                        ))}
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="#000" />
                            </marker>
                        </defs>
                        <text x="300" y="160" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#374151">
                            Each tree corrects previous errors
                        </text>
                        <text x="300" y="190" textAnchor="middle" fontSize="13" fill="#6b7280">
                            Error ↓ with each iteration
                        </text>
                        <rect x="150" y="210" width="300" height="40" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" rx="5" />
                        <text x="300" y="235" textAnchor="middle" fontSize="12" fill="#991b1b">
                            Typically: 100 - 1000+ trees for best results
                        </text>
                    </svg>
                );

            case 'ensemble':
                return (
                    <svg viewBox="0 0 600 300" className="demo-svg">
                        <rect x="50" y="20" width="500" height="180" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3" rx="10" />
                        <text x="300" y="50" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#15803d">
                            Gradient Boosting Ensemble
                        </text>

                        {[0, 1, 2, 3, 4].map((i) => (
                            <g key={i}>
                                <rect
                                    x={80 + i * 90}
                                    y="70"
                                    width="70"
                                    height="100"
                                    fill={`hsl(${150 + i * 20}, 60%, 70%)`}
                                    stroke="#166534"
                                    strokeWidth="2"
                                    rx="5"
                                />
                                <text
                                    x={115 + i * 90}
                                    y="110"
                                    textAnchor="middle"
                                    fontSize="11"
                                    fontWeight="bold"
                                >
                                    {i === 0 ? 'F₀' : `Tree ${i}`}
                                </text>
                                <text
                                    x={115 + i * 90}
                                    y="130"
                                    textAnchor="middle"
                                    fontSize="9"
                                >
                                    {i === 0 ? 'Base' : `+ η×T${i}`}
                                </text>
                                {i < 4 && (
                                    <text
                                        x={150 + i * 90}
                                        y="125"
                                        textAnchor="middle"
                                        fontSize="20"
                                        fontWeight="bold"
                                        fill="#059669"
                                    >
                                        +
                                    </text>
                                )}
                            </g>
                        ))}

                        <text x="300" y="230" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#047857">
                            = Accurate Final Prediction
                        </text>
                        <text x="300" y="265" textAnchor="middle" fontSize="13" fill="#065f46">
                            Many weak learners → One strong learner
                        </text>
                    </svg>
                );

            default:
                return null;
        }
    };

    return <div className="step-visual">{renderVisual()}</div>;
};

// Data generation for animated convergence visualization
const generateTrueFunction = () => {
    const data = [];
    for (let x = 0; x <= 10; x += 0.2) {
        data.push({
            x: x,
            trueValue: 3 * Math.sin(x * 0.8) + 5,
        });
    }
    return data;
};

const generateDataPoints = () => {
    const points = [];
    for (let i = 0; i <= 10; i += 1) {
        const trueY = 3 * Math.sin(i * 0.8) + 5;
        points.push({
            x: i,
            y: trueY + (Math.random() - 0.5) * 1.5, // Add noise
        });
    }
    return points;
};

const generatePredictionCurve = (iteration: number) => {
    const data = [];

    for (let x = 0; x <= 10; x += 0.2) {
        // Start with mean prediction
        let prediction = 5;

        // Add correction from boosting iterations
        if (iteration > 0) {
            // Simulate gradual convergence to true function
            const trueValue = 3 * Math.sin(x * 0.8) + 5;
            const convergenceRate = Math.min(iteration / 100, 1);
            const correction = (trueValue - 5) * convergenceRate;
            prediction = 5 + correction + (Math.random() - 0.5) * 0.3 * (1 - convergenceRate);
        }

        data.push({
            x: x,
            prediction: prediction,
        });
    }
    return data;
};

// Animated Convergence Component
export const AnimatedConvergence: React.FC = () => {
    const [iteration, setIteration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trueFunction] = useState(generateTrueFunction());
    const [dataPoints] = useState(generateDataPoints());

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && iteration < 100) {
            interval = setInterval(() => {
                setIteration(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 100); // Update every 100ms
        }
        return () => clearInterval(interval);
    }, [isPlaying, iteration]);

    const predictionCurve = generatePredictionCurve(iteration);

    // Combine data for the chart - merge training points into the dataset
    const chartData = trueFunction.map((point, idx) => {
        // Find if there's a training data point at this x value
        const trainingPoint = dataPoints.find(dp => Math.abs(dp.x - point.x) < 0.1);

        return {
            x: point.x,
            trueValue: point.trueValue,
            prediction: predictionCurve[idx]?.prediction,
            trainingData: trainingPoint ? trainingPoint.y : null,
        };
    });

    const handlePlayPause = () => {
        if (iteration >= 100) {
            setIteration(0);
        }
        setIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        setIteration(0);
        setIsPlaying(false);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIteration(parseInt(e.target.value));
        setIsPlaying(false);
    };

    return (
        <div className="chart-container" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151', textAlign: 'center' }}>
                Boosting Convergence Animation
            </h4>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Watch how predictions gradually converge to the true function as more trees are added
            </p>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="x"
                        type="number"
                        label={{ value: 'Input Feature (x)', position: 'insideBottom', offset: -10 }}
                        domain={[0, 10]}
                    />
                    <YAxis
                        label={{ value: 'Prediction', angle: -90, position: 'insideLeft' }}
                        domain={[0, 10]}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #cbd5e1' }}
                        formatter={(value: any) => typeof value === 'number' ? value.toFixed(2) : value}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '10px' }}
                    />

                    {/* True function - blue sine wave */}
                    <Line
                        type="monotone"
                        dataKey="trueValue"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="True Function"
                        dot={false}
                        isAnimationActive={false}
                    />

                    {/* Predicted function - red/orange line that converges */}
                    <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#ef4444"
                        strokeWidth={3}
                        name={`Prediction (${iteration} trees)`}
                        dot={false}
                        isAnimationActive={false}
                    />

                    {/* Training data points - now as scatter that will show up! */}
                    <Scatter
                        dataKey="trainingData"
                        fill="#10b981"
                        name="Training Data (noisy observations)"
                        isAnimationActive={false}
                        shape={(props: any) => {
                            if (props.payload.trainingData === null) return null;
                            return (
                                <circle
                                    cx={props.cx}
                                    cy={props.cy}
                                    r={7}
                                    fill="#10b981"
                                    stroke="#065f46"
                                    strokeWidth={2.5}
                                />
                            );
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>

            {/* Animation Controls */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button
                        onClick={handlePlayPause}
                        style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: isPlaying ? '#ef4444' : '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s',
                        }}
                    >
                        {isPlaying ? '⏸ Pause' : (iteration >= 100 ? '↻ Replay' : '▶ Play')}
                    </button>
                    <button
                        onClick={handleReset}
                        style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                        }}
                    >
                        ⟲ Reset
                    </button>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
                        Iteration: {iteration} / 100
                    </div>
                </div>

                {/* Slider */}
                <div style={{ marginBottom: '0.5rem' }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={iteration}
                        onChange={handleSliderChange}
                        style={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    />
                </div>

                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.75rem' }}>
                    {iteration === 0 && "Initial prediction (flat line at mean value)"}
                    {iteration > 0 && iteration < 30 && "Early iterations: Large corrections being made"}
                    {iteration >= 30 && iteration < 70 && "Mid-stage: Predictions getting closer to true function"}
                    {iteration >= 70 && iteration < 100 && "Late stage: Fine-tuning predictions"}
                    {iteration >= 100 && "Converged! Predictions closely match the true function 🎯"}
                </p>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', borderLeft: '4px solid #3b82f6' }}>
                <p style={{ margin: 0, color: '#1e40af', fontSize: '0.9rem' }}>
                    <strong>💡 Key Insight:</strong> The red prediction line starts flat (mean prediction) and gradually bends
                    to match the blue true function as more trees are added. Each tree makes a small correction,
                    and together they learn the complex pattern!
                </p>
            </div>
        </div>
    );
};

// Sample data for graphs showing gradient boosting progress
export const generateIterationData = (step: number) => {
    const iterations = [];
    const learningRate = 0.1;

    for (let i = 0; i <= Math.min(step * 2, 10); i++) {
        const loss = 10 * Math.exp(-i * 0.4) + Math.random() * 0.3;
        const trainAccuracy = 100 * (1 - Math.exp(-i * 0.3));
        const valAccuracy = 100 * (1 - Math.exp(-i * 0.35)) - Math.random() * 5;

        iterations.push({
            iteration: i,
            loss: parseFloat(loss.toFixed(2)),
            trainAccuracy: parseFloat(trainAccuracy.toFixed(1)),
            valAccuracy: parseFloat(valAccuracy.toFixed(1))
        });
    }

    return iterations;
};

export const generatePredictionData = (step: number) => {
    const actualValues = [3, 4, 5, 6, 7];
    const data = actualValues.map((actual, idx) => {
        let prediction = 5.0; // Initial mean

        if (step >= 2) {
            // After first iteration
            const residual1 = actual - 5.0;
            prediction = 5.0 + 0.1 * (residual1 * 0.9); // Learning rate 0.1
        }

        if (step >= 4) {
            // After second iteration
            const residual1 = actual - 5.0;
            const pred1 = 5.0 + 0.1 * (residual1 * 0.9);
            const residual2 = actual - pred1;
            prediction = pred1 + 0.1 * (residual2 * 0.85);
        }

        if (step >= 5) {
            // After third iteration (more accurate)
            prediction = actual + (Math.random() - 0.5) * 0.3;
        }

        return {
            sample: `S${idx + 1}`,
            actual,
            prediction: parseFloat(prediction.toFixed(2)),
            residual: parseFloat((actual - prediction).toFixed(2))
        };
    });

    return data;
};

export const generateLossReductionData = (step: number) => {
    return [
        { stage: 'Initial', loss: 10.0, color: '#ef4444' },
        { stage: 'After Tree 1', loss: step >= 3 ? 6.5 : 10.0, color: '#f97316' },
        { stage: 'After Tree 2', loss: step >= 4 ? 4.2 : step >= 3 ? 6.5 : 10.0, color: '#f59e0b' },
        { stage: 'After Tree 3', loss: step >= 5 ? 2.8 : step >= 4 ? 4.2 : step >= 3 ? 6.5 : 10.0, color: '#84cc16' },
        { stage: 'Final', loss: step >= 6 ? 1.2 : step >= 5 ? 2.8 : step >= 4 ? 4.2 : step >= 3 ? 6.5 : 10.0, color: '#10b981' }
    ].filter((_, idx) => idx <= step);
};

interface GraphVisualizationProps {
    step: number;
}

export const GraphVisualization: React.FC<GraphVisualizationProps> = ({ step }) => {
    const iterationData = generateIterationData(step);
    const predictionData = generatePredictionData(step);
    const lossReductionData = generateLossReductionData(step);

    if (step <= 1) {
        // Show initial state - no improvement yet
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Initial Predictions vs Actual Values
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={predictionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sample" />
                            <YAxis domain={[0, 8]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="actual" fill="#10b981" name="Actual Value" />
                            <Bar dataKey="prediction" fill="#3b82f6" name="Initial Prediction (Mean)" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        All predictions start at the mean (5.0) - clearly not accurate for all samples!
                    </p>
                </div>
            </div>
        );
    }

    if (step === 2) {
        // Show residuals
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Residuals (Errors) After Initial Prediction
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={predictionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sample" />
                            <YAxis domain={[-3, 3]} />
                            <Tooltip />
                            <Legend />
                            <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
                            <Bar dataKey="residual" fill="#dc2626" name="Residual (Actual - Predicted)">
                                {predictionData.map((entry, index) => (
                                    <Bar key={`cell-${index}`} fill={entry.residual > 0 ? '#dc2626' : '#3b82f6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Positive residuals (red) = underestimated, Negative residuals (blue) = overestimated
                    </p>
                </div>
            </div>
        );
    }

    if (step === 3) {
        // Show how tree learns residuals
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Loss Reduction with First Tree
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={lossReductionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="stage" />
                            <YAxis domain={[0, 12]} label={{ value: 'Loss (MSE)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="loss" name="Mean Squared Error">
                                {lossReductionData.map((entry, index) => (
                                    <Bar key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        First tree significantly reduces the error by learning residual patterns
                    </p>
                </div>
            </div>
        );
    }

    if (step === 4) {
        // Show updated predictions
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Improved Predictions After First Update
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={predictionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sample" />
                            <YAxis domain={[0, 8]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="actual" fill="#10b981" name="Actual Value" />
                            <Bar dataKey="prediction" fill="#8b5cf6" name="Updated Prediction" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Predictions are now closer to actual values after adding the first tree's contribution
                    </p>
                </div>
            </div>
        );
    }

    if (step === 5) {
        // Show iteration progress
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Loss Over Iterations
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={iterationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="iteration" label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="loss" stroke="#dc2626" strokeWidth={3} name="Training Loss" />
                        </LineChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Error decreases exponentially with each boosting iteration
                    </p>
                </div>

                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Cumulative Loss Reduction
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={lossReductionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="stage" angle={-15} textAnchor="end" height={80} />
                            <YAxis domain={[0, 12]} />
                            <Tooltip />
                            <Bar dataKey="loss" name="Mean Squared Error">
                                {lossReductionData.map((entry, index) => (
                                    <Bar key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Each tree contributes to progressively lower error
                    </p>
                </div>
            </div>
        );
    }

    if (step === 6) {
        // Show final ensemble performance
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Training vs Validation Accuracy Over Iterations
                    </h4>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={iterationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="iteration" label={{ value: 'Number of Trees', position: 'insideBottom', offset: -5 }} />
                            <YAxis domain={[0, 100]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="trainAccuracy" stroke="#10b981" strokeWidth={3} name="Training Accuracy" />
                            <Line type="monotone" dataKey="valAccuracy" stroke="#3b82f6" strokeWidth={3} name="Validation Accuracy" strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Both training and validation accuracy improve, showing the ensemble is learning effectively
                    </p>
                </div>

                <div className="chart-container">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        Final Predictions vs Actual Values
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={predictionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sample" />
                            <YAxis domain={[0, 8]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="actual" fill="#10b981" name="Actual Value" />
                            <Bar dataKey="prediction" fill="#f59e0b" name="Final Ensemble Prediction" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Final predictions are very close to actual values - the ensemble learned successfully! 🎉
                    </p>
                </div>
            </div>
        );
    }

    return null;
};
