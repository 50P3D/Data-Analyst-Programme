return (
    <div className= "bg-white p-6 rounded-lg border-2 border-gray-200" >
    <h3 className="text-xl font-bold mb-4" style = {{ color: algorithms[algorithm].color; }}>
        { algorithm } Tree Structure
            </h3>
            < div className = "text-center mb-4" >
                <p className="font-semibold text-lg" > { treeStyles[algorithm].desc } </p>
                    < p className = "text-gray-600" > { treeStyles[algorithm].detail } </p>
                        </div>;

{
    algorithm === 'CatBoost' && (
        <svg viewBox="0 0 400 250" className = "w-full" >
            <circle cx="200" cy = "40" r = "25" fill = "#FFCC00" stroke = "#000" strokeWidth = "2" />
                <text x="200" y = "48" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₁ & lt; 5 </text>

                    < line x1 = "200" y1 = "65" x2 = "100" y2 = "100" stroke = "#000" strokeWidth = "2" />
                        <line x1="200" y1 = "65" x2 = "300" y2 = "100" stroke = "#000" strokeWidth = "2" />

                            <circle cx="100" cy = "110" r = "25" fill = "#FFD633" stroke = "#000" strokeWidth = "2" />
                                <text x="100" y = "118" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₂ & lt; 3 </text>

                                    < circle cx = "300" cy = "110" r = "25" fill = "#FFD633" stroke = "#000" strokeWidth = "2" />
                                        <text x="300" y = "118" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₂ & lt; 3 </text>

                                            < line x1 = "100" y1 = "135" x2 = "50" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                <line x1="100" y1 = "135" x2 = "150" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                    <line x1="300" y1 = "135" x2 = "250" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                        <line x1="300" y1 = "135" x2 = "350" y2 = "180" stroke = "#000" strokeWidth = "2" />

                                                            <rect x="30" y = "190" width = "40" height = "30" fill = "#FFE066" stroke = "#000" strokeWidth = "2" rx = "5" />
                                                                <rect x="130" y = "190" width = "40" height = "30" fill = "#FFE066" stroke = "#000" strokeWidth = "2" rx = "5" />
                                                                    <rect x="230" y = "190" width = "40" height = "30" fill = "#FFE066" stroke = "#000" strokeWidth = "2" rx = "5" />
                                                                        <rect x="330" y = "190" width = "40" height = "30" fill = "#FFE066" stroke = "#000" strokeWidth = "2" rx = "5" />

                                                                            <text x="50" y = "209" textAnchor = "middle" fontSize = "11" > Leaf </text>
                                                                                < text x = "150" y = "209" textAnchor = "middle" fontSize = "11" > Leaf </text>
                                                                                    < text x = "250" y = "209" textAnchor = "middle" fontSize = "11" > Leaf </text>
                                                                                        < text x = "350" y = "209" textAnchor = "middle" fontSize = "11" > Leaf </text>
                                                                                            </svg>
        )
}

{
    algorithm === 'LightGBM' && (
        <svg viewBox="0 0 400 250" className = "w-full" >
            <circle cx="200" cy = "40" r = "25" fill = "#3498DB" stroke = "#000" strokeWidth = "2" />
                <text x="200" y = "48" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₁ & lt; 5 </text>

                    < line x1 = "200" y1 = "65" x2 = "100" y2 = "100" stroke = "#000" strokeWidth = "2" />
                        <line x1="200" y1 = "65" x2 = "300" y2 = "100" stroke = "#000" strokeWidth = "2" />

                            <circle cx="100" cy = "110" r = "25" fill = "#5DADE2" stroke = "#000" strokeWidth = "2" />
                                <text x="100" y = "118" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₃ & lt; 7 </text>

                                    < rect x = "280" y = "95" width = "40" height = "30" fill = "#85C1E9" stroke = "#000" strokeWidth = "2" rx = "5" />
                                        <text x="300" y = "114" textAnchor = "middle" fontSize = "11" > Leaf </text>

                                            < line x1 = "100" y1 = "135" x2 = "50" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                <line x1="100" y1 = "135" x2 = "150" y2 = "180" stroke = "#000" strokeWidth = "2" />

                                                    <circle cx="50" cy = "190" r = "25" fill = "#85C1E9" stroke = "#000" strokeWidth = "2" />
                                                        <text x="50" y = "198" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₄ & lt; 2 </text>

                                                            < rect x = "130" y = "175" width = "40" height = "30" fill = "#85C1E9" stroke = "#000" strokeWidth = "2" rx = "5" />
                                                                <text x="150" y = "194" textAnchor = "middle" fontSize = "11" > Leaf </text>

                                                                    < line x1 = "50" y1 = "215" x2 = "20" y2 = "240" stroke = "#000" strokeWidth = "2" />
                                                                        <line x1="50" y1 = "215" x2 = "80" y2 = "240" stroke = "#000" strokeWidth = "2" />

                                                                            <rect x="0" y = "228" width = "40" height = "25" fill = "#AED6F1" stroke = "#000" strokeWidth = "2" rx = "5" />
                                                                                <rect x="60" y = "228" width = "40" height = "25" fill = "#AED6F1" stroke = "#000" strokeWidth = "2" rx = "5" />
                                                                                    <text x="20" y = "244" textAnchor = "middle" fontSize = "10" > Leaf </text>
                                                                                        < text x = "80" y = "244" textAnchor = "middle" fontSize = "10" > Leaf </text>
                                                                                            </svg>
        )
}

{
    algorithm === 'XGBoost' && (
        <svg viewBox="0 0 400 250" className = "w-full" >
            <circle cx="200" cy = "40" r = "25" fill = "#E74C3C" stroke = "#000" strokeWidth = "2" />
                <text x="200" y = "48" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₁ & lt; 5 </text>

                    < line x1 = "200" y1 = "65" x2 = "100" y2 = "100" stroke = "#000" strokeWidth = "2" />
                        <line x1="200" y1 = "65" x2 = "300" y2 = "100" stroke = "#000" strokeWidth = "2" />

                            <circle cx="100" cy = "110" r = "25" fill = "#EC7063" stroke = "#000" strokeWidth = "2" />
                                <text x="100" y = "118" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₂ & lt; 3 </text>

                                    < circle cx = "300" cy = "110" r = "25" fill = "#EC7063" stroke = "#000" strokeWidth = "2" />
                                        <text x="300" y = "118" textAnchor = "middle" fontSize = "12" fontWeight = "bold" > X₃ & lt; 8 </text>

                                            < line x1 = "100" y1 = "135" x2 = "50" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                <line x1="100" y1 = "135" x2 = "150" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                    <line x1="300" y1 = "135" x2 = "250" y2 = "180" stroke = "#000" strokeWidth = "2" />
                                                        <line x1="300" y1 = "135" x2 = "350" y2 = "180" stroke = "#000" strokeWidth = "2" />

                                                            <circle cx="50" cy = "190" r = "20" fill = "#F1948A" stroke = "#000" strokeWidth = "2" />
                                                                <circle cx="150" cy = "190" r = "20" fill = "#F1948A" stroke = "#000" strokeWidth = "2" />
                                                                    <circle cx="250" cy = "190" r = "20" fill = "#F1948A" stroke = "#000" strokeWidth = "2" />
                                                                        <circle cx="350" cy = "190" r = "20" fill = "#F1948A" stroke = "#000" strokeWidth = "2" />

                                                                            <text x="50" y = "196" textAnchor = "middle" fontSize = "10" fontWeight = "bold" > X₄& lt; 1 </text>
                                                                                < text x = "150" y = "196" textAnchor = "middle" fontSize = "10" fontWeight = "bold" > X₄& lt; 2 </text>
                                                                                    < text x = "250" y = "196" textAnchor = "middle" fontSize = "10" fontWeight = "bold" > X₅& lt; 4 </text>
                                                                                        < text x = "350" y = "196" textAnchor = "middle" fontSize = "10" fontWeight = "bold" > X₅& lt; 6 </text>
                                                                                            </svg>
        )
}
</div>
    );
  };

return (
    <div className= "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" >
    <div className="max-w-7xl mx-auto" >
        <div className="text-center mb-8" >
            <h1 className="text-4xl font-bold mb-2 text-gray-800" > Gradient Boosting Frameworks </h1>
                < p className = "text-xl text-gray-600" > Comparing CatBoost, LightGBM & XGBoost </p>
                    </div>
                    < div className = "flex gap-2 mb-6 flex-wrap justify-center" >
                        <button
            onClick={ () => setActiveTab('overview'); }
className = {`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'overview'
    ? 'bg-blue-600 text-white shadow-lg'
    : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
          >
    Overview
    </button>
    < button;
onClick = {() => setActiveTab('performance')}
className = {`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'performance'
    ? 'bg-blue-600 text-white shadow-lg'
    : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
          >
    Performance
    </button>
    < button;
onClick = {() => setActiveTab('comparison')}
className = {`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'comparison'
    ? 'bg-blue-600 text-white shadow-lg'
    : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
          >
    Radar Comparison
        </button>
        < button;
onClick = {() => setActiveTab('boundaries')}
className = {`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'boundaries'
    ? 'bg-blue-600 text-white shadow-lg'
    : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
          >
    Decision Boundaries
        </button>
        < button;
onClick = {() => setActiveTab('trees')}
className = {`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'trees'
    ? 'bg-blue-600 text-white shadow-lg'
    : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
          >
    Tree Structures
        </button>
        </div>;

{
    activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
        {
            Object.values(algorithms).map((algo) => (
                <div
                key= { algo.name }
                className = "bg-white rounded-xl shadow-lg p-6 border-t-4 hover:shadow-xl transition-shadow"
                style = {{ borderTopColor: algo.color }}
            >
            <div className="flex items-center justify-between mb-4" >
                <h2 className="text-2xl font-bold" style = {{ color: algo.color; }
}>
    { algo.name }
    </h2>
    < span className = "text-sm bg-gray-100 px-3 py-1 rounded-full font-medium" >
        { algo.year }
        </span>
        </div>

        < p className = "text-gray-600 mb-4" > by { algo.developer; } </p>

            < div className = "mb-4" >
                <h3 className="font-semibold text-green-700 mb-2" >✓ Strengths </h3>
                    < ul className = "space-y-1" >
                    {
                        algo.strengths.map((strength, idx) => (
                            <li key= { idx } className = "text-sm text-gray-700" >• { strength } </li>
                        ))
                    }
                        </ul>
                        </div>

                        < div className = "mb-4" >
                            <h3 className="font-semibold text-red-700 mb-2" >✗ Weaknesses </h3>
                                < ul className = "space-y-1" >
                                {
                                    algo.weaknesses.map((weakness, idx) => (
                                        <li key= { idx } className = "text-sm text-gray-700" >• { weakness } </li>
                                    ))
                                }
                                    </ul>
                                    </div>

                                    < div className = "mt-4 pt-4 border-t border-gray-200" >
                                        <h3 className="font-semibold mb-2 text-blue-700" > Best For: </h3>
                                            < p className = "text-sm text-gray-700 italic" > { algo.bestFor } </p>
                                                </div>
                                                </div>
            ))}
</div>
        )}
{
    activeTab === 'performance' && (
        <div className="bg-white rounded-xl shadow-lg p-8" >
            <h2 className="text-2xl font-bold mb-6 text-center" > Performance Metrics Comparison </h2>
                < ResponsiveContainer width = "100%" height = { 400} >
                    <BarChart data={ performanceData; }>
                        <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" />
                                <YAxis domain={ [0, 100]; } />
                                    < Tooltip />
                                    <Legend />
                                    < Bar dataKey = "CatBoost" fill = "#FFCC00" />
                                        <Bar dataKey="LightGBM" fill = "#3498DB" />
                                            <Bar dataKey="XGBoost" fill = "#E74C3C" />
                                                </BarChart>
                                                </ResponsiveContainer>
                                                < p className = "text-center text-gray-600 mt-4 text-sm" >
              * Scores are relative comparisons(0 - 100 scale) based on typical use cases
        </p>
        </div>
        )
}

{
    activeTab === 'comparison' && (
        <div className="bg-white rounded-xl shadow-lg p-8" >
            <h2 className="text-2xl font-bold mb-6 text-center" > Multi - Dimensional Comparison </h2>
                < ResponsiveContainer width = "100%" height = { 500} >
                    <RadarChart data={ radarData; }>
                        <PolarGrid />
                        < PolarAngleAxis dataKey = "feature" />
                            <PolarRadiusAxis domain={ [0, 100]; } />
                                < Radar name = "CatBoost" dataKey = "CatBoost" stroke = "#FFCC00" fill = "#FFCC00" fillOpacity = { 0.3} />
                                    <Radar name="LightGBM" dataKey = "LightGBM" stroke = "#3498DB" fill = "#3498DB" fillOpacity = { 0.3} />
                                        <Radar name="XGBoost" dataKey = "XGBoost" stroke = "#E74C3C" fill = "#E74C3C" fillOpacity = { 0.3} />
                                            <Legend />
                                            </RadarChart>
                                            </ResponsiveContainer>
                                            </div>
        )
}

{
    activeTab === 'boundaries' && (
        <div className="space-y-6" >
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4" >
                <h3 className="font-bold text-lg mb-2" > Decision Boundaries with Sample Data </h3>
                    < p className = "text-gray-700" >
                        This visualization shows how each algorithm separates two classes of data.The curves represent decision boundaries learned by each model.
              </p>
                            </div>

                            < div className = "bg-white rounded-xl shadow-lg p-6" >
                                <div className="flex justify-center gap-3 mb-6" >
                                {
                                    ['CatBoost', 'LightGBM', 'XGBoost'].map((algo) => (
                                        <button
                    key= { algo }
                    onClick = {() => setSelectedAlgorithm(algo)};
    className = {`px-6 py-2 rounded-lg font-semibold transition-all ${selectedAlgorithm === algo
        ? 'shadow-lg'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`;
}
style = { selectedAlgorithm === algo ? {
    backgroundColor: algorithms[algo].color,
    color: algo === 'CatBoost' ? '#000' : '#fff'
} : {}}
                  >
    { algo }
    </button>
                ))}
</div>
    < ResponsiveContainer width = "100%" height = { 500} >
        <ScatterChart margin={ { top: 20, right: 20, bottom: 20, left: 20; } }>
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey = "x" domain = { [0, 100]} name = "Feature 1" />
                    <YAxis type="number" dataKey = "y" domain = { [0, 100]} name = "Feature 2" />
                        <Tooltip cursor={ { strokeDasharray: '3 3'; } } />
                            < Legend />

                            {/* Decision Boundary */ }
                            < Scatter;
name = {`${selectedAlgorithm} Boundary`}
data = { generateDecisionBoundary(selectedAlgorithm); };
fill = { algorithms[selectedAlgorithm].color };
line = {{ stroke: algorithms[selectedAlgorithm].color, strokeWidth: 3; }}
shape = "circle";
isAnimationActive = { false}
    />

    {/* Class 1 points */ }
    < Scatter;
name = "Class 1";
data = { class1 };
fill = "#10B981";
shape = "circle"
    />

    {/* Class 2 points */ }
    < Scatter;
name = "Class 2";
data = { class2 };
fill = "#8B5CF6";
shape = "triangle"
    />
    </ScatterChart>
    </ResponsiveContainer>

    < div className = "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" >
        <div className={
    `p-4 rounded-lg border-2 ${selectedAlgorithm === 'CatBoost' ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-200'
        }`;
}>
    <h4 className="font-bold text-yellow-800 mb-2" > CatBoost Boundary </h4>
        < p className = "text-sm text-gray-700" >
            More structured and stepped due to symmetric tree splits.Creates clear, interpretable regions.
                  </p>
                </div>

                < div className = {`p-4 rounded-lg border-2 ${selectedAlgorithm === 'LightGBM' ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-200'
                    }`}>
                        <h4 className="font-bold text-blue-800 mb-2" > LightGBM Boundary </h4>
                            < p className = "text-sm text-gray-700" >
                                Most aggressive fitting with complex boundaries.Can capture subtle patterns but may overfit.
                  </p>
                                    </div>

                                    < div className = {`p-4 rounded-lg border-2 ${selectedAlgorithm === 'XGBoost' ? 'bg-red-50 border-red-400' : 'bg-gray-50 border-gray-200'
                                        }`}>
                                            <h4 className="font-bold text-red-800 mb-2" > XGBoost Boundary </h4>
                                                < p className = "text-sm text-gray-700" >
                                                    Balanced and smooth boundary.Level - wise growth creates stable, generalizable separations.
                  </p>
                                                        </div>
                                                        </div>
                                                        < div className = "mt-6 bg-gray-50 rounded-lg p-4" >
                                                            <h4 className="font-semibold mb-2" > Understanding the Visualization: </h4>
                                                                < div className = "grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" >
                                                                    <div className="flex items-center gap-2" >
                                                                        <div className="w-4 h-4 rounded-full bg-green-500" > </div>
                                                                            < span > <strong>Green circles: </strong> Class 1 training samples</span >
                                                                                </div>
                                                                                < div className = "flex items-center gap-2" >
                                                                                    <div className="w-4 h-4 bg-purple-500" style = {{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'; }}> </div>
                                                                                        < span > <strong>Purple triangles: </strong> Class 2 training samples</span >
                                                                                            </div>
                                                                                            < div className = "flex items-center gap-2" >
                                                                                                <div className="w-12 h-0.5" style = {{ backgroundColor: algorithms[selectedAlgorithm].color; }}> </div>
                                                                                                    < span > <strong>Colored curve: </strong> Decision boundary learned by {selectedAlgorithm}</span >
                                                                                                        </div>
                                                                                                        < div className = "flex items-start gap-2" >
                                                                                                            <span className="text-lg" >💡</span>
                                                                                                                < span > The boundary separates predicted Class 1(below / left) from Class 2(above / right) </span>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>

                                                                                                                    < div className = "bg-white rounded-xl shadow-lg p-6" >
                                                                                                                        <h3 className="text-xl font-bold mb-4" > Comparing All Three Boundaries </h3>
                                                                                                                            < ResponsiveContainer width = "100%" height = { 400} >
                                                                                                                                <ScatterChart margin={ { top: 20, right: 20, bottom: 20, left: 20; } }>
                                                                                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                                                                                        <XAxis type="number" dataKey = "x" domain = { [0, 100]} name = "Feature 1" />
                                                                                                                                            <YAxis type="number" dataKey = "y" domain = { [0, 100]} name = "Feature 2" />
                                                                                                                                                <Tooltip cursor={ { strokeDasharray: '3 3'; } } />
                                                                                                                                                    < Legend />

                                                                                                                                                    {/* All boundaries */ }
                                                                                                                                                    < Scatter;
name = "CatBoost";
data = { generateDecisionBoundary('CatBoost'); };
fill = "#FFCC00";
line = {{ stroke: '#FFCC00', strokeWidth: 2; }}
shape = "circle";
isAnimationActive = { false}
    />
    <Scatter 
                    name="LightGBM";
data = { generateDecisionBoundary('LightGBM'); };
fill = "#3498DB";
line = {{ stroke: '#3498DB', strokeWidth: 2; }}
shape = "circle";
isAnimationActive = { false}
    />
    <Scatter 
                    name="XGBoost";
data = { generateDecisionBoundary('XGBoost'); };
fill = "#E74C3C";
line = {{ stroke: '#E74C3C', strokeWidth: 2; }}
shape = "circle";
isAnimationActive = { false}
    />

    {/* Data points */ }
    < Scatter;
name = "Class 1";
data = { class1 };
fill = "#10B981";
shape = "circle"
    />
    <Scatter 
                    name="Class 2";
data = { class2 };
fill = "#8B5CF6";
shape = "triangle"
    />
    </ScatterChart>
    </ResponsiveContainer>

    < p className = "text-center text-gray-600 mt-4 text-sm" >
        Notice how each algorithm creates different decision boundaries for the same data.LightGBM tends to fit most aggressively, CatBoost creates more structured boundaries, and XGBoost provides a balanced approach.
              </p>
            </div>
            </div>
        )}
{
    activeTab === 'trees' && (
        <div className="space-y-6" >
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6" >
                <h3 className="font-bold text-lg mb-2" > Key Difference: Tree Growth Strategy </h3>
                    < p className = "text-gray-700" >
                        Each framework uses a different approach to building decision trees, which affects speed, accuracy, and behavior.
              </p>
                            </div>

                            < TreeVisualization algorithm = "CatBoost" />
                                <TreeVisualization algorithm="LightGBM" />
                                    <TreeVisualization algorithm="XGBoost" />

                                        <div className="bg-white rounded-xl shadow-lg p-6 mt-6" >
                                            <h3 className="text-xl font-bold mb-4" > Quick Reference </h3>
                                                < div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
                                                    <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300" >
                                                        <h4 className="font-bold text-yellow-800 mb-2" > CatBoost </h4>
                                                            < p className = "text-sm" > Symmetric trees make the model interpretable and fast for prediction.Same split criterion at each level.</p>
                                                                </div>
                                                                < div className = "p-4 bg-blue-50 rounded-lg border-2 border-blue-300" >
                                                                    <h4 className="font-bold text-blue-800 mb-2" > LightGBM </h4>
                                                                        < p className = "text-sm" > Leaf - wise growth focuses on the most impactful splits first, leading to faster training and better accuracy but risk of overfitting.</p>
                                                                            </div>
                                                                            < div className = "p-4 bg-red-50 rounded-lg border-2 border-red-300" >
                                                                                <h4 className="font-bold text-red-800 mb-2" > XGBoost </h4>
                                                                                    < p className = "text-sm" > Level - wise growth builds balanced trees, which is more conservative and stable but potentially slower and less optimal.</p>
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>
        )
}

<div className="mt-8 bg-white rounded-xl shadow-lg p-6" >
    <h3 className="text-xl font-bold mb-4" > Quick Decision Guide </h3>
        < div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg" >
                <h4 className="font-bold mb-2" style = {{ color: '#FFCC00'; }}> Choose CatBoost if: </h4>
                    < ul className = "text-sm space-y-1" >
                        <li>• You have categorical features </li>
                            <li>• You want good defaults </li>
                                <li>• You need robust results </li>
                                    </ul>
                                    </div>
                                    < div className = "p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg" >
                                        <h4 className="font-bold mb-2" style = {{ color: '#3498DB'; }}> Choose LightGBM if: </h4>
                                            < ul className = "text-sm space-y-1" >
                                                <li>• You have large datasets </li>
                                                    <li>• Speed is critical </li>
                                                        <li>• Memory is limited </li>
                                                            </ul>
                                                            </div>
                                                            < div className = "p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg" >
                                                                <h4 className="font-bold mb-2" style = {{ color: '#E74C3C'; }}> Choose XGBoost if: </h4>
                                                                    < ul className = "text-sm space-y-1" >
                                                                        <li>• You need stability </li>
                                                                            <li>• Community support matters </li>
                                                                                <li>• You're in a competition</li>
                                                                                    </ul>
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>
  );
}