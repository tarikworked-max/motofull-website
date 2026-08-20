import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company, formattedAddress } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi',
  description:
    'MotoFull abonelik satışlarına ilişkin, 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında mesafeli satış sözleşmesi.',
};

export default function DistanceSalesPage() {
  return (
    <LegalPage
      title="Mesafeli Satış Sözleşmesi"
      subtitle="6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca düzenlenmiştir."
    >
      <Section n={1} title="Satıcı bilgileri">
        <Table
          head={['Alan', 'Bilgi']}
          rows={[
            ['Unvan', company.legalName],
            ['Adres', formattedAddress()],
            // Telefon satırı kaldırıldı: satıcı iletişimi e-posta
            // üzerinden yürüyor (bkz. lib/company.ts).
            ['E-posta', company.email],
            ['MERSİS No', company.mersisNo],
            ['Ticaret Sicil No', company.tradeRegistryNo],
            ['Vergi Dairesi / No', `${company.taxOffice} / ${company.taxNo}`],
          ]}
        />
        <p className="text-sm text-mist">
          Yurt dışı satışlarda kayıtlı satıcı (Merchant of Record) sıfatıyla
          Paddle.com Market Ltd. hareket eder; bu durumda faturanız Paddle
          tarafından düzenlenir ve ilgili ülke tüketici mevzuatı uygulanır.
        </p>
      </Section>

      <Section n={2} title="Alıcı bilgileri">
        <p>
          Alıcı, satın alma sırasında beyan ettiği ad, soyad/unvan, adres,
          telefon ve e-posta bilgilerinin doğru ve eksiksiz olduğunu kabul eder.
          Fatura, beyan edilen bilgilere göre düzenlenir.
        </p>
      </Section>

      <Section n={3} title="Sözleşmenin konusu">
        <p>
          Bu sözleşmenin konusu, Alıcı&apos;nın {company.websiteUrl} üzerinden
          elektronik ortamda sipariş verdiği, aşağıda nitelikleri ve satış
          bedeli belirtilen <strong>MotoFull yazılım aboneliğinin</strong>{' '}
          sunulmasıdır.
        </p>
        <p>
          Hizmet, dijital içerik ve bulut yazılım hizmeti niteliğindedir; fiziki
          teslimat yapılmaz.
        </p>
      </Section>

      <Section n={4} title="Hizmetin nitelikleri ve bedeli">
        <p>
          Seçtiğiniz paketin kapsamı, süresi (aylık veya yıllık) ve KDV dahil
          toplam bedeli, satın alma ekranında ödemeden <strong>önce</strong> açıkça
          gösterilir. Sipariş özeti ve fatura, ödeme sonrasında e-posta ile
          iletilir.
        </p>
        <p>
          Abonelik, seçilen dönem sonunda <strong>otomatik olarak yenilenir</strong>.
          Yenilemeyi dilediğiniz zaman panelden kapatabilirsiniz; kapattığınızda
          ödenmiş dönem sonuna kadar hizmet devam eder.
        </p>
      </Section>

      <Section n={5} title="Ödeme">
        <p>
          Ödeme, kredi/banka kartı ile yapılır. Kart bilgileri{' '}
          <strong>satıcının sunucularına hiçbir zaman ulaşmaz</strong>; işlem
          doğrudan lisanslı ödeme kuruluşu (Türkiye içi: iyzico, yurt dışı:
          Paddle) altyapısında gerçekleşir.
        </p>
      </Section>

      <Section n={6} title="İfa ve teslim">
        <p>
          Hizmet, ödemenin onaylanmasının ardından{' '}
          <strong>derhal (en geç 24 saat içinde)</strong> Alıcı&apos;nın hesabına
          tanımlanır. Ayrı bir teslimat süreci ve teslimat masrafı yoktur.
        </p>
      </Section>

      <Section n={7} title="Cayma hakkı">
        <p>
          Alıcı, sözleşmenin kurulmasından itibaren <strong>14 gün</strong> içinde
          herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir.
        </p>
        <p>
          <strong>Önemli istisna:</strong> Mesafeli Sözleşmeler Yönetmeliği
          m.15/1-ğ uyarınca, elektronik ortamda anında ifa edilen hizmetlerde
          cayma hakkı kullanılamaz. Ancak biz bu istisnayı{' '}
          <strong>uygulamamayı tercih ediyoruz</strong>: 14 gün içindeki iade
          talepleriniz, hizmeti kullanmış olsanız dahi karşılanır. Ayrıntı için{' '}
          <a href="/iade-ve-cayma" className="text-accent hover:underline">
            İade ve Cayma Hakkı
          </a>{' '}
          sayfasına bakınız.
        </p>
        <p>
          Cayma bildirimini{' '}
          <a href={`mailto:${company.supportEmail}`} className="text-accent hover:underline">
            {company.supportEmail}
          </a>{' '}
          adresine iletmeniz yeterlidir. İade, bildirimden itibaren{' '}
          <strong>14 gün</strong> içinde, ödemenin yapıldığı karta yapılır.
        </p>
      </Section>

      <Section n={8} title="Ücretsiz deneme">
        <p>
          14 günlük deneme süresi <strong>ücretsizdir ve kart bilgisi
          istenmez</strong>. Deneme sonunda otomatik ücretlendirme yapılmaz;
          devam etmek isterseniz ayrıca satın alma yaparsınız.
        </p>
      </Section>

      <Section n={9} title="Uyuşmazlık çözümü">
        <p>
          Alıcı, şikâyet ve itirazlarını, Ticaret Bakanlığı&apos;nca her yıl
          belirlenen parasal sınırlar dâhilinde, mal veya hizmeti satın aldığı
          ya da ikametgâhının bulunduğu yerdeki <strong>Tüketici Hakem
          Heyeti</strong>&apos;ne veya <strong>Tüketici Mahkemesi</strong>&apos;ne
          yapabilir.
        </p>
      </Section>

      <Section n={10} title="Yürürlük">
        <p>
          Alıcı, satın alma ekranındaki onay kutusunu işaretleyerek bu
          sözleşmenin tüm koşullarını okuduğunu, anladığını ve kabul ettiğini
          beyan eder. Sözleşme, siparişin onaylanmasıyla yürürlüğe girer ve bir
          kopyası e-posta ile Alıcı&apos;ya gönderilir.
        </p>
      </Section>
    </LegalPage>
  );
}
