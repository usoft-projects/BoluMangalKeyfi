var config_4 = {
    apiKey: "AIzaSyBxcCRsiTQgFui1T5pF6ziHXAqdahpNGzM",
    authDomain: "bolumangal-4.firebaseapp.com",
    databaseURL: "https://bolumangal-4-default-rtdb.firebaseio.com",
    projectId: "bolumangal-4",
    storageBucket: "bolumangal-4.appspot.com",
    messagingSenderId: "312801327244",
    appId: "1:312801327244:web:3dd01af2ad40eb08b663a9"
};

var sube_4 = firebase.initializeApp(config_4,"sube_4")
var db = sube_4.database();
var re = sube_4.database().ref();

function update_4(local_storage,data,index,keys,categories){
    var to_save_4 = sube_4.database().ref();
    var url_4 = data.image
    if(url_4.includes("bolumangalkeyfi-63388")=== true){
        url_4 = url_4.replace("bolumangalkeyfi-63388", "bolumangal-4")
        data.image = url_4 
        local_storage[keys].splice(index,1)
        local_storage[categories].splice(index, 0, data)
        to_save_4.set(local_storage, function () {
            console.log("sube4 dones")
        })
    }else{
        local_storage[keys].splice(index,1)
        local_storage[categories].splice(index, 0, data)
        to_save_4.set(local_storage, function () {
            console.log("sube4 dones")
        })
    }

}
function remove_4(veri){
    var re = sube_4.database().ref();
    re.set(veri, function () {
        console.log("silindi")
    })
}

function image_4(path,file,file_name,data,local_storage,index,categories,keys){

    var to_save_image_4 = sube_4.storage().ref(path)
    let thisRef_4 = to_save_image_4.child(file_name)
    // local_storage[categories].splice(index,1)
    thisRef_4.put(file).then(res=>{
        local_storage[categories].splice(index,1)
        console.log("yüklendi sube_4")
        to_save_image_4.child(file_name).getDownloadURL().then(url=>{
            data.image = url
            local_storage[categories].splice(index, 0, data);
            update_4(local_storage,data,index,keys,categories)
        })
    }).catch(e =>{
        console.log("Error" + e)
        Swal.fire("Hata"+e, '', 'warning')				
    })
}

function new_menu_4(local_storage){
    var to_save_4 = sube_4.database().ref();
    to_save_4.set(local_storage, function () {
        Swal.fire("Menü Eklendi. Sube-4 ", '', 'info')
    })
}

function new_cate_4(local_storage){
var to_save_4 = sube_4.database().ref();
to_save_4.set(local_storage, function () {
    Swal.fire("Kategori Eklendi. Sube-4 ", '', 'info')
})
}