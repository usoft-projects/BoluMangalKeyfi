// Sayfa yüklendiğinde global olarak çalışacak Pop-up Fonksiyonumuz (İçerik ve Alerjen bilgisi için)
window.showProductDetails = function(name, ingredients, allergens) {
    Swal.fire({
        title: name,
        html: `
            <div class="text-start mt-3" style="font-size: 15px; border-top: 1px solid #eee; padding-top: 15px;">
                <p class="mb-3">
                    <strong style="color: #ffb03b; font-size: 16px;"><i class="bi bi-info-square-fill me-2"></i>ÜRÜN İÇERİĞİ:</strong><br> 
                    <span style="color: #555;">${ingredients}</span>
                </p>
                <p class="mb-0">
                    <strong style="color: #d33; font-size: 16px;"><i class="bi bi-exclamation-triangle-fill me-2"></i>ALERJEN DURUMU:</strong><br> 
                    <span style="color: #555;">${allergens}</span>
                </p>
            </div>
        `,
        confirmButtonColor: '#ffb03b',
        confirmButtonText: 'Kapat',
        width: '400px'
    });
}

function init() {
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
    var ref = firebase.database().ref();

    ref.on("value", function (snapshot) {
        var list_categories = document.getElementById("menu-flters");
        var list_menu = document.getElementById("menu_tabs");
        var test = snapshot.val();
        
        if (!test) return;

        var keys = Object.keys(test);
        var datas = Object.values(test);

        // Kategori Filtrelerini Oluşturma
        list_categories.innerHTML = '<li data-filter="*" class="filter-active">Tümü</li>';
        var categories = datas[0]; // Veritabanındaki kategori başlıkları
        
        for (var i = 0; i < categories.length; i++) {
            list_categories.innerHTML += `<li><a href="#category-${categories[i]}" style="color:inherit; text-decoration:none;">${categories[i]}</a></li>`;
        }

        // Menü İçeriğini Oluşturma
        list_menu.innerHTML = "";

        for (var i = 0; i < categories.length; i++) {
            var categoryName = categories[i];
            var index_key = keys.indexOf(categoryName);
            
            if (index_key !== -1 && datas[index_key]) {
                var categoryItems = datas[index_key];

                // 1. Kategori Başlığı (Tam Satır - col-12)
                list_menu.innerHTML += `
                    <div class="col-12 mt-5 mb-3" id="category-${categoryName}">
                        <div class="section-title" style="padding-bottom: 0;">
                            <h2 style="font-size: 28px; color: #ffb03b; text-align:left;">${categoryName}</h2>
                        </div>
                        <hr style="color: #ffb03b; opacity: 0.5;">
                    </div>
                `;

                // 2. Ürün Kartları (İki Sütun - col-lg-6)
                for (var k = 0; k < categoryItems.length; k++) {
                    var item = categoryItems[k];

                    // İçerik ve Alerjen verileri (Veri yoksa "Belirtilmemiş" yazar)
                    var ingr = item.ingredients ? item.ingredients : "Belirtilmemiş";
                    var allerg = item.allergens ? item.allergens : "Belirtilmemiş";

                    // Besin değerleri ikonlu rozetleri
                    var portionHtml = item.portion ? `<span class="badge bg-secondary me-1 mb-1"><i class="bi bi-pie-chart-fill me-1"></i>${item.portion}</span>` : '';
                    var calHtml = item.calories ? `<span class="badge bg-danger me-1 mb-1"><i class="bi bi-fire me-1"></i>${item.calories} kcal</span>` : '';
                    var proteinHtml = item.protein ? `<span class="badge bg-success me-1 mb-1"><i class="bi bi-egg-fried me-1"></i>${item.protein}g Prt</span>` : '';
                    var carbHtml = item.carbs ? `<span class="badge bg-warning text-dark me-1 mb-1"><i class="bi bi-basket-fill me-1"></i>${item.carbs}g Karb</span>` : '';
                    var fatHtml = item.fat ? `<span class="badge bg-info text-dark mb-1"><i class="bi bi-droplet-half me-1"></i>${item.fat}g Yağ</span>` : '';

                    list_menu.innerHTML += `
                        <div class="col-lg-6 menu-item filter-${categoryName} mb-4">
                            <div class="menu-content d-flex justify-content-between align-items-center">
                                <!-- Ürün adı artık tıklanabilir değil, sadece isim olarak görünüyor -->
                                <a href="#!">${item.name}</a>
                                <span>${item.price} TL</span>
                            </div>
                            <div class="menu-ingredients mb-2">
                                ${item.details}
                            </div>
                            <div class="menu-nutritional-info d-flex flex-wrap mt-2" style="font-size: 0.8rem; opacity: 0.9;">
                                ${portionHtml}
                                ${calHtml}
                                ${proteinHtml}
                                ${carbHtml}
                                ${fatHtml}
                            </div>
                            <!-- Yeni İçerik ve Alerjen Butonu -->
                            <div class="mt-2">
                                <button class="btn btn-sm" style="font-size: 0.75rem; border-radius: 20px; border: 1px solid #ffb03b; color: #ffb03b; background: transparent; padding: 3px 12px; transition: all 0.3s;" onmouseover="this.style.background='#ffb03b'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#ffb03b';" onclick="showProductDetails('${item.name}', '${ingr}', '${allerg}')">
                                    <i class="bi bi-card-text me-1"></i> İçerik ve Alerjen Detayı
                                </button>
                            </div>
                        </div>
                    `;
                }
            }
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });
}

setTimeout(() => { init(); }, 500);

function usoft() {
    var text = `
    <section id="contact" class="contact" style="padding: 10px;"> 
        <div class="section-title mb-3"> 
            <h2>İletişim</h2> 
            <p>Bize Ulaşın</p> 
        </div> 
        <div class="info text-start"> 
            <div class="address mb-3"> 
                <i class="bi bi-geo-alt fs-4 text-warning float-start me-3"></i> 
                <h4>Adres:</h4> 
                <p style="font-size: 14px;">Bahçekapı Mah. 2540 Cad, Şaşmaz Blv. No:9, Etimesgut/Ankara <br> 
                <strong>Çalışma Saatleri:</strong> 10:00 - 00:00</p> 
            </div> 
            <div class="phone mb-3">
                <i class="bi bi-phone fs-4 text-warning float-start me-3"></i>
                <h4>Telefon:</h4>
                <p style="font-size: 14px;"><a href="tel:03122151215" style="color: inherit;">0312 215 12 15</a></p> 
            </div>
        </div> 
    </section>`;
    
    Swal.fire({
        html: text,
        imageUrl: '../assets/img/logo.png',
        imageAlt: 'Bolu Mangal Keyfi',
        showConfirmButton: true,
        confirmButtonColor: '#ffb03b',
        confirmButtonText: 'Kapat'
    });
}

// Performans için gereksiz offline'a alma süresini 10sn'den uzatmak veya iptal etmek isteyebilirsin.
// Şimdilik senin kurgunu korudum fakat süreyi 30 saniyeye çektim.
setInterval(() => {
    firebase.database().goOffline();
    console.log("Database connection set to offline mode to save bandwidth.");
}, 30000);

setTimeout(() => {
    Swal.fire({
        title: 'Google\'da bizi puanlamak ister misiniz?',
        showCancelButton: true,
        confirmButtonColor: '#ffb03b',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="bi bi-star-fill"></i> Puanla',
        imageUrl: '../assets/img/logo.png',
        cancelButtonText: 'Belki Daha Sonra'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open('https://www.google.com/maps/place/Bolu+Mangal+Keyfi+Balgat/@39.9005084,32.8144087,17z/data=!4m8!3m7!1s0x14d34f512a36205f:0x3a9a33c83b403d9c!8m2!3d39.9005043!4d32.8169836!9m1!1b1!16s%2Fg%2F113j4_g6f?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D');
        }
    });
}, 25000);