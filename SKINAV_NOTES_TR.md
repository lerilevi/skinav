# SkiNav — Bilinen Kısıtlamalar ve Gelecek Çalışmalar

Prototip olarak hazırlanmış veya geçici (stub) olarak bırakılmış ve ileride gerçek olarak hayata geçirilmesi gereken işlerin güncel listesi. Tematik sprint'ler halinde ele alabilmeniz için kategorilere ayrılmıştır.

> Bu dosya, İngilizce ikizi `SKINAV_NOTES_EN.md` ile içerik olarak birebir aynı tutulur. Birine eklenen her madde diğerine de eklenir.

---

## 🔌 Arka Uç / Kalıcılık (Backend / Persistence)

Bunlar görsel olarak mevcut ama hiçbir yerde kalıcı değil. Her biri için gerçek bir API + veri saklama katmanı gerekecek.

- **Hesap alanları** (kullanıcı adı, e-posta, şifre) — durum (state) kök React state içinde tutuluyor. Kimlik doğrulama yok, veritabanı yok. Sayfa yenilenince her şey sıfırlanır.
- **Uyarı (Alert) verisi** `SkiNav` kökünde sabit kodlanmış (hardcoded). Veri yapısı (`category`, `severity`, `source`, `reportCount`, `actions`) gerçek bir API'nin döndüreceği yapıyla zaten uyumlu — sabit diziyi bir fetch ile değiştirerek bağlayabilirsiniz.
- **Popüler Pistler (Popular Runs) verisi** sabit kodlanmış. Aynı şekilde arka uca uyumlu yapı (creator, creatorType, difficulty, rating, reviews).
- **Yorum sayıları** Popüler Pistler'de statik sayılar. Gerçek bir puanlama arka ucu eklendiğinde, bir yıldıza dokununca sayı artmalı ve ortalama güncellenmeli.
- **Son Hedefler (Recent Destinations)** `RoutesScreen` içinde sabit kodlanmış. Gerçekte bu, kullanıcı her bir hedefe navigasyon yaptığında eklenen, kullanıcıya özel bir geçmişten gelmeli.
- **Kullanıcı puanlamaları** Popüler Pistler'de `RoutesScreen`'e özel (local) — başka ekrana gidip dönünce sıfırlanır. Oturum boyunca kalıcı olması için `userRatings` nesnesini kök state'e taşıyın (`skiType` / `skiLevel` / `prefs` gibi). Oturumlar arası kalıcılık için arka uca bağlayın.
- **Fotoğraf yükleme** (Hesap ekranındaki 📷 düğmesi) yalnızca görsel. Tarayıcıdaki `<input type="file">` çalışır ama Claude.ai içindeki artifact'ler yüklemeleri saklayamaz; bu yüzden yalnızca gerçek (kendi) yapınızda çalışır.
- **Çıkış (Logout)** aynı zamanda "uyarılar okundu" durumunu sıfırlar, böylece sonraki oturum uyarı rozeti yeniden aktif başlar. Demo için sorun değil ama gerçek oturumlarınız olduğunda yeniden gözden geçirin.

---

## 🔐 Kimlik Doğrulama (Auth)

- **Apple / Google kayıt düğmeleri** doğrudan profil kurulumuna gidiyor. Henüz gerçek bir OAuth akışı yok. Gerçek kimlik doğrulamayı bağladığınızda bunlar ilgili OAuth penceresini açmalı, bir token almalı ve yanıttan e-posta/ad alanlarını önceden doldurmalı.
- **Giriş yap (Sign in) bağlantısı** karşılama ekranından doğrudan tesis (resort) ekranına atlıyor. Gerçek bir kimlik doğrulama kontrolü yok.
- **Şifre DEĞİŞTİR penceresi** yerel olarak doğrulama yapıyor ama bir API'ye gitmiyor. Şu an doğrulayacak bir sunucu olmadığı için "mevcut şifre yanlış" hata durumu yok.
- **Hesap silme onayı** başarılı olunca yalnızca karşılama ekranına dönüyor. Gerçek uygulamada API çağrısı, yükleniyor durumu, hata yönetimi ve oturum sonlandırma gerekir.

---

## 🧭 Navigasyon Ekranı (sabit kodlanmış adımlar)

Ciddileştiğinizde düzeltilmesi gereken en büyük şey bu:

- **NavigationScreen** hangi rota veya pisti başlatırsanız başlatın hâlâ sabit kodlanmış Altitude Restaurant adımlarını gösteriyor. Rotayı/pisti `NavigationScreen`'e prop olarak geçirip gerçek `steps` dizisini render edin.
- **Başlangıç noktası** NavigationScreen başlığında görünmüyor. Kullanıcının pist sırasında "Nereden: Altitude Restaurant → Nereye: Matterhorn" görmesini isterseniz, adımlar dinamikleştiğinde bu kolayca eklenir.
- **Adım ilerletme** manuel (Sonraki Adım düğmesi). Gerçek navigasyon her bir ara noktaya GPS yakınlığını algılayıp otomatik ilerlerdi.
- **İki aşamalı "başlangıca git, sonra pisti başlat" akışı** onay penceresinin arayüzünde gösteriliyor ("Başlangıç Noktasına Git" düğme etiketi) ama pratikte gerçekten iki aşamalı bir navigasyon değil — NavigationScreen yalnızca sabit adımlarını gösteriyor. Gerçek uygulama şöyle olmalı: (1) pistin startLocation'ına navigasyon, (2) varışı algılama, (3) "Başlangıç noktasına ulaştınız — pisti başlatalım mı?" sorusu, (4) ardından pistin kendi adım adım rehberliğini başlatma.
- **"Başlangıç noktasında mı" tespiti** şu an `startPoint.name` ile `run.startLocation.name` arasında basit bir metin eşleşmesi kullanıyor. Gerçek GPS, yakınlık kullanırdı (örneğin pistin başlangıç koordinatlarının 50 m içinde). Metin eşleşmesi, tek bir karakter bile farklı özel bir başlangıç noktası yazıldığında her zaman "başlangıç noktasında değil" olarak okunur demektir.

---

## 🗺️ Harita Ekranı

- **Harita statik SVG çizimi**, gerçek bir harita değil. Üretim için gerçek pist haritası karoları (tile) ile Mapbox GL / Leaflet / MapLibre entegre edersiniz.
- **Haritada nokta seçme (POI dokunma)** koordinatları SVG işaretçilerine uyacak şekilde elle yerleştirildi. Harita statik çizim ve `preserveAspectRatio="slice"` olduğu için dokunma hedefleri çizili işaretçilerle hizalanıyor ama gerçek coğrafyadan türetilmiyor. Gerçek bir haritada (Mapbox/MapLibre) dokunma→koordinat dönüşümünü hazır alırsınız.
- **Konum kartı (popup)** dokunulan noktanın tam üstünde değil, arama çubuğunun üstünde (alt sayfa / bottom-sheet tarzı) konumlanıyor — bu, güvenilir, Google Haritalar tarzı bir desen ve kırılgan SVG→ekran koordinat hesaplarından kaçınır.
- **Üst bar ve alt degrade kapsayıcılarda `pointer-events: none`** ayarlandı (kendi düğmelerinde tekrar `auto` yapıldı), böylece harita dokunuşları bu katmanların altında bile algılanıyor. Haritaya yeni katman arayüzü eklerseniz, etkileşimli alt öğelere `pointerEvents: "auto"` vermeyi unutmayın.
- **Konumum düğmesi (◎)** — harita statik SVG çizimi olduğu için, gerçek bir haritanın yapacağı gibi görünümü konumunuza kaydıramaz/öteleyemez; nokta sabit bir yerde duruyor. Düğme, prototibe dürüst sürümü yapıyor: katmanları (seçili işaretçi, arama) kapatıyor ve konum noktanızda tek seferlik bir nabız halkası ateşliyor. Gerçek bir harita motorunda bu düğme, gerçekten yeniden ortalamak için `map.flyTo(userCoords)` gibi bir şey çağırırdı.
- **Kullanıcı konumu nabzı (pulse)** sabit bir koordinatta (SVG uzayında 190, 200). Gerçek uygulamada GPS → harita projeksiyonu matematiği gerekir.
- **Haritadaki uyarı işaretçileri** (buzlu nokta, kuyruk) sabit kodlanmış. Uyarı verisinden dinamik olarak render edilmeli.
- **Katman anahtarları** (Pistler/Lift'ler/Tesisler) statik SVG içinde çalışıyor ama henüz "zorluğa göre filtrele" veya "yalnızca kendi seviyemi göster" seçeneği yok — seviye uyarısı özelliği düşünülürse faydalı olabilir.
- **Hava durumu widget verisi** sabit kodlanmış. Bir hava durumu API'si gerekir (OpenWeather, dağa özel veriler için Meteomatics).

---

## 🎨 Yerleşim / Arayüz İncelikleri

- **Hava durumu widget'ı** açıldığında ~260px genişler ve daha kısa telefon çerçevelerinde arama çubuğuyla çakışabilir. Şu an `top: 66`'da konumlu, üst bardan uzak ve alt kontrollerin üstünde kalıyor. Çerçeve yüksekliğini değiştirirseniz aralığı yeniden kontrol edin.
- **Alt navigasyon** 4 öğeyle iyi durumda. Daha fazla ekran eklerseniz, 375px'te 5+ öğenin sıkışacağını göz önünde bulundurun.
- **FromToBlock'taki NEREDEN nabız noktası** gerçek bir animasyon değil, statik bir `boxShadow` parıltısı. Nabız atmasını isterseniz `box-shadow` ölçeklemesi olan bir CSS `@keyframes` ekleyin.

---

## 📝 Geçici Düğmeler (henüz bir şey yapmayanlar)

- Son Hedefler sekmesindeki **"Geçmişi temizle"** bağlantısı
- Acil Durum ekranındaki **"Konumu kişiyle paylaş"** düğmesi
- Uyarı kartlarındaki **"Durumu gör" / "Alternatif rota" / "Haritada gör" / "Onayla" / "Alternatifleri gör"** eylem düğmeleri
- Arkadaşlar ekranındaki **"Arkadaş ekle — Davet et"** düğmesi
- Arkadaş ekleme akışındaki **"QR kod"** ifadesi (henüz QR üretimi yok)
- Acil Durum'daki **arama düğmeleri** (Kayak Devriyesi 1414, Acil 112) — `tel:` bağlantıları veya yerel telefon API'si gerektirir
- Hesap'taki **📷 avatar fotoğraf yükleme**
- Her arkadaş kartındaki **🎯 Haritada bul** düğmeleri (haritayı o kişinin konumuna kaydırır)

---

## 🔀 Muhtemelen Yukarı Taşınması Gereken State

Şu an bileşene özel (local), ama kalıcılık eklediğinizde kökte tutulması mantıklı olabilir:

- `RoutesScreen` içindeki **`userRatings`** (Popüler Pistler puanlamaları)
- `AlertsScreen` içindeki **`dismissed`** uyarılar (kapatıp başka ekrana gidince geri geliyor)
- `MapScreen` içindeki **`layers`** (Pistler/Lift'ler/Tesisler anahtarları) — local olarak muhtemelen sorun değil, ama "tesisleri her zaman gizle" gibi bir kullanıcı tercihi kökte yaşardı
- **`weatherOpen`** — local olarak sorun değil

---

## 🎯 Sohbette Çıkan Olması Güzel Olur'lar (Nice-to-haves)

Konuşulan ama henüz yapılmayan fikirler:

- **Gerçek "mevcut şifre yanlış" sunucu hatası olan şifre değiştirme akışı** (şu an yalnızca istemci tarafı doğrulama)
- E-posta kaydından sonra **e-posta doğrulama adımı** (onay e-postası gönderme)
- Arkadaş ekleme akışı için Profil'de **QR kod üretimi**
- **Haritada arkadaşlar** — arkadaşların konumları ana harita ekranında işaretçi olarak gösterilsin (arkadaş verisi zaten konuma yakın bilgi içeriyor)
- Harita katman anahtarında **pistleri zorluğa göre filtrele** (seviye uyarısı özelliğiyle faydalı)
- **Bir arkadaşa navigasyon** — arkadaşın 🎯 düğmesine dokun → mevcut konumuna rota seç
- **Favori Popüler Pistleri kaydet** — kalp ikonu, "Kaydettiğim Pistler" sekmesi
- **Push bildirim tercihleri** — şu an tek bir anahtar, ayrıntılı olabilir (yalnızca acil / lift durumu / hava durumu / vb.)
- Hesap tercihlerinde **Dil / yerel ayar (locale)** tercihi
- **Çevrimdışı harita indirme** — tesis seçiminde Zermatt'ta "İNDİRİLDİ" rozeti var ama gerçek bir mekanizması yok

---

*Son güncelleme: Konumum düğmesi eklendikten + katman anahtarı açıklaması yapıldıktan sonra.*

---

## 🚀 Yol Haritası / Pazara Çıkış (Roadmap / Go-to-Market)

SkiNav'ın prototipten gerçek, test edilebilir bir ürüne nasıl geçeceği. (Harita verisi + lansman planlama tartışmasından çıkarıldı.)

### Harita verisi — haritalar nereden gelecek
- **Kaynak: OpenSnowMap veya OpenStreetMap (OSM).** Pahalı ticari harita verisi lisanslamaya gerek yok. OSM'nin kayak kapsamı (`piste:type=downhill`, `aerialway=chair_lift`, vb.) genel olarak çok iyi; OpenSnowMap aynı OSM pist/lift verisini özellikle kayak için render eder. İkisi de ücretsiz ve otomatik çekilebilir.
- **Alternatif: resortlarla anlaşma** — resmi haritalarını alırsın, daha doğru ama her birini tek tek ikna etmen gerekir. Uzun vadeli bir model; başlangıç için fazla ağır.
- **Çıkarma (Extraction):** hedef tesisin pistlerini + lift'lerini **Overpass Turbo** ile çekin (sınırlayıcı kutu / bounding box ile sorgu), veriyi dışa aktarın.
- **Render:** veriyi harita karolarına (Mapbox) dönüştürün veya OSM verisini doğrudan bir harita motorunda render edin. **MapLibre GL** ücretsiz/açık seçenek; **Mapbox GL** ücretli/yönetilen alternatif.
- **Yükseklik / 3B görünüm:** "üç-çeyrek kâğıt-harita görünümü" için ve tek yönlü lift/pist yönünü düzeltmek için (hangi ucun daha yüksek olduğunu bilerek) OSM'yi **NASA SRTM yükseklik verisi** ile birleştirin.
- **Dikkat:** OSM etiketleri kullanıcı tarafından üretilir ve tutarsızdır — tesisten tesise boşluklar olur. Bu yüzden iyi haritalanmış TEK bir tesisle başlıyoruz.

### Rotalama beyni — asıl farklılaştırıcımız
- OSM haritayı verir; adım adım rotalamayı hazır VERMEZ.
- Haritalarda genellikle "hub"larda (birçok lift + pistin sonlandığı yer) açık bağlantı yoktur. Uygulama, lift'ler ve pistler arasında rota çıkarmak için **akıllıca yapay bağlantılar oluşturup boşlukları doldurmalıdır**.
- Bu boşluk-doldurma + rotalama mantığı asıl rekabet avantajıdır (moat) — SkiNav'ı "dağ için Google Haritalar" yapan, Slopes'u ise yalnızca bir fitness takipçisi bırakan şey budur.

### Test için hangi tesisten başlamalı
- Test ekibinin fiziksel olarak ulaşabileceği, OSM kapsamı mükemmel olan **tek** bir küçük-orta tesis seçin.
- Kriterler: iyi OSM verisi + yönetilebilir lift/pist sayısı + test edenler için gerçek erişim.
- Mevcut prototip Zermatt kullanıyor (büyük, karmaşık, harika veri — ama ilk tur için haritalanması/test edilmesi çok şey). İlk saha testi için daha küçük bir tesis düşünün.
- (İsrail merkezli kurucu → gerçekçi saha-testi penceresi bir Alpler gezisi.)

### Kimler test edecek (sırayla)
1. **Sen + kayak yapan birkaç arkadaş** — dağda, telefonlar ceplerde. GPS hızda tutarlı mı? Rotalama mantıklı mı?
2. **Dost bir kayak eğitmeni / kayak okulu bağlantısı** — yanlış rotalama mantığını anında fark eder.
3. **Tesiste toplanan küçük bir beta grubu**.

### Sıralı sonraki adımlar
1. Lansman tesisini seç; OSM pist/lift verisini çek (Overpass Turbo).
2. Gerçek bir harita motorunda render et (MapLibre).
3. Rotalama grafiğini + hub boşluk-doldurma mantığını kur (asıl avantaj).
4. Gerçek GPS'i haritaya bağla (zor kısım: hızda takip doğruluğu).
5. Yukarıdaki kademelerle saha testi yap.
- **Devir noktası:** React prototibinin yerel (native) mobil geliştirmeye devredildiği nokta burası — hızda GPS ve çevrimdışı haritalar yerel geliştirme gerektirir.

### Açık / Doğrulanacak
- **İsimlendirme:** OSM verisi üzerine kurulu "Ski Nav" adında bir iOS uygulaması zaten var (bir OSM topluluk projesi). İsme karar vermeden önce marka/konumlandırmayı kontrol et.
### ✅ KARAR VERİLDİ (Haziran 2026) — yön artık belli
- **İlk kullanıcı: kurucu + arkadaşlar.** → Bu, **B2C** başlangıç yolunu işaret ediyor: sonraki gezinizde sen ve arkadaşlarının kullanacağı bir şey yap, resort onayına gerek yok. B2B / resort ortaklığı, gerçek kullanım gösterilebilir olunca sonra gelebilir.
- **Hangi resort: bir sonraki gerçek kayak gezisi belirler.** Soyut olarak seçmeye gerek yok — grup bir gezi ayarladığında, o hedef test resort'u olur; yeter ki düzgün OpenStreetMap / OpenSnowMap kapsamı olsun (yerleşik Alpler resortlarının çoğunda var).
- **Para kazanma: ertelendi (güvenli).** Arkadaş-aile testi için henüz bir iş modeline gerek yok — sadece dağda çalışması yeterli. Gelir düşüncesi, ilk gerçek test faydalı olduğunu kanıtlayana kadar bekler.
- **Net sonuç: artık takılı değil.** "Daha fazla geliştirmeden önce bunu netleştir" maddesi, ilerlemek için yeterince çözüldü.

### Daha fazla geliştirmeden ÖNCE netleştirilecek 3 soru (Türkçe planlama sohbetinden)
Şu an en değerli şey bu soruları yanıtlamak; çünkü harita/lansman kararı her şeyi etkiliyor — uygulamanın nasıl çalışacağını, ne kadar karmaşık olacağını ve nasıl para kazanacağını. Bunlar netleşmeden teknik olarak daha derine inme:
1. **Hangi resort ile başlamalı?** Kurucunun gittiği / iyi tanıdığı bir yer.
2. **İlk kullanıcı kim?** Arkadaşlar mı? Bir kayak topluluğu mu?
3. **Nasıl para kazanır?** Resort'a satış (B2B)? Kullanıcı aboneliği (B2C)? — *açık, henüz karar verilmedi.*

### Türkçe sohbette teyit edilenler
- **SkiNav ne yapıyor (kurucunun ifadesi):** bulunduğun resort'ta gitmek istediğin yeri işaretliyor veya adını yazıyorsun; sana hangi lifti almalısın ve hangi pist alternatiflerin olduğunu gösteriyor — harita üzerinde yol bulmayı kolaylaştırıyor.
- **Hedef kullanıcı:** her seviye — yeni başlayanlar ("kırmızıya geçebilir miyim?") ve deneyimli kayakçılar (en hızlı rota, lift kuyruğunu kaçır).
- **Harita girişi:** kurucu resort verisini elle GİRMEYECEK — otomatik çekilmeli veya resortlardan talep edilmeli.
- **Offline/online ayrımı (teyitli):** harita çevrimdışı kullanım için indirilebilir; uyarılar (pist kapandı, lift durdu) internet gerektirir. Net kural: **harita offline, anlık bilgi online.**
- **Süreç notu:** önce yukarıdaki 3 soruyu netleştir; bu, sırada ne tasarlayacağını ve *prototipten Claude Code'a (native geliştirme) ne zaman geçeceğini* netleştirir.


---

## 🛠️ Native Yapım Brifi (Claude Code için)

> Sohbet arayüzü (prototibin yapıldığı yer) native uygulamayı yapamaz. Bu işi **Claude Code**'da yap — gerçek dosya sistemi + terminalde çalışan agentic araç. Spec olarak `skinav.jsx`'i ve bu notları yanında getir.

### ✅ KARAR: React Native (Haziran 2026)
- **Çatı (Framework): React Native** (JS/TS). Flutter yerine seçildi çünkü prototip zaten React — aynı dil, aynı bileşen/state modeli; böylece ekranlar, navigasyon akışı ve state büyük ölçüde Dart'ta yeniden yazılmak yerine taşınabiliyor.
- Kabul edilen ödün: Flutter'ın kendi çizdiği render, harita/animasyon ağırlıklı uygulamalarda biraz daha akıcı ama belirleyici değil — React Native ciddi harita uygulamalarını sorunsuz çalıştırır ve tek kişilik kurucu için süreklilik kazanıyor.

### Yapım sırası — önce resort'tan bağımsız kısımlar
Bunlar harita verisi veya seçilmiş resort gerektirmez. Şimdi yapmak güvenli:
1. **Proje kurulumu** — React Native projesi (en kolay başlangıç Expo), TypeScript, navigasyon kütüphanesi (React Navigation).
2. **Prototip arayüzünü taşı** — `skinav.jsx`'teki ekranları yeniden oluştur: Karşılama, E-posta Kayıt, Profil Kurulumu, Resort Seçimi, Hesap, Arkadaşlar, Uyarılar, Bildir, Acil Durum. Koyu-lacivert/cyan tema + Exo 2 fontunu tekrar kullan.
3. **State & navigasyon** — yukarı taşınan state'i (skiType, skiLevel, username, email, prefs, startPoint) ve ekran yönlendirmesini taşı.
4. **Kimlik doğrulama (Auth)** — gerçek kimlik doğrulamayı bağla (Apple / Google / e-posta). Geçici kayıt düğmelerinin gerçek olduğu yer burası.
5. **Harita motoru + GPS** — **MapLibre GL** (ücretsiz/açık) ile *herhangi* bir temel haritayı render et ve kullanıcının canlı konumunu göstermek için gerçek cihaz GPS'ini bağla. (Burada genel bir harita kullanılabilir — henüz kayak resort'una gerek yok.)

### Resort'a BAĞLI kısımlar — resort seçildikten sonra
Bir sonraki kayak gezisi resort'u belirleyene (ve OSM kapsamı kontrol edilene) kadar beklet:
6. **Resort verisini çek** — seçilen resort için Overpass Turbo ile OSM/OpenSnowMap pistleri + lift'leri.
7. **Rotalama motoru (asıl avantaj)** — lift'ler ve pistler arasında rota çıkarabilmesi için grafiği + hub boşluk-doldurmayı kur. Test için gerçek resort verisi gerekir.
8. **Çevrimdışı harita indirme** + **canlı uyarılar (online)** — "harita offline, bilgi online" ayrımı.
9. **Saha testi** — kurucu + arkadaşlar dağda.

### Ucuz risk-azaltma adımı (her zaman, kodsuz)
- Bir resort'a karar vermeden önce **Overpass Turbo** (overpass-turbo.eu) içinde bir pist sorgusu çalıştırıp OSM kapsam kalitesini kontrol et. Eksik veri = daha zor yapım.
