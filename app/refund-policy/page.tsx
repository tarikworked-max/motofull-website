import type { Metadata } from 'next';
import LegalPage, { Section } from '@/components/legal-layout';
import { company } from '@/lib/company';
import { TRIAL_DAYS } from '@/lib/pricing';

/** English version of /iade-ve-cayma. */
export const metadata: Metadata = {
  alternates: { canonical: '/refund-policy', languages: { tr: '/iade-ve-cayma' } },
  title: 'Refunds and Withdrawal',
  description: 'Refund terms, right of withdrawal and the refund process for MotoFull subscriptions.',
};

export default function RefundEnPage() {
  return (
    <LegalPage
      lang="en"
      altHref="/iade-ve-cayma"
      title="Refunds and Withdrawal"
      subtitle="Short version: within the first 14 days we refund you, no reason needed, even if you have used the service."
    >
      <Section n={1} title="14-day unconditional refund">
        <p>
          You can request a refund within <strong>14 days</strong> of purchase
          without giving a reason. Having used the service during this period
          does not remove your right to a refund.
        </p>
        <p>
          The law allows sellers to exclude the right of withdrawal for services
          performed instantly in electronic form (Distance Contracts Regulation,
          Art. 15/1-ğ). We do not rely on this exception — since we cannot expect
          you to decide without trying the product, refunds are unconditional.
        </p>
      </Section>

      <Section n={2} title="How to request">
        <p>
          All you need to do is write to{' '}
          <a href={`mailto:${company.supportEmail}`} className="text-accent hover:underline">
            {company.supportEmail}
          </a>{' '}
          from the email address linked to your account. No form or explanation
          is required.
        </p>
        <p>
          Your request is approved within <strong>2 business days</strong>, and
          the refund is made to the card you paid with within{' '}
          <strong>14 days at the latest</strong>. Your bank may take a further
          2–10 business days to show it on your card; this is under your
          bank&apos;s control.
        </p>
      </Section>

      <Section n={3} title="After 14 days">
        <p>
          After the 14-day period, paid periods are not refunded automatically.
          When you cancel your subscription you keep using the service{' '}
          <strong>until the end of the period you paid for</strong> and are not
          charged for the next period.
        </p>
        <p>
          For yearly subscriptions, if the service cannot be substantially
          provided for a reason on our side, the unused period is refunded pro
          rata.
        </p>
      </Section>

      <Section n={4} title="How do I cancel?">
        <p>
          You can cancel with one click from <strong>Account → My
          Subscription</strong> in the panel. You do not need to call or email
          us; we do not build flows that make cancelling harder.
        </p>
      </Section>

      <Section n={5} title="What happens to your data?">
        <p>
          After the subscription ends, your data is kept exportable for{' '}
          <strong>90 days</strong>. If you come back within that time, nothing is
          lost. After 90 days the data is permanently deleted.
        </p>
        <p>
          If you want your data deleted sooner, write to{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>
          . Invoice and accounting records subject to legal retention
          obligations are excluded.
        </p>
      </Section>

      <Section n={6} title="Free trial">
        <p>
          We do not ask for card details for the {TRIAL_DAYS}-day trial, so no
          charge is made at the end of the trial and no refund question arises.
        </p>
      </Section>
    </LegalPage>
  );
}
