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

function update_4(veri){
    var to_save_4 = sube_4.database().ref();
    to_save_4.set(veri, function () {
        console.log("sube2 dones")
    })
}

function remove_4(veri){
    var re = sube_4.database().ref();
    re.set(veri, function () {
        console.log("silindi")
    })
}
function image_4(path,file,file_name,data){

    var to_save_image_4 = sube_4.storage().ref(path)
    let thisRef_4 = to_save_image_4.child(file_name)

    thisRef_4.put(file).then(res=>{
        console.log("yüklendi")
        to_save_image_4.child(file_name).getDownloadURL().then(url=>{
            data.image = url
            update_4(data)
        })
    }).catch(e =>{
        console.log("Error" + e)
        Swal.fire("Hata"+e, '', 'warning')				
    })


}