import type { Metadata } from 'next';
import LegalPage, { Section } from '@/components/legal-layout';
import { PaymentTrust } from '@/components/payment-trust';
import { company, isFilled, formattedAddress } from '@/lib/company';

/**
 * English version of /hakkimizda. Same rule: unfilled company fields are
 * filtered out, never shown as placeholders.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/about', languages: { tr: '/hakkimizda' } },
  title: 'About Us',
  description: 'Who builds MotoFull, what problem it solves and how to reach us.',
};

export default function AboutEnPage() {
  const identity: { label: string; value: string }[] = [
    { label: 'Legal name', value: company.legalName },
    { label: 'Brand', value: company.brandName },
    { label: 'Trade registry no', value: company.tradeRegistryNo },
    { label: 'MERSIS no', value: company.mersisNo },
    { label: 'Tax office', value: company.taxOffice },
    { label: 'Tax ID', value: company.taxNo },
    { label: 'Address', value: formattedAddress() },
    { label: 'Phone', value: company.phone },
    { label: 'Email', value: company.email },
  ].filter((row) => isFilled(row.value));

  return (
    <LegalPage
      lang="en"
      altHref="/hakkimizda"
      title="About Us"
      subtitle="MotoFull is service management software built for motorcycle workshops."
    >
      <Section n={1} title="What we do">
        <p>
          MotoFull brings a motorcycle workshop&apos;s daily work into one place:
          customer and motorcycle records, service history, spare-parts
          inventory, work orders and appointments.
        </p>
        <p>
          The software runs in the browser; the workshop does not need its own
          server or to install a program. The live panel is at{' '}
          <a
            href={company.panelUrl}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.panelUrl.replace('https://', '')}
          </a>
          .
        </p>
      </Section>

      <Section n={2} title="Who we sell to">
        <p>
          Our customers are businesses that run motorcycle workshops. The product
          is sold to the business, not to end users; the subscription is opened
          in the business&apos;s name.
        </p>
        <p>
          Motorcycle owners do not subscribe to MotoFull — they only see their
          own vehicle&apos;s status through the tracking link the workshop sends
          them.
        </p>
      </Section>

      <Section n={3} title="Company details">
        {identity.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <tbody>
                {identity.map((row) => (
                  <tr key={row.label} className="border-b border-white/10 align-top last:border-b-0">
                    <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-white">
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
          For contractual information see the{' '}
          <a href="/distance-sales" className="text-accent hover:underline">
            Distance Sales Agreement
          </a>
          ,{' '}
          <a href="/refund-policy" className="text-accent hover:underline">
            Refunds and Withdrawal
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </a>{' '}
          pages.
        </p>
      </Section>

      <Section n={4} title="Contact">
        <p>
          All company communication runs by email:{' '}
          <a href={`mailto:${company.email}`} className="text-accent hover:underline">
            {company.email}
          </a>
          . We answer written questions in writing; feel free to ask anything
          before signing up.
        </p>
      </Section>

      <Section n={5} title="Payments and security">
        <p>
          Subscription payments are taken through <strong>iyzico</strong>, a
          licensed payment institution. Card details are entered on iyzico&apos;s
          payment form and never reach MotoFull&apos;s servers.
        </p>
        <p>All connections to the site and panel are encrypted over HTTPS.</p>
        <PaymentTrust lang="en" className="mt-2" />
      </Section>
    </LegalPage>
  );
}
