import torch
import argparse
from flask import Flask

app = Flask(__name__)

parser = argparse.ArgumentParser(description='Flask app')
parser.add_argument('--path', type=str,
                    help='A required path to weights')

args = parser.parse_args()
path_to_weights = args.path

model = torch.hub.load('ultralytics/yolov5', 'custom', path_to_weights)
model.eval()

with app.app_context():
    import views

if __name__ == '__main__':

    app.run(host="0.0.0.0", port=5000)