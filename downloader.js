var findButton,
    downloadButton,
    downloadLink;

var toggleButtonVisibility = function (button, show) {
    button.style.display = show ? 'initial' : 'none';
}

var onFindButtonClick = function () {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, { action: "findVideo" }, function (res) {
            toggleButtonVisibility(downloadButton, res.video);
            toggleButtonVisibility(findButton, !res.video);
            downloadLink.href = res.video.src;
            downloadLink.download = ""; 
        });
    });
}

var init = function() {
    findButton = document.querySelector("button#find");
    findButton.addEventListener("click", onFindButtonClick);
    downloadButton = document.querySelector("button#download");
    toggleButtonVisibility(downloadButton, false);
    downloadLink = document.querySelector("button#download a");
}

document.addEventListener('DOMContentLoaded', init);