document.addEventListener("DOMContentLoaded", () => {
    const testClassSelect = document.getElementById("test-classSelect");
    const testLessonSelect = document.getElementById("test-lessonSelect");
    const testTopicSelect = document.getElementById("test-topicSelect");

    const subjects = {
        5: {
            matematik: ["Doğal Sayılar", "Kesirler", "Ondalık Kesirler", "Oran ve Orantı", "Geometrik Cisimler"],
            türkçe: ["Sözcükte Anlam", "Cümlede Anlam", "Yazım Kuralları", "Noktalama İşaretleri", "Metin Türleri"],
            fen: ["Canlılar Dünyası", "Madde ve Değişim", "Kuvvet ve Hareket", "Işık ve Ses", "Dünya ve Evren"]
        },
        6: {
            matematik: ["Doğal Sayılar", "Kesirler", "Ondalık Kesirler", "Oran ve Orantı", "Geometrik Cisimler"],
            türkçe: ["Sözcükte Anlam", "Dil Bilgisi", "Yazım Kuralları", "Noktalama İşaretleri", "Metin Türleri"],
            fen: ["Hücre ve Bölünme", "Kuvvet ve Hareket", "Madde ve Isı", "Işık ve Ses", "Canlılar ve Enerji İlişkileri"]
        },
        7: {
            matematik: ["Tam Sayılar", "Rasyonel Sayılar", "Oran ve Orantı", "Denklem ve Eşitsizlikler", "Geometrik Cisimler"],
            türkçe: ["Sözcükte Anlam", "Dil Bilgisi", "Yazım Kuralları", "Noktalama İşaretleri", "Metin Türleri"],
            fen: ["Mitoz ve Mayoz Bölünme", "Kuvvet ve Hareket", "Elektrik Devreleri", "Işık ve Madde", "Canlılar ve Enerji İlişkileri"]
        },
        8: {
            matematik: ["Çarpanlar ve Katlar", "Üslü ve Köklü Sayılar", "Denklemler ve Eşitsizlikler", "Geometri", "Fonksiyonlar", "Olasılık ve İstatistik"],
            türkçe: ["Sözcükte Anlam", "Dil Bilgisi", "Yazım Kuralları", "Noktalama İşaretleri", "Metin Türleri"],
            fen: ["DNA ve Genetik Kod", "Kuvvet ve Hareket", "Madde ve Değişim", "Enerji Dönüşümleri", "Dünya ve Evren"]
        },
        9: {
            türkçe: ["Giriş ve Dil Bilgisi", "Hikaye (Olay ve Durum Hikayesi)", "Şiir Bilgisi", "Masal ve Destan"],
            matematik: ["Sayılar ve İşlemler", "Cebirsel İfadeler", "Eşitsizlikler", "Üslü ve Köklü Sayılar"],
            fizik: ["Fizik Bilimine Giriş", "Madde ve Özellikleri", "Kuvvet ve Hareket", "Isı ve Sıcaklık"],
            kimya: ["Kimya Bilimi", "Atom ve Periyodik Sistem", "Kimyasal Türler Arası Etkileşimler", "Maddenin Halleri"],
            biyoloji: ["Canlıların Ortak Özellikleri", "Hücre ve Organeller", "Canlıların Sınıflandırılması", "Mitoz ve Mayoz Bölünme"]
        },
        10: {
            türkçe: ["Hikaye (Modern Hikaye)", "Şiir", "Roman", "Tiyatro"],
            matematik: ["Fonksiyonlar", "Polinomlar", "İkinci Dereceden Denklemler", "Trigonometri"],
            fizik: ["Vektörler", "Kuvvet ve Denge", "Basit Makineler", "Basınç ve Kaldırma Kuvveti"],
            kimya: ["Asitler, Bazlar ve Tuzlar", "Kimyasal Hesaplamalar", "Kimyasal Tepkimeler", "Gazlar"],
            biyoloji: ["Hücre Bölünmesi", "Kalıtım", "Ekosistem Ekolojisi", "Bitki Biyolojisi"]
        },
        11: {
            türkçe: ["Roman", "Şiir (Servet-i Fünun ve Fecr-i Ati)", "Anlatmaya Bağlı Metinler", "Eleştiri ve Deneme"],
            matematik: ["Fonksiyonların Türevleri", "Permütasyon, Kombinasyon, Olasılık", "Logaritma", "Dizi ve Seriler"],
            fizik: ["Elektrik ve Manyetizma", "Dalgalar", "Optik", "Elektriksel Potansiyel ve Enerji"],
            kimya: ["Kimyasal Tepkime Hızları", "Kimyasal Denge", "Asit ve Baz Dengesi", "Elektrokimya"],
            biyoloji: ["Sinir Sistemi", "Endokrin Sistem", "Duyu Organları", "Solunum Sistemi"]
        },
        12: {
            türkçe: ["Cumhuriyet Dönemi Edebiyatı", "Şiir (Cumhuriyet Dönemi)", "Hikaye ve Roman (Cumhuriyet Dönemi)", "Makale, Fıkra, Deneme"],
            matematik: ["Limit ve Süreklilik", "Türev", "İntegral", "Olasılık ve İstatistik"],
            fizik: ["Modern Fizik", "Radyoaktivite", "Kuantum Fiziği", "Enerji Dönüşümleri"],
            kimya: ["Organik Kimya", "Polimerler", "Enerji ve Entalpi", "Kimya ve Çevre"],
            biyoloji: ["İnsan Fizyolojisi", "Hücresel Solunum", "Fotosentez", "Genetik ve Evrim"]
        },
    };

    testClassSelect.addEventListener("change", () => {
        const classSelected = testClassSelect.value;
        testLessonSelect.innerHTML = '<option selected>Seçiniz...</option>';
        testTopicSelect.innerHTML = '<option selected>Seçiniz...</option>';

        if (subjects[classSelected]) {
            Object.keys(subjects[classSelected]).forEach(subject => {
                const option = document.createElement("option");
                option.value = subject;
                option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
                testLessonSelect.appendChild(option);
            });
        }
    });

    // Ders seçimi yapıldığında konuları güncelle
    testLessonSelect.addEventListener("change", () => {
        const classSelected = testClassSelect.value;
        const lessonSelected = testLessonSelect.value;
        testTopicSelect.innerHTML = '<option selected>Seçiniz...</option>';

        if (subjects[classSelected] && subjects[classSelected][lessonSelected]) {
            subjects[classSelected][lessonSelected].forEach(topic => {
                const option = document.createElement("option");
                option.value = topic;
                option.textContent = topic;
                testTopicSelect.appendChild(option);
            });
        }
    });
});
