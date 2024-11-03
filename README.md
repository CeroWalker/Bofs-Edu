# Bofs AI Destekli Ders ve Test Oluşturucu

Bu proje, Flask ve Flask-SocketIO kullanarak eğitim materyali üretmek için geliştirilmiş bir web uygulamasıdır. Ortaokul ve lise seviyelerinde ders içeriklerini ve test sorularını, Google'ın dil modelini kullanarak otomatik olarak üretir. Gerçek zamanlı yanıtlar ve dosya indirme özellikleri sunar.

## Özellikler
- Ortaokul ve lise seviyelerinde ders notları ve test soruları üretme.
- Gerçek zamanlı yanıtlar (WebSocket desteği ile).
- Üretilen içerikleri dosya olarak indirme.

## Gereksinimler
- Python 3.10+
- Aşağıdaki Python kütüphaneleri:
  - Flask
  - Flask-SocketIO
  - google-generativeai

## Kurulum

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/kullanici-adi/proje-adi.git
cd proje-adi
```

### 2. Gerekli Kütüphaneleri Yükleyin
Kütüphaneleri `requirements.txt` dosyasından yüklemek için:

```bash
pip install -r requirements.txt
```

### 3. Çevresel Değişkenleri Ayarlayın
Google'in API anahtarını çevresel bir değişken olarak ekleyin. Bunun için `.env` dosyası oluşturup aşağıdaki satırı ekleyin veya terminalde ayarlayın:

```plaintext
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Uygulamayı Çalıştırın
Uygulamayı çalıştırmak için:

```bash
python app.py
```

Uygulama, `http://localhost:5000` adresinde çalışacaktır.

## Kullanım

1. Ana sayfaya gidin.
2. Ortaokul veya lise formunu doldurun:
   - Ders: Dersin adını girin.
   - Sınıf: Sınıf seviyesini belirtin.
   - Konu: Üzerinde çalışılacak konuyu girin.
   - Tür: Ders veya test sorusu isteğinizi seçin.
   - Soru Sayısı (isteğe bağlı): Test sorusu istiyorsanız sayıyı belirtin.
3. Gönder butonuna tıklayın.
4. Sonuç, gerçek zamanlı olarak sayfada görüntülenecektir.
5. İsterseniz "İndir" butonunu kullanarak üretilen dosyayı indirebilirsiniz.

```
Gemini API anahtarı almak için [aistudio](https://aistudio.google.com/app/apikey) adresini ziyaret edin.
```
