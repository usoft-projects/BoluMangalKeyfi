var config_2 = { 
    apiKey: "AIzaSyAVHvAgxudBPJ-mu3uE-oiISXnUlmVcLU8",
    authDomain: "bolumangal-2.firebaseapp.com",
    databaseURL: "https://bolumangal-2-default-rtdb.firebaseio.com",
    projectId: "bolumangal-2",
    storageBucket: "bolumangal-2.appspot.com",
    messagingSenderId: "745747594928",
    appId: "1:745747594928:web:8453afe68b1bd49d55c575"
};

var sube_2 = firebase.initializeApp(config_2,"sube_2")
var db = sube_2.database();
var re = sube_2.database().ref();

function update_2(local_storage,data,index,keys,categories){
    var to_save_2 = sube_2.database().ref();
    var url_2 = data.image
    if(url_2.includes("bolumangalkeyfi-63388")=== true){
        url_2 = url_2.replace("bolumangalkeyfi-63388", "bolumangal-2")
        data.image = url_2 
        local_storage[keys].splice(index,1)
        local_storage[categories].splice(index, 0, data)
        to_save_2.set(local_storage, function () {
            console.log("sube2 dones")
        })
    }else{
        local_storage[keys].splice(index,1)
        local_storage[categories].splice(index, 0, data)
        to_save_2.set(local_storage, function () {
            console.log("sube2 dones")
        })
    }

}

function image_2(path,file,file_name,data,local_storage,index,categories,keys){

    var to_save_image_2 = sube_2.storage().ref(path)
    let thisRef_2 = to_save_image_2.child(file_name)
    // local_storage[categories].splice(index,1)
    thisRef_2.put(file).then(res=>{
        local_storage[categories].splice(index,1)
        console.log("yüklendi sube_2")
        to_save_image_2.child(file_name).getDownloadURL().then(url=>{
            data.image = url
            local_storage[categories].splice(index, 0, data);
            update_2(local_storage,data,index,keys,categories)
        })
    }).catch(e =>{
        console.log("Error" + e)
        Swal.fire("Hata"+e, '', 'warning')				
    })
}

function new_menu_2(local_storage){
        var to_save_2 = sube_2.database().ref();
        to_save_2.set(local_storage, function () {
            Swal.fire("Menü Eklendi. Sube-2 ", '', 'info')
        })
}

function new_cate_2(local_storage){
    var to_save_2 = sube_2.database().ref();
    to_save_2.set(local_storage, function () {
        Swal.fire("Kategori Eklendi. Sube-2 ", '', 'info')
    })
}


function remove_2(veri){
    var re = sube_2.database().ref();
    re.set(veri, function () {
        console.log("silindi")
    })
}