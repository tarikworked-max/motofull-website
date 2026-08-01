import type { Metadata } from 'next';
import LegalPage, { Section } from '@/components/legal-layout';
import { company, formattedAddress } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description:
    'MotoFull hizmetinin kullanım koşulları: hesap sorumluluğu, kabul edilebilir kullanım, hizmet seviyesi, veri sahipliği ve fesih.',
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Şartları"
      subtitle={`${company.brandName} hizmetini kullanarak bu şartları kabul etmiş olursunuz.`}
    >
      <Section n={1} title="Taraflar">
        <p>
          Bu sözleşme, {formattedAddress()} adresinde bulunan{' '}
          <strong>{company.legalName}</strong> (&quot;Hizmet Sağlayıcı&quot;) ile
          hizmete kaydolan gerçek veya tüzel kişi (&quot;Abone&quot;) arasındadır.
        </p>
      </Section>

      <Section n={2} title="Hizmetin tanımı">
        <p>
          MotoFull, motosiklet servis işletmelerine yönelik bulut tabanlı bir
          yönetim yazılımıdır. İş emri, müşteri ve araç kaydı, stok, raporlama ve
          yapay zekâ destekli teşhis gibi modüller içerir.
        </p>
        <p>
          Hizmet &quot;bulut&quot; olarak sunulur; Abone&apos;ye yazılımın kopyası
          teslim edilmez, kullanım hakkı tanınır.
        </p>
      </Section>

      <Section n={3} title="Hesap güvenliği">
        <p>
          Abone, hesap bilgilerinin gizliliğinden ve hesabı altında yapılan tüm
          işlemlerden sorumludur. Yetkisiz bir erişim fark ettiğinizde derhal{' '}
          <a href={`mailto:${company.supportEmail}`} className="text-accent hover:underline">
            {company.supportEmail}
          </a>{' '}
          adresine bildirmelisiniz.
        </p>
      </Section>

      <Section n={4} title="Verinin sahipliği">
        <p>
          <strong>Abone&apos;nin sisteme girdiği tüm veri Abone&apos;ye aittir.</strong>{' '}
          Hizmet Sağlayıcı bu veriyi yalnızca hizmeti sunmak, desteklemek ve yasal
          yükümlülüklerini yerine getirmek için işler; kendi ticari amaçları için
          kullanmaz, üçüncü taraflara satmaz.
        </p>
        <p>
          Abone, verisini dilediği zaman dışa aktarabilir. Abonelik sona erdiğinde
          veri <strong>90 gün</strong> boyunca dışa aktarılabilir durumda tutulur,
          ardından kalıcı olarak silinir. Yasal saklama yükümlülüğüne tabi kayıtlar
          (fatura, muhasebe) ilgili süre boyunca saklanır.
        </p>
      </Section>

      <Section n={5} title="Kabul edilebilir kullanım">
        <p>Abone, hizmeti kullanırken şunları yapmamayı kabul eder:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Hukuka aykırı amaçlarla kullanmak veya üçüncü kişilerin haklarını ihlal etmek</li>
          <li>Sisteme yetkisiz erişim denemek, güvenlik önlemlerini aşmaya çalışmak</li>
          <li>Otomatik araçlarla aşırı yük oluşturmak veya hizmeti kesintiye uğratmak</li>
          <li>Yazılımı tersine mühendislikle çözümlemek veya kopyalamak</li>
          <li>Hesabını yetkisiz üçüncü kişilerle paylaşmak veya yeniden satmak</li>
          <li>Rızası olmayan kişilere ait kişisel veri yüklemek</li>
        </ul>
      </Section>

      <Section n={6} title="Yapay zekâ özellikleri hakkında uyarı">
        <p>
          Yapay zekâ destekli teşhis, belge okuma ve asistan çıktıları{' '}
          <strong>tavsiye niteliğindedir ve hatalı olabilir</strong>. Bu çıktılar
          uzman teknisyen değerlendirmesinin yerine geçmez.
        </p>
        <p>
          Özellikle fren, direksiyon, süspansiyon, şasi ve motor içi işlemlerde
          nihai karar ve sorumluluk daima Abone&apos;nin yetkili teknisyenine
          aittir. Hizmet Sağlayıcı, yapay zekâ çıktısına dayanılarak yapılan
          işlemlerden doğan zararlardan sorumlu tutulamaz.
        </p>
      </Section>

      <Section n={7} title="Hizmet sürekliliği">
        <p>
          Hizmetin kesintisiz sunulması için makul çaba gösterilir. Planlı bakımlar
          önceden duyurulur. Hizmet Sağlayıcı&apos;nın kontrolü dışındaki altyapı
          sağlayıcısı arızaları, siber saldırı ve mücbir sebep hâllerinde
          sorumluluk doğmaz.
        </p>
      </Section>

      <Section n={8} title="Ücretlendirme">
        <p>
          Ücretler ve paket kapsamları fiyatlandırma sayfasında yayımlanır.
          Ücretlerde değişiklik yapılması hâlinde Abone en az <strong>30 gün</strong>{' '}
          önceden bilgilendirilir; değişiklik, Abone&apos;nin mevcut ödenmiş dönemi
          bittikten sonra yürürlüğe girer.
        </p>
        <p>
          Satın alma, iade ve cayma hakkına ilişkin ayrıntılar{' '}
          <a href="/mesafeli-satis" className="text-accent hover:underline">
            Mesafeli Satış Sözleşmesi
          </a>{' '}
          ve{' '}
          <a href="/iade-ve-cayma" className="text-accent hover:underline">
            İade ve Cayma Hakkı
          </a>{' '}
          sayfalarında düzenlenmiştir.
        </p>
      </Section>

      <Section n={9} title="Fesih">
        <p>
          Abone aboneliğini dilediği zaman panelden sonlandırabilir; ödenmiş dönem
          sonuna kadar hizmet devam eder. Hizmet Sağlayıcı, bu şartların esaslı
          ihlali hâlinde makul bildirimle hesabı askıya alabilir veya kapatabilir.
        </p>
      </Section>

      <Section n={10} title="Sorumluluğun sınırı">
        <p>
          Hizmet Sağlayıcı&apos;nın toplam sorumluluğu, talebin doğduğu tarihten
          önceki <strong>12 ayda</strong> Abone tarafından ödenen toplam bedelle
          sınırlıdır. Dolaylı zararlardan, kâr kaybından ve veri kaybından doğan
          taleplerden sorumluluk kabul edilmez. Bu sınırlama, ağır kusur ve kasıt
          hâllerinde uygulanmaz.
        </p>
      </Section>

      <Section n={11} title="Uygulanacak hukuk ve yetki">
        <p>
          Bu sözleşmeye Türk hukuku uygulanır. Uyuşmazlıklarda{' '}
          {company.address.city} mahkemeleri ve icra daireleri yetkilidir. Tüketici
          sıfatını haiz Abone&apos;ler bakımından, tüketici hakem heyetleri ve
          tüketici mahkemelerinin yetkisi saklıdır.
        </p>
      </Section>
    </LegalPage>
  );
}
