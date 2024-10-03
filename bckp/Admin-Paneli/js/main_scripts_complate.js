//Configs
//DB-1 Config
var config = { 
    apiKey: "AIzaSyDwzi9ETDKbMTkP4lWkAnd2Di6oMBSmA10",
    authDomain: "bolumangalkeyfi-63388.firebaseapp.com",
    databaseURL: "https://bolumangalkeyfi-63388-default-rtdb.firebaseio.com",
    projectId: "bolumangalkeyfi-63388",
    storageBucket: "bolumangalkeyfi-63388.appspot.com",
    messagingSenderId: "547222676335",
    appId: "1:547222676335:web:efa725ed4782066ac03e9a"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = firebase.database().ref();

//DB-2 Config
var config_2 = { 
    apiKey: "AIzaSyAVHvAgxudBPJ-mu3uE-oiISXnUlmVcLU8",
    authDomain: "bolumangal-2.firebaseapp.com",
    databaseURL: "https://bolumangal-2-default-rtdb.firebaseio.com",
    projectId: "bolumangal-2",
    storageBucket: "bolumangal-2.appspot.com",
    messagingSenderId: "745747594928",
    appId: "1:745747594928:web:8453afe68b1bd49d55c575"
};
// var sube_2 = firebase.initializeApp(config_2,"sube_2")
// var db_2 = sube_2.database();
// var re_2 = sube_2.database().ref();

//DB-3 Config
var config_3 = { 
    apiKey: "AIzaSyDXzKWUxSJc0vpzsews9rhkkOi4MVrCK-Q",
    authDomain: "bolumangal-3.firebaseapp.com",
    databaseURL: "https://bolumangal-3-default-rtdb.firebaseio.com/",
    projectId: "bolumangal-3",
    storageBucket: "bolumangal-3.appspot.com",
    messagingSenderId: "388373510934",
    appId: "1:388373510934:web:5951d377529e868ab2ae37"
};
// var sube_3 = firebase.initializeApp(config_3,"sube_3")
// var db_3 = sube_3.database();
// var re_3 = sube_3.database().ref();

//DB-4 Config
var config_4 = {
    apiKey: "AIzaSyBxcCRsiTQgFui1T5pF6ziHXAqdahpNGzM",
    authDomain: "bolumangal-4.firebaseapp.com",
    databaseURL: "https://bolumangal-4-default-rtdb.firebaseio.com",
    projectId: "bolumangal-4",
    storageBucket: "bolumangal-4.appspot.com",
    messagingSenderId: "312801327244",
    appId: "1:312801327244:web:3dd01af2ad40eb08b663a9"
};
// var sube_4 = firebase.initializeApp(config_4,"sube_4")
// var db_4 = sube_4.database();
// var re_4 = sube_4.database().ref();

var local_storage = []
var keys2 =[]
ref.on("value", function(snapshot) {
    var interface = document.getElementById("data_firebase")
    var test = snapshot.val()
    var keys = Object.keys(test);
    keys2=keys
    var datas =  Object.values(test)  
    local_storage = test
    var interface_2 = document.getElementById("datas_menu")
    for(var i=0; i<keys.length; i++){
        for(var k=0; k<datas[i].length; k++){
            interface_2.innerHTML += '<tr> <td  id="'+datas[i][k].image+'" onclick=image_view(this)>'+keys[i]+'</td><td>'+datas[i][k].name+'</td><td>'+datas[i][k].details+'</td><td>'+datas[i][k].price+'</td><td>'+
            '<i class="fas fa-edit" style="color:green;" id="'+keys[i] +'**'+ datas[i][k].name+'**'+datas[i][k].details+'**'+datas[i][k].price+'**'+k+'**'+datas[i][k].image+'" onClick=update(this)></i>&nbsp;&nbsp;' +
            '<i class="fas fa-trash-alt" style="color:red;"  id="'+keys[i] +'**'+ datas[i][k].name+'**'+datas[i][k].details+'**'+datas[i][k].price+'**'+k+'**'+datas[i][k].image+'" onClick=remove(this)></i> </td></tr>'
        }
    }
}, function (error) {
    console.log("Error: " + error.code);
});

var local_storage_2 =[]
setTimeout(() => {
    var sube_2 = firebase.initializeApp(config_2,"sube_2")
    var db_2 = sube_2.database();
    var re_2 = sube_2.database().ref();
    re_2.on("value", function(snapshot) {
        var test = snapshot.val()
        var datas =  Object.values(test)  
        local_storage_2 = test
        console.log("Storage_2: ", local_storage_2)
    }, function (error) {
        console.log("Error: " + error.code);
    });
}, 2000);

var local_storage_3 =[]
setTimeout(() => {
    var sube_3 = firebase.initializeApp(config_3,"sube_3")
    var db_3 = sube_3.database();
    var re_3 = sube_3.database().ref();
    re_3.on("value", function(snapshot) {
        var test = snapshot.val()
        var datas =  Object.values(test)  
        local_storage_3 = test
        console.log("Storage_3: ", local_storage_3)
    }, function (error) {
        console.log("Error: " + error.code);
    });
}, 3000);

var local_storage_4 =[]
setTimeout(() => {
    var sube_4 = firebase.initializeApp(config_4,"sube_4")
    var db_4 = sube_4.database();
    var re_4 = sube_4.database().ref();
    re_4.on("value", function(snapshot) {
        var test = snapshot.val()
        var datas =  Object.values(test)  
        local_storage_4 = test
        console.log("Storage_4: ", local_storage_4)
    }, function (error) {
        console.log("Error: " + error.code);
    });
}, 4000);

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
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat" value="'+test.split("**")[3]+'"><br>'+
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
                    to_save.set(local_storage, function () {
                        update_2(local_storage)
                        update_3(local_storage)
                        update_4(local_storage)
                        Swal.fire("Güncellendi.", '', 'info')
                        location.reload();
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
                                
                                setTimeout(() => {  image_2(path,file,file.name,data,others,index,categories) }, 1500);
                                setTimeout(() => {  image_3(path,file,file.name,data,others,index,categories) }, 2500);
                                // image_4(path,file,file.name,data)
                                Swal.fire("Güncellendi.", '', 'info')
                                // location.reload();
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
            local_storage[keys].splice(index,1)
            var ref = firebase.database().ref()
            ref.set(local_storage, function () {
                remove_2(local_storage)
                remove_3(local_storage)
                remove_4(local_storage)
                Swal.fire("Menü Silindi.", '', 'info')
                location.reload();
            })
        }
      })
}



function newmenu(){
    console.log(keys2)
    var drop = '<select class="form-select btn btn-info " aria-label="Please Select Categories" id="categories">'+
                '<option selected>Lütfen Kategori Seçiniz</option>'
    for(var i=0;i<keys2.length;i++){
        drop += '<option value="'+keys2[i]+'">'+keys2[i]+'</option>'
    }
    drop += '</select>'

    Swal.fire({
        title: "Yeni Menü Ekle",
        html: drop +'<br><br>'+
            '<input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="İsim"> <br>'+
            '<input type="text" class="form-control" id="details" aria-describedby="Details" placeholder="İçerik"> <br>'+
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat" ><br>'+
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
                        update_2(local_storage)
                        update_3(local_storage)
                        update_4(local_storage)
                        Swal.fire("Menü Eklendi.", '', 'info')
                        location.reload();
                    })
              }else{
                Swal.fire("Ekleniyor Bekleniyiniz.", '', 'info')
                var to_save_image = firebase.storage().ref(path)
                let thisRef = to_save_image.child(file.name)
                var others = 
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
                                setTimeout(() => {  image_2(path,file,file.name,data,others,index,categories) }, 1500);
                                setTimeout(() => {  image_3(path,file,file.name,data,others,index,categories) }, 2500);
                                Swal.fire("Menü Eklendi", '', 'info')
                                setTimeout(() => {  location.reload() }, 4500);
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
            '<input type="number" class="form-control" id="price" aria-describedby="Price" placeholder="Fiyat"> <br>'+
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
                    update_2(local_storage)
                    update_3(local_storage)
                    update_4(local_storage)
                    Swal.fire("Yeni kategori eklendi.", '', 'info')
                    location.reload();
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
                            setTimeout(() => {  image_2_array(path,file,file.name,data,others,index,categories) }, 1500);
                            setTimeout(() => {  image_3_array(path,file,file.name,data,others,index,categories) }, 2500);
                            // image_3(path,file,file.name,data)
                            Swal.fire("Yeni Kategori Eklendi.", '', 'info')
                            setTimeout(() => {  location.reload() }, 4500);
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

function deletecategory(){
    Swal.fire('developing...', '', 'info') 
}
function image_view(d){
    var url = d.id
    Swal.fire({
        title: "Menü Resmi",
        imageUrl: url,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText:'Kapat.',
        })

}
function usoft(){
    Swal.fire({
        toast: true,
        title: 'USoft - <b><u>USoft the clear choice</b></u> ',
        html:"You can reach us at <a href='mailto:usoft.projects@gmail.com'><b><u> this address.</b></u></a> <br> <p>&copy;Copyright 2022. All Rights Reserved.<br> <b>USoft </b></p>",
        imageUrl: 'img/rocket.png',
        imageAlt: 'Custom image',
      });
}
