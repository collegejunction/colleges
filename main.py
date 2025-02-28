import pandas as pd
import re

# Load CSV file (Replace 'your_file.csv' with actual CSV file path)
csv_file = "collegejunction.colleges.csv"
df = pd.read_csv(csv_file)

# Function to extract the 'src' URL from the iframe tag
def extract_src(iframe_string):
    match = re.search(r'src="([^"]+)"', str(iframe_string))
    return match.group(1) if match else None

# Apply function to clean the 'Map' column
df["Map"] = df["Map"].apply(extract_src)

# Save cleaned data back to CSV
df.to_csv("cleaned_colleges.csv", index=False)

print("✅ Fixed CSV saved as 'cleaned_colleges.csv'")
