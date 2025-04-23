import requests
import os

# Create a folder to store downloaded models
folder_name = 'glb_models'
os.makedirs(folder_name, exist_ok=True)

# List of URLs of the .glb models you want to download
model_urls = [
    "https://example.com/model1.glb",  # Replace with actual .glb file URLs
    "https://example.com/model2.glb",
    "https://example.com/model3.glb",
    "https://example.com/model4.glb",
    "https://example.com/model5.glb"
]

# Function to download .glb models
def download_models(urls):
    for i, url in enumerate(urls):
        try:
            # Get the content from the URL
            response = requests.get(url)
            response.raise_for_status()

            # Save the file with a name (model_1.glb, model_2.glb, etc.)
            with open(f"{folder_name}/model_{i+1}.glb", 'wb') as file:
                file.write(response.content)
            print(f"Downloaded model_{i+1}.glb successfully!")
        
        except requests.exceptions.RequestException as e:
            print(f"Failed to download {url}: {e}")

# Run the function to start downloading
download_models(model_urls)
