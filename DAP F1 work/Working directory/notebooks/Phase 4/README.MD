#An overarching idea behind Phase 4 -> fixing data leaks and intro more valid features

#05_prequali_data_leak.ipynb -> fixing data leaks
#06_prequali_new_feats.ipynb -> intro more valid feature

This folder contains two qualifying prediction baselines with a strict “as-of time” contract.


## 05_prequali_data_leak... (Version A: leak-fixed minimal)
Goal: predict final **qualifying position** *before qualifying starts* using only practice data.
- Prediction time: before Q1 begins
- Target: `quali_position` (from Q session results)
- Feature sources: FP1/FP2/FP3 only
- Features (minimal FP analogues, per driver):
  - `best_fp3_lap_time`, `best_fp_lap_time`, `avg_fp_lap_time`, `median_fp_lap_time`
  - `best_fp3_s1`, `best_fp3_s2`, `best_fp3_s3`
  - `n_fp_laps`
- Explicitly excluded: teammate deltas, ranks/percentiles, weather, track status, historical form.

## 06_prequali_new_feats_... (Version B: full pre-qualifying context)
Goal: predict final **qualifying position** *before qualifying starts* using all information available pre-Q.
- Prediction time: before Q1 begins
- Target: `quali_position` (from Q session results)
- Feature sources:
  - FP1/FP2/FP3 laps + FP weather + FP track status (practice only)
  - Historical races (prior weekends only; optional)
  - Team identity + teammate-relative features
- Feature blocks (per driver):
  1) Practice pace: `best_fp3_lap_time`, `best_fp_lap_time`
     + relative pace: `fp3_rank_best_lap`, `fp_rank_percentile_best_lap`
  2) Sectors: `best_fp3_s1/s2/s3` (+ optional variance)
  3) Consistency: `median_fp_lap_time`, `fp_lap_time_std`, `laps_within_1pct_of_best`
  4) Team normalization: `fp3_delta_to_teammate_best`, `fp_delta_to_team_median`, `fp3_rank_within_team`
  5) Tyre-intent proxies (FP only): `avg_fp_tyre_life`, `pct_fp_laps_on_soft`, `short_run_ratio`
  6) FP reliability: `fp_red_flag_count`, `laps_completed_vs_field_median`, `fp_wet_flag` (+ optional “effective green time”)
  7) Context: `team_id`, `circuit_id` (and optionally `year`)

Weather usage note:
- FastF1 weather is observed *during a session*, not forecast.
- Therefore, **Q weather is leakage** for pre-Q prediction; **FP weather is allowed** and used only as a reliability/context signal.