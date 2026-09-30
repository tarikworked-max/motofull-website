import type { Metadata } from 'next';
import LegalPage, { Section } from '@/components/legal-layout';
import { company, formattedAddress } from '@/lib/company';

/** English version of /kullanim-sartlari. */
export const metadata: Metadata = {
  alternates: { canonical: '/terms', languages: { tr: '/kullanim-sartlari' } },
  title: 'Terms of Use',
  description:
    'Terms of use for MotoFull: account responsibility, acceptable use, service continuity, data ownership and termination.',
};

export default function TermsEnPage() {
  return (
    <LegalPage
      lang="en"
      altHref="/kullanim-sartlari"
      title="Terms of Use"
      subtitle={`By using ${company.brandName} you accept these terms.`}
    >
      <Section n={1} title="Parties">
        <p>
          This agreement is between <strong>{company.legalName}</strong>{' '}
          (&quot;Provider&quot;), located at {formattedAddress()}, and the
          individual or legal entity that signs up for the service
          (&quot;Subscriber&quot;).
        </p>
      </Section>

      <Section n={2} title="The service">
        <p>
          MotoFull is cloud-based management software for motorcycle service
          workshops. It includes modules such as work orders, customer and
          vehicle records, inventory, reporting and AI-assisted diagnostics.
        </p>
        <p>
          The service is provided in the cloud; no copy of the software is
          delivered to the Subscriber, only a right of use is granted.
        </p>
      </Section>

      <Section n={3} title="Account security">
        <p>
          The Subscriber is responsible for keeping account credentials
          confidential and for all actions taken under the account. If you
          notice unauthorised access, report it immediately to{' '}
          <a href={`mailto:${company.supportEmail}`} className="text-accent hover:underline">
            {company.supportEmail}
          </a>
          .
        </p>
      </Section>

      <Section n={4} title="Data ownership">
        <p>
          <strong>All data the Subscriber enters belongs to the Subscriber.</strong>{' '}
          The Provider processes this data only to provide and support the
          service and to meet legal obligations; it does not use it for its own
          commercial purposes or sell it to third parties.
        </p>
        <p>
          The Subscriber can export their data at any time. When the
          subscription ends, data is kept exportable for <strong>90 days</strong>{' '}
          and then permanently deleted. Records subject to legal retention
          (invoices, accounting) are kept for the required period.
        </p>
      </Section>

      <Section n={5} title="Acceptable use">
        <p>When using the service, the Subscriber agrees not to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>use it for unlawful purposes or infringe the rights of third parties</li>
          <li>attempt unauthorised access or try to bypass security measures</li>
          <li>create excessive load with automated tools or disrupt the service</li>
          <li>reverse engineer or copy the software</li>
          <li>share the account with unauthorised third parties or resell it</li>
          <li>upload personal data of people who have not consented</li>
        </ul>
      </Section>

      <Section n={6} title="Notice on AI features">
        <p>
          AI-assisted diagnostics, document reading and assistant outputs are{' '}
          <strong>advisory and may be wrong</strong>. They do not replace the
          judgement of a qualified technician.
        </p>
        <p>
          Especially for brakes, steering, suspension, frame and internal engine
          work, the final decision and responsibility always rest with the
          Subscriber&apos;s authorised technician. The Provider is not liable for
          damage arising from actions taken based on AI output.
        </p>
      </Section>

      <Section n={7} title="Service continuity">
        <p>
          Reasonable efforts are made to provide the service without
          interruption. Planned maintenance is announced in advance. No liability
          arises from failures of infrastructure providers outside the
          Provider&apos;s control, cyber attacks or force majeure.
        </p>
      </Section>

      <Section n={8} title="Pricing">
        <p>
          Prices and plan scopes are published on the pricing page. If prices
          change, the Subscriber is notified at least <strong>30 days</strong> in
          advance; the change takes effect after the Subscriber&apos;s current
          paid period ends.
        </p>
        <p>
          Details on purchase, refunds and withdrawal are set out in the{' '}
          <a href="/distance-sales" className="text-accent hover:underline">
            Distance Sales Agreement
          </a>{' '}
          and{' '}
          <a href="/refund-policy" className="text-accent hover:underline">
            Refunds and Withdrawal
          </a>{' '}
          pages.
        </p>
      </Section>

      <Section n={9} title="Termination">
        <p>
          The Subscriber may end the subscription at any time from the panel; the
          service continues until the end of the paid period. The Provider may
          suspend or close the account with reasonable notice in case of a
          material breach of these terms.
        </p>
      </Section>

      <Section n={10} title="Limitation of liability">
        <p>
          The Provider&apos;s total liability is limited to the total amount paid
          by the Subscriber in the <strong>12 months</strong> before the claim
          arose. No liability is accepted for indirect damage, loss of profit or
          loss of data. This limitation does not apply in cases of gross
          negligence or intent.
        </p>
      </Section>

      <Section n={11} title="Governing law and jurisdiction">
        <p>
          This agreement is governed by Turkish law. The courts and enforcement
          offices of {company.address.city} have jurisdiction over disputes. For
          Subscribers who are consumers, the jurisdiction of consumer arbitration
          committees and consumer courts is reserved.
        </p>
      </Section>
    </LegalPage>
  );
}
