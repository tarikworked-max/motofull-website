import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company, formattedAddress, isFilled } from '@/lib/company';
import { TRIAL_DAYS } from '@/lib/pricing';

/** English version of /mesafeli-satis. The Turkish text is the binding one for consumers in Türkiye. */
export const metadata: Metadata = {
  alternates: { canonical: '/distance-sales', languages: { tr: '/mesafeli-satis' } },
  title: 'Distance Sales Agreement',
  description:
    'Distance sales agreement for MotoFull subscriptions, prepared under Turkish Consumer Protection Law No. 6502.',
};

export default function DistanceSalesEnPage() {
  return (
    <LegalPage
      lang="en"
      altHref="/mesafeli-satis"
      title="Distance Sales Agreement"
      subtitle="Prepared under Turkish Consumer Protection Law No. 6502 and the Distance Contracts Regulation. This is a translation; for consumers in Türkiye the Turkish version prevails."
    >
      <Section n={1} title="Seller">
        <Table
          head={['Field', 'Details']}
          rows={[
            ['Name', company.legalName],
            ['Address', formattedAddress()],
            ['Phone', company.phone],
            ['Email', company.email],
            ['MERSIS No', company.mersisNo],
            ['Trade Registry No', company.tradeRegistryNo],
            ['Tax Office / No', `${company.taxOffice} / ${company.taxNo}`],
          ].filter(([, v]) => isFilled(v))}
        />
        <p className="text-sm text-mist">
          The seller for all domestic and international sales is{' '}
          {company.legalName}, whose details are given above. Payments are
          collected through iyzico, a licensed payment institution.
        </p>
      </Section>

      <Section n={2} title="Buyer">
        <p>
          The Buyer confirms that the name, surname/company name, address, phone
          and email details declared at purchase are accurate and complete. The
          invoice is issued based on these details.
        </p>
      </Section>

      <Section n={3} title="Subject of the agreement">
        <p>
          This agreement covers the provision of the <strong>MotoFull software
          subscription</strong> ordered electronically by the Buyer via{' '}
          {company.websiteUrl}, with the features and price stated below.
        </p>
        <p>
          The service is digital content and a cloud software service; there is
          no physical delivery.
        </p>
      </Section>

      <Section n={4} title="Service features and price">
        <p>
          The scope and term (monthly or yearly) of the chosen plan and the total
          price including VAT are shown clearly on the checkout screen{' '}
          <strong>before</strong> payment. The order summary and invoice are sent
          by email after payment.
        </p>
        <p>
          The subscription <strong>renews automatically</strong> at the end of
          each period. You can turn off renewal from the panel at any time; the
          service continues until the end of the paid period.
        </p>
      </Section>

      <Section n={5} title="Payment">
        <p>
          Payment is made by credit or debit card. Card details{' '}
          <strong>never reach the seller&apos;s servers</strong>; the transaction
          takes place directly on the infrastructure of iyzico, a licensed
          payment institution.
        </p>
      </Section>

      <Section n={6} title="Performance and delivery">
        <p>
          The service is activated on the Buyer&apos;s account{' '}
          <strong>immediately (within 24 hours at the latest)</strong> after the
          payment is confirmed. There is no separate delivery process or
          delivery cost.
        </p>
      </Section>

      <Section n={7} title="Right of withdrawal">
        <p>
          The Buyer may withdraw from the agreement within <strong>14 days</strong>{' '}
          of its conclusion without giving any reason.
        </p>
        <p>
          <strong>Important exception:</strong> under Article 15/1-ğ of the
          Distance Contracts Regulation, the right of withdrawal does not apply
          to services performed instantly in electronic form. However, we{' '}
          <strong>choose not to apply this exception</strong>: refund requests
          within 14 days are honoured even if you have used the service. See the{' '}
          <a href="/refund-policy" className="text-accent hover:underline">
            Refunds and Withdrawal
          </a>{' '}
          page for details.
        </p>
        <p>
          It is enough to send your withdrawal notice to{' '}
          <a href={`mailto:${company.supportEmail}`} className="text-accent hover:underline">
            {company.supportEmail}
          </a>
          . The refund is made to the card used for payment within{' '}
          <strong>14 days</strong> of the notice.
        </p>
      </Section>

      <Section n={8} title="Free trial">
        <p>
          The {TRIAL_DAYS}-day trial is <strong>free and requires no card
          details</strong>. There is no automatic charge at the end of the trial;
          if you want to continue, you make a separate purchase.
        </p>
      </Section>

      <Section n={9} title="Dispute resolution">
        <p>
          The Buyer may submit complaints and objections, within the monetary
          limits set each year by the Turkish Ministry of Trade, to the{' '}
          <strong>Consumer Arbitration Committee</strong> or the{' '}
          <strong>Consumer Court</strong> where the service was purchased or
          where the Buyer resides.
        </p>
      </Section>

      <Section n={10} title="Entry into force">
        <p>
          By ticking the confirmation box on the checkout screen, the Buyer
          declares that they have read, understood and accepted all terms of this
          agreement. The agreement enters into force when the order is confirmed,
          and a copy is sent to the Buyer by email.
        </p>
      </Section>
    </LegalPage>
  );
}
