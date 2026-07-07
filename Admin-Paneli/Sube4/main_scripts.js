//Configs
//DB-1 Config
var config = {
      databaseURL: "https://bolumangal-macunkoy-default-rtdb.firebaseio.com/",
      apiKey: "AIzaSyCVAGGlJC2UuMI28X4JKfHV8CDPleKd3Ng",
      authDomain: "bolumangal-macunkoy.firebaseapp.com",
      projectId: "bolumangal-macunkoy",
      storageBucket: "bolumangal-macunkoy.appspot.com",
      messagingSenderId: "605549935677",
      appId: "1:605549935677:web:3cd817c82f6de450c0fe54"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = firebase.database().ref();

var local_storage = [];
var keys2 = [];

ref.on("value", function(snapshot) {
    var interface = document.getElementById("data_firebase");
    var test = snapshot.val();
    
    if(!test) return;

    var keys = Object.keys(test);
    keys2 = keys;
    var datas = Object.values(test);  
    local_storage = test;

    // Kategori Filtre Butonları
    var categories_filter = document.getElementById("categories_filter");
    categories_filter.innerHTML = "";
    for(var i = 1; i < keys.length; i++) {
        if (keys[i].match(/\s/)) {
            var myArray = keys[i].split(" ");
            categories_filter.innerHTML += '<a href="#'+myArray[0]+'"><button type="button" class="btn btn-info mb-1">'+keys[i]+'</button> </a>&nbsp;&nbsp;';
        } else {
            categories_filter.innerHTML += '<a href="#'+keys[i]+'"><button type="button" class="btn btn-info mb-1">'+keys[i]+'</button> </a>&nbsp;&nbsp;';
        }
    }

    // Tabloyu Oluşturma
    var interface_2 = document.getElementById("datas_menu");
    interface_2.innerHTML = "";
    
    for(var i = 1; i < keys.length; i++) {
        for(var k = 0; k < datas[i].length; k++) {
            var item = datas[i][k];
            // ID olarak sadece Kategori ve İndeks numarasını iletiyoruz, veriyi local_storage'dan çekeceğiz.
            var safeId = keys[i] + "**" + k;
            
            interface_2.innerHTML += `
            <tr id="${keys[i]}"> 
                <td>${keys[i]}</td>
                <td>${item.name}</td>
                <td>${item.details || '-'}</td>
                <td>${item.price} TL</td>
                <td>
                    <i class="fas fa-edit" style="color:green; cursor:pointer;" id="${safeId}" onClick="update(this)" title="Düzenle"></i>&nbsp;&nbsp;
                    <i class="fas fa-trash-alt" style="color:red; cursor:pointer;" id="${safeId}" onClick="remove(this)" title="Sil"></i> 
                </td>
            </tr>`;
        }
    }
}, function (error) {
    console.log("Error: " + error.code);
});

// GÜNCELLEME FONKSİYONU
function update(d) { 
    var category = d.id.split("**")[0];
    var index = parseInt(d.id.split("**")[1]);
    
    // Tüm veriyi global depodan güvenle çek
    var item = local_storage[category][index];

    // Boş (undefined) gelme ihtimaline karşı varsayılan değer atamaları
    var safeName = item.name || "";
    var safeDetails = item.details || "";
    var safePrice = item.price || "";
    var safePortion = item.portion || "";
    var safeCalories = item.calories || "";
    var safeProtein = item.protein || "";
    var safeCarbs = item.carbs || "";
    var safeFat = item.fat || "";
    var safeIngredients = item.ingredients || "";
    var safeAllergens = item.allergens || "";
    var safeImage = item.image || "";

    Swal.fire({
        title: category + ' <br><small style="color:#666;">' + safeName + ' Güncelle</small>',
        html: `
            <div class="text-left" style="font-size: 14px;">
                <label class="mb-0 font-weight-bold">İsim</label>
                <input type="text" class="form-control mb-2" id="name" value="${safeName}"> 
                
                <label class="mb-0 font-weight-bold">Açıklama</label>
                <input type="text" class="form-control mb-2" id="details" value="${safeDetails}"> 
                
                <label class="mb-0 font-weight-bold">Fiyat (TL)</label>
                <input type="number" class="form-control mb-3" id="price" value="${safePrice}">
                
                <hr>
                <h6 class="font-weight-bold text-primary">Besin Değerleri ve Detaylar</h6>
                
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <label class="mb-0">Porsiyon</label>
                        <input type="text" class="form-control" id="portion" placeholder="Örn: 200 gr" value="${safePortion}">
                    </div>
                    <div class="col-md-6 mb-2">
                        <label class="mb-0">Kalori</label>
                        <input type="number" class="form-control" id="calories" placeholder="kcal" value="${safeCalories}">
                    </div>
                    <div class="col-md-4 mb-2">
                        <label class="mb-0">Protein (g)</label>
                        <input type="number" class="form-control" id="protein" value="${safeProtein}">
                    </div>
                    <div class="col-md-4 mb-2">
                        <label class="mb-0">Karb. (g)</label>
                        <input type="number" class="form-control" id="carbs" value="${safeCarbs}">
                    </div>
                    <div class="col-md-4 mb-2">
                        <label class="mb-0">Yağ (g)</label>
                        <input type="number" class="form-control" id="fat" value="${safeFat}">
                    </div>
                </div>
                
                <label class="mb-0 mt-2 font-weight-bold">Ürün İçeriği</label>
                <textarea class="form-control mb-2" id="ingredients" rows="2" placeholder="Dana eti, soğan...">${safeIngredients}</textarea>
                
                <label class="mb-0 font-weight-bold text-danger">Alerjen Durumu</label>
                <input type="text" class="form-control mb-2" id="allergens" placeholder="Gluten içerir..." value="${safeAllergens}">
            </div>
        `,
        width: 600,
        showCancelButton: true,
        confirmButtonText: 'Güncelle',
        cancelButtonText: 'Vazgeç',
        confirmButtonColor: '#1cc88a'
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage = JSON.parse(JSON.stringify(local_storage)); // Deep copy 

            var newData = {
                name: document.getElementById("name").value,
                details: document.getElementById("details").value,
                price: parseFloat(document.getElementById("price").value),
                portion: document.getElementById("portion").value,
                calories: document.getElementById("calories").value,
                protein: document.getElementById("protein").value,
                carbs: document.getElementById("carbs").value,
                fat: document.getElementById("fat").value,
                ingredients: document.getElementById("ingredients").value,
                allergens: document.getElementById("allergens").value,
                image: safeImage // Mevcut resmi koru
            };

            Swal.fire("Güncelleniyor. Lütfen Bekleyiniz...", '', 'info');
            var to_save = firebase.database().ref();
            
            local_storage[category][index] = newData;
            
            to_save.set(local_storage, function () {
                Swal.fire("Başarıyla Güncellendi.", '', 'success');
                setTimeout(() => { location.reload() }, 1000);
            });
        }
    });
}

// SİLME FONKSİYONU
function remove(d){
    var category = d.id.split("**")[0];
    var index = parseInt(d.id.split("**")[1]);
    var itemName = local_storage[category][index].name;

    Swal.fire({
        title: category,
        html: `<b>${itemName}</b> adlı menüyü silmek istediğinize emin misiniz?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, Sil',
        cancelButtonText: 'Vazgeç',
        confirmButtonColor: '#e74a3b'
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage = JSON.parse(JSON.stringify(local_storage));
            var to_save = firebase.database().ref();
            
            var uzunluk = local_storage[category].length;
            
            if(uzunluk === 1){
                // Eğer kategorideki son elemansa kategoriyi de temizler
                local_storage[category].splice(index, 1);
                var new_test = Object.keys(local_storage);
                new_test.splice(new_test.indexOf("1Configurations"), 1); // Configs ayır
                local_storage["1Configurations"] = new_test;
                
                to_save.set(local_storage, function () {
                    Swal.fire("Kategori Tamamen Silindi.", 'Kategori sıralamasını güncellemeyi unutmayın.', 'info');
                    setTimeout(() => { location.reload() }, 2000);
                });
            } else {
                local_storage[category].splice(index, 1);
                to_save.set(local_storage, function () {
                    Swal.fire("Menü Silindi.", '', 'success');
                    setTimeout(() => { location.reload() }, 1000);
                });
            }
        }
    });
}

// YENİ MENÜ EKLEME
function newmenu(){
    var drop = '<select class="form-control mb-3 font-weight-bold text-primary" id="categories"><option selected disabled>Lütfen Kategori Seçiniz</option>';
    for(var i = 1; i < keys2.length; i++){
        drop += '<option value="' + keys2[i] + '">' + keys2[i] + '</option>';
    }
    drop += '</select>';

    Swal.fire({ 
        title: "Yeni Menü Ekle",
        html: `
            ${drop}
            <div class="text-left" style="font-size: 14px;">
                <input type="text" class="form-control mb-2" id="name" placeholder="Ürün İsmi">
                <input type="text" class="form-control mb-2" id="details" placeholder="Açıklama">
                <input type="number" class="form-control mb-3" id="price" placeholder="Fiyat (TL)">
                
                <hr>
                <h6 class="font-weight-bold text-primary">Besin Değerleri ve Detaylar</h6>
                
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <input type="text" class="form-control" id="portion" placeholder="Porsiyon (200 gr)">
                    </div>
                    <div class="col-md-6 mb-2">
                        <input type="number" class="form-control" id="calories" placeholder="Kalori (kcal)">
                    </div>
                    <div class="col-md-4 mb-2">
                        <input type="number" class="form-control" id="protein" placeholder="Protein (g)">
                    </div>
                    <div class="col-md-4 mb-2">
                        <input type="number" class="form-control" id="carbs" placeholder="Karb (g)">
                    </div>
                    <div class="col-md-4 mb-2">
                        <input type="number" class="form-control" id="fat" placeholder="Yağ (g)">
                    </div>
                </div>
                
                <textarea class="form-control mt-2 mb-2" id="ingredients" rows="2" placeholder="Ürün İçeriği (Dana eti, tuz...)"></textarea>
                <input type="text" class="form-control mb-2" id="allergens" placeholder="Alerjen Durumu (Gluten içerir...)">
            </div>
        `,
        width: 600,
        showCancelButton: true,
        confirmButtonText: 'Kaydet',
        cancelButtonText: 'Vazgeç',
        confirmButtonColor: '#4e73df'
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage = JSON.parse(JSON.stringify(local_storage));
            
            var select = document.getElementById("categories");
            var category = select.options[select.selectedIndex].value;
            
            if(category === "Lütfen Kategori Seçiniz") {
                Swal.fire("Hata", "Lütfen bir kategori seçiniz!", "error");
                return;
            }

            var newData = {
                name: document.getElementById("name").value,
                details: document.getElementById("details").value,
                price: parseFloat(document.getElementById("price").value || 0),
                portion: document.getElementById("portion").value,
                calories: document.getElementById("calories").value,
                protein: document.getElementById("protein").value,
                carbs: document.getElementById("carbs").value,
                fat: document.getElementById("fat").value,
                ingredients: document.getElementById("ingredients").value,
                allergens: document.getElementById("allergens").value,
                image: ""
            };

            Swal.fire("Ekleniyor. Lütfen Bekleyiniz...", '', 'info');
            var to_save = firebase.database().ref();
            
            local_storage[category].push(newData);
            
            to_save.set(local_storage, function () {
                Swal.fire("Menü Başarıyla Eklendi.", '', 'success');
                setTimeout(() => { location.reload() }, 1000);
            });
        }
    }); 
}

// YENİ KATEGORİ EKLEME
function newcategory(){
    Swal.fire({
        title: "Yeni Kategori Ekle",
        html: `
            <div class="text-left" style="font-size: 14px;">
                <label class="font-weight-bold text-danger">Kategori Adı</label>
                <input type="text" class="form-control mb-3" id="cat" placeholder="Örn: Tatlılar"> 
                <hr>
                <label class="font-weight-bold text-primary">Kategorinin İlk Ürünü</label>
                <input type="text" class="form-control mb-2" id="name" placeholder="Ürün İsmi">
                <input type="number" class="form-control mb-3" id="price" placeholder="Fiyat (TL)">
                
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <input type="text" class="form-control" id="portion" placeholder="Porsiyon (200 gr)">
                    </div>
                    <div class="col-md-6 mb-2">
                        <input type="number" class="form-control" id="calories" placeholder="Kalori (kcal)">
                    </div>
                </div>
            </div>
        `,
        width: 500,
        showCancelButton: true,
        confirmButtonText: 'Kategoriyi Oluştur',
        cancelButtonText: 'Vazgeç',
        confirmButtonColor: '#f6c23e'
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage = JSON.parse(JSON.stringify(local_storage));

            var cate = document.getElementById("cat").value;
            if(!cate) { Swal.fire("Hata", "Kategori adı boş olamaz!", "error"); return; }

            var newData = [{
                name: document.getElementById("name").value,
                details: "",
                price: parseFloat(document.getElementById("price").value || 0),
                portion: document.getElementById("portion").value,
                calories: document.getElementById("calories").value,
                protein: "",
                carbs: "",
                fat: "",
                ingredients: "",
                allergens: "",
                image: ""
            }];

            var to_save = firebase.database().ref();
            local_storage[cate] = newData;
            
            // Konfigürasyonu Güncelle
            var new_test = Object.keys(local_storage);
            new_test.splice(new_test.indexOf("1Configurations"), 1);
            local_storage["1Configurations"] = new_test;

            to_save.set(local_storage, function () {
                Swal.fire("Kategori Eklendi.", 'Lütfen kategori sırasını düzenlemeyi unutmayın.', 'success');
                setTimeout(() => { location.reload() }, 2000);
            });
        }
    });
}

function usoft(){
    Swal.fire({
        toast: true,
        title: 'USoft - <b><u>USoft the clear choice</b></u> ',
        html: "You can reach us at <a href='mailto:usoft.projects@gmail.com'><b><u> this address.</b></u></a> <br> <p>&copy;Copyright 2023. All Rights Reserved.</p>",
        imageUrl: '../img/rocket.png',
        imageAlt: 'Custom image',
    });
}

function ordercategory(){
    local_storage = JSON.parse(JSON.stringify(local_storage));
    var to_save = firebase.database().ref();
    const category_order = [];

    var div_drop = '';
    for(var k = 1; k < keys2.length; k++){
        var drop = '<div class="mb-2"><select class="form-control font-weight-bold text-primary" id="categries' + k + '">'+
        '<option selected disabled>'+ k +'. Sıradaki Kategori</option>';
        for(var i = 1; i < keys2.length; i++){
            drop += '<option value="' + keys2[i] + '">' + keys2[i] + '</option>';
        }
        drop += '</select></div>';
        div_drop += drop;
    }
    
    Swal.fire({
        title: "Kategori Sıralama",
        html: div_drop,
        width: 500,
        showCancelButton: true,
        confirmButtonText: 'Sıralamayı Kaydet',
        cancelButtonText: 'Vazgeç',
        confirmButtonColor: '#e74a3b'
    }).then((result) => {
        if (result.isConfirmed) {
            for(var i = 1; i < keys2.length; i++){
                var select = document.getElementById('categries' + i);
                var category = select.options[select.selectedIndex].value;
                category_order.push(category);
            }
            
            const unique = Array.from(new Set(category_order));
            
            if(category_order.length === unique.length && !category_order.includes("1Configurations")) {
                local_storage["1Configurations"] = category_order;
                to_save.set(local_storage, function () {
                    Swal.fire("Sıralama Düzenlendi.", '', 'success');
                    setTimeout(() => { location.reload() }, 1000);
                });      
            } else {
                Swal.fire("Hata!", 'Lütfen sıralamayı eksiksiz yapın ve her kategoriyi sadece bir kez seçin.', 'error');
            }
        }
    });
}

function demo(){
    Swal.fire({
        toast: true,
        title: '<b>Lisans Bilgisi</b>',
        html: "Lisans Bitiş Tarihi: <b>01.10.2025</b>",
        imageUrl: '../img/rocket.png',
        imageAlt: 'Custom image',
    });
}