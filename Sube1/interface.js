
function init(){
    var config = {
      apiKey: "AIzaSyCNpifrazADwoJ85eWUrts9u1aQMxSIENU",
      authDomain: "bolumangal-cayyolu.firebaseapp.com",
      databaseURL: "https://bolumangal-cayyolu-default-rtdb.firebaseio.com",
      projectId: "bolumangal-cayyolu",
      storageBucket: "bolumangal-cayyolu.appspot.com",
      messagingSenderId: "949653597401",
      appId: "1:949653597401:web:801f7cd85b3e56e74ae2c8"
    };
    
    firebase.initializeApp(config);
    var database = firebase.database();
    
    var ref = firebase.database().ref();
    var key = []
    var data = []
    ref.on("value", function(snapshot) {
        var list_categories = document.getElementById("menu-flters")
        var test = snapshot.val()
        var keys = Object.keys(test);
        var datas =  Object.values(test) 
        key =  keys
        data =  datas
        // console.log(keys)
        // console.log(Object.values(test))
        list_categories.innerHTML = '<li>Tümü</li>'
        for(var i=0;i<(datas[0].length);i++){
            list_categories.innerHTML += '<li> <a href="#'+datas[0][i]+'"> '+datas[0][i]+'</a></li>'
        }
    
        var list_menu = document.getElementById("menu_tabs")
        list_menu.innerHTML = ""
        console.log(datas[0]) // 1Configurations kısmı

        for(var i=0; i<datas[0].length; i++ ){
            console.log(datas[0][i])
            var index_key = keys.indexOf(datas[0][i])
            console.log(index_key)
            for(var k=0; k<datas[index_key].length; k++){
                if (k == 0 ){
                    list_menu.innerHTML += ' <div class="col-lg-6 menu-item filter-'+datas[0][i]+'" id="'+datas[0][i]+'"> <hr><div style="padding-top:35px;"> <h2>'+datas[0][i]+'</h2>  <div class="menu-content">'+
                    '<a href="#!">'+datas[index_key][k].name+'</a><span>'+datas[index_key][k].price+' TL</span></div> <div class="menu-ingredients">'+datas[index_key][k].details+'</div></div></div>'    
                }
                else{
                    list_menu.innerHTML += ' <div class="col-lg-6 menu-item filter-'+datas[0][i]+'" id="'+datas[0][i]+'"> <div class="menu-content">'+
                    '<a href="#!">'+datas[index_key][k].name+'</a><span>'+datas[index_key][k].price+' TL</span></div> <div class="menu-ingredients">'+datas[index_key][k].details+'</div></div>'
                }
            }
        }
        // for(var i=1; i<keys.length;i++){
        //     for(var k=0; k<datas[i].length;k++){
                // if (k == 0 ){
                //     list_menu.innerHTML += ' <div class="col-lg-6 menu-item filter-'+keys[i]+'" id="'+keys[i]+'"> <hr><div style="padding-top:35px;"> <h2>'+keys[i]+'</h2>  <div class="menu-content">'+
                //     '<a href="#">'+datas[i][k].name+'</a><span>'+datas[i][k].price+' TL</span></div> <div class="menu-ingredients">'+datas[i][k].details+'</div></div></div>'    
                // }
                // else{
                //     list_menu.innerHTML += ' <div class="col-lg-6 menu-item filter-'+keys[i]+'" id="'+keys[i]+'"> <div class="menu-content">'+
                //     '<a href="#">'+datas[i][k].name+'</a><span>'+datas[i][k].price+' TL</span></div> <div class="menu-ingredients">'+datas[i][k].details+'</div></div>'
                // }
        //     }
        // }
       
    },function (error) {
        console.log("Error: " + error.code);
    });
    
    }
    setTimeout(() => {     init() }, 500);
 
    function usoft(){
        var text =  '        <section id="contact" class="contact" id="conts"> \
          <div class="container" data-aos="fade-up"> \
            <div class="section-title"> \
              <h2>İletişim</h2> \
              <p>İletişime Geçin</p> \
            </div> \
          </div> \
          <div class="container" data-aos="fade-up"> \
            <div class="row mt-5"> \
              <div class="col-lg-4"> \
                <div class="info"> \
                  <div class="address"> \
                    <i class="bi bi-geo-alt"></i> \
                    <h4>Yer/Konum:</h4> \
                    <p> Bahçekapı, Bahçekapı Mah.2540 Cad, Şaşmaz Blv. No:9, 06105 Etimesgut/Ankara <br> \
                      Çalışma Saatleri : 10:00 - 00:00</p> <br>\
                  </div> \
                  <div class="phone">\
                    <i class="bi bi-phone"></i>\
                    <h4>Telefon:</h4>\
                    <p>03122151215</p> <br>\
                  </div>\
                  <div class="email">\
                    <i class="bi bi-envelope"></i>\
                    <h4>Email:</h4>\
                    <p>--</p>\
                  </div> <br>\
                </div>\
              </div>\
            </div>\
          </div> \
        </section>'
        Swal.fire({
            toast: true,
            html:text   ,
            imageUrl: '../assets/img/logo.png',
            imageAlt: 'Custom image',
          });
    }
    
    setInterval(
      () => {
          firebase.database().goOffline();
          console.log("offline")
      },
      10000,
  )

  setTimeout(
    () => {
      Swal.fire({
        title: 'Google\'da bizi puanlamak ister misiniz?',
        showCancelButton: true,
        confirmButtonText: 'Puanla',
        imageUrl: '../assets/img/logo.png',
        cancelButtonText: 'İptal'
    }).then((result) => {
        if (result.isConfirmed) {
            const yorum = result.value;
            window.open('https://www.google.com/search?safe=active&sca_esv=2f8623b159e229b7&sca_upv=1&rlz=1C1GCEU_enTR1089TR1089&q=bolumangal+cayy%C4%B1lu&uds=ADvngMjuOA_8kSPM_k2J8SdxbpvwuIisS9hnmZMtBghRmt2tad6rEzMMcN-SQkS6mAMs-axKb7dv9qiOdRd3QoKIhco8vc_zV0wWxR6rcLpq2Yy4UjwK-m2OX7jcOLw6cpc_AgjHI10d&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7mDrAsiwz93wPlk37U6N_YBoR2cKWih2SrbX8EUJjHq68kw5n5qUjP_RM1-cqdXKUdiK8eY%3D&sa=X&ved=2ahUKEwj27MehnO2IAxUtBdsEHXEoE6oQ3PALegQIGxAE&biw=1920&bih=929&dpr=1');
        }
    });
    },
    25000,
  )