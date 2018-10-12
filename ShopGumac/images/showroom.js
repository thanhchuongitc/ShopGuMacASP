function fillDistrictFontend() {
    var provinceID = $("#showroom_searchform #ProvinceID").val();
    //$.ajax({
    //    url: 'WShowRoom/FillDistrict/',
    //    type: "POST",
    //    data: {
    //        provinceId:provinceID
    //    },
    //    dataType: "JSON",
    //    success: function (districts) {
    //        $("#FormShowRoom #DistrictID").html("");
    //        $("#FormShowRoom #DistrictID").append($('<option value=""> - Chọn quận/huyện -</option>'));
    //        $.each(districts, function (i, district) {
    //            $("#FormShowRoom #DistrictID").append($('<option></option>').val(district.ID).html(district.Name));
    //        });
    //    }
    //});
    fillShowRoomProvince(provinceID);

};

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 10.841560, lng: 106.653490 },
        zoom: 17
    });
    var marker = new google.maps.Marker({
        position: { lat: 10.841560, lng: 106.653490 },
        label: "Trụ sở chính - 1038 Quang Trung - Phường 8",
        map: map
    });
}

function moveToMarker(latitude, longitude, address) {
    var uluru = { lat: latitude, lng: longitude };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        label: address,
        map: map
    });

}
$(document).on('keypress', '#FormShowRoom #Address', function (e) {
    if (e.keyCode == 13) {  // detect the enter key
        var provinceID = $("#FormShowRoom #ProvinceID").val();
        var districtID = $("#FormShowRoom #DistrictID").val();
        $.ajax({
            url: 'WShowRoom/FillShowRoomAddress/',
            type: "POST",
            data: {
                provinceID: provinceID,
                districtID: districtID,
                address: $(this).val()
            },
            dataType: "JSON",
            success: function (showrooms) {
                renderShowRoom(showrooms);
            }
        });
    }
});

function fillShowRoomProvince(provinceID) {
    $.ajax({
        url: 'WShowRoom/FillShowRoom/',
        type: "POST",
        data: {
            provinceID: provinceID
        },
        dataType: "JSON",
        success: function (showrooms) {
            if (showrooms != null) {
                renderShowRoom(showrooms)
                
            }
            
            
        }
    });
}

function renderShowRoom(showrooms) {
    console.log(showrooms);
    
   // moveToMarker(10.841560, 106.653490, "Trụ sở chính - 1038 Quang Trung - Phường 8");
    $(".list-showroom").html("");
    var uluru = { lat: parseFloat(showrooms[0].Latitude), lng: parseFloat(showrooms[0].Longitude) };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            label: showrooms[0].Address,
            map: map
        });
    $.each(showrooms, function (i, showroom) {
        var html = [];

        var func = "moveToMarker(" + showroom.Latitude + "," + showroom.Longitude + ",\"" + showroom.Address + "\")";

        html.push("<p  onclick='" + func + "'>" + showroom.Address + "</br> <i class='fa fa-phone' aria-hidden='true'></i>&nbsp;" + showroom.PhoneNumber + "</br> <i class='fa fa-clock-o' aria-hidden='true'></i>&nbsp;" + showroom.WorkTime + "</p>");

        $(".list-showroom").append(html.join(''));
    });
}

function fillShowRoomDistrict() {
    var provinceID = $("#FormShowRoom #ProvinceID").val();
    var districtID = $("#FormShowRoom #DistrictID").val();
    $.ajax({
        url: 'WShowRoom/FillShowRoomDistrict/',
        type: "POST",
        data: {
            provinceID: provinceID,
            districtID:districtID
        },
        dataType: "JSON",
        success: function (showrooms) {
            renderShowRoom(showrooms);
        }
    });
}


function fnChooseProvince(provinceID) {
    $.ajax({
        url: 'WShowRoom/ListShowRoomByProvince/',
        type: "POST",
        data: {
            provinceID: provinceID,
        },
        success: function (showrooms) {
            $("#showroom_searchform").html(showrooms);
        }
    });
}