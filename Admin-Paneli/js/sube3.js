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

function update_3(veri){
    var to_save_3 = sube_3.database().ref();
    to_save_3.set(veri, function () {
        console.log("sube2 dones")
    })
}

function remove_3(veri){
    var re = sube_3.database().ref();
    re.set(veri, function () {
        console.log("silindi")
    })
}
function image_3(path,file,file_name,data){

    var to_save_image_3 = sube_3.storage().ref(path)
    let thisRef_3 = to_save_image_3.child(file_name)

    thisRef_3.put(file).then(res=>{
        console.log("yüklendi")
        to_save_image_3.child(file_name).getDownloadURL().then(url=>{
            data.image = url
            update_3(data)
        })
    }).catch(e =>{
        console.log("Error" + e)
        Swal.fire("Hata"+e, '', 'warning')				
    })


}