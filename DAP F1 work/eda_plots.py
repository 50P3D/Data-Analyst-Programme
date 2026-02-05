# import pandas as pd
# import matplotlib.pyplot as plt

# # Load the position CSV
# pos = pd.read_csv("position_SIN23_Q_VER_fastlap.csv")

# plt.figure(figsize=(8,8))
# plt.plot(pos['X'], pos['Y'])
# plt.title("Raw Trajectory - VER Fastest Lap (Singapore 2023 Q)")
# plt.xlabel("X Position")
# plt.ylabel("Y Position")
# plt.axis('equal')
# plt.show()

##^^ use the above if you wanted a simpler implementation of the plotting of x and y coordinates
##   use the below if you wanted some more structural benefits
##(↓)
##(↓)
import pandas as pd
import matplotlib.pyplot as plt
import os


def load_csv_or_die(path: str) -> pd.DataFrame:
    if not os.path.exists(path):
        raise FileNotFoundError(f"CSV file not found: {path}")
    return pd.read_csv(path)


def plot_xy_trajectory(pos_csv: str):
    pos = load_csv_or_die(pos_csv)

    plt.figure(figsize=(8, 8))
    plt.plot(pos['X'], pos['Y'])
    plt.title("Raw XY Trajectory - Fastest Lap")
    plt.xlabel("X position")
    plt.ylabel("Y position")
    plt.axis('equal')
    plt.tight_layout()
    plt.show()


def plot_speed_vs_distance(tel_csv: str):
    tel = load_csv_or_die(tel_csv)

    plt.figure(figsize=(10, 4))
    plt.plot(tel['Distance'], tel['Speed'])
    plt.title("Speed vs Distance - Fastest Lap")
    plt.xlabel("Distance (m)")
    plt.ylabel("Speed (km/h)")
    plt.tight_layout()
    plt.show()


def plot_throttle_brake_vs_distance(tel_csv: str):
    tel = load_csv_or_die(tel_csv)

    plt.figure(figsize=(10, 4))
    plt.plot(tel['Distance'], tel['Throttle'], label="Throttle (%)")
    # Brake is 0/1 → scale to look nice on same plot
    if 'Brake' in tel.columns:
        plt.plot(tel['Distance'], tel['Brake'] * 100, label="Brake (scaled x100)")
    plt.title("Throttle & Brake vs Distance - Fastest Lap")
    plt.xlabel("Distance (m)")
    plt.ylabel("Input (%)")
    plt.legend()
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    # Change these if your filenames differ
    TELEMETRY_CSV = "telemetry_SIN23_Q_VER_fastlap.csv"
    POSITION_CSV = "position_SIN23_Q_VER_fastlap.csv"

    print("Plot A: XY trajectory…")
    plot_xy_trajectory(POSITION_CSV)

    print("Plot B: Speed vs distance…")
    plot_speed_vs_distance(TELEMETRY_CSV)

    print("Plot C: Throttle & brake vs distance…")
    plot_throttle_brake_vs_distance(TELEMETRY_CSV)

    print("EDA plots complete.")


# | Item        | Value                                        |
# | ----------- | -------------------------------------------- |
# | **Year**    | **2023**                                     |
# | **Track**   | **Singapore GP – Marina Bay Street Circuit** |
# | **Session** | **Qualifying (Q)**                           |
# | **Driver**  | **Max Verstappen (VER)**                     |
# | **Lap**     | **Fastest lap that FastF1 marked for him**   |
