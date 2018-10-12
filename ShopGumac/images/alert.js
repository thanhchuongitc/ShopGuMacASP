function showError(title, message) {
    swal(
        title,
        message,
        'error'
    )
}

function showSuccess(title, message) {
    swal(
        title,
        message,
        'success'
    )
}

function showWarning(title, message) {
    swal(
        title,
        message,
        'warning'
    )
}

function showConfirm(title, message, callBackYes, callBackNo) {

    swal({
        title: title,
        text: message,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success btn-medium margin-rigth10px',
        cancelButtonClass: 'btn btn-danger btn-medium',
        buttonsStyling: false
    }).then(function () {
        callBackYes();
    }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
            callBackNo();
        }
    })
}


function showConfirmParam(title, message, callBackYes, callBackNo, param) {
    swal({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    }).then(function () {
        if (typeof (param) != 'undefined') {
            callBackYes(param);
        }
        else {
            callBackYes();
        }
    }, function (dismiss) {

        if (dismiss === 'cancel') {
            callBackNo();
        }
    });
}

function NoCallAction() {
}


function showSuccessNotify(title, message) {
    $.toaster({ priority: 'success', title: title, message: message });
}

function ShowNotify(title, Message, url) {

    $.notify({
        icon: 'glyphicon glyphicon-warning-sign',
        title: title,
        message: Message,
        target: '_blank',
        url: url
    }, {
        type: "info",
        allow_dismiss: true,
        placement: {
            from: "bottom",
            align: "left"
        },
        animate: {
            enter: "animated fadeInUp",
            exit: "animated fadeOutDown"
        }

    });
}
function showInfoNotify(title, message) {
    $.toaster({ priority: 'info', title: title, message: message });
}
function showErrorNotify(title, message) {
    $.toaster({ priority: 'error', title: title, message: message });
}