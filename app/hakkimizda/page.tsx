import type { Metadata } from 'next';
import LegalPage, { Section } from '@/components/legal-layout';
import { PaymentTrust } from '@/components/payment-trust';
import { company, isFilled, formattedAddress } from '@/lib/company';

/**
 * hakkimizda/page.tsx — KURUMSAL KIMLIK SAYFASI.
 *
 * NEDEN VAR: iyzico uye isyeri incelemesi, sitede Turkce bir
 * "Hakkimizda" sayfasi arar. Ana sayfadaki "Who is behind this"
 * bolumu Ingilizcedir ve ayri bir adresi yoktur; incelemecinin
 * bakacagi yer bir URL'dir.
 *
 * ── HICBIR SEY UYDURULMAZ ─────────────────────────────────────────
 *
 * Adres, MERSIS, ticaret sicil ve vergi bilgileri `lib/company.ts`
 * icinde HALA `TODO:` olarak duruyor. Bu sayfa onlari `isFilled()`
 * suzgecinden gecirir: doldurulmamis alan GOSTERILMEZ — ne "TODO"
 * olarak, ne de uydurma bir degerle.
 *
 * Bir sirket sayfasina hayali adres yazmak, iyzico incelemesinde
 * belgelerle karsilastirildiginda basvuruyu topyekun reddettirir;
 * eksik alan, yanlis alandan her zaman iyidir.
 *
 * Alanlar doldurulunca kimlik bloku KENDILIGINDEN gorunur; bu sayfaya
 * geri donup kod degistirmek gerekmez.
 */

export const metadata: Metadata = {
  alternates: { canonical: '/hakkimizda' },
  title: 'Hakkımızda',
  description:
    'MotoFull’u kimin geliştirdiği, hangi işi çözdüğü ve şirkete nasıl ulaşacağınız.',
};

export default function AboutPage() {
  /* Kurumsal kimlik satirlari — YALNIZCA doldurulmus olanlar. */
  const identity: { label: string; value: string }[] = [
    { label: 'Ticaret unvanı', value: company.legalName },
    { label: 'Marka', value: company.brandName },
    { label: 'Ticaret sicil no', value: company.tradeRegistryNo },
    { label: 'MERSİS no', value: company.mersisNo },
    { label: 'Vergi dairesi', value: company.taxOffice },
    { label: 'Vergi kimlik no', value: company.taxNo },
    { label: 'Adres', value: formattedAddress() },
    { label: 'E-posta', value: company.email },
  ].filter((row) => isFilled(row.value));

  return (
    <LegalPage
      title="Hakkımızda"
      subtitle="MotoFull, motosiklet servisleri için geliştirilen bir servis yönetim yazılımıdır."
    >
      <Section n={1} title="Ne yapıyoruz">
        <p>
          MotoFull, motosiklet servislerinin günlük işini tek yerde toplayan bir
          yönetim yazılımıdır: müşteri ve motosiklet kayıtları, servis geçmişi,
          yedek parça stoğu, iş emirleri ve randevular.
        </p>
        <p>
          Yazılım tarayıcı üzerinden çalışır; servisin kendi sunucusunu kurmasına
          ya da bilgisayarına program yüklemesine gerek yoktur. Çalışan panel{' '}
          <a
            href={company.panelUrl}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.panelUrl.replace('https://', '')}
          </a>{' '}
          adresindedir.
        </p>
      </Section>

      <Section n={2} title="Kime satıyoruz">
        <p>
          Müşterilerimiz motosiklet servisi işleten işletmelerdir. Ürün son
          kullanıcıya değil, işletmeye satılır; abonelik işletme adına açılır.
        </p>
        <p>
          Motosiklet sahipleri MotoFull’a abone olmaz — servisin kendilerine
          gönderdiği takip bağlantısı üzerinden yalnızca kendi araçlarının
          durumunu görürler.
        </p>
      </Section>

      <Section n={3} title="Kurumsal bilgiler">
        {identity.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <tbody>
                {identity.map((row) => (
                  <tr key={row.label} className="border-b border-white/10 align-top last:border-b-0">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 font-semibold text-white"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-frost/85">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <p>
          Sözleşmesel bilgiler için{' '}
          <a href="/mesafeli-satis" className="text-accent hover:underline">
            Mesafeli Satış Sözleşmesi
          </a>
          ,{' '}
          <a href="/iade-ve-cayma" className="text-accent hover:underline">
            İade ve Cayma Hakkı
          </a>{' '}
          ve{' '}
          <a href="/kvkk" className="text-accent hover:underline">
            KVKK Aydınlatma Metni
          </a>{' '}
          sayfalarına bakabilirsiniz.
        </p>
      </Section>

      <Section n={4} title="İletişim">
        <p>
          Tüm kurumsal iletişim e-posta üzerinden yürür:{' '}
          <a href={`mailto:${company.email}`} className="text-accent hover:underline">
            {company.email}
          </a>
          . Yazılı sorulara yazılı yanıt veriyoruz; sözleşme öncesi her soruyu
          sormakta serbestsiniz.
        </p>
      </Section>

      <Section n={5} title="Ödeme ve güvenlik">
        <p>
          Abonelik ödemeleri lisanslı ödeme kuruluşu <strong>iyzico</strong>{' '}
          altyapısı üzerinden alınır. Kart bilgileri iyzico’nun ödeme formunda
          girilir ve MotoFull sunucularına hiçbir zaman ulaşmaz.
        </p>
        <p>Site ve panele giden tüm bağlantılar HTTPS üzerinden şifrelenir.</p>
        {/* Turkce dil varyanti — ayni bilesen, gomulu metin yok. */}
        <PaymentTrust lang="tr" className="mt-2" />
      </Section>
    </LegalPage>
  );
}
