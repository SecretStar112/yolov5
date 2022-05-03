import io
from PIL import Image

from run import model


def get_prediction(file):
    """Make prediction

        Params:
        file: Uploaded image

        Returns:
        results: Predicted image
    """

    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))
    results = model(img, size=640)
    return results