import {Link} from 'react-router';
import type {MetaFunction} from 'react-router';
import sugarDownPagesStyles from '~/styles/sugar-down-pages.css?url';

export const meta: MetaFunction = () => [
  {title: 'Terms & Conditions — Sugar Down | LUCKY HEART'},
];

export function links() {
  return [{rel: 'stylesheet', href: sugarDownPagesStyles}];
}

export default function TermsRoute() {
  return (
    <div className="sdp-legal-page">
      <header className="sdp-legal-hero">
        <h1>Terms &amp; Conditions</h1>
      </header>
      <div className="sdp-legal-content sdp-policy-inner">
        <Link className="sdp-pol-back" to="/">
          ← Back to Home
        </Link>
        <div className="sdp-pol-body">
          <p>
            Welcome to Sugar Down. By accessing or using our website and
            services, you agree to comply with and be bound by the following
            terms and conditions. Please read them carefully.
          </p>

          <h2>Use of this website</h2>
          <p>
            You agree to use this site only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use
            of the site. We may update these terms from time to time; continued
            use after changes constitutes acceptance.
          </p>

          <h2>Products &amp; health information</h2>
          <p>
            Sugar Down provides Ayurvedic wellness products focused on diabetes
            care. Product information is for general wellness and educational
            purposes and is not a substitute for professional medical advice,
            diagnosis, or treatment. Always consult your physician or qualified
            health provider before starting any new supplement or changing your
            treatment plan.
          </p>

          <h2>Orders &amp; pricing</h2>
          <p>
            Product descriptions, prices, and availability are subject to
            change without notice. We reserve the right to refuse or cancel
            orders where necessary, including for pricing errors or suspected
            fraud.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, LUCKY HEART / Sugar Down
            and its team shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the site or products.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising
            shall be subject to the exclusive jurisdiction of the courts in
            Meerut, Uttar Pradesh.
          </p>

          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:luckyheartayurveda@gmail.com">
              luckyheartayurveda@gmail.com
            </a>{' '}
            or via the details on our{' '}
            <Link to="/contact">Contact</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
}
