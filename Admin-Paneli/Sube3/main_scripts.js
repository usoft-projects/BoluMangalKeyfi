//Configs
//DB-1 Config
var config = {
    databaseURL: "https://bolumangal-balgat-default-rtdb.firebaseio.com",
    apiKey: "AIzaSyDwRmD6nOX-qxw_pV8nHIz-rSOf418Jfa0",
    authDomain: "bolumangal-balgat.firebaseapp.com",
    projectId: "bolumangal-balgat",
    storageBucket: "bolumangal-balgat.appspot.com",
    messagingSenderId: "535471707798",
    appId: "1:535471707798:web:db2b2d561f66fa6440d4b7"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = firebase.database().ref();

var local_storage = []
var keys2 =[]
ref.on("value", function(snapshot) {
    var interface = document.getElementById("data_firebase")
    var test = snapshot.val()
    var keys = Object.keys(test);
    keys2=keys
    var datas =  Object.values(test)  
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
    var categories_filter = document.getElementById("categories_filter")
    for(var i=1; i<keys.length; i++){
        if (keys[i].match(/\s/)) {
            var myArray = keys[i].split(" ");
            categories_filter.innerHTML += '<a href="#'+myArray[0]+'"><button type="button" class="btn btn-info">'+keys[i]+'</button> </a>&nbsp;&nbsp';
        }else{
            categories_filter.innerHTML += '<a href="#'+keys[i]+'"><button type="button" class="btn btn-info">'+keys[i]+'</button> </a>&nbsp;&nbsp';
        }
    }


    var interface_2 = document.getElementById("datas_menu")
    for(var i=1; i<keys.length; i++){
        for(var k=0; k<datas[i].length; k++){
            interface_2.innerHTML += '<div id='+keys[i]+'><tr> <td  id="'+datas[i][k].image+'" onclick=image_view(this)>'+keys[i]+'</td><td>'+datas[i][k].name+'</td><td>'+datas[i][k].details+'</td><td>'+datas[i][k].price+'</td><td>'+
            '<i class="fas fa-edit" style="color:green;" id="'+keys[i] +'**'+ datas[i][k].name+'**'+datas[i][k].details+'**'+datas[i][k].price+'**'+k+'**'+datas[i][k].image+'" onClick=update(this)></i>&nbsp;&nbsp;' +
            '<i class="fas fa-trash-alt" style="color:red;"  id="'+keys[i] +'**'+ datas[i][k].name+'**'+datas[i][k].details+'**'+datas[i][k].price+'**'+k+'**'+datas[i][k].image+'" onClick=remove(this)></i> </td></tr></div>'
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



function update(d){ 
    var test = d.id
    Swal.fire({
        title: test.split("**")[0]+ ', '+test.split("**")[1],
        html:'<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="isim" value="'+test.split("**")[1]+'"> <br>'+
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik" value="'+test.split("**")[2]+'"> <br>'+
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat" value="'+test.split("**")[3]+'"><br>',
            // '<label class="btn btn-warning">  Resim Seçiniz  <input type="file" id="files" name="files[]" hidden> </label>',
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
            // var file = document.getElementById("files").files[0]
            var file = undefined
            var link_image = test.split("**")[5]
            var keys = test.split("**")[0]
            var  others = local_storage
            if (file === undefined) {
                Swal.fire("Güncelleniyor Bekleniyiniz.", '', 'info')
                    var to_save = firebase.database().ref();
                    var data =     
                        {
                        "name": name,
                        "details": details,
                        "price": parseFloat(price),
                        "image": link_image
                        }

                    local_storage[keys].splice(index,1)
                    local_storage[categories].splice(index, 0, data);
                    console.log(local_storage)
                    to_save.set(local_storage, function () {
                            Swal.fire("Güncellendi.", '', 'info')
                            setTimeout(() => {  location.reload() }, 1000);
                    })
              } else {
                Swal.fire("Güncelleniyor Bekleniyiniz.", '', 'info')
                var path = categories + "/" + name
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                var  others = local_storage
                local_storage[categories].splice(index,1)
                thisRef.put(file).then(res=>{
                    Swal.fire("Resim Yüklendi. Lütfen bekleyiniz.", '', 'warning')
                    to_save_image.child(file.name).getDownloadURL().then(url=>{
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
                                setTimeout(() => {  location.reload() }, 1000)
                            })
                    })
                }).catch(e =>{
                    console.log("Error" + e)
                    Swal.fire("Hata"+e, '', 'warning')				
                })
              }
        } else if (result.isDenied) {
          Swal.fire('İptal Edildi.', '', 'info') 
        }
      })
}


function remove(d){
    var test = d.id
    var keys = test.split("**")[0]
    var link_image = test.split("**")[5]
    local_storage = (JSON.stringify(local_storage))
    local_storage = (JSON.parse(local_storage))
    var index = parseInt(test.split("**")[4])
    var to_save = firebase.database().ref();
    Swal.fire({
        title: test.split("**")[0]+ ', '+test.split("**")[1],
        text: 'Menüyü silmek istediğinize emin misiniz?',
        imageUrl: link_image,
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonText: 'Evet, Sil ',
        cancelButtonText: 'Vazgeç'
      }).then((result) => {
        if (result.isConfirmed) {
            var uzunluk = local_storage[keys].length
            if(uzunluk === 1){
                local_storage[keys].splice(index,1)
                var ref = firebase.database().ref()
                ref.set(local_storage, function () {
                    var new_test = Object.keys(local_storage)
                    var remove_value = new_test.splice(0, 1);
                    local_storage["1Configurations"] = new_test
                    to_save.set(local_storage, function () {
                        Swal.fire("Kategori Silindi. <br> Yeni Kategori Sıralaması Yapmayı Unutmayın.", '', 'info')
                        setTimeout(() => {  location.reload() }, 4500);
                    })  
                })
            }else{
                local_storage[keys].splice(index,1)
                var ref = firebase.database().ref()
                ref.set(local_storage, function () {
                    Swal.fire("Menü Silindi.", '', 'info')
                    setTimeout(() => {  location.reload() }, 1500);
                })
            }

        }
      })
}



function newmenu(){
    console.log(keys2)
    var drop = '<select class="form-select btn btn-info " aria-label="Please Select Categories" id="categories">'+
                '<option selected>Lütfen Kategori Seçiniz</option>'
    for(var i=1;i<keys2.length;i++){
        drop += '<option value="'+keys2[i]+'">'+keys2[i]+'</option>'
    }
    drop += '</select>'

    Swal.fire({ 
        title: "Yeni Menü Ekle",
        html: drop +'<br><br>'+
            '<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="İsim"> <br>'+
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik"> <br>'+
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat" ><br>',
            // '<label class="btn btn-warning">  Resim Seçiniz <input type="file" id="files" name="files[]" hidden> </label>',
        imageUrl: '../img/logo.png',
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
            // var file = document.getElementById("files").files[0]

            var file = undefined
            var path = categories + "/" + name
            if (file === undefined) {
                    Swal.fire("Ekleniyor Bekleniyiniz.", '', 'info')
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
                        setTimeout(() => {  location.reload() }, 1500);
                    })
              }else{
                Swal.fire("Ekleniyor Bekleniyiniz.", '', 'info')
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                var others = local_storage
                thisRef.put(file).then(res=>{
                    Swal.fire("Resim Yüklendi. Lütfen Bekleyiniz.", '', 'warning')
                    to_save_image.child(file.name).getDownloadURL().then(url=>{
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
                                setTimeout(() => {  location.reload() }, 1500);
                            })
                    })
                }).catch(e =>{
                    console.log("Error" + e)
                    Swal.fire("Hata"+e, '', 'warning')				
                })
        }
        } else if (result.isDenied) {
          Swal.fire('Değişiklikler kaydedilemedi.', '', 'info') 
        } 
      }) 
}

   
function newcategory(){
    Swal.fire({
        title: "Yeni Kategori Ekle",
        html:'<input type="text" class="form-control" id="cat" aria-describedby="Categories" placeholder="Kategori Adı"> <br>'+
            '<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="İlk Menü Adı"> <br>'+ 
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik"> <br>'+
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat"> <br>',
            // '<label class="btn btn-warning">  Resim Seçiniz <input type="file" id="files" name="files[]" hidden> </label>',
        imageUrl: '../img/logo.png',
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
            // var file = document.getElementById("files").files[0]
            var file = undefined
            var path = cate + "/" + name
            if (file === undefined) {
                    var to_save = firebase.database().ref();
                    var data =[
                        {
                        "name": name,
                        "details": details,
                        "price": parseFloat(price),
                        "image":""
                        }
                    ]
                    
                local_storage[cate] = data
                console.log(local_storage)
                to_save.set(local_storage, function () {
                    var new_test = Object.keys(local_storage)
                    var remove_value = new_test.splice(0, 1);
                    local_storage["1Configurations"] = new_test
                    to_save.set(local_storage, function () {
                        Swal.fire("Yeni kategori eklendi. <br> Yeni Kategori Sıralaması Yapmayı Unutmayın.", '', 'info')
                        setTimeout(() => {  location.reload() }, 4500);
                    })   
                })

            }else{
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                thisRef.put(file).then(res=>{
                    Swal.fire("Resim Yüklendi. Lütfen Bekleyiniz.", '', 'warning')
                    to_save_image.child(file.name).getDownloadURL().then(url=>{
                            var to_save = firebase.database().ref();
                            var data =[
                                {
                                "name": name,
                                "details": details,
                                "price": parseFloat(price),
                                "image":url
                                }
                            ]
                            
                        local_storage[cate] = data
                        console.log(local_storage)
                        to_save.set(local_storage, function () {
                            var new_test = Object.keys(local_storage)
                            var remove_value = new_test.splice(0, 1);
                            local_storage["1Configurations"] = new_test
                            to_save.set(local_storage, function () {
                                Swal.fire("Yeni kategori eklendi. <br> Yeni Kategori Sıralaması Yapmayı Unutmayın.", '', 'info')
                                setTimeout(() => {  location.reload() }, 4500);
                            })   
                        })
                    })
                }).catch(e =>{
                    console.log("Error" + e)				
                })

        }

        } else if (result.isDenied) {
            Swal.fire('Değişiklikler kaydedilemedi.', '', 'info') 
        }
        })

}

// function deletecategory(){
//     Swal.fire('developing...', '', 'info') 
// }
// function image_view(d){
//     var url = d.id
//     Swal.fire({
//         title: "Menü Resmi",
//         imageUrl: url,
//         imageWidth: 400,
//         imageHeight: 200,
//         imageAlt: 'Custom image',
//         showCloseButton: true,
//         showCancelButton: false,
//         confirmButtonText:'Kapat.',
//         })

// }
function usoft(){
    Swal.fire({
        toast: true,
        title: 'USoft - <b><u>USoft the clear choice</b></u> ',
        html:"You can reach us at <a href='mailto:usoft.projects@gmail.com'><b><u> this address.</b></u></a> <br> <p>&copy;Copyright 2023. All Rights Reserved.</p>",
        imageUrl: '../img/rocket.png',
        imageAlt: 'Custom image',
      });
}

function ordercategory(){
    var to_save = firebase.database().ref();
    const category_order = []

    local_storage = (JSON.stringify(local_storage))
    local_storage = (JSON.parse(local_storage))

    console.log(local_storage)

    var div_drop =''
    for(var k = 1; k<keys2.length; k++){
        var drop = '<div style="padding-bottom:8px;"><select class="form-select btn btn-info " aria-label="Please Select Categories" id="categries'+k.toString()+'" >'+
        '<option selected>Lütfen Kategori Sırası Seçiniz </option>'
        for(var i=1;i<keys2.length;i++){
            drop += '<option value="'+keys2[i]+'">'+keys2[i]+'</option>'
        }
        drop += '</select>'
        div_drop += drop + '<br></div>'
    }
    Swal.fire({
        title: "Kategori Sıralama",
        html:div_drop,
        imageUrl: '../img/logo.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Kaydet',
        cancelButtonText: 'Vazgeç',
        }).then((result) => {
            if (result.isConfirmed) {
                for(var i=1; i<keys2.length;i++){
                    var id_value = 'categries' + i.toString()
                    var select = document.getElementById(id_value);
                    var categories = select.options[select.selectedIndex].value;
                    category_order.push(categories)
                }
                console.log(category_order)
                const unique = Array.from(new Set(category_order));
                console.log(unique)
                if(category_order.length === unique.length) {
                    console.log("aynı veri icermiyor");
                    local_storage["1Configurations"] = category_order

                    to_save.set(local_storage, function () {
                        Swal.fire("Düzenlendi.", '', 'info')
                        setTimeout(() => {  location.reload() }, 1000);
                    })      
                } else {
                    Swal.fire("Liste Aynı Kategoriyi İçeremez!", '', 'error')
                }
            }
        })
        
}

function demo(){
    Swal.fire({
        toast: true,
        title: '<b>Demo Sürümü</b> ',
        html:"Demo Bitiş Tarihi: <a href='mailto:usoft.projects@gmail.com'><b><u> 15.03.2023</b></u></a> <br> <p>&copy;Copyright 2023. All Rights Reserved.</p>",
        imageUrl: '../img/rocket.png',
        imageAlt: 'Custom image',
      });
}