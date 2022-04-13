from PIL import Image
from flask import render_template, request, redirect
from flask import current_app as app

from prediction import get_prediction


@app.route("/", methods=["GET", "POST"])
def predict():
    """
    get:
      description: Get a predicted bounding boxes in image
    
    post:
      description: Upload an image and save it to predict bounding boxes
    """
    if request.method == "POST":
        if "file" not in request.files:
            return redirect(request.url)
        file = request.files["file"]
        if not file:
            return
        
        results = get_prediction(file)

        results.render()
        for img in results.imgs:
            img_base64 = Image.fromarray(img)
            img_base64.save("static/image0.jpg", format="JPEG")
        return redirect("static/image0.jpg")

    return render_template("index.html")
