import type { Metadata } from 'next';
import LegalPage, { Section, Table } from '@/components/legal-layout';
import { company } from '@/lib/company';

/** English version of /cerez-politikasi — keep the storage table in sync with it. */
export const metadata: Metadata = {
  alternates: { canonical: '/cookie-policy', languages: { tr: '/cerez-politikasi' } },
  title: 'Cookie Policy',
  description:
    'Which cookies and browser storage MotoFull uses, why, and how to turn them off.',
};

export default function CookieEnPage() {
  return (
    <LegalPage
      lang="en"
      altHref="/cerez-politikasi"
      title="Cookie Policy"
      subtitle="Short version: we do not use advertising or tracking cookies. The few technologies we do use are explained one by one below."
    >
      <Section n={1} title="No advertising cookies">
        <p>
          MotoFull has <strong>no</strong> third-party advertising cookies, social
          media pixels or behavioural ad tracking. We also do not use external
          analytics tools such as Google Analytics.
        </p>
        <p>
          We keep visit statistics on our own server, and{' '}
          <strong>we do not store raw IP addresses</strong>: the IP is mixed with
          a value that changes daily and turned into an irreversible hash. This
          lets us count unique visitors without being able to follow anyone
          across days.
        </p>
      </Section>

      <Section n={2} title="Storage items we use">
        <Table
          head={['Name', 'Type', 'Purpose', 'Duration']}
          rows={[
            [
              <code key="a">motofull-auth</code>,
              'localStorage',
              'Keeps you signed in to the panel. Without it you would have to sign in on every page.',
              'Until you sign out',
            ],
            [
              <code key="c">motofull-customer-auth</code>,
              'localStorage',
              'Customer portal session',
              'Until you sign out',
            ],
            [
              <code key="l">motofull_lang</code>,
              'localStorage',
              'Remembers the interface language you chose',
              'Until you change it',
            ],
            [
              <code key="k">motofull_lean_calibration</code>,
              'localStorage',
              'Calibration of your phone’s mounting angle for ride tracking — never leaves your device',
              'Until you recalibrate',
            ],
            [
              <code key="s">mf-sid</code>,
              'sessionStorage',
              'Counts how many pages are viewed in the same visit. Deleted when you close the tab.',
              'Until the tab is closed',
            ],
            [
              <code key="n">motofull_storage_notice</code>,
              'localStorage',
              'Remembers that you dismissed the storage notice at the bottom of the site; otherwise it would appear on every visit.',
              'Until you clear it',
            ],
          ]}
        />
        <p className="text-sm text-mist">
          None of these are <strong>cookies</strong>; they are browser storage and
          are not sent to the server automatically.
        </p>
      </Section>

      <Section n={3} title="Is consent required?">
        <p>
          The session and language items are <strong>strictly necessary</strong>{' '}
          for the service you request to work, so no separate consent is asked
          for them.
        </p>
        <p>
          Because the <code>mf-sid</code> item used for visit statistics is not
          necessary, the marketing site shows a notice banner, and if you decline,
          no visit measurement takes place. Declining does not affect how the site
          works.
        </p>
      </Section>

      <Section n={4} title="How do I delete them?">
        <p>
          You can delete all of the items above by clearing site data in your
          browser settings. If you delete the session items you only need to sign
          in again; no data is lost.
        </p>
      </Section>

      <Section n={5} title="Questions">
        <p>
          For questions about this policy, write to{' '}
          <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
            {company.privacyEmail}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
