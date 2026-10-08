import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company } from '@/lib/company';

/** English version of /alt-isleyiciler — keep the list in sync with it. */
export const metadata: Metadata = {
  alternates: { canonical: '/subprocessors', languages: { tr: '/alt-isleyiciler' } },
  title: 'Sub-processors',
  description: 'The current list of suppliers (sub-processors) we use to provide the MotoFull service.',
};

export default function SubprocessorsEnPage() {
  return (
    <LegalPage
      lang="en"
      altHref="/alt-isleyiciler"
      title="Sub-processors"
      subtitle="The full list of suppliers we use to provide the service. We give notice before this list changes."
    >
      <Section n={1} title="Why this list exists">
        <p>
          Workshops using MotoFull are the data controllers for their own
          customer data; we are their data processor. KVKK and the GDPR require a
          processor to disclose the sub-processors it uses. This page is that
          list.
        </p>
      </Section>

      <Section n={2} title="Current list">
        <Table
          head={['Supplier', 'Used for', 'Data processed', 'Location']}
          rows={[
            [
              <strong key="g">Google LLC (Gemini API)</strong>,
              'Fault diagnosis, reading document photos, extracting fields from voice input, customer assistant chat',
              'Only the content sent for the relevant feature: fault codes, complaint text, document photo, chat message',
              'USA / global',
            ],
            [
              <strong key="m">MongoDB, Inc. (Atlas)</strong>,
              'Database hosting',
              'All application data',
              'EU (Frankfurt) / depending on configuration',
            ],
            [
              <strong key="r">Render Services, Inc.</strong>,
              'Application server hosting',
              'All data being processed (transient)',
              'USA',
            ],
            [
              <strong key="v">Vercel Inc.</strong>,
              'Delivery of the web interface and marketing site',
              'Static files; no personal data is stored server-side',
              'Global CDN',
            ],
            [
              <strong key="i">iyzico (iyzi Ödeme Hizmetleri A.Ş.)</strong>,
              'Card payments',
              'Payment details are processed directly by iyzico; card data never reaches our servers',
              'Türkiye',
            ],
            [
              <strong key="b">Sendinblue SAS (Brevo)</strong>,
              'Email delivery: verification and password-reset codes, trial and account notifications',
              'Recipient email address, name and message content',
              'EU (France)',
            ],
            [
              <strong key="e">650 Industries, Inc. (Expo)</strong>,
              'Push notification delivery for the mobile app',
              'Device push token and notification text',
              'USA',
            ],
          ]}
        />
      </Section>

      <Section n={3} title="Additional note on the AI supplier">
        <p>
          Content sent through AI features is forwarded to Google&apos;s Gemini
          service. Photos you send are <strong>not stored on our servers</strong>;
          they are dropped from memory once the analysis result returns.
        </p>
        <p>
          Using AI features is <strong>optional</strong>. All work order,
          customer and vehicle details can be entered manually; the product works
          fully without these features.
        </p>
      </Section>

      <Section n={4} title="Change notice">
        <p>
          When a new supplier is added or an existing one changes, we notify you
          through the panel before the change takes effect. If you want to
          object, write to{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
