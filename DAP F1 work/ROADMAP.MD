# DAP F1 Project — Roadmap

This roadmap outlines the full development plan for the DAP F1 trajectory reconstruction and ML analysis project.  
Version 1 of the project (pre-Kalman) is complete. The next versions will extend the pipeline to smoothing, feature extraction, and ML.

---

# 🚦 Project Phases Overview

## **Phase 1 — Data Extraction & EDA (COMPLETED)**
**Goal:** Ensure we can reliably load, validate, and visualise F1 telemetry.

Tasks Completed:
- ✔ FastF1 integration and caching
- ✔ Exported all relevant CSVs (laps, telemetry, position)
- ✔ Plotted:
  - Raw trajectory (X vs Y)
  - Speed vs Distance
  - Throttle & Brake vs Distance
- ✔ Verified track-shape correctness
- ✔ Prepared baseline for KF

Output: **Dump Log v1**

---

# 🟦 Phase 2 — Trajectory Reconstruction (NEXT STEP)

## **Milestone: Implement Kalman Filter**

### Tasks:
1. Merge position + telemetry data into a single timeline  
2. Implement a **Constant Velocity Kalman Filter**  
3. Generate smoothed trajectory (`x_filtered`, `y_filtered`)  
4. Compute velocity components (`vx`, `vy`)  
5. Validate accuracy:
   - RMSE < 2 meters
   - Velocity difference < 5%

### Deliverables:
- Raw vs filtered XY plot
- Error metrics table
- New CSV: `filtered_trajectory_VER_2023_SIN.csv`
- Dump Log v2

---

# 🟩 Phase 3 — Feature Engineering

## Features derived from filtered trajectory:
- Corner radius (per corner)
- Apex detection
- Apex speed
- Entry & exit speeds
- Braking gradient
- Acceleration smoothness
- Line smoothness (jerk/curvature changes)
- Distance-to-corner metrics

### Deliverables:
- Feature extraction scripts
- Feature visualisation plots
- Feature CSV per lap
- Dump Log v3

---

# 🟧 Phase 4 — Correlation + Driver Analysis

### Tasks:
- Lap-level feature correlation vs lap time
- Identify strongest performance drivers
- Compare features across:
  - Fast vs slow laps
  - Drivers (VER vs HAM vs LEC etc.)
  - Tracks (later extension)
- Create heatmaps, scatter grids, and driver comparison plots

### Deliverables:
- Correlation matrix
- Top-features ranking
- Driver comparison report
- Dump Log v4

---

# 🟪 Phase 5 — Machine Learning

### Models:
- Linear Regression (baseline)
- Random Forest (non-linear)
- XGBoost (final model)
- SHAP values (interpretability)

### Tasks:
- Train models using features from all laps & drivers
- Perform cross-validation (5-fold)
- Evaluate on:
  - MAE < 0.5s
  - RMSE < 0.7s
  - R² > 0.85
- Generate SHAP plots:
  - Per-lap factor contributions
  - Feature importance summary

### Deliverables:
- ML performance metrics
- SHAP explanations
- Lap-time prediction model
- Dump Log v5

---

# 🟫 Phase 6 — Multi-Driver + Multi-Track Scaling

### Tasks:
- Automate pipeline across:
  - All drivers
  - All laps
  - Multiple tracks (Singapore → Spa → Brazil → etc.)
- Build master dataset:
