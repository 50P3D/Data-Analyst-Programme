Current environment

DAP F1 WORK
│-- export_f1_to_csv.py   (DATA RETRIEVAL)
│-- eda_plots.py          (VISUAL ANALYSIS)
│-- README.md             (PROJECT DOCUMENTATION)
│-- f1_cache/             (RAW API CACHE)
│-- *.csv                 (Your extracted session files)


## export_f1_to_csv.py

This script downloads Formula 1 telemetry from the FastF1 API for a chosen race
session and exports it into clean CSV files for analysis.

It performs the following steps:

1. Enables FastF1 cache
2. Loads a race session (e.g., 2023 Singapore GP Qualifying)
3. Extracts all session laps → laps_SIN23_Q_all.csv
4. Extracts all laps for a chosen driver → laps_SIN23_Q_VER.csv
5. Extracts telemetry for the driver’s fastest lap
   (speed, throttle, brake, gear, RPM) → telemetry_SIN23_Q_VER_fastlap.csv
6. Extracts position (X, Y, Z) for the fastest lap → position_SIN23_Q_VER_fastlap.csv

These CSV files are used for plotting (EDA), Kalman filter reconstruction,
feature engineering, and later machine learning.




## eda_plots.py

This script performs basic exploratory data analysis (EDA) on the exported
F1 telemetry and position data and generates key visualisations for the project.

It assumes that the following CSV files have already been created by
`export_f1_to_csv.py`:

- `telemetry_SIN23_Q_VER_fastlap.csv`
- `position_SIN23_Q_VER_fastlap.csv`

It performs the following steps:

1. Loads the position data for the fastest lap and plots the raw XY trajectory  
   → visualises the car’s path around the circuit and highlights GPS noise.
2. Loads the telemetry data for the fastest lap and plots **Speed vs Distance**  
   → shows where the car accelerates, brakes, and reaches top speed.
3. Plots **Throttle and Brake vs Distance** on the same graph  
   → shows braking zones and throttle application through corners.

These plots are used to:
- Understand the structure and quality of the raw data (EDA)
- Visually justify the need for a Kalman Filter to smooth trajectories
- Provide intuition for later feature engineering (cornering radius, apex speed,
  braking/acceleration gradients, etc.)



## CSV Files Overview

The project generates several CSV files using `export_f1_to_csv.py`.  
Each CSV represents a different part of the Formula 1 session data and is used
throughout EDA, trajectory reconstruction, feature engineering, and machine learning.

### 1. `laps_SIN23_Q_all.csv`
Contains all laps from the session (e.g., 2023 Singapore GP Qualifying) across all drivers.
Includes lap times, sector times, tyre data, speed trap data, stint info, track status,
and deletion flags.  
Used for session-wide analysis and ML label preparation.

### 2. `laps_SIN23_Q_VER.csv`
Contains all laps for the chosen driver (e.g., VER – Max Verstappen).
Used for driver-specific analysis and selecting the driver’s fastest lap.

### 3. `telemetry_SIN23_Q_VER_fastlap.csv`
Contains detailed telemetry for the driver's fastest lap: speed, throttle, brake,
RPM, gear, DRS and distance.  
Used for speed-distance analysis, braking patterns, and feature engineering
(acceleration smoothness, braking gradients, etc.).

### 4. `position_SIN23_Q_VER_fastlap.csv`
Contains the XY (and sometimes Z) position data for the same fastest lap.
Used for plotting the raw trajectory, detecting corners/apexes, measuring cornering
radius, and feeding into the Kalman Filter smoothing step.

These CSVs form the foundation of the project and allow us to progress from raw
telemetry → clean trajectories → engineered features → interpretable ML models.
------