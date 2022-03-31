import flask
import torch
import argparse
from flask import Flask, render_template, request, redirect

import views

app = Flask(__name__)

parser = argparse.ArgumentParser(description='Flask app')
parser.add_argument('path', type=str,
                    help='A required path to weights')

args = parser.parse_args()
path_to_weights = args.path
if __name__ == '__main__':
    model = torch.hub.load('ultralytics/yolov5', 'custom', path_to_weights)
    model.eval()
    app.run()
