import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company, formattedAddress } from '@/lib/company';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description:
    'MotoFull olarak kişisel verilerinizi hangi amaçla işlediğimizi, kimlerle paylaştığımızı, ne kadar sakladığımızı ve haklarınızı açıklayan aydınlatma metni.',
  robots: { index: true, follow: true },
};

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      subtitle="6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, kişisel verilerinizi nasıl işlediğimizi açıklıyoruz."
    >
      <Section n={1} title="Veri sorumlusu kimdir?">
        <p>
          Bu metin kapsamında veri sorumlusu <strong>{company.legalName}</strong>{' '}
          (&quot;{company.brandName}&quot;) olup, adresi {formattedAddress()}, MERSİS numarası{' '}
          {company.mersisNo}&apos;dur.
          {company.verbisNo
            ? ` VERBİS kayıt numarası: ${company.verbisNo}.`
            : ' Şirketimiz, KVKK kapsamındaki istisna kriterleri sebebiyle VERBİS kaydına tabi değildir.'}
        </p>
      </Section>

      <Section n={2} title="Önemli ayrım: hangi veride kim sorumlu?">
        <p>
          MotoFull bir yazılım hizmetidir. Bu nedenle veriler iki farklı hukuki
          statüde işlenir ve bu ayrım haklarınızı kime karşı kullanacağınızı belirler:
        </p>
        <Table
          head={['Veri', 'Veri sorumlusu', 'MotoFull’ün rolü']}
          rows={[
            [
              <>Servis işletmesinin <strong>kendi müşterilerine</strong> ait veriler (ad, telefon, plaka, servis geçmişi)</>,
              <>İlgili <strong>servis işletmesi</strong></>,
              <>Veri işleyen. Veriyi yalnızca servisin talimatıyla, ona hizmet sunmak için işleriz; kendi amaçlarımız için kullanmayız.</>,
            ],
            [
              <>Servis işletmesinin <strong>hesap ve abonelik</strong> verileri</>,
              <>{company.brandName}</>,
              <>Veri sorumlusu</>,
            ],
            [
              <>Motosiklet sahibinin <strong>müşteri portalı hesabı</strong> ve sürüş verileri</>,
              <>{company.brandName}</>,
              <>Veri sorumlusu</>,
            ],
            [
              <>Web sitesi <strong>ziyaret verileri</strong></>,
              <>{company.brandName}</>,
              <>Veri sorumlusu</>,
            ],
          ]}
        />
        <p className="text-sm text-mist">
          Servise bıraktığınız motosikletle ilgili kaydınız hakkında talepte bulunmak
          istiyorsanız, öncelikle hizmet aldığınız servis işletmesine başvurmanız gerekir.
          Servis, talebinizi bize iletirse gerekli teknik desteği sağlarız.
        </p>
      </Section>

      <Section n={3} title="Hangi verileri işliyoruz?">
        <Table
          head={['Veri kategorisi', 'İçerik']}
          rows={[
            ['Kimlik', 'Ad, soyad, kullanıcı adı'],
            ['İletişim', 'Telefon numarası, e-posta adresi, adres, il/ilçe'],
            ['Araç', 'Marka, model, yıl, plaka, şasi numarası, kilometre'],
            ['Müşteri işlem', 'Servis kayıtları, iş emirleri, yapılan işlemler, tutarlar, fatura bilgileri'],
            ['İşlem güvenliği', 'Şifre özeti (geri döndürülemez), oturum bilgisi, giriş kayıtları'],
            ['Teknik/araç verisi', 'OBD arıza kodları, sensör okumaları'],
            [
              'Konum ve hareket',
              'Yalnızca müşteri portalında sürüş takibini kendiniz başlatırsanız: hız, mesafe, süre ve yatış açısı ÖZETİ. Rota noktaları saklanmaz.',
            ],
            ['Görsel', 'Servise ilettiğiniz belge veya hasar fotoğrafları'],
            ['Pazarlama/işlem', 'Demo ve iletişim talepleri'],
          ]}
        />
        <p>
          <strong>Özel nitelikli kişisel veri işlemiyoruz.</strong> Kimlik kartı okuma
          özelliği, taşıdığı risk sağladığı faydayla orantısız olduğu için üründen
          tamamen kaldırılmıştır.
        </p>
      </Section>

      <Section n={4} title="Hangi amaçlarla ve hangi hukuki sebeple?">
        <Table
          head={['Amaç', 'Hukuki sebep (KVKK m.5)']}
          rows={[
            ['Hizmetin sunulması, hesabınızın oluşturulması ve yönetilmesi', 'Sözleşmenin kurulması ve ifası'],
            ['Ücretlendirme, faturalama ve muhasebe kayıtları', 'Hukuki yükümlülük (VUK, TTK)'],
            ['Destek taleplerinin karşılanması', 'Meşru menfaat'],
            ['Sistem güvenliği, kötüye kullanım ve dolandırıcılığın önlenmesi', 'Meşru menfaat'],
            ['Yapay zekâ destekli arıza teşhisi ve belge okuma', 'Sözleşmenin ifası'],
            ['Sürüş takibi ve sürüş istatistikleri', 'Açık rıza — özelliği kendiniz başlatırsınız, istediğinizde durdurabilirsiniz'],
            ['Hizmetin geliştirilmesi ve anonim kullanım istatistikleri', 'Meşru menfaat'],
            ['Demo ve tanıtım taleplerinin yanıtlanması', 'Açık rıza'],
          ]}
        />
      </Section>

      <Section n={5} title="Kimlerle paylaşıyoruz?">
        <p>
          Kişisel verilerinizi <strong>satmıyoruz</strong> ve reklam amacıyla üçüncü
          taraflarla paylaşmıyoruz. Hizmeti sunabilmek için aşağıdaki tedarikçileri
          (alt işleyicileri) kullanıyoruz:
        </p>
        <Table
          head={['Tedarikçi', 'Hizmet', 'Veri nerede işleniyor']}
          rows={[
            ['Google (Gemini API)', 'Yapay zekâ teşhis, belge fotoğrafı okuma, sesli girişin metne dönüştürülmesi sonrası ayrıştırma', 'Yurt dışı'],
            ['MongoDB Atlas', 'Veritabanı', 'AB / yurt dışı'],
            ['Render', 'Uygulama sunucusu', 'Yurt dışı'],
            ['Vercel', 'Web arayüzü dağıtımı', 'Yurt dışı'],
          ]}
        />
        <p>
          Ayrıca yasal olarak zorunlu hallerde yetkili kamu kurum ve kuruluşlarıyla
          paylaşım yapılabilir.
        </p>
        <p className="text-sm text-mist">
          Güncel liste için:{' '}
          <a href="/alt-isleyiciler" className="text-accent hover:underline">
            alt işleyiciler sayfası
          </a>
          .
        </p>
      </Section>

      <Section n={6} title="Yurt dışına aktarım">
        <p>
          Yukarıdaki tedarikçilerin sunucuları yurt dışında bulunduğundan, verileriniz
          KVKK m.9 kapsamında yurt dışına aktarılmaktadır. Aktarım, hizmetin
          sunulabilmesi için zorunludur ve tedarikçilerle veri işleme sözleşmeleri
          (DPA) ile standart sözleşme hükümleri esas alınarak yapılır.
        </p>
        <p>
          <strong>Yapay zekâ özellikleri hakkında açıkça bilmenizi isteriz:</strong>{' '}
          Belge fotoğrafı okuma, arıza teşhisi ve asistan sohbeti özelliklerinde
          gönderdiğiniz içerik Google&apos;ın Gemini servisine iletilir. Fotoğraflar
          sunucularımızda saklanmaz; işlendikten sonra silinir. Bu özellikleri
          kullanmak zorunda değilsiniz — tüm bilgileri elle de girebilirsiniz.
        </p>
      </Section>

      <Section n={7} title="Ne kadar süre saklıyoruz?">
        <Table
          head={['Veri', 'Saklama süresi', 'Gerekçe']}
          rows={[
            ['Servis kayıtları ve faturalar', '10 yıl', 'TTK ve VUK saklama yükümlülüğü'],
            ['Hesap bilgileri', 'Hesap açık olduğu sürece + 6 ay', 'Yanlışlıkla silmeye karşı geri alma penceresi'],
            ['Yapay zekâ sohbet geçmişi', '1 yıl (otomatik silinir)', 'Sohbeti sürdürebilmek; süresiz saklamanın faydası yok'],
            ['Sürüş kayıtları', 'Siz silene veya hesabınızı kapatana kadar', 'Kendi istatistikleriniz'],
            ['Web sitesi ziyaret kayıtları', '180 gün (otomatik silinir)', 'Trafik analizi'],
            ['Belge fotoğrafları', 'Saklanmaz', 'Okunduktan sonra atılır'],
          ]}
        />
      </Section>

      <Section n={8} title="Haklarınız (KVKK m.11)">
        <p>Kişisel verileriniz hakkında şu haklara sahipsiniz:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Kişisel verinizin işlenip işlenmediğini öğrenme ve buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Şartları oluştuğunda silinmesini veya yok edilmesini isteme</li>
          <li>Düzeltme ve silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
          <li>Yalnızca otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç doğmasına itiraz etme</li>
          <li>Hukuka aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>
        <p>
          Taleplerinizi{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>{' '}
          adresine iletebilirsiniz. Başvurular en geç <strong>30 gün</strong> içinde
          sonuçlandırılır ve kural olarak ücretsizdir.
        </p>
        <p>
          Hesabınızı ve verilerinizi silmek için destek talebi açmanıza gerek yoktur;
          müşteri portalında <strong>Profilim → Hesabımı sil</strong> adımını
          kullanabilirsiniz.
        </p>
      </Section>

      <Section n={9} title="Veri güvenliği">
        <p>
          Verileriniz aktarım sırasında TLS ile şifrelenir. Şifreler geri
          döndürülemez biçimde (bcrypt) saklanır; düz metin şifreye erişimimiz yoktur.
          Her servis işletmesinin verisi sistem düzeyinde birbirinden yalıtılmıştır.
          Yetkisiz erişim girişimlerine karşı hız sınırlama ve oturum denetimleri
          uygulanır.
        </p>
      </Section>

      <Section n={10} title="Değişiklikler">
        <p>
          Bu metin, hizmetimizdeki veya mevzuattaki değişikliklere göre güncellenebilir.
          Esaslı bir değişiklik olduğunda panel üzerinden bilgilendirme yapılır.
        </p>
      </Section>
    </LegalPage>
  );
}
