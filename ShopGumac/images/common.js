$(document).ready(function () {
    /*chuyển có dấu thành ko dấu*/
    $(".nounicode").on({
        keydown: function (e) {
            if (e.which === 32)
                return false;
            
        },
        keyup: function (e) {
            var str = this.value;
            str = str.replace(/\s/g, "");
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            str = str.replace(/\!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
            str = str.replace(/-+-/g, "-");
            str = str.replace(/^\-+|\-+$/g, "");
            this.value = str;
        }
    });

    /*chuyển có dấu thành ko dấu*/
    $(".nospecialcharacter").on({
        //keydown: function (e) {
        //    if (e.which === 32)
        //        return false;

        //},
        keyup: function (e) {
            var str = this.value;
            //str = str.replace(/\s/g, "");
            str = str.replace(/\!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "-");
            str = str.replace(/-+-/g, "-");
            str = str.replace(/^\-+|\-+$/g, "");
            this.value = str;
        }
    });
});
//Convert datetime string to datetime
function convertDatetimeString(input, fullDateTime, ampm, format, showsecond) {
    if (format == null || format == "") {
        format = 'dmy';
    }
    if (showsecond == null)
        showsecond = false;

    if (input == null || input == "")
        return "";
    var time = "";
    var value = new Date(input);
    var day = value.getDate() > 9 ? value.getDate() : "0" + value.getDate();
    var month = (value.getMonth() + 1) > 9 ? (value.getMonth() + 1) : "0" + (value.getMonth() + 1);
    var year = value.getFullYear();

    var gio = value.getHours();
    if (ampm) {
        var time = gio >= 12 ? 'PM' : 'AM';
        gio = gio % 12;
        gio = gio ? gio : 12;
    }
    var hour = gio > 9 ? gio : "0" + gio;
    var minute = value.getMinutes() > 9 ? value.getMinutes() : "0" + value.getMinutes();
    var second = value.getSeconds() > 9 ? value.getSeconds() : "0" + value.getSeconds();

    var result = "";
    if (format == "dmy") {
        result = day + "/" + month + "/" + year;
    } else if (format == "mdy") {
        result = month + "/" + day + "/" + year;
    } else if (format == "ddmm") {
        result = day + "/" + month;
    }
    else {
        result = year + "/" + month + "/" + day;
    }

    if (fullDateTime) {
        if (ampm)
            return result + " " + hour + ":" + minute + (showsecond ? (":" + second) : "") + " " + time;
        return result + " " + hour + ":" + minute + (showsecond ? (":" + second) : "");
    }
    return result;
}
//Convert /date(...)/ to datetime
function convertDatetime(input, fullDateTime, ampm, format, showsecond) {
    if (format == null || format == "") {
        format = 'dmy';
    }

    if (showsecond == null)
        showsecond = false;

    if (input == null || input == "")
        return "";
    var time = "";
    var value = new Date(parseInt(input.substr(6)));
    var day = value.getDate() > 9 ? value.getDate() : "0" + value.getDate();
    var month = (value.getMonth() + 1) > 9 ? (value.getMonth() + 1) : "0" + (value.getMonth() + 1);
    var year = value.getFullYear();

    var gio = value.getHours();
    if (ampm) {
        var time = gio >= 12 ? 'PM' : 'AM';
        gio = gio % 12;
        gio = gio ? gio : 12;
    }
    var hour = gio > 9 ? gio : "0" + gio;
    var minute = value.getMinutes() > 9 ? value.getMinutes() : "0" + value.getMinutes();
    var second = value.getSeconds() > 9 ? value.getSeconds() : "0" + value.getSeconds();

    var result = "";
    if (format == "dmy") {
        result = day + "/" + month + "/" + year;
    } else if (format == "mdy") {
        result = month + "/" + day + "/" + year;
    } else if (format == "ddmm") {
        result = day + "/" + month;
    }
    else {
        result = year + "/" + month + "/" + day;
    }

    if (fullDateTime) {
        if (ampm)
            return result + " " + hour + ":" + minute + (showsecond ? (":" + second) : "") + " " + time;
        return result + " " + hour + ":" + minute + (showsecond ? (":" + second) : "");
    }
    return result;
}

function convertDatetimeNotYear(input, fullDateTime, ampm, format) {
    if (format == null || format == "") {
        format = 'dmy';
    }

    if (input == null || input == "")
        return "";
    var time = "";
    var value = new Date(parseInt(input.substr(6)));
    var day = value.getDate() > 9 ? value.getDate() : "0" + value.getDate();
    var month = (value.getMonth() + 1) > 9 ? (value.getMonth() + 1) : "0" + (value.getMonth() + 1);
    var year = value.getFullYear();

    var gio = value.getHours();
    if (ampm) {
        var time = gio >= 12 ? 'PM' : 'AM';
        gio = gio % 12;
        gio = gio ? gio : 12;
    }
    var hour = gio > 9 ? gio : "0" + gio;
    var minute = value.getMinutes() > 9 ? value.getMinutes() : "0" + value.getMinutes();
    var result = "";
    if (format == "dmy") {
        result = day + "/" + month;
    } else if (format == "mdy") {
        result = month + "/" + day;
    } else {
        result = year + "/" + month;
    }



    if (fullDateTime) {
        if (ampm)
            return result + " " + hour + ":" + minute + " " + time;
        return result + " " + hour + ":" + minute;
    }
    return result;
}

//DMY==> YMD
function reformatDateString(s, splitstr) {
    if (s == null || s == "")
        return "";
    if (splitstr == null) {
        splitstr = '-';
    }
    var b = s.split(/\D/);
    return b.reverse().join(splitstr);
}

function formatNumber(nStr) {
    if (nStr == null)
        return 0;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function setMoneyTextBox(selector, callBackChange) {
    //$(selector).inputmask("decimal", {
    //    radixPoint: ".",
    //    groupSeparator: ",",
    //    digits: 2,
    //    autoGroup: true,
    //    rightAlign: true,
    //    oncleared: function () { $(this).val('0'); }
    //});
    $(selector).css("text-align", "right");
    $(selector).autoNumeric('init', { currencySymbol: '', decimalPlacesOverride: 0, showWarnings: false });



    $(selector).change(function () {
        var value = $(this).val();
        var Re = new RegExp("\\,", "g");
        value = value.replace(Re, "");
        if (value == "") {
            value = 0;
        }
        $(this).next().val(value);

    });

}

function setMoneyTextBoxAllign(selector, allignright) {
    $(selector).inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        autoGroup: true,
        rightAlign: allignright,
        oncleared: function () { $(this).val('0'); }
    });



    $(selector).change(function () {
        var value = $(this).val();
        var Re = new RegExp("\\,", "g");
        value = value.replace(Re, "");
        $(this).next().val(value);

    });

}

function ConvertMoneyToNumber(value) {
    var Re = new RegExp("\\,", "g");
    value = value.replace(Re, "");
    return parseFloat(value);
}
function print(url) {
    console.log(url);
    var iframe = this._printIframe;
    if (!this._printIframe) {
        iframe = this._printIframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.onload = function () {
            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    }

    iframe.src = url;
}
function formatDefaultSQLDate(value) {
    var ngay = value.getDate();
    if (ngay < 10) {
        ngay = '0' + ngay;
    }
    var thang = value.getMonth() + 1;
    if (thang < 10) {
        thang = '0' + thang;
    }
    var nam = value.getFullYear();

    return nam + '-' + thang + '-' + ngay;
}


function showOrderModal(id) {
    var mode = "";
    if (id != "0") {
        mode = "Edit";
    }
    else {
        mode = "Add";
    }
    $.ajax({
        url: "/Order/CheckLock",
        method: "POST",
        data: {
            orderID: id, lockIfNotLock: 1
        },
        beforeSend: function () {
            showSpinLoading();
        },
        success: function (data) {

            if (data.IsLock == 1) {
                showError("Không thể mở đơn hàng", "Đơn hàng đang được chỉnh sửa bởi " + data.LockBy);
                hideSpinLoading();
                return;
            } else {
                $.ajax({
                    url: "/Order/AddNewEdit",
                    method: "POST",
                    data: {
                        id: id, mode: mode
                    },
                    success: function (data) {
                        //console.log(data);
                        var currentTime = new Date();
                        $("#popupContainer1").html(data);
                        $("#modalLenDonHangOrderBox").modal("show");
                        hideSpinLoading();
                        var t2 = new Date();
                        var dif = t2.getTime() - currentTime.getTime();
                        console.log("total = " + dif);
                        setTimeout(function () {
                            var lst_h = $(".searchAll").height();
                            if (lst_h == 0) {
                                $("#popupSelectProduct").css({ "bottom": 50 });
                            }
                            else {
                                $("#popupSelectProduct").css({ "bottom": lst_h + 20 });
                            }
                        }, 1000);

                    }
                });
            }
        }
    });
    return false;


}

function unlockOrder(id) {
    $.ajax({
        url: "/Order/UnLockOrder",
        method: "POST",
        data: {
            orderID: id
        },
        success: function (data) {

        }
    });
}

function lockOrder(id) {
    if (id == '')
        return;
    $.ajax({
        url: "/Order/LockOrder",
        method: "POST",
        data: {
            orderID: id
        },
        success: function (data) {

        }
    });
}

function saveUserSetting(name, val) {
    if (name == '')
        return;
    $.ajax({
        url: "/UserSetting/Update",
        method: "POST",
        data: {
            name: name, val: val
        },
        success: function (data) {

        }
    });
}
function showHistoryOrder(phone1, phone2, id) {
    $.ajax({
        url: "/Component/HistoryOrderBox",
        beforeSend: function () {
            showSpinLoading();
        },
        data: { phone1: phone1, phone2: phone2, id: id },
        success: function (data) {
            hideSpinLoading();
            $("#popupContainer3").html(data);
            $("#modalHistoryOrder").modal("show");
        }
    });
    return false;
}

function loadSubstatusID(statusID, selected, subID, subContanier, onchange) {
    $.ajax({
        url: "/Component/SubStatusSelect",
        data: { statusID: statusID, selected: selected, cbID: subID, onchange: onchange },
        success: function (data) {
            $(subContanier).html(data);
            $("#" + subID).select2({ width: '100%' });

        }
    });
}

function loadSubstatusIDMultiple(statusID, selected, subID, subContanier, onchange) {
    $.ajax({
        url: "/Component/SubStatusSelect",
        data: { statusID: statusID, selected: selected, cbID: subID, onchange: onchange, containall:"contain" },
        success: function (data) {
            $(subContanier).html(data);
            setMultipleSelect("#" + subID, "[name=" + subID + "]", function () {
            });
        }
    });
}

function loadAccountID(accounttypeID, subID, subContanier, onchange) {
    $.ajax({
        url: "/Component/AccountTypeSelect",
        data: { id: accounttypeID, onchange: onchange },
        success: function (data) {
            $(subContanier).html(data);
            $("#" + subID).select2();

        }
    });
}

function select2Focus() {
    $(this).closest('.select2').prev('select').select2('open');
}
function showMoney(input) {
    input += '';
    x = input.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function enterSubmitForm(modal, checkfunction, form) {
    $(document).keypress(function (e) {
        if ($(modal).hasClass('in') && !$(".swal2-container").is(':visible')) {
            if (e.keyCode == 13) {
                e.preventDefault();
                var test = checkfunction();
                if (test) {
                    $(form).submit();
                }
            }
        } else {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        }
        if (!$(modal).hasClass('in') && $(".swal2-container").is(':visible')) {
            if (e.keyCode == 13) {
                $(".swal2-confirm").click();
            }
        }
    });
}
function enterSearch(selector, functionInput) {
    $(selector).keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(selector).val($.trim($(selector).val()));
            functionInput();
        }
    });
}
function formatNumberTime(time) {
    if (time == null)
        return 0;
    var intTime = parseInt(time);
    var m = Math.floor(intTime / 60);
    var s = intTime % 60;
    var strM = m;
    var strS = s;
    if (s < 10) {
        strS = "0" + s;
    }
    if (m < 10) {
        strM = "0" + m;
    }
    else {
        nStr = m;
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        strM = x1 + x2;
    }
    return strM + ":" + strS;
}