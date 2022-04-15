## Requirements
* Python>=3.7.0 </br>
* PyTorch>=1.7 </br>
* `pip install -r requirements.txt`

## Dataset
  The dataset is available on download [here](https://public.roboflow.com/object-detection/uno-cards/2)
## Training

`python train.py --img 640 --cfg yolov5s.yaml --hyp hyp.scratch.yaml --batch 32 --epochs 100 --data road_sign_data.yaml --weights yolov5s.pt  --name yolo_road_det`

### Parameters:
* img : Size of image </br>
* batch : The batch size </br>
* epochs : Number of epochs to train for </br>
* data : Data YAML file that contains information about the dataset (path of images, labels) </br>
* workers : Number of CPU workers </br>
* cfg : Model architecture. There are 4 choices available: yolo5s.yaml, yolov5m.yaml, yolov5l.yaml, yolov5x.yaml </br>
* weights: Pretrained weights you want to start training from. If you want to train from scratch, use `--weights ' '` </br>
* name: Various things about training such as train logs. Training weights would be stored in a folder named `runs/train/name` </br>
* hyp: YAML file that describes hyperparameter choices. For examples of how to define hyperparameters, see `data/data_uno_cards.yaml`

## Testing

`python val.py --data data.yaml --weights model.pt`

### Parameters:
* data : Data YAML file that contains information about the dataset (path of images, labels) </br>
* weights: Pretrained weights to make predictions

## Inference

`python detect.py --weights yolov5s.pt --img 640 --conf 0.25 --source data/images`

Note: results will be saved to `runs/detect`
### Parameters:
* weights: Pretrained weights to make predictions
* img : Size of image </br>
* conf: Thresholding objectness confidence </br>
* source: The source of detector, which can be: single image, folder of images, Video, Webcam

## Web application
`python run_web_app.py --path path_to_model.pt`

* path: path to trained weights
## Google Colab stuff

* Training_yolov5_Colab.ipynb : train, inference using GPU </br>
* Flask_Web_App.ipynb : flask application </br>
* Real_time_object_detection_w_webcam.ipynb : real time object detection

## Results
 ![Image_labels](data/images/test_batch0_labels.jpg)
 
 ![Image_pred](data/images/test_batch0_pred.jpg)
