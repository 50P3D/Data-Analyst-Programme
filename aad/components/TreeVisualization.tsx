import React from 'react';
import { AlgorithmName } from '../types';
import { algorithms, treeStyles } from '../data/constants';
import '../styles/TreeVisualization.css';

interface TreeVisualizationProps {
    algorithm: AlgorithmName;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({ algorithm }) => {
    return (
        <div className="tree-visualization-container">
            <h3 className="tree-title" style={{ color: algorithms[algorithm].color }}>
                {algorithm} Tree Structure
            </h3>
            <div className="tree-description">
                <p className="tree-desc">{treeStyles[algorithm].desc}</p>
                <p className="tree-detail">{treeStyles[algorithm].detail}</p>
            </div>

            {algorithm === 'CatBoost' && (
                <svg viewBox="0 0 400 250" className="tree-svg">
                    <circle cx="200" cy="40" r="25" fill="#FFCC00" stroke="#000" strokeWidth="2" />
                    <text x="200" y="48" textAnchor="middle" fontSize="12" fontWeight="bold">X₁ &lt; 5</text>

                    <line x1="200" y1="65" x2="100" y2="100" stroke="#000" strokeWidth="2" />
                    <line x1="200" y1="65" x2="300" y2="100" stroke="#000" strokeWidth="2" />

                    <circle cx="100" cy="110" r="25" fill="#FFD633" stroke="#000" strokeWidth="2" />
                    <text x="100" y="118" textAnchor="middle" fontSize="12" fontWeight="bold">X₂ &lt; 3</text>

                    <circle cx="300" cy="110" r="25" fill="#FFD633" stroke="#000" strokeWidth="2" />
                    <text x="300" y="118" textAnchor="middle" fontSize="12" fontWeight="bold">X₂ &lt; 3</text>

                    <line x1="100" y1="135" x2="50" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="100" y1="135" x2="150" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="300" y1="135" x2="250" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="300" y1="135" x2="350" y2="180" stroke="#000" strokeWidth="2" />

                    <rect x="30" y="190" width="40" height="30" fill="#FFE066" stroke="#000" strokeWidth="2" rx="5" />
                    <rect x="130" y="190" width="40" height="30" fill="#FFE066" stroke="#000" strokeWidth="2" rx="5" />
                    <rect x="230" y="190" width="40" height="30" fill="#FFE066" stroke="#000" strokeWidth="2" rx="5" />
                    <rect x="330" y="190" width="40" height="30" fill="#FFE066" stroke="#000" strokeWidth="2" rx="5" />

                    <text x="50" y="209" textAnchor="middle" fontSize="11">Leaf</text>
                    <text x="150" y="209" textAnchor="middle" fontSize="11">Leaf</text>
                    <text x="250" y="209" textAnchor="middle" fontSize="11">Leaf</text>
                    <text x="350" y="209" textAnchor="middle" fontSize="11">Leaf</text>
                </svg>
            )}

            {algorithm === 'LightGBM' && (
                <svg viewBox="0 0 400 250" className="tree-svg">
                    <circle cx="200" cy="40" r="25" fill="#3498DB" stroke="#000" strokeWidth="2" />
                    <text x="200" y="48" textAnchor="middle" fontSize="12" fontWeight="bold">X₁ &lt; 5</text>

                    <line x1="200" y1="65" x2="100" y2="100" stroke="#000" strokeWidth="2" />
                    <line x1="200" y1="65" x2="300" y2="100" stroke="#000" strokeWidth="2" />

                    <circle cx="100" cy="110" r="25" fill="#5DADE2" stroke="#000" strokeWidth="2" />
                    <text x="100" y="118" textAnchor="middle" fontSize="12" fontWeight="bold">X₃ &lt; 7</text>

                    <rect x="280" y="95" width="40" height="30" fill="#85C1E9" stroke="#000" strokeWidth="2" rx="5" />
                    <text x="300" y="114" textAnchor="middle" fontSize="11">Leaf</text>

                    <line x1="100" y1="135" x2="50" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="100" y1="135" x2="150" y2="180" stroke="#000" strokeWidth="2" />

                    <circle cx="50" cy="190" r="25" fill="#85C1E9" stroke="#000" strokeWidth="2" />
                    <text x="50" y="198" textAnchor="middle" fontSize="12" fontWeight="bold">X₄ &lt; 2</text>

                    <rect x="130" y="175" width="40" height="30" fill="#85C1E9" stroke="#000" strokeWidth="2" rx="5" />
                    <text x="150" y="194" textAnchor="middle" fontSize="11">Leaf</text>

                    <line x1="50" y1="215" x2="20" y2="240" stroke="#000" strokeWidth="2" />
                    <line x1="50" y1="215" x2="80" y2="240" stroke="#000" strokeWidth="2" />

                    <rect x="0" y="228" width="40" height="25" fill="#AED6F1" stroke="#000" strokeWidth="2" rx="5" />
                    <rect x="60" y="228" width="40" height="25" fill="#AED6F1" stroke="#000" strokeWidth="2" rx="5" />
                    <text x="20" y="244" textAnchor="middle" fontSize="10">Leaf</text>
                    <text x="80" y="244" textAnchor="middle" fontSize="10">Leaf</text>
                </svg>
            )}

            {algorithm === 'XGBoost' && (
                <svg viewBox="0 0 400 250" className="tree-svg">
                    <circle cx="200" cy="40" r="25" fill="#E74C3C" stroke="#000" strokeWidth="2" />
                    <text x="200" y="48" textAnchor="middle" fontSize="12" fontWeight="bold">X₁ &lt; 5</text>

                    <line x1="200" y1="65" x2="100" y2="100" stroke="#000" strokeWidth="2" />
                    <line x1="200" y1="65" x2="300" y2="100" stroke="#000" strokeWidth="2" />

                    <circle cx="100" cy="110" r="25" fill="#EC7063" stroke="#000" strokeWidth="2" />
                    <text x="100" y="118" textAnchor="middle" fontSize="12" fontWeight="bold">X₂ &lt; 3</text>

                    <circle cx="300" cy="110" r="25" fill="#EC7063" stroke="#000" strokeWidth="2" />
                    <text x="300" y="118" textAnchor="middle" fontSize="12" fontWeight="bold">X₃ &lt; 8</text>

                    <line x1="100" y1="135" x2="50" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="100" y1="135" x2="150" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="300" y1="135" x2="250" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="300" y1="135" x2="350" y2="180" stroke="#000" strokeWidth="2" />

                    <circle cx="50" cy="190" r="20" fill="#F1948A" stroke="#000" strokeWidth="2" />
                    <circle cx="150" cy="190" r="20" fill="#F1948A" stroke="#000" strokeWidth="2" />
                    <circle cx="250" cy="190" r="20" fill="#F1948A" stroke="#000" strokeWidth="2" />
                    <circle cx="350" cy="190" r="20" fill="#F1948A" stroke="#000" strokeWidth="2" />

                    <text x="50" y="196" textAnchor="middle" fontSize="10" fontWeight="bold">X₄&lt;1</text>
                    <text x="150" y="196" textAnchor="middle" fontSize="10" fontWeight="bold">X₄&lt;2</text>
                    <text x="250" y="196" textAnchor="middle" fontSize="10" fontWeight="bold">X₅&lt;4</text>
                    <text x="350" y="196" textAnchor="middle" fontSize="10" fontWeight="bold">X₅&lt;6</text>
                </svg>
            )}
        </div>
    );
};
