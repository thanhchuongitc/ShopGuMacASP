function showSpinLoading() {
    $(".waiting-spin-content").css({ "display": "block" });
}

function hideSpinLoading() {
    $(".waiting-spin-content").css({ "display": "" });
}



function showLoadingBar() {
    $("#loadmore").click();
}
$(document).ready(function () {
    $("#loadmore").click(function () {
        loadmoreClick();
    });
    $(".main-sidebar .slimScrollDiv").css({ "overflow": "" });
    $(".main-sidebar .slimScrollDiv section.sidebar").css({ "overflow": "" });
});

function loadmoreClick() {
    $("#loadmore").loadingbar();
}

