# SkiNav — PROGRESS / İLERLEME

**Shared source of truth** for the founder (Leri), Claude (chat), and Claude Code.
**Ortak referans belgesi** — kurucu (Leri), Claude (sohbet) ve Claude Code için.

> **How this file works / Bu dosya nasıl çalışır:**
> - Claude Code updates this file as it completes work — check off `[x]` done items, mark 🔨 in-progress. / Claude Code işi tamamladıkça bu dosyayı günceller — biten maddeleri `[x]` işaretler, devam edenleri 🔨 yapar.
> - Lives in the repo so all three parties read the same current status. / Repo'da durur, üç taraf da aynı güncel durumu görür.
> - Bilingual: each section has EN then TR. / İki dilli: her bölüm önce EN sonra TR.

**Status legend / Durum göstergesi:** `[ ]` to-do/yapılacak · `[~]` in progress/devam ediyor · `[x]` done/bitti

---

## 📍 CURRENT STATUS / MEVCUT DURUM

**EN:** Prototype (React chat artifact) complete. Native React Native build scaffolded in Claude Code and **running successfully on a real phone via Expo Go** (July 2026). On-device storage chosen **and built** — real email signup/login and data that persists across app restarts. Now: small fixes (resort-name fix done) + GitHub setup, then crash logging, then (after a resort is chosen) the routing engine.

**TR:** Prototip (React sohbet artifact'i) tamamlandı. Native React Native yapımı Claude Code'da kuruldu ve **Expo Go ile gerçek telefonda başarıyla çalışıyor** (Temmuz 2026). Cihazda saklama seçildi **ve yapıldı** — gerçek e-posta kayıt/giriş ve uygulama yeniden başlatıldığında kalıcı veri. Şimdi: küçük düzeltmeler (resort-adı düzeltmesi bitti) + GitHub kurulumu, sonra çökme loglaması, sonra (resort seçilince) rotalama motoru.

---

## ✅ DONE / BİTENLER

- [x] **EN:** Interactive React prototype — 25 components, all screens (Welcome, Email Signup, Profile, Resort Select, Map, Routes discovery, Route Options, Navigation, Report, Emergency, Alerts, Account, Friends) + modals (change password, delete account, level warning, start-point picker, run preview, start-run confirm). **TR:** Etkileşimli React prototibi — 25 bileşen, tüm ekranlar + pencereler.
- [x] **EN:** Map enhancements — weather widget, layers toggle, alerts bell, tappable POIs with Directions/Go, My Location button. **TR:** Harita geliştirmeleri — hava widget'ı, katman anahtarı, uyarı zili, dokunulabilir POI'ler (Yol Tarifi/Git), Konumum düğmesi.
- [x] **EN:** Level warnings + start-point picker + Popular Runs (creator badges, ratings, map preview). **TR:** Seviye uyarıları + başlangıç noktası seçici + Popüler Pistler (oluşturan rozetleri, puanlar, harita önizleme).
- [x] **EN:** Framework decided — React Native. **TR:** Çatı kararı — React Native.
- [x] **EN:** Data storage decided — on-device now, cloud later. **TR:** Veri saklama kararı — şimdi cihazda, sonra bulutta.
- [x] **EN:** Logging decided — Sentry crash logging now, usage analytics later. **TR:** Loglama kararı — şimdi Sentry çökme loglaması, sonra kullanım analitiği.
- [x] **EN:** Native project scaffolded (Expo + TypeScript + React Navigation) and resort-independent screens ported. **TR:** Native proje kuruldu (Expo + TypeScript + React Navigation) ve resort'tan bağımsız ekranlar taşındı.
- [x] **EN:** App verified running on a physical phone via Expo Go. **TR:** Uygulama Expo Go ile fiziksel telefonda çalışır durumda doğrulandı.
- [x] **EN:** Real on-device auth + persistence — email signup/login with salted-hash passwords; profile, level, preferences, chosen resort and stats persist across restarts; session auto-restores (reopens logged in); new accounts start at zero stats; logout + delete-account wired. Apple/Google still stubs. Data layer isolated in `src/services/` for a clean future Supabase swap. **TR:** Gerçek cihaz-içi kimlik doğrulama + kalıcılık — tuz-hash'li şifrelerle e-posta kayıt/giriş; profil, seviye, tercihler, seçilen resort ve istatistikler yeniden başlatmada kalıcı; oturum otomatik geri yüklenir (girişli açılır); yeni hesaplar sıfır istatistikle başlar; çıkış + hesap silme bağlandı. Apple/Google hâlâ geçici. Veri katmanı gelecekteki temiz Supabase geçişi için `src/services/` içinde izole.

---

## 🔨 NOW / ŞİMDİ (active near-term work)

- [~] **EN:** Small fixes (in progress — see FIXES section below). **TR:** Küçük düzeltmeler (devam ediyor — aşağıdaki DÜZELTMELER bölümüne bakın).
- [x] **EN:** Connect project to GitHub — public repo at https://github.com/lerilevi/skinav (secrets kept out via `.gitignore` + `.env.example`). **TR:** Projeyi GitHub'a bağla — genel repo: https://github.com/lerilevi/skinav (gizli bilgiler `.gitignore` + `.env.example` ile dışarıda tutuldu).
- [ ] **EN:** Add Sentry crash/error logging (before field test). Instruction: "Add Sentry for crash and error logging, set it up to work with Expo." **TR:** Sentry çökme/hata loglaması ekle (saha testinden önce). Talimat: "Çökme ve hata loglaması için Sentry ekle, Expo ile çalışacak şekilde kur."

### FIXES / DÜZELTMELER
- [x] **EN:** Resort name flows through to Map / Routes / Alerts headers (was hardcoded "Zermatt"). **TR:** Resort adı Harita / Rotalar / Uyarılar başlıklarına işliyor (sabit "Zermatt" idi).
- [x] **EN:** Change Password now really works — verifies the current password against the stored hash and saves a new salted hash; wrong current password shows a real error. **TR:** Şifre Değiştir artık gerçekten çalışıyor — mevcut şifreyi saklanan hash ile doğrular ve yeni tuzlu hash kaydeder; yanlış mevcut şifre gerçek hata gösterir.
- [x] **EN:** Emergency buttons functional — Ski Patrol (1414) and Emergency (112) open the dialer via tel: links; "Share Location" opens the OS share sheet. **TR:** Acil durum düğmeleri çalışıyor — Kayak Devriyesi (1414) ve Acil (112) tel: bağlantılarıyla tuşlayıcıyı açar; "Konumu Paylaş" işletim sistemi paylaşım sayfasını açar.
- [ ] _(add each further fix here / sonraki düzeltmeleri buraya ekle)_

---

## ⏳ NEXT (RESORT-DEPENDENT) / SIRADAKİ (RESORT'A BAĞLI)

Hold until the next ski trip picks the resort (and its OSM coverage is checked). / Bir sonraki kayak gezisi resort'u belirleyene (ve OSM kapsamı kontrol edilene) kadar beklet.

- [ ] **EN:** Choose test resort (decided by next actual trip; check OSM coverage in Overpass Turbo first). **TR:** Test resort'unu seç (bir sonraki gezi belirler; önce Overpass Turbo'da OSM kapsamını kontrol et).
- [ ] **EN:** Pull resort pistes + lifts (OSM / OpenSnowMap via Overpass Turbo). **TR:** Resort pistlerini + lift'lerini çek (Overpass Turbo ile OSM / OpenSnowMap).
- [ ] **EN:** Render in a real map engine (MapLibre GL). **TR:** Gerçek harita motorunda render et (MapLibre GL).
- [ ] **EN:** Build the routing engine — graph + hub gap-filling (THE MOAT; hardest part; use the most powerful model available). **TR:** Rotalama motorunu kur — grafik + hub boşluk-doldurma (ASIL AVANTAJ; en zor kısım; mevcut en güçlü modeli kullan).
- [ ] **EN:** Wire real GPS to the map (tracking accuracy at speed). **TR:** Gerçek GPS'i haritaya bağla (hızda takip doğruluğu).
- [ ] **EN:** Offline map download + live alerts online ("map offline, info online"). **TR:** Çevrimdışı harita indirme + canlı uyarılar online ("harita offline, bilgi online").
- [ ] **EN:** Field test — founder + friends on-mountain. **TR:** Saha testi — kurucu + arkadaşlar dağda.

---

## 🔮 LATER (CLOUD / SCALE STAGE) / SONRA (BULUT / ÖLÇEK AŞAMASI)

- [ ] **EN:** Cloud backend (Supabase preferred) — real auth + database, multi-device, data follows the account across phones. **TR:** Bulut arka uç (tercihen Supabase) — gerçek kimlik doğrulama + veritabanı, çok cihaz, veri hesapla telefonlar arası taşınır.
- [ ] **EN:** Usage analytics (PostHog / Firebase Analytics). **TR:** Kullanım analitiği (PostHog / Firebase Analytics).
- [ ] **EN:** Real OAuth (Apple needs paid dev account + real build, not Expo Go). **TR:** Gerçek OAuth (Apple ücretli geliştirici hesabı + gerçek build ister, Expo Go değil).
- [ ] **EN:** Monetization model — B2C subscription vs B2B sell-to-resorts (open, undecided). **TR:** Para kazanma modeli — B2C abonelik vs B2B resort'a satış (açık, kararsız).

---

## 🧩 KNOWN LIMITATIONS (from prototype) / BİLİNEN KISITLAMALAR (prototipten)

These describe the *prototype*; some are already resolved in the native build — Claude Code should check off any that no longer apply. / Bunlar *prototibi* anlatır; bazıları native yapımda çözülmüş olabilir — Claude Code artık geçerli olmayanları işaretlemeli.

- [ ] **EN:** Navigation screen shows hardcoded steps regardless of chosen route/run — pass real steps as props. **TR:** Navigasyon ekranı seçilen rotadan bağımsız sabit adımlar gösteriyor — gerçek adımları prop olarak geçir.
- [ ] **EN:** "At starting point" detection uses string-match, not GPS proximity. **TR:** "Başlangıç noktasında" tespiti GPS yakınlığı değil metin eşleşmesi kullanıyor.
- [ ] **EN:** Map is static SVG art, not a real map (replaced by MapLibre in native routing stage). **TR:** Harita statik SVG çizimi, gerçek harita değil (native rotalama aşamasında MapLibre ile değişir).
- [ ] **EN:** Stub buttons: Clear history, alert-card actions, friend invite, QR code, emergency call links, photo upload, locate-friend-on-map. **TR:** Geçici düğmeler: Geçmişi temizle, uyarı-kartı eylemleri, arkadaş daveti, QR kod, acil arama bağlantıları, fotoğraf yükleme, arkadaşı-haritada-bul.
- [ ] **EN:** Weather + alert data hardcoded — needs real APIs. **TR:** Hava + uyarı verisi sabit — gerçek API'ler gerekir.

---

## 💡 NICE-TO-HAVES / OLMASI GÜZEL OLURLAR

- [ ] Friends shown on the main map / Arkadaşlar ana haritada gösterilsin
- [ ] Filter pistes by difficulty on map / Haritada pistleri zorluğa göre filtrele
- [ ] Navigate to a friend's location / Bir arkadaşın konumuna navigasyon
- [ ] Save favorite Popular Runs / Favori Popüler Pistleri kaydet
- [ ] Granular notification preferences / Ayrıntılı bildirim tercihleri
- [ ] Language / locale preference / Dil / yerel ayar tercihi
- [ ] Email verification after signup / Kayıt sonrası e-posta doğrulama
- [ ] QR code for add-friend / Arkadaş ekleme için QR kod

---

## 🗂️ REFERENCE / REFERANS

- **Prototype file / Prototip dosyası:** `skinav.jsx` (the React chat prototype — visual + logic spec)
- **Decision logs / Karar günlükleri:** `SKINAV_NOTES_EN.md`, `SKINAV_NOTES_TR.md` (full reasoning behind each decision)
- **Map data / Harita verisi:** OpenStreetMap / OpenSnowMap, extracted via Overpass Turbo (overpass-turbo.eu); elevation via NASA SRTM
- **Differentiator / Farklılaştırıcı:** navigation-focused ("Google Maps for the mountain"), NOT fitness tracking (vs Slopes/Strava). The routing/gap-filling engine is the moat. / Navigasyon odaklı ("dağ için Google Haritalar"), fitness takibi DEĞİL. Rotalama/boşluk-doldurma motoru asıl avantaj.

---

*Last updated / Son güncelleme: 2026-07-06 — fixes: real Change Password + working Emergency call/share buttons. Earlier today: pushed to GitHub (https://github.com/lerilevi/skinav) with a secrets-safe .gitignore + .env.example; reconciled status marks against the actual code. / düzeltmeler: gerçek Şifre Değiştir + çalışan Acil durum arama/paylaşım düğmeleri. Bugün öncesinde: GitHub'a gönderildi, durum işaretleri gerçek kodla eşitlendi.*
