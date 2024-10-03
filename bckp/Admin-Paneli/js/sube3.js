var config_3 = { 
    apiKey: "AIzaSyDXzKWUxSJc0vpzsews9rhkkOi4MVrCK-Q",
    authDomain: "bolumangal-3.firebaseapp.com",
    databaseURL: "https://bolumangal-3-default-rtdb.firebaseio.com/",
    projectId: "bolumangal-3",
    storageBucket: "bolumangal-3.appspot.com",
    messagingSenderId: "388373510934",
    appId: "1:388373510934:web:5951d377529e868ab2ae37"
};
var sube_3 = firebase.initializeApp(config_3,"sube_3")
var db = sube_3.database();
var re = sube_3.database().ref();

function update_3(local_storage,data,index,keys,categories){
    var to_save_3 = sube_3.database().ref();
    var url_3 = data.image
    if(url_3.includes("bolumangalkeyfi-63388")=== true){
        url_3 = url_3.replace("bolumangalkeyfi-63388", "bolumangal-3")
        data.image = url_3 
        local_storage[keys].splice(index,1)
        local_storage[categories].splice(index, 0, data)
        to_save_3.set(local_storage, function () {
            console.log("sube3 dones")
        })
    }else{
        local_storage[keys].splice(index,1)
        local_storage[categories].splice(index, 0, data)
        to_save_3.set(local_storage, function () {
            console.log("sube3 dones")
        })
    }

}

function image_3(path,file,file_name,data,local_storage,index,categories,keys){

    var to_save_image_3 = sube_3.storage().ref(path)
    let thisRef_3 = to_save_image_3.child(file_name)
    // local_storage[categories].splice(index,1)
    thisRef_3.put(file).then(res=>{
        local_storage[categories].splice(index,1)
        console.log("yüklendi sube_3")
        to_save_image_3.child(file_name).getDownloadURL().then(url=>{
            data.image = url
            local_storage[categories].splice(index, 0, data);
            update_3(local_storage,data,index,keys,categories)
        })
    }).catch(e =>{
        console.log("Error" + e)
        Swal.fire("Hata"+e, '', 'warning')				
    })
}

function new_menu_3(local_storage){
    var to_save_3 = sube_3.database().ref();
    to_save_3.set(local_storage, function () {
        Swal.fire("Menü Eklendi. Sube-3 ", '', 'info')
    })
}

function new_cate_3(local_storage){
var to_save_3 = sube_3.database().ref();
to_save_3.set(local_storage, function () {
    Swal.fire("Kategori Eklendi. Sube-3 ", '', 'info')
})
}

function remove_3(veri){
    var re = sube_3.database().ref();
    re.set(veri, function () {
        console.log("silindi")
    })
}
