# Gradient Boosting Frameworks Comparison

A comprehensive React/TypeScript application comparing CatBoost, LightGBM, and XGBoost gradient boosting frameworks.

## How to run this project

### Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd C:\Users\ChunChunMaru\Desktop\aad
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   Or if you prefer yarn:

   ```bash
   yarn install
   ```

### Running the Project

#### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will automatically open in your browser at `http://localhost:3000`

#### Build for Production

Create an optimized production build:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

The build output will be in the `dist/` directory.

#### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

Or with yarn:

```bash
yarn preview
```

## Project Structure

```
aad/
├── components/
│   └── TreeVisualization.tsx    # Tree structure visualization component
├── data/
│   └── constants.ts              # Algorithm data, metrics, and configurations
├── styles/
│   └── TreeVisualization.css     # All application styles (extracted from inline)
├── utils/
│   └── dataGenerators.ts         # Utility functions for generating sample data
├── src/
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── original/                     # Original files backup
├── types.ts                       # TypeScript type definitions
├── GradientBoostingComparison.tsx # Main application component
├── index.html                    # HTML template
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # TypeScript Node configuration
├── package.json                  # Project dependencies and scripts
└── .gitignore                    # Git ignore file
```

## Refactoring Changes

### 1. **Separated Types** (`types.ts`)

- Defined all TypeScript interfaces and types
- Provides type safety across the application
- Includes: Algorithm, PerformanceMetric, RadarFeature, TreeStyle, DataPoint

### 2. **Extracted Data** (`data/constants.ts`)

- Moved all static data to a dedicated file
- Includes algorithm details, performance metrics, radar data, and tree styles
- Easy to update without touching component logic

### 3. **Utility Functions** (`utils/dataGenerators.ts`)

- Extracted data generation logic
- `generateDecisionBoundary`: Creates decision boundary points for visualization
- `generateClass1Data` & `generateClass2Data`: Generate sample training data

### 4. **Component Extraction** (`components/TreeVisualization.tsx`)

- Separated tree visualization into its own component
- Cleaner, more maintainable SVG rendering
- Reusable across different parts of the application

### 5. **CSS Extraction** (`styles/TreeVisualization.css`)

- Moved all inline styles to a proper CSS file
- Better organization and maintainability
- Easier to theme and customize
- Improved performance (styles not recreated on each render)

### 6. **Main Component** (`GradientBoostingComparison.tsx`)

- Clean, well-structured main component
- Proper React hooks usage (useState, useMemo)
- All JSX syntax errors fixed
- Removed mixed CSS/HTML issues from original file

## Key Improvements

1. **Type Safety**: Full TypeScript support with proper types
2. **Maintainability**: Separation of concerns - data, logic, presentation
3. **Reusability**: Components can be easily reused
4. **Performance**: Memoized data generation, external CSS
5. **Readability**: Clear file structure and naming conventions
6. **Scalability**: Easy to add new algorithms or features

## Features

- **Overview Tab**: Compare algorithm strengths, weaknesses, and use cases
- **Performance Tab**: Bar chart comparing performance metrics
- **Radar Comparison**: Multi-dimensional radar chart comparison
- **Decision Boundaries**: Interactive visualization of algorithm decision boundaries
- **Tree Structures**: Visual representation of different tree growth strategies
- **How It Works**: Step-by-step interactive demonstration of the gradient boosting algorithm
    - 6 detailed steps from initialization to final ensemble
    - Visual diagrams for each step
    - **🎬 Animated Convergence Visualization**: Watch predictions evolve over 100 iterations
        - Blue sine wave showing true function
        - Green dots representing training data with noise
        - Red prediction line that gradually converges to the true function
        - Interactive controls: Play/Pause, slider, reset button
        - Real-time status messages showing learning progress
    - **Interactive graphs** showing:
        - Loss reduction over iterations
        - Prediction accuracy improvements
        - Training vs validation curves
        - Residual analysis
        - Before/after comparisons

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Dependencies

### Main Dependencies

- **React** (^18.2.0) - UI library
- **React DOM** (^18.2.0) - React renderer
- **Recharts** (^2.10.3) - Data visualization library

### Development Dependencies

- **TypeScript** (^5.2.2) - Type safety
- **Vite** (^5.0.8) - Build tool and dev server
- **@vitejs/plugin-react** (^4.2.1) - React plugin for Vite
- **ESLint** - Code linting
- **@types/react** & **@types/react-dom** - TypeScript definitions

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it in `vite.config.ts`:

```ts
server: {
  port: 3001, // Change to any available port
  open: true
}
```

### Module Not Found Errors

Make sure all dependencies are installed:

```bash
npm install
```
