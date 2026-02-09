import React, { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ScatterChart,
    Scatter
} from 'recharts';
import { TreeVisualization } from './components/TreeVisualization';
import { gradientBoostingSteps, StepVisualization, GraphVisualization, AnimatedConvergence } from './components/GradientBoostingDemo';
import { algorithms, performanceData, radarData } from './data/constants';
import { generateDecisionBoundary, generateClass1Data, generateClass2Data } from './utils/dataGenerators';
import { AlgorithmName, TabName } from './types';
import './styles/TreeVisualization.css';

export const GradientBoostingComparison: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabName>('overview');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>('CatBoost');
    const [currentStep, setCurrentStep] = useState(1);

    // Generate sample data once
    const class1 = useMemo(() => generateClass1Data(), []);
    const class2 = useMemo(() => generateClass2Data(), []);

    return (
        <div className="app-container">
            <div className="content-wrapper">
                <div className="header-section">
                    <h1 className="main-title">Gradient Boosting Frameworks</h1>
                    <p className="main-subtitle">Comparing CatBoost, LightGBM & XGBoost</p>
                </div>

                <div className="tab-container">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`tab-button ${activeTab === 'overview' ? 'tab-button-active' : 'tab-button-inactive'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('performance')}
                        className={`tab-button ${activeTab === 'performance' ? 'tab-button-active' : 'tab-button-inactive'}`}
                    >
                        Performance
                    </button>
                    <button
                        onClick={() => setActiveTab('comparison')}
                        className={`tab-button ${activeTab === 'comparison' ? 'tab-button-active' : 'tab-button-inactive'}`}
                    >
                        Radar Comparison
                    </button>
                    <button
                        onClick={() => setActiveTab('boundaries')}
                        className={`tab-button ${activeTab === 'boundaries' ? 'tab-button-active' : 'tab-button-inactive'}`}
                    >
                        Decision Boundaries
                    </button>
                    <button
                        onClick={() => setActiveTab('trees')}
                        className={`tab-button ${activeTab === 'trees' ? 'tab-button-active' : 'tab-button-inactive'}`}
                    >
                        Tree Structures
                    </button>
                    <button
                        onClick={() => setActiveTab('demo')}
                        className={`tab-button ${activeTab === 'demo' ? 'tab-button-active' : 'tab-button-inactive'}`}
                    >
                        How It Works
                    </button>
                </div>

                {activeTab === 'overview' && (
                    <div className="algorithm-grid">
                        {Object.values(algorithms).map((algo) => (
                            <div
                                key={algo.name}
                                className="algorithm-card"
                                style={{ borderTopColor: algo.color }}
                            >
                                <div className="algorithm-header">
                                    <h2 className="algorithm-name" style={{ color: algo.color }}>
                                        {algo.name}
                                    </h2>
                                    <span className="algorithm-year">{algo.year}</span>
                                </div>

                                <p className="algorithm-developer">by {algo.developer}</p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 className="section-title strengths-title">✓ Strengths</h3>
                                    <ul className="feature-list">
                                        {algo.strengths.map((strength, idx) => (
                                            <li key={idx} className="feature-item">{strength}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 className="section-title weaknesses-title">✗ Weaknesses</h3>
                                    <ul className="feature-list">
                                        {algo.weaknesses.map((weakness, idx) => (
                                            <li key={idx} className="feature-item">{weakness}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="best-for-section">
                                    <h3 className="section-title best-for-title">Best For:</h3>
                                    <p className="best-for-text">{algo.bestFor}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="chart-container">
                        <h2 className="chart-title">Performance Metrics Comparison</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="CatBoost" fill="#FFCC00" />
                                <Bar dataKey="LightGBM" fill="#3498DB" />
                                <Bar dataKey="XGBoost" fill="#E74C3C" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="chart-note">
                            * Scores are relative comparisons (0-100 scale) based on typical use cases
                        </p>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="chart-container">
                        <h2 className="chart-title">Multi-Dimensional Comparison</h2>
                        <ResponsiveContainer width="100%" height={500}>
                            <RadarChart data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="feature" />
                                <PolarRadiusAxis domain={[0, 100]} />
                                <Radar name="CatBoost" dataKey="CatBoost" stroke="#FFCC00" fill="#FFCC00" fillOpacity={0.3} />
                                <Radar name="LightGBM" dataKey="LightGBM" stroke="#3498DB" fill="#3498DB" fillOpacity={0.3} />
                                <Radar name="XGBoost" dataKey="XGBoost" stroke="#E74C3C" fill="#E74C3C" fillOpacity={0.3} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {activeTab === 'boundaries' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="info-box info-box-purple">
                            <h3 className="info-box-title">Decision Boundaries with Sample Data</h3>
                            <p className="info-box-text">
                                This visualization shows how each algorithm separates two classes of data. The curves represent decision boundaries learned by each model.
                            </p>
                        </div>

                        <div className="chart-container">
                            <div className="boundary-selector">
                                {(['CatBoost', 'LightGBM', 'XGBoost'] as AlgorithmName[]).map((algo) => (
                                    <button
                                        key={algo}
                                        onClick={() => setSelectedAlgorithm(algo)}
                                        className="boundary-button"
                                        style={
                                            selectedAlgorithm === algo
                                                ? {
                                                    backgroundColor: algorithms[algo].color,
                                                    color: algo === 'CatBoost' ? '#000' : '#fff',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }
                                                : {
                                                    backgroundColor: '#f3f4f6',
                                                    color: '#374151'
                                                }
                                        }
                                    >
                                        {algo}
                                    </button>
                                ))}
                            </div>

                            <ResponsiveContainer width="100%" height={500}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" domain={[0, 100]} name="Feature 1" />
                                    <YAxis type="number" dataKey="y" domain={[0, 100]} name="Feature 2" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Legend />

                                    {/* Decision Boundary */}
                                    <Scatter
                                        name={`${selectedAlgorithm} Boundary`}
                                        data={generateDecisionBoundary(selectedAlgorithm)}
                                        fill={algorithms[selectedAlgorithm].color}
                                        line={{ stroke: algorithms[selectedAlgorithm].color, strokeWidth: 3 }}
                                        shape="circle"
                                        isAnimationActive={false}
                                    />

                                    {/* Class 1 points */}
                                    <Scatter name="Class 1" data={class1} fill="#10B981" shape="circle" />

                                    {/* Class 2 points */}
                                    <Scatter name="Class 2" data={class2} fill="#8B5CF6" shape="triangle" />
                                </ScatterChart>
                            </ResponsiveContainer>

                            <div className="boundary-description-grid">
                                <div
                                    className={`boundary-description-card ${selectedAlgorithm === 'CatBoost' ? 'boundary-card-yellow-active' : 'boundary-card-inactive'
                                        }`}
                                    style={
                                        selectedAlgorithm === 'CatBoost'
                                            ? { backgroundColor: '#fefce8', borderColor: '#fde047' }
                                            : { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }
                                    }
                                >
                                    <h4 className="boundary-card-title" style={{ color: '#854d0e' }}>CatBoost Boundary</h4>
                                    <p className="boundary-card-text">
                                        More structured and stepped due to symmetric tree splits. Creates clear, interpretable regions.
                                    </p>
                                </div>

                                <div
                                    className={`boundary-description-card ${selectedAlgorithm === 'LightGBM' ? 'boundary-card-blue-active' : 'boundary-card-inactive'
                                        }`}
                                    style={
                                        selectedAlgorithm === 'LightGBM'
                                            ? { backgroundColor: '#eff6ff', borderColor: '#60a5fa' }
                                            : { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }
                                    }
                                >
                                    <h4 className="boundary-card-title" style={{ color: '#1e40af' }}>LightGBM Boundary</h4>
                                    <p className="boundary-card-text">
                                        Most aggressive fitting with complex boundaries. Can capture subtle patterns but may overfit.
                                    </p>
                                </div>

                                <div
                                    className={`boundary-description-card ${selectedAlgorithm === 'XGBoost' ? 'boundary-card-red-active' : 'boundary-card-inactive'
                                        }`}
                                    style={
                                        selectedAlgorithm === 'XGBoost'
                                            ? { backgroundColor: '#fef2f2', borderColor: '#f87171' }
                                            : { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }
                                    }
                                >
                                    <h4 className="boundary-card-title" style={{ color: '#991b1b' }}>XGBoost Boundary</h4>
                                    <p className="boundary-card-text">
                                        Balanced and smooth boundary. Level-wise growth creates stable, generalizable separations.
                                    </p>
                                </div>
                            </div>

                            <div className="legend-container">
                                <h4 className="legend-title">Understanding the Visualization:</h4>
                                <div className="legend-grid">
                                    <div className="legend-item">
                                        <div className="legend-dot" style={{ backgroundColor: '#10B981' }}></div>
                                        <span><strong>Green circles:</strong> Class 1 training samples</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-triangle" style={{ backgroundColor: '#8B5CF6' }}></div>
                                        <span><strong>Purple triangles:</strong> Class 2 training samples</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-line" style={{ backgroundColor: algorithms[selectedAlgorithm].color }}></div>
                                        <span><strong>Colored curve:</strong> Decision boundary learned by {selectedAlgorithm}</span>
                                    </div>
                                    <div className="legend-item">
                                        <span style={{ fontSize: '1.125rem' }}>💡</span>
                                        <span>The boundary separates predicted Class 1 (below/left) from Class 2 (above/right)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chart-container">
                            <h3 className="chart-title">Comparing All Three Boundaries</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" domain={[0, 100]} name="Feature 1" />
                                    <YAxis type="number" dataKey="y" domain={[0, 100]} name="Feature 2" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Legend />

                                    {/* All boundaries */}
                                    <Scatter
                                        name="CatBoost"
                                        data={generateDecisionBoundary('CatBoost')}
                                        fill="#FFCC00"
                                        line={{ stroke: '#FFCC00', strokeWidth: 2 }}
                                        shape="circle"
                                        isAnimationActive={false}
                                    />
                                    <Scatter
                                        name="LightGBM"
                                        data={generateDecisionBoundary('LightGBM')}
                                        fill="#3498DB"
                                        line={{ stroke: '#3498DB', strokeWidth: 2 }}
                                        shape="circle"
                                        isAnimationActive={false}
                                    />
                                    <Scatter
                                        name="XGBoost"
                                        data={generateDecisionBoundary('XGBoost')}
                                        fill="#E74C3C"
                                        line={{ stroke: '#E74C3C', strokeWidth: 2 }}
                                        shape="circle"
                                        isAnimationActive={false}
                                    />

                                    {/* Data points */}
                                    <Scatter name="Class 1" data={class1} fill="#10B981" shape="circle" />
                                    <Scatter name="Class 2" data={class2} fill="#8B5CF6" shape="triangle" />
                                </ScatterChart>
                            </ResponsiveContainer>

                            <p className="chart-note">
                                Notice how each algorithm creates different decision boundaries for the same data. LightGBM tends to fit most aggressively, CatBoost creates more structured boundaries, and XGBoost provides a balanced approach.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'trees' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="info-box info-box-blue">
                            <h3 className="info-box-title">Key Difference: Tree Growth Strategy</h3>
                            <p className="info-box-text">
                                Each framework uses a different approach to building decision trees, which affects speed, accuracy, and behavior.
                            </p>
                        </div>

                        <TreeVisualization algorithm="CatBoost" />
                        <TreeVisualization algorithm="LightGBM" />
                        <TreeVisualization algorithm="XGBoost" />

                        <div className="quick-reference">
                            <h3 className="guide-title">Quick Reference</h3>
                            <div className="reference-grid">
                                <div className="reference-card reference-card-yellow">
                                    <h4 className="reference-card-title" style={{ color: '#854d0e' }}>CatBoost</h4>
                                    <p className="reference-card-text">
                                        Symmetric trees make the model interpretable and fast for prediction. Same split criterion at each level.
                                    </p>
                                </div>
                                <div className="reference-card reference-card-blue">
                                    <h4 className="reference-card-title" style={{ color: '#1e40af' }}>LightGBM</h4>
                                    <p className="reference-card-text">
                                        Leaf-wise growth focuses on the most impactful splits first, leading to faster training and better accuracy but risk of overfitting.
                                    </p>
                                </div>
                                <div className="reference-card reference-card-red">
                                    <h4 className="reference-card-title" style={{ color: '#991b1b' }}>XGBoost</h4>
                                    <p className="reference-card-text">
                                        Level-wise growth builds balanced trees, which is more conservative and stable but potentially slower and less optimal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'demo' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="info-box info-box-purple">
                            <h3 className="info-box-title">Step-by-Step: How Gradient Boosting Works</h3>
                            <p className="info-box-text">
                                Follow this interactive walkthrough to understand the iterative process of gradient boosting.
                                Each step builds upon the previous one to create a powerful ensemble model.
                            </p>
                        </div>

                        <div className="chart-container">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <button
                                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                    disabled={currentStep === 1}
                                    className="boundary-button"
                                    style={{
                                        backgroundColor: currentStep === 1 ? '#e5e7eb' : '#3b82f6',
                                        color: currentStep === 1 ? '#9ca3af' : '#fff',
                                        cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    ← Previous
                                </button>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: '#6b7280',
                                        marginBottom: '0.25rem',
                                        fontWeight: '500'
                                    }}>
                                        Step {currentStep} of {gradientBoostingSteps.length}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                        {gradientBoostingSteps.map((_, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setCurrentStep(idx + 1)}
                                                style={{
                                                    width: '2.5rem',
                                                    height: '0.5rem',
                                                    backgroundColor: currentStep === idx + 1 ? '#3b82f6' : '#e5e7eb',
                                                    borderRadius: '0.25rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setCurrentStep(Math.min(gradientBoostingSteps.length, currentStep + 1))}
                                    disabled={currentStep === gradientBoostingSteps.length}
                                    className="boundary-button"
                                    style={{
                                        backgroundColor: currentStep === gradientBoostingSteps.length ? '#e5e7eb' : '#3b82f6',
                                        color: currentStep === gradientBoostingSteps.length ? '#9ca3af' : '#fff',
                                        cursor: currentStep === gradientBoostingSteps.length ? 'not-allowed' : 'pointer',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    Next →
                                </button>
                            </div>

                            <div style={{
                                backgroundColor: '#f9fafb',
                                padding: '2rem',
                                borderRadius: '0.75rem',
                                marginBottom: '2rem'
                            }}>
                                <h2 style={{
                                    fontSize: '1.875rem',
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    marginBottom: '1rem'
                                }}>
                                    {gradientBoostingSteps[currentStep - 1].title}
                                </h2>
                                <p style={{
                                    fontSize: '1.125rem',
                                    color: '#4b5563',
                                    lineHeight: '1.75'
                                }}>
                                    {gradientBoostingSteps[currentStep - 1].description}
                                </p>
                            </div>

                            <StepVisualization step={currentStep} />

                            {currentStep === 5 && <AnimatedConvergence />}

                            <GraphVisualization step={currentStep} />

                            {gradientBoostingSteps[currentStep - 1].code && (
                                <div style={{
                                    backgroundColor: '#1f2937',
                                    padding: '1.5rem',
                                    borderRadius: '0.5rem',
                                    marginTop: '2rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '1rem',
                                        gap: '0.5rem'
                                    }}>
                                        <div style={{
                                            width: '0.75rem',
                                            height: '0.75rem',
                                            borderRadius: '50%',
                                            backgroundColor: '#ef4444'
                                        }} />
                                        <div style={{
                                            width: '0.75rem',
                                            height: '0.75rem',
                                            borderRadius: '50%',
                                            backgroundColor: '#fbbf24'
                                        }} />
                                        <div style={{
                                            width: '0.75rem',
                                            height: '0.75rem',
                                            borderRadius: '50%',
                                            backgroundColor: '#10b981'
                                        }} />
                                        <span style={{
                                            marginLeft: '1rem',
                                            color: '#9ca3af',
                                            fontSize: '0.875rem'
                                        }}>
                                            Code Example
                                        </span>
                                    </div>
                                    <pre style={{
                                        color: '#e5e7eb',
                                        fontFamily: 'monospace',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.5',
                                        margin: 0,
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word'
                                    }}>
                                        {gradientBoostingSteps[currentStep - 1].code}
                                    </pre>
                                </div>
                            )}

                            <div style={{
                                marginTop: '2rem',
                                padding: '1.5rem',
                                backgroundColor: '#eff6ff',
                                borderLeft: '4px solid #3b82f6',
                                borderRadius: '0.5rem'
                            }}>
                                <h4 style={{
                                    fontWeight: 'bold',
                                    color: '#1e40af',
                                    marginBottom: '0.75rem',
                                    fontSize: '1.125rem'
                                }}>
                                    💡 Key Insight
                                </h4>
                                <p style={{ color: '#1e40af', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                                    {currentStep === 1 && "Starting with a simple baseline gives us a reference point. The mean is a safe initial guess that minimizes overall error."}
                                    {currentStep === 2 && "Residuals represent what our model got wrong. By focusing on these errors, we can systematically improve predictions."}
                                    {currentStep === 3 && "Instead of predicting the target directly, we predict the residuals. This allows each tree to focus on correcting specific mistakes."}
                                    {currentStep === 4 && "The learning rate (η) controls how much each tree contributes. Smaller values (0.01-0.1) make learning gradual and prevent overfitting."}
                                    {currentStep === 5 && "Gradient boosting is called 'gradient' because we're following the gradient (direction of steepest descent) of the loss function."}
                                    {currentStep === 6 && "The final model combines hundreds of simple trees. Each tree is weak individually, but together they form a powerful predictor!"}
                                </p>
                            </div>
                        </div>

                        <div className="chart-container">
                            <h3 className="chart-title">Key Parameters in Gradient Boosting</h3>
                            <div className="reference-grid">
                                <div className="reference-card reference-card-blue">
                                    <h4 className="reference-card-title" style={{ color: '#1e40af' }}>Learning Rate (η)</h4>
                                    <p className="reference-card-text">
                                        Controls contribution of each tree. Typical: 0.01-0.3. Lower = more robust but slower.
                                    </p>
                                </div>
                                <div className="reference-card reference-card-yellow">
                                    <h4 className="reference-card-title" style={{ color: '#854d0e' }}>Number of Trees</h4>
                                    <p className="reference-card-text">
                                        How many iterations to run. Typical: 100-1000. More trees = better fit but risk overfitting.
                                    </p>
                                </div>
                                <div className="reference-card reference-card-red">
                                    <h4 className="reference-card-title" style={{ color: '#991b1b' }}>Max Depth</h4>
                                    <p className="reference-card-text">
                                        Maximum tree depth. Typical: 3-8. Deeper = more complex patterns but harder to interpret.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="decision-guide">
                    <h3 className="guide-title">Quick Decision Guide</h3>
                    <div className="guide-grid">
                        <div className="guide-card guide-card-yellow">
                            <h4 className="guide-card-title" style={{ color: '#FFCC00' }}>Choose CatBoost if:</h4>
                            <ul className="guide-card-list">
                                <li>You have categorical features</li>
                                <li>You want good defaults</li>
                                <li>You need robust results</li>
                            </ul>
                        </div>
                        <div className="guide-card guide-card-blue">
                            <h4 className="guide-card-title" style={{ color: '#3498DB' }}>Choose LightGBM if:</h4>
                            <ul className="guide-card-list">
                                <li>You have large datasets</li>
                                <li>Speed is critical</li>
                                <li>Memory is limited</li>
                            </ul>
                        </div>
                        <div className="guide-card guide-card-red">
                            <h4 className="guide-card-title" style={{ color: '#E74C3C' }}>Choose XGBoost if:</h4>
                            <ul className="guide-card-list">
                                <li>You need stability</li>
                                <li>Community support matters</li>
                                <li>You're in a competition</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradientBoostingComparison;
