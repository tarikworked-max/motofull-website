import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  alternates: { canonical: '/cerez-politikasi' },
  title: 'Çerez Politikası',
  description:
    'MotoFull hangi çerezleri ve tarayıcı depolamasını kullanıyor, neden kullanıyor ve nasıl kapatabilirsiniz.',
};

export default function CookiePage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      subtitle="Kısa versiyon: reklam ve takip çerezi kullanmıyoruz. Kullandığımız az sayıdaki teknoloji aşağıda tek tek açıklanmıştır."
    >
      <Section n={1} title="Reklam çerezi kullanmıyoruz">
        <p>
          MotoFull&apos;de üçüncü taraf reklam çerezi, sosyal medya piksel&apos;i veya
          davranışsal reklam takibi <strong>bulunmuyor</strong>. Google Analytics
          benzeri harici bir analitik aracı da kullanmıyoruz.
        </p>
        <p>
          Ziyaret istatistiklerini kendi sunucumuzda tutuyoruz ve bunu yaparken{' '}
          <strong>ham IP adresini saklamıyoruz</strong>: IP, günlük değişen bir
          değerle karıştırılıp geri döndürülemez bir özete çevriliyor. Böylece tekil
          ziyaretçi sayabiliyoruz ama kimseyi günler boyunca izleyemiyoruz.
        </p>
      </Section>

      <Section n={2} title="Kullandığımız depolama kalemleri">
        <Table
          head={['Ad', 'Tür', 'Amaç', 'Süre']}
          rows={[
            [
              <code key="a">motofull-auth</code>,
              'localStorage',
              'Panelde oturumunuzu açık tutar. Olmazsa her sayfada yeniden giriş yapmanız gerekir.',
              'Çıkış yapana kadar',
            ],
            [
              <code key="c">motofull-customer-auth</code>,
              'localStorage',
              'Müşteri portalı oturumu',
              'Çıkış yapana kadar',
            ],
            [
              <code key="l">motofull_lang</code>,
              'localStorage',
              'Seçtiğiniz arayüz dilini hatırlar',
              'Siz değiştirene kadar',
            ],
            [
              <code key="k">motofull_lean_calibration</code>,
              'localStorage',
              'Sürüş takibinde telefonunuzun montaj açısı kalibrasyonu — cihazınızdan çıkmaz',
              'Yeniden kalibre edene kadar',
            ],
            [
              <code key="s">mf-sid</code>,
              'sessionStorage',
              'Aynı ziyarette kaç sayfa görüntülendiğini sayar. Sekmeyi kapatınca silinir.',
              'Sekme kapanana kadar',
            ],
            [
              <code key="n">motofull_storage_notice</code>,
              'localStorage',
              'Sitenin altında çıkan depolama bildirimini kapattığınızı hatırlar; olmazsa bildirim her ziyarette yeniden çıkar.',
              'Siz temizleyene kadar',
            ],
          ]}
        />
        <p className="text-sm text-mist">
          Bunların tamamı <strong>çerez değil</strong>, tarayıcı depolamasıdır ve
          sunucuya kendiliğinden gönderilmez.
        </p>
      </Section>

      <Section n={3} title="Onay gerekiyor mu?">
        <p>
          Oturum ve dil tercihi kalemleri, talep ettiğiniz hizmetin çalışması için
          <strong> zorunludur</strong>; bunlar için ayrıca onay aranmaz.
        </p>
        <p>
          Ziyaret istatistiği için kullanılan <code>mf-sid</code> kalemi zorunlu
          olmadığından, tanıtım sitesinde bir bilgilendirme bandı gösterilir ve
          reddetmeniz hâlinde ziyaret ölçümü yapılmaz. Reddetmeniz sitenin
          çalışmasını etkilemez.
        </p>
      </Section>

      <Section n={4} title="Nasıl silerim?">
        <p>
          Tarayıcınızın ayarlarından site verilerini temizleyerek yukarıdaki tüm
          kalemleri silebilirsiniz. Oturum kalemlerini silerseniz yalnızca yeniden
          giriş yapmanız gerekir; veri kaybı olmaz.
        </p>
      </Section>

      <Section n={5} title="Sorularınız">
        <p>
          Bu politikayla ilgili sorularınız için{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>{' '}
          adresine yazabilirsiniz.
        </p>
      </Section>
    </LegalPage>
  );
}
