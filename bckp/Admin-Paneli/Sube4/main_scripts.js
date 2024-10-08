//Configs
//DB-4 Config
var config = {
        apiKey: "AIzaSyBxcCRsiTQgFui1T5pF6ziHXAqdahpNGzM",
        authDomain: "bolumangal-4.firebaseapp.com",
        databaseURL: "https://bolumangal-4-default-rtdb.firebaseio.com",
        projectId: "bolumangal-4",
        storageBucket: "bolumangal-4.appspot.com",
        messagingSenderId: "312801327244",
        appId: "1:312801327244:web:3dd01af2ad40eb08b663a9"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = firebase.database().ref();

var local_storage = []
var keys2 = []
ref.on("value", function (snapshot) {
    var interface = document.getElementById("data_firebase")
    var test = snapshot.val()
    var keys = Object.keys(test);
    keys2 = keys
    var datas = Object.values(test)
    local_storage = test
    num = 5 + "test"

    //burası card.html ıcın
    // for(var i=0; i<keys.length; i++){
    //     var header =  '<div class="col-lg-6"> <div class="card shadow mb-4"> <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"> '+
    //     '<h6 class="m-0 font-weight-bold text-primary">'+keys[i]+'</h6> <div class="dropdown no-arrow">Save and Other Options <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
    //     '<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> </a> <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"  aria-labelledby="dropdownMenuLink">'+
    //     '<div class="dropdown-header">Settings:</div> <a class="dropdown-item" href="#">Add New Menu</a> <a class="dropdown-item" href="#">Save Categories</a> <a class="dropdown-item" href="#">Delete Items</a> <a class="dropdown-item" href="#">Delete Categories</a> <a class="dropdown-item" href="#">Change Categories Name</a>'+
    //     '</div> </div> </div><div id="datas_menus"></div>' 

    //     var insider = ""
    //     for(var k=0; k<datas[i].length; k++){
    //         insider += '<div class="card-body">  <input class="form-control" type="text" value="'+datas[i][k].name+
    //         '" id="'+datas[i][k].name+'"><br><input class="form-control" type="text" value="'+datas[i][k].details+'" id="'+datas[i][k].details+'"><br><input class="form-control" type="number" value="'+
    //         datas[i][k].price+'" id="'+datas[i][k].price+'"></div><hr>'
    //     }
    //     interface.innerHTML += header + insider +'</div> </div>'
    // }
    //card html son

    var interface_2 = document.getElementById("datas_menu")
    for (var i = 0; i < keys.length; i++) {
        for (var k = 0; k < datas[i].length; k++) {
            interface_2.innerHTML += '<tr> <td  id="' + datas[i][k].image + '" onclick=image_view(this)>' + keys[i] + '</td><td>' + datas[i][k].name + '</td><td>' + datas[i][k].details + '</td><td>' + datas[i][k].price + '</td><td>' +
                '<i class="fas fa-edit" style="color:green;" id="' + keys[i] + '**' + datas[i][k].name + '**' + datas[i][k].details + '**' + datas[i][k].price + '**' + k + '**' + datas[i][k].image + '" onClick=update(this)></i>&nbsp;&nbsp;' +
                '<i class="fas fa-trash-alt" style="color:red;"  id="' + keys[i] + '**' + datas[i][k].name + '**' + datas[i][k].details + '**' + datas[i][k].price + '**' + k + '**' + datas[i][k].image + '" onClick=remove(this)></i> </td></tr>'
        }
    }
}, function (error) {
    console.log("Error: " + error.code);
});

//test.split("**")[0] --> key or categories

//test.split("**")[1] --> name of menu

//test.split("**")[2] --> details of menu

//test.split("**")[3] --> price of menu

//test.split("**")[4] --> image of menu

function update(d) {
    var test = d.id
    Swal.fire({
        title: test.split("**")[0] + ', ' + test.split("**")[1],
        html: '<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="isim" value="' + test.split("**")[1] + '"> <br>' +
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik" value="' + test.split("**")[2] + '"> <br>' +
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat" value="' + test.split("**")[3] + '"><br>' +
            '<label class="btn btn-warning">  Resim Seçiniz  <input type="file" id="files" name="files[]" hidden> </label>',
        imageUrl: test.split("**")[5],
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Güncelle',
        cancelButtonText: 'Vazgeç',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            local_storage = (JSON.stringify(local_storage))
            local_storage = (JSON.parse(local_storage))
            var index = parseInt(test.split("**")[4])
            var categories = test.split("**")[0];
            var name = document.getElementById("name").value
            var details = document.getElementById("details").value
            var price = document.getElementById("price").value
            var file = document.getElementById("files").files[0]
            var link_image = test.split("**")[5]
            var keys = test.split("**")[0]
            var others = local_storage
            if (file === undefined) {
                Swal.fire("Güncelleniyor Bekleyiniz.", '', 'info')
                var to_save = firebase.database().ref();
                var data =
                {
                    "name": name,
                    "details": details,
                    "price": parseFloat(price),
                    "image": link_image
                }

                local_storage[keys].splice(index, 1)
                local_storage[categories].splice(index, 0, data);
                console.log(local_storage)
                to_save.set(local_storage, function () {
                    Swal.fire("Güncellendi.", '', 'info')
                    location.reload();
                })
            } else {
                Swal.fire("Güncelleniyor Bekleyiniz.", '', 'info')
                var path = categories + "/" + name
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                var others = local_storage
                local_storage[categories].splice(index, 1)
                thisRef.put(file).then(res => {
                    Swal.fire("Resim Yüklendi. Lütfen bekleyiniz.", '', 'warning')
                    to_save_image.child(file.name).getDownloadURL().then(url => {
                        var to_save = firebase.database().ref();
                        var data =
                        {
                            "name": name,
                            "details": details,
                            "price": parseFloat(price),
                            "image": url
                        }

                        local_storage[categories].splice(index, 0, data);
                        console.log(local_storage)
                        to_save.set(local_storage, function () {
                            Swal.fire("Güncellendi.", '', 'info')
                            location.reload();
                        })
                    })
                }).catch(e => {
                    console.log("Error" + e)
                    Swal.fire("Hata" + e, '', 'warning')
                })
            }
        } else if (result.isDenied) {
            Swal.fire('İptal Edildi.', '', 'info')
        }
    })
}


function remove(d) {
    var test = d.id
    var keys = test.split("**")[0]
    var link_image = test.split("**")[5]
    local_storage = (JSON.stringify(local_storage))
    local_storage = (JSON.parse(local_storage))
    var index = parseInt(test.split("**")[4])

    Swal.fire({
        title: test.split("**")[0] + ', ' + test.split("**")[1],
        text: 'Menüyü silmek istediğinize emin misiniz?',
        imageUrl: link_image,
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonText: 'Evet, Sil ',
        cancelButtonText: 'Vazgeç'
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage[keys].splice(index, 1)
            var ref = firebase.database().ref()
            ref.set(local_storage, function () {
                Swal.fire("Menü Silindi.", '', 'info')
                location.reload();
            })
        }
    })
}



function newmenu() {
    console.log(keys2)
    var drop = '<select class="form-select btn btn-info " aria-label="Please Select Categories" id="categories">' +
        '<option selected>Lütfen Kategori Seçiniz</option>'
    for (var i = 0; i < keys2.length; i++) {
        drop += '<option value="' + keys2[i] + '">' + keys2[i] + '</option>'
    }
    drop += '</select>'

    Swal.fire({
        title: "Yeni Menü Ekle",
        html: drop + '<br><br>' +
            '<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="İsim"> <br>' +
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik"> <br>' +
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat" ><br>' +
            '<label class="btn btn-warning">  Resim Seçiniz <input type="file" id="files" name="files[]" hidden> </label>',
        imageUrl: 'http://www.bolumangalkeyfi.com/wp-content/uploads/2018/05/logo_bolu_mangal_keyfi1.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Evet, Kaydet',
        cancelButtonText: 'Vazgeç',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            local_storage = (JSON.stringify(local_storage))
            local_storage = (JSON.parse(local_storage))
            var select = document.getElementById("categories");
            var categories = select.options[select.selectedIndex].value;
            var name = document.getElementById("name").value
            var details = document.getElementById("details").value
            var price = document.getElementById("price").value
            var file = document.getElementById("files").files[0]
            // var file = undefined
            var path = categories + "/" + name
            if (file === undefined) {
                Swal.fire("Ekleniyor Bekleyiniz.", '', 'info')
                var to_save = firebase.database().ref();
                var data =
                {
                    "name": name,
                    "details": details,
                    "price": parseFloat(price),
                    "image": ""
                }

                local_storage[categories].push(data)
                console.log(local_storage)
                to_save.set(local_storage, function () {
                    Swal.fire("Menü Eklendi.", '', 'info')
                })
            } else {
                Swal.fire("Ekleniyor Bekleyiniz.", '', 'info')
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                var others = local_storage
                thisRef.put(file).then(res => {
                    Swal.fire("Resim Yüklendi. Lütfen Bekleyiniz.", '', 'warning')
                    to_save_image.child(file.name).getDownloadURL().then(url => {
                        var to_save = firebase.database().ref();
                        var data =
                        {
                            "name": name,
                            "details": details,
                            "price": parseFloat(price),
                            "image": url
                        }

                        local_storage[categories].push(data)
                        console.log(local_storage)
                        to_save.set(local_storage, function () {
                            Swal.fire("Menü Eklendi", '', 'info')
                        })
                    })
                }).catch(e => {
                    console.log("Error" + e)
                    Swal.fire("Hata" + e, '', 'warning')
                })
            }
        } else if (result.isDenied) {
            Swal.fire('Değişiklikler kaydedilemedi.', '', 'info')
        }
    })
}


function newcategory() {
    Swal.fire({
        title: "Yeni Kategori Ekle",
        html: '<input type="text" class="form-control" id="cat" aria-describedby="Categories" placeholder="Kategori Adı"> <br>' +
            '<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="İlk Menü Adı"> <br>' +
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik"> <br>' +
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat"> <br>' +
            '<label class="btn btn-warning">  Resim Seçiniz <input type="file" id="files" name="files[]" hidden> </label>',
        imageUrl: 'http://www.bolumangalkeyfi.com/wp-content/uploads/2018/05/logo_bolu_mangal_keyfi1.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Evet, Kaydet',
        cancelButtonText: 'Vazgeç',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            local_storage = (JSON.stringify(local_storage))
            local_storage = (JSON.parse(local_storage))

            var cate = document.getElementById("cat").value;
            var name = document.getElementById("name").value
            var details = document.getElementById("details").value
            var price = document.getElementById("price").value
            var file = document.getElementById("files").files[0]
            // var file = undefined
            var path = cate + "/" + name
            if (file === undefined) {
                var to_save = firebase.database().ref();
                var data = [
                    {
                        "name": name,
                        "details": details,
                        "price": parseFloat(price),
                        "image": ""
                    }
                ]

                local_storage[cate] = data
                console.log(local_storage)
                to_save.set(local_storage, function () {
                    Swal.fire("Yeni kategori eklendi.", '', 'info')
                    location.reload();
                })
            } else {
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                thisRef.put(file).then(res => {
                    Swal.fire("Resim Yüklendi. Lütfen Bekleyiniz.", '', 'warning')
                    to_save_image.child(file.name).getDownloadURL().then(url => {
                        var to_save = firebase.database().ref();
                        var data = [
                            {
                                "name": name,
                                "details": details,
                                "price": parseFloat(price),
                                "image": url
                            }
                        ]

                        local_storage[cate] = data
                        console.log(local_storage)
                        to_save.set(local_storage, function () {
                            Swal.fire("Yeni Kategori Eklendi.", '', 'info')
                            setTimeout(() => { location.reload() }, 4500);
                        })
                    })
                }).catch(e => {
                    console.log("Error" + e)
                })

            }

        } else if (result.isDenied) {
            Swal.fire('Değişiklikler kaydedilemedi.', '', 'info')
        }
    })
    //     var to_save = firebase.database().ref();
    //     var data =[
    //         {
    //         "name": name,
    //         "details": details,
    //         "price": parseFloat(price)
    //         }
    //     ]

    //     local_storage[cate] = data
    //     console.log(local_storage)
    //     to_save.set(local_storage, function () {
    //         Swal.fire("Added new categories", '', 'info')
    //         location.reload();
    //     })

    // } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info') 
    // }
    // })
}

function deletecategory() {
    Swal.fire('developing...', '', 'info')
}
function image_view(d) {
    var url = d.id
    Swal.fire({
        title: "Menü Resmi",
        imageUrl: url,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Kapat.',
    })

}
function usoft() {
    Swal.fire({
        toast: true,
        title: 'USoft - <b><u>USoft the clear choice</b></u> ',
        html: "You can reach us at <a href='mailto:usoft.projects@gmail.com'><b><u> this address.</b></u></a> <br> <p>&copy;Copyright 2022. All Rights Reserved.<br> <b>USoft </b></p>",
        imageUrl: '../img/rocket.png',
        imageAlt: 'Custom image',
    });
}
