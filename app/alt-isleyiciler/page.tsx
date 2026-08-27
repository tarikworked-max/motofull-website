import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  alternates: { canonical: '/alt-isleyiciler' },
  title: 'Alt İşleyiciler',
  description:
    'MotoFull hizmetini sunarken kullandığımız tedarikçilerin (alt işleyicilerin) güncel listesi.',
};

export default function SubprocessorsPage() {
  return (
    <LegalPage
      title="Alt İşleyiciler"
      subtitle="Hizmeti sunabilmek için kullandığımız tedarikçilerin tam listesi. Bu liste değiştiğinde önceden bilgilendirme yaparız."
    >
      <Section n={1} title="Neden bu liste var?">
        <p>
          MotoFull&apos;ü kullanan servis işletmeleri, kendi müşteri verileri
          bakımından veri sorumlusudur; biz veri işleyeniz. KVKK ve GDPR, veri
          işleyenin kullandığı alt işleyicileri şeffaf biçimde bildirmesini
          gerektirir. Bu sayfa o listedir.
        </p>
      </Section>

      <Section n={2} title="Güncel liste">
        <Table
          head={['Tedarikçi', 'Ne için kullanılıyor', 'İşlenen veri', 'Konum']}
          rows={[
            [
              <strong key="g">Google LLC (Gemini API)</strong>,
              'Arıza teşhisi, belge fotoğrafı okuma, sesli girişten alan çıkarımı, müşteri asistanı sohbeti',
              'Yalnızca ilgili özellik için gönderilen içerik: arıza kodları, şikayet metni, belge fotoğrafı, sohbet mesajı',
              'ABD / küresel',
            ],
            [
              <strong key="m">MongoDB, Inc. (Atlas)</strong>,
              'Veritabanı barındırma',
              'Tüm uygulama verisi',
              'AB (Frankfurt) / yapılandırmaya göre',
            ],
            [
              <strong key="r">Render Services, Inc.</strong>,
              'Uygulama sunucusu barındırma',
              'İşlenmekte olan tüm veri (geçici)',
              'ABD',
            ],
            [
              <strong key="v">Vercel Inc.</strong>,
              'Web arayüzü ve tanıtım sitesi dağıtımı',
              'Statik dosyalar; sunucu tarafında kişisel veri saklanmaz',
              'Küresel CDN',
            ],
            [
              <strong key="i">iyzico (iyzi Ödeme Hizmetleri A.Ş.)</strong>,
              'Türkiye içi kart ile ödeme alma',
              'Ödeme bilgileri doğrudan iyzico tarafından işlenir; kart verisi sunucularımıza hiç ulaşmaz',
              'Türkiye',
            ],
            [
              <strong key="p">Paddle.com Market Ltd.</strong>,
              'Yurt dışı satış — kayıtlı satıcı (Merchant of Record) ve KDV yönetimi',
              'Fatura bilgileri, ödeme bilgileri; kart verisi sunucularımıza ulaşmaz',
              'Birleşik Krallık / AB',
            ],
          ]}
        />
      </Section>

      <Section n={3} title="Yapay zekâ tedarikçisi hakkında ek açıklama">
        <p>
          Yapay zekâ özelliklerinde gönderilen içerik Google&apos;ın Gemini
          servisine iletilir. Gönderdiğiniz fotoğraflar <strong>sunucularımızda
          saklanmaz</strong>; analiz sonucu döndükten sonra bellekten düşer.
        </p>
        <p>
          Yapay zekâ özelliklerini kullanmak <strong>zorunlu değildir</strong>.
          İş emri, müşteri ve araç bilgilerinin tamamı elle girilebilir; ürün
          bu özellikler olmadan da eksiksiz çalışır.
        </p>
      </Section>

      <Section n={4} title="Değişiklik bildirimi">
        <p>
          Listeye yeni bir tedarikçi eklendiğinde veya mevcut biri değiştiğinde,
          değişiklik yürürlüğe girmeden önce panel üzerinden bilgilendirme yaparız.
          İtiraz etmek isterseniz{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>{' '}
          adresine yazabilirsiniz.
        </p>
      </Section>
    </LegalPage>
  );
}
