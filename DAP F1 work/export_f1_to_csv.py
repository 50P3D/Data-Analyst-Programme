import fastf1

# 1. Enable FastF1 cache (folder will be created if it doesn't exist)
fastf1.Cache.enable_cache('f1_cache')

# 2. Choose the session you want
# You can change year, track, and session type later.
session = fastf1.get_session(2023, 'Singapore', 'Q')  # 2023 Singapore GP Qualifying
session.load()

# 3. Get all laps for the session
laps = session.laps

# Save ALL laps to CSV
laps.to_csv('laps_SIN23_Q_all.csv', index=False)

# 4. Pick a specific driver (change 'VER' to whoever you want: 'HAM', 'LEC', etc.)
driver_code = 'VER'
driver_laps = laps.pick_driver(driver_code)

# Save this driver's laps
driver_laps.to_csv(f'laps_SIN23_Q_{driver_code}.csv', index=False)

# 5. Get the driver's fastest lap
fast_lap = driver_laps.pick_fastest()

# 6. Get car telemetry (speed, throttle, brake, gear, distance, etc.)
car_data = fast_lap.get_car_data().add_distance()
car_data.to_csv(f'telemetry_SIN23_Q_{driver_code}_fastlap.csv', index=False)

# 7. Get position (X, Y, Z) for the fastest lap
pos_data = fast_lap.get_pos_data()
pos_data.to_csv(f'position_SIN23_Q_{driver_code}_fastlap.csv', index=False)

print("Done! CSV files created in this folder:")
print(" - laps_SIN23_Q_all.csv")
print(f" - laps_SIN23_Q_{driver_code}.csv")
print(f" - telemetry_SIN23_Q_{driver_code}_fastlap.csv")
print(f" - position_SIN23_Q_{driver_code}_fastlap.csv")
