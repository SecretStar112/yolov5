import io
from PIL import Image

from run_web_app import model


def get_prediction(file):
    """
        Params:
        file: Uploaded image
    """
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))
    results = model(img, size=640)
    return results