## First you need install requirements.
---
`cd your_path_to_directory/yolov5` </br>
`pip install -r requirements.txt`


## In order to train on custom data run:

`python train.py --img 640 --cfg yolov5s.yaml --hyp hyp.scratch.yaml --batch 32 --epochs 100 --data road_sign_data.yaml --weights yolov5s.pt  --name yolo_road_det`

### You can use various flags to set options regarding training:
*img : Size of image </br>
*batch : The batch size </br>
*epochs : Number of epochs to train for </br>
*data : Data YAML file that contains information about the dataset (path of images, labels) </br>
*workers : Number of CPU workers </br>
*cfg : Model architecture. There are 4 choices available: yolo5s.yaml, yolov5m.yaml, yolov5l.yaml, yolov5x.yaml </br>
*weights: Pretrained weights you want to start training from. If you want to train from scratch, use `--weights ' '` </br>
*name: Various things about training such as train logs. Training weights would be stored in a folder named `runs/train/name` </br>
*hyp: YAML file that describes hyperparameter choices. For examples of how to define hyperparameters, see `data/hyp.scratch.yaml`

## To test your model run:

`python test.py --data your_data.yaml --weights your_model.pt`

## Run the inference, results will be saved to `runs/detect`

`python detect.py --weights yolov5s.pt --img 640 --conf 0.25 --source data/images`

## To run web app

`cd yolov5/web_app` </br>
`python run_web_app.py --path path_to_model.pt`
## Google Colab stuff.

*Training_yolov5_Colab.ipynb : train and test using GPU </br>
*Flask_Web_App.ipynb : run ngrok flask application in colab </br>
*Real_time_object_detection_w_webcam.ipynb : real time object detection
