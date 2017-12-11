const VIDEO_REGEXP = /.+\.(mp4|flv|avi|rmvb|swf)/;

var findVideo = function () {
    var videoTag = document.querySelector("video");
    if (!videoTag && document.querySelector("iframe")) {
        videoTag = document.querySelector("iframe").contentDocument.querySelector("video");
    }
    if (videoTag && videoTag.src.match(VIDEO_REGEXP)) {
        return {
            src: videoTag.src,
            title: document.title
        }
    }
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "findVideo")
      sendResponse({
          video: findVideo()
        });
    else
      sendResponse({}); // Send nothing..
   });