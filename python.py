import os
import requests

# Define the folder path where models should be saved
download_folder = os.path.join("EzyBuy_App", "images")
os.makedirs(download_folder, exist_ok=True)

# List of models with their names and URLs
models = [
    {
        "name": "Fox",
        # Replace with a valid URL for a futuristic car model in GLB format.
        "modelUrl": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb"
    },
    {
        "name": "Cesium Man",
        # Replace with a valid URL for a cyber-tech drone model in GLB format.
        "modelUrl": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb"
    }
    
]

def download_model(name, url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        # Create a safe file name by replacing spaces
        filename = name.replace(" ", "_") + ".glb"
        file_path = os.path.join(download_folder, filename)
        with open(file_path, "wb") as f:
            f.write(response.content)
        print(f"Downloaded '{filename}' to '{download_folder}'.")
    except requests.RequestException as e:
        print(f"Error downloading '{name}': {e}")

if __name__ == "__main__":
    for model in models:
        download_model(model["name"], model["modelUrl"])
