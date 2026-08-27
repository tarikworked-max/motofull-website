import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company, formattedAddress } from '@/lib/company';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy',
  description:
    'How MotoFull collects, uses, shares and protects personal data, and the rights you have under the GDPR.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="This policy explains how we handle personal data under the EU General Data Protection Regulation (GDPR). Turkish users may also read our KVKK notice."
    >
      <Section n={1} title="Who we are">
        <p>
          <strong>{company.legalName}</strong> (&quot;{company.brandName}&quot;,
          &quot;we&quot;) is established at {formattedAddress()}. You can reach our
          privacy contact at{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>
          .
        </p>
        {company.euRepresentative ? (
          <p>
            Our representative in the EU under Art. 27 GDPR is{' '}
            <strong>{company.euRepresentative.name}</strong>,{' '}
            {company.euRepresentative.address} ({company.euRepresentative.email}).
          </p>
        ) : (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100/90">
            ⚠️ An EU representative under Art. 27 GDPR has not been appointed yet.
            One must be appointed before offering the service to customers in the
            EU. Set <code className="rounded bg-black/30 px-1">euRepresentative</code>{' '}
            in <code className="rounded bg-black/30 px-1">lib/company.ts</code>.
          </p>
        )}
      </Section>

      <Section n={2} title="Controller or processor?">
        <p>
          MotoFull is software sold to motorcycle repair shops. This creates two
          distinct roles, and it determines who you should contact about your data:
        </p>
        <Table
          head={['Data', 'Controller', 'Our role']}
          rows={[
            [
              'Data a repair shop holds about its own customers (name, phone, plate, service history)',
              'The repair shop',
              'Processor — we act only on the shop’s instructions',
            ],
            ['A shop’s own account and billing data', company.brandName, 'Controller'],
            ['Motorcycle owner portal accounts and ride data', company.brandName, 'Controller'],
            ['Website visit statistics', company.brandName, 'Controller'],
          ]}
        />
        <p className="text-sm text-mist">
          If a repair shop holds a service record about your motorcycle, please
          contact that shop first. We will support them in fulfilling your request.
        </p>
      </Section>

      <Section n={3} title="What we collect and why">
        <Table
          head={['Data', 'Purpose', 'Legal basis (Art. 6 GDPR)']}
          rows={[
            ['Name, email, phone, company details', 'Creating and running your account', 'Contract (6(1)(b))'],
            ['Billing and invoice data', 'Payment and statutory bookkeeping', 'Legal obligation (6(1)(c))'],
            ['Vehicle and service records', 'Delivering the core service', 'Contract (6(1)(b))'],
            ['Fault codes, complaint text, document photos', 'AI diagnosis and document reading', 'Contract (6(1)(b))'],
            ['Ride telemetry (speed, distance, lean angle summary)', 'Showing you your own riding statistics', 'Consent (6(1)(a)) — you start each ride yourself'],
            ['Login records, session data', 'Security and abuse prevention', 'Legitimate interests (6(1)(f))'],
            ['Aggregated visit statistics', 'Understanding and improving the product', 'Legitimate interests (6(1)(f))'],
          ]}
        />
        <p>
          We do <strong>not</strong> process special categories of data (Art. 9
          GDPR). Identity-document scanning was deliberately removed from the
          product because the risk it carried was disproportionate to its benefit.
        </p>
      </Section>

      <Section n={4} title="Who we share data with">
        <p>
          We do not sell personal data and we do not share it for advertising. We
          use the processors listed on our{' '}
          <a href="/alt-isleyiciler" className="text-accent hover:underline">
            subprocessors page
          </a>
          : Google (Gemini AI), MongoDB Atlas, Render, Vercel, and — for payments —
          iyzico and Paddle.
        </p>
      </Section>

      <Section n={5} title="International transfers">
        <p>
          Some processors are located outside the EEA, primarily in the United
          States. Such transfers rely on the European Commission&apos;s Standard
          Contractual Clauses and, where applicable, the EU–US Data Privacy
          Framework, together with supplementary technical measures such as
          encryption in transit.
        </p>
        <p>
          <strong>About AI features:</strong> content you submit to the AI
          diagnosis, document reading or assistant features is sent to Google&apos;s
          Gemini API. Uploaded photos are not stored on our servers. Using AI
          features is entirely optional — every field can be entered manually.
        </p>
      </Section>

      <Section n={6} title="How long we keep data">
        <Table
          head={['Data', 'Retention']}
          rows={[
            ['Service records and invoices', '10 years (statutory bookkeeping obligation)'],
            ['Account data', 'While the account is active, plus 6 months'],
            ['AI chat history', '1 year, deleted automatically'],
            ['Ride records', 'Until you delete them or close your account'],
            ['Website visit records', '180 days, deleted automatically'],
            ['Uploaded document photos', 'Not stored'],
          ]}
        />
      </Section>

      <Section n={7} title="Your rights">
        <p>Under the GDPR you have the right to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Access the personal data we hold about you (Art. 15)</li>
          <li>Have inaccurate data corrected (Art. 16)</li>
          <li>Have your data erased (Art. 17)</li>
          <li>Restrict processing (Art. 18)</li>
          <li>Receive your data in a portable format (Art. 20)</li>
          <li>Object to processing based on legitimate interests (Art. 21)</li>
          <li>Withdraw consent at any time, without affecting prior processing (Art. 7(3))</li>
        </ul>
        <p>
          You can delete your account and data yourself from{' '}
          <strong>Profile → Delete account</strong> in the customer portal. For
          anything else, write to{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>
          . We respond within <strong>one month</strong>.
        </p>
        <p>
          You also have the right to lodge a complaint with your local data
          protection supervisory authority.
        </p>
      </Section>

      <Section n={8} title="Security">
        <p>
          Data is encrypted in transit using TLS. Passwords are stored only as
          irreversible bcrypt hashes — we cannot read them. Each repair shop&apos;s
          data is isolated at the system level. Rate limiting and session controls
          guard against unauthorised access.
        </p>
        <p>
          In the event of a personal data breach that is likely to result in a risk
          to your rights, we will notify the competent supervisory authority within
          72 hours and inform affected users without undue delay.
        </p>
      </Section>

      <Section n={9} title="Children">
        <p>
          The service is intended for businesses and adult motorcycle owners. We do
          not knowingly collect data from children under 16.
        </p>
      </Section>

      <Section n={10} title="Changes">
        <p>
          We may update this policy. Material changes will be announced in the
          application before they take effect.
        </p>
      </Section>
    </LegalPage>
  );
}
