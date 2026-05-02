"""
api.py — F1 Corner Coach FastAPI server
Run from the repo root:
    uvicorn api:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import pandas as pd
import json
import pickle
import numpy as np

BASE = Path(__file__).parent
EXPORT_DIR = BASE / "Working directory" / "data_processed" / "singapore_gp" / "coaching_export"

corner_dataset      = pd.read_parquet(EXPORT_DIR / "corner_dataset.parquet")
mini_ref            = pd.read_parquet(EXPORT_DIR / "mini_ref.parquet")
lap_index           = json.loads((EXPORT_DIR / "lap_index.json").read_text())
lap_corner_profiles = json.loads((EXPORT_DIR / "lap_corner_profiles.json").read_text())

with open(EXPORT_DIR / "corner_models.pkl", "rb") as f:
    corner_models = pickle.load(f)

CORNER_ZONES = {
    "T1": (200, 310),
    "T2": (310, 420),
    "T3": (420, 530),
    "T4": (530, 650),
}


def corner_coaching_text(delta_mean_speed, delta_min_speed,
                          delta_mean_curvature, delta_peak_lat_accel, corner):
    lines = []

    if delta_min_speed < -4:
        lines.append(
            f"Minimum speed in {corner} is {abs(delta_min_speed):.1f} km/h below reference — "
            f"carry more speed through the apex by braking later or widening the entry line."
        )
    elif delta_mean_speed < -2:
        lines.append(
            f"Average speed through {corner} is {abs(delta_mean_speed):.1f} km/h below reference — "
            f"focus on maintaining momentum mid-corner."
        )

    if delta_mean_curvature > 0.002:
        lines.append(
            f"Line through {corner} is tighter than the reference — "
            f"try a wider entry to reduce curvature and allow earlier throttle."
        )
    elif delta_mean_curvature < -0.002:
        lines.append(
            f"Line through {corner} is shallower than reference — "
            f"you may be running wide; tighten the entry to hit the apex."
        )

    if delta_peak_lat_accel < -5:
        lines.append(
            f"Peak lateral load in {corner} is lower than reference — "
            f"the car has more grip to give; commit to the apex earlier."
        )

    if not lines:
        lines.append(f"{corner}: performance is close to reference — marginal gains only.")

    return " ".join(lines)


def build_coach_report(lap_id: str):
    rows = corner_dataset[corner_dataset["LapId"] == lap_id]
    if rows.empty:
        raise HTTPException(status_code=404, detail=f"LapId '{lap_id}' not found")

    driver         = rows["Driver"].iloc[0]
    delta_lap_time = float(rows["delta_lap_time"].iloc[0])
    lap_time_s     = float(rows["LapTime_s"].iloc[0])

    corners_out = {}
    for corner in ["T1", "T2", "T3", "T4"]:
        row = rows[rows["corner"] == corner]
        if row.empty:
            corners_out[corner] = {"error": "no data"}
            continue
        r = row.iloc[0]

        d_mean_spd = float(r["delta_mean_speed"])
        d_min_spd  = float(r["delta_min_speed"])
        d_curv     = float(r["delta_mean_curvature"])
        d_lat      = float(r["delta_peak_lat_accel"])

        advice = corner_coaching_text(d_mean_spd, d_min_spd, d_curv, d_lat, corner)

        ref_seg = mini_ref[mini_ref["corner"] == corner]
        ref_profile = {
            "distances": ref_seg["dist_start"].round(1).tolist(),
            "curvature": [round(x, 5) for x in ref_seg["mean_curvature"].tolist()],
            "lat_accel": [round(x, 2) for x in ref_seg["peak_lat_accel"].tolist()],
        }

        driver_profile = lap_corner_profiles.get(lap_id, {}).get(corner, {})

        corners_out[corner] = {
            "delta_mean_speed_kmh":  round(d_mean_spd, 2),
            "delta_min_speed_kmh":   round(d_min_spd, 2),
            "delta_mean_curvature":  round(d_curv, 6),
            "delta_peak_lat_accel":  round(d_lat, 2),
            "coaching_advice":       advice,
            "ref_profile":           ref_profile,
            "driver_profile":        driver_profile,
        }

    return {
        "lap_id":         lap_id,
        "driver":         driver,
        "lap_time_s":     round(lap_time_s, 3),
        "delta_lap_time": round(delta_lap_time, 3),
        "corners":        corners_out,
    }


app = FastAPI(title="F1 Corner Coach", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

frontend_path = BASE / "frontend"
if frontend_path.exists():
    app.mount("/app", StaticFiles(directory=str(frontend_path), html=True), name="frontend")


@app.get("/api/laps")
def get_laps():
    return lap_index

@app.get("/api/drivers")
def get_drivers():
    return sorted(set(r["Driver"] for r in lap_index))

@app.get("/api/coach/{lap_id:path}")
def get_coaching(lap_id: str):
    return build_coach_report(lap_id)

@app.get("/api/reference")
def get_reference():
    ref_corners = {}
    for corner in ["T1", "T2", "T3", "T4"]:
        seg = mini_ref[mini_ref["corner"] == corner]
        ref_corners[corner] = {
            "distances":  seg["dist_start"].round(1).tolist(),
            "curvature":  [round(x, 5) for x in seg["mean_curvature"].tolist()],
            "lat_accel":  [round(x, 2) for x in seg["peak_lat_accel"].tolist()],
            "mean_speed": [round(x, 1) for x in seg["mean_speed"].tolist()],
        }
    return ref_corners

@app.get("/")
def root():
    return {"status": "ok", "ui": "/app", "docs": "/docs"}