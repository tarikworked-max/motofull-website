import type { Metadata } from 'next';
import LegalPage, { Section } from '@/components/legal-layout';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: 'İade ve Cayma Hakkı',
  description:
    'MotoFull abonelikleri için iade koşulları, cayma hakkı ve para iadesi süreci.',
};

export default function RefundPage() {
  return (
    <LegalPage
      title="İade ve Cayma Hakkı"
      subtitle="Kısa versiyon: ilk 14 gün içinde, sebep belirtmeden, kullanmış olsanız bile paranızı iade ediyoruz."
    >
      <Section n={1} title="14 gün koşulsuz iade">
        <p>
          Satın almadan itibaren <strong>14 gün</strong> içinde gerekçe
          göstermeksizin iade talep edebilirsiniz. Hizmeti bu süre içinde
          kullanmış olmanız iade hakkınızı ortadan kaldırmaz.
        </p>
        <p>
          Mevzuat, elektronik ortamda anında ifa edilen hizmetlerde cayma
          hakkının kullanılamayacağını öngörür (Mesafeli Sözleşmeler Yönetmeliği
          m.15/1-ğ). Biz bu istisnaya dayanmıyoruz — ürünü denemeden karar
          vermenizi bekleyemeyeceğimiz için iadeyi koşulsuz uyguluyoruz.
        </p>
      </Section>

      <Section n={2} title="Nasıl talep edilir?">
        <p>
          Tek yapmanız gereken{' '}
          <a href={`mailto:${company.supportEmail}`} className="text-accent hover:underline">
            {company.supportEmail}
          </a>{' '}
          adresine hesabınızla ilişkili e-postadan yazmak. Form doldurmanız veya
          gerekçe açıklamanız gerekmez.
        </p>
        <p>
          Talebiniz <strong>2 iş günü</strong> içinde onaylanır, iade{' '}
          <strong>en geç 14 gün</strong> içinde ödemeyi yaptığınız karta yapılır.
          Bankanızın kartınıza yansıtma süresi ayrıca 2–10 iş günü sürebilir; bu
          süre bankanızın kontrolündedir.
        </p>
      </Section>

      <Section n={3} title="14 günden sonra">
        <p>
          14 günlük süre dolduktan sonra, ödenmiş dönem için otomatik iade
          yapılmaz. Aboneliğinizi iptal ettiğinizde{' '}
          <strong>ödediğiniz dönem sonuna kadar</strong> hizmeti kullanmaya devam
          edersiniz ve sonraki dönem için ücretlendirilmezsiniz.
        </p>
        <p>
          Yıllık abonelikte, hizmetin bizden kaynaklanan bir sebeple esaslı
          şekilde sunulamaması hâlinde kullanılmayan döneme ilişkin oransal iade
          yapılır.
        </p>
      </Section>

      <Section n={4} title="Aboneliği nasıl iptal ederim?">
        <p>
          Panelde <strong>Hesap → Aboneliğim</strong> ekranından tek tıkla iptal
          edebilirsiniz. Bizi aramanız veya e-posta yazmanız gerekmez; iptali
          zorlaştıran bir akış kurmuyoruz.
        </p>
      </Section>

      <Section n={5} title="Verilerinize ne olur?">
        <p>
          Abonelik sona erdikten sonra verileriniz <strong>90 gün</strong> boyunca
          dışa aktarılabilir durumda saklanır. Bu süre içinde geri dönerseniz
          hiçbir şey kaybolmaz. 90 gün sonunda veriler kalıcı olarak silinir.
        </p>
        <p>
          Verilerinizin daha erken silinmesini isterseniz{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>{' '}
          adresine yazabilirsiniz. Yasal saklama yükümlülüğüne tabi fatura ve
          muhasebe kayıtları bu istisnanın dışındadır.
        </p>
      </Section>

      <Section n={6} title="Ücretsiz deneme">
        <p>
          14 günlük deneme için kart bilgisi istemiyoruz; dolayısıyla deneme
          sonunda herhangi bir tahsilat yapılmaz ve iade konusu doğmaz.
        </p>
      </Section>
    </LegalPage>
  );
}
