var video;
var div = null;
var stream;
var captureCanvas;
var imgElement;
var labelElement;

var pendingResolve = null;
var shutdown = false;

function removeDom() {
    stream.getVideoTracks()[0].stop();
    video.remove();
    div.remove();
    video = null;
    div = null;
    stream = null;
    imgElement = null;
    captureCanvas = null;
    labelElement = null;
}

function onAnimationFrame() {
    if (!shutdown) {
    window.requestAnimationFrame(onAnimationFrame);
    }
    if (pendingResolve) {
    var result = "";
    if (!shutdown) {
        captureCanvas.getContext('2d').drawImage(video, 0, 0, 640, 480);
        result = captureCanvas.toDataURL('image/jpeg', 0.8)
    }
    var lp = pendingResolve;
    pendingResolve = null;
    lp(result);
    }
}

async function createDom() {
    if (div !== null) {
    return stream;
    }

    div = document.createElement('div');
    div.style.border = '2px solid black';
    div.style.padding = '3px';
    div.style.width = '100%';
    div.style.maxWidth = '600px';
    document.body.appendChild(div);
    
    const modelOut = document.createElement('div');
    modelOut.innerHTML = "<span>Status:</span>";
    labelElement = document.createElement('span');
    labelElement.innerText = 'No data';
    labelElement.style.fontWeight = 'bold';
    modelOut.appendChild(labelElement);
    div.appendChild(modelOut);
    
    video = document.createElement('video');
    video.style.display = 'block';
    video.width = div.clientWidth - 6;
    video.setAttribute('playsinline', '');
    video.onclick = () => { shutdown = true; };
    stream = await navigator.mediaDevices.getUserMedia(
        {video: { facingMode: "environment"}});
    div.appendChild(video);

    imgElement = document.createElement('img');
    imgElement.style.position = 'absolute';
    imgElement.style.zIndex = 1;
    imgElement.onclick = () => { shutdown = true; };
    div.appendChild(imgElement);
    
    const instruction = document.createElement('div');
    instruction.innerHTML = 
        '<span style="color: red; font-weight: bold;">' +
        'When finished, click here or on the video to stop this demo</span>';
    div.appendChild(instruction);
    instruction.onclick = () => { shutdown = true; };
    
    video.srcObject = stream;
    await video.play();

    captureCanvas = document.createElement('canvas');
    captureCanvas.width = 640; //video.videoWidth;
    captureCanvas.height = 480; //video.videoHeight;
    window.requestAnimationFrame(onAnimationFrame);
    
    return stream;
}
async function stream_frame(label, imgData) {
    if (shutdown) {
    removeDom();
    shutdown = false;
    return '';
    }

    var preCreate = Date.now();
    stream = await createDom();
    
    var preShow = Date.now();
    if (label != "") {
    labelElement.innerHTML = label;
    }
    
    if (imgData != "") {
    var videoRect = video.getClientRects()[0];
    imgElement.style.top = videoRect.top + "px";
    imgElement.style.left = videoRect.left + "px";
    imgElement.style.width = videoRect.width + "px";
    imgElement.style.height = videoRect.height + "px";
    imgElement.src = imgData;
    }
    
    var preCapture = Date.now();
    var result = await new Promise(function(resolve, reject) {
    pendingResolve = resolve;
    });
    shutdown = false;
    
    return {'create': preShow - preCreate, 
            'show': preCapture - preShow, 
            'capture': Date.now() - preCapture,
            'img': result};
}