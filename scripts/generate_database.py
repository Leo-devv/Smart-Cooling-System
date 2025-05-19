import json
import random
import os
import datetime
from pathlib import Path

# Function to generate random number between min and max (inclusive)
def get_random_number(min_val, max_val):
    return random.uniform(min_val, max_val)

# Function to generate random boolean with probability
def get_random_boolean(probability=0.8):
    return random.random() < probability

# Function to generate a timestamp for a specific time ago
def get_timestamp_minutes_ago(minutes_ago):
    date = datetime.datetime.now() - datetime.timedelta(minutes=minutes_ago)
    return date.strftime("%Y-%m-%d %H:%M:%S")

# Function to determine system status based on parameters
def determine_status(temperature, flow, bearing_wear, dry_cooling):
    if temperature > 65 or flow < 3 or bearing_wear > 0.99:
        return "CRITICAL"
    elif (temperature > 60 or 
          temperature < 40 or 
          flow < 4 or 
          flow > 8 or 
          bearing_wear < 0.01 or 
          bearing_wear > 0.8 or 
          not dry_cooling):
        return "WARNING"
    else:
        return "OK"

def generate_database(num_records=100):
    """Generate a sample database with cooling system data"""
    
    # Initialize with some base values
    base_temperature = random.randint(40, 60)
    base_flow = round(random.uniform(4, 8), 1)
    base_bearing_wear = round(random.uniform(0.1, 0.8), 2)
    
    # Generate logs with some correlation between consecutive readings
    logs = []
    
    for i in range(num_records):
        # Generate values with some variance from previous values to simulate realistic changes
        minutes_ago = i * 15  # 15-minute intervals
        
        # Add some randomness but maintain trends
        temp_variance = random.uniform(-3, 3)
        flow_variance = random.uniform(-0.5, 0.5)
        wear_variance = random.uniform(-0.02, 0.02)
        
        # Occasionally introduce anomalies
        if random.random() < 0.1:  # 10% chance of anomaly
            temp_variance = random.uniform(-10, 10)
            flow_variance = random.uniform(-2, 2)
        
        # Calculate new values with constraints
        temperature = round(max(30, min(70, base_temperature + temp_variance)))
        flow = round(max(2, min(10, base_flow + flow_variance)), 1)
        bearing_wear = round(max(0.01, min(0.99, base_bearing_wear + wear_variance)), 2)
        
        # Update base values for next iteration (trending)
        base_temperature = temperature
        base_flow = flow
        base_bearing_wear = bearing_wear  # Bearing wear generally increases over time
        
        # Other parameters
        dry_cooling = get_random_boolean(0.85)
        machine_running = get_random_boolean(0.9)
        service_request = get_random_boolean(0.15)
        reconfig_time = random.randint(5, 30)
        downtime = random.randint(0, 60)
        
        # Determine status
        status = determine_status(temperature, flow, bearing_wear, dry_cooling)
        
        # Create log entry
        log = {
            "timestamp": get_timestamp_minutes_ago(minutes_ago),
            "temperature": temperature,
            "bearingWear": bearing_wear,
            "flow": flow,
            "dryCooling": dry_cooling,
            "machineRunning": machine_running,
            "reconfigurationTime": reconfig_time,
            "downtime": downtime,
            "serviceRequest": service_request,
            "status": status
        }
        
        logs.append(log)
    
    # Sort logs by timestamp (newest first)
    logs.sort(key=lambda x: x["timestamp"], reverse=True)
    
    return logs

def save_database(logs, filename="cooling_data.json"):
    """Save the generated logs to a JSON file"""
    
    # Create data directory if it doesn't exist
    data_dir = Path("data")
    data_dir.mkdir(exist_ok=True)
    
    # Full path to the database file
    db_path = data_dir / filename
    
    # Save the logs to the file
    with open(db_path, "w") as f:
        json.dump({"logs": logs}, f, indent=2)
    
    print(f"Database with {len(logs)} records saved to {db_path}")
    return str(db_path)

if __name__ == "__main__":
    # Generate 100+ records
    num_records = 120
    logs = generate_database(num_records)
    
    # Save to file
    db_path = save_database(logs)
    
    # Print some statistics
    warning_count = sum(1 for log in logs if log["status"] == "WARNING")
    critical_count = sum(1 for log in logs if log["status"] == "CRITICAL")
    ok_count = sum(1 for log in logs if log["status"] == "OK")
    
    print(f"\nDatabase Statistics:")
    print(f"Total Records: {len(logs)}")
    print(f"OK Status: {ok_count} ({ok_count/len(logs)*100:.1f}%)")
    print(f"WARNING Status: {warning_count} ({warning_count/len(logs)*100:.1f}%)")
    print(f"CRITICAL Status: {critical_count} ({critical_count/len(logs)*100:.1f}%)")
    
    # Print sample record
    print("\nSample Record:")
    print(json.dumps(logs[0], indent=2))
    
    print(f"\nTo use this database with the Smart Cooling System Monitor:")
    print(f"1. Make sure the 'data' directory is in your project root")
    print(f"2. The API will automatically use this data if available")
