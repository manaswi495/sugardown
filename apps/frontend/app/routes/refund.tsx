import {Link} from 'react-router';
import type {MetaFunction} from 'react-router';
import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL_HREF,
  SUPPORT_WHATSAPP_URL,
} from '~/lib/contact';
import sugarDownPagesStyles from '~/styles/sugar-down-pages.css?url';

export const meta: MetaFunction = () => [
  {title: 'Refund & Cancellation — Sugar Down | LUCKY HEART'},
];

export function links() {
  return [{rel: 'stylesheet', href: sugarDownPagesStyles}];
}

export default function RefundRoute() {
  return (
    <div className="sdp-legal-page">
      <header className="sdp-legal-hero">
        <h1>Refund &amp; Cancellation</h1>
      </header>
      <div className="sdp-legal-content sdp-policy-inner">
        <Link className="sdp-pol-back" to="/">
          ← Back to Home
        </Link>
        <div className="sdp-pol-body">
          <p>
            We want you to be satisfied with your Sugar Down order. This policy
            explains how returns, replacements, and refunds work.
          </p>

          <h2>Cancellations</h2>
          <p>
            If you need to cancel an order, contact us as soon as possible via
            WhatsApp or email. Once an order has shipped, cancellation may not
            be possible; the return process below may apply instead.
          </p>

          <h2>Returns &amp; replacements</h2>
          <p>
            If you receive a damaged, defective, or incorrect item, please
            contact us within 48 hours of delivery with photos and your order
            details. We will arrange a replacement where possible.
          </p>
          <p>
            Refunds are processed only if a replacement is not possible for a
            valid return. Once approved, the refund will be credited to your
            original payment method within 7–10 working days, subject to your
            bank or payment provider.
          </p>

          <h2>Non-returnable items</h2>
          <p>
            For health and safety reasons, items that have been opened, used,
            or have broken seals are not eligible for return or refund unless
            they arrived damaged or incorrect.
          </p>

          <h2>How to request help</h2>
          <p>
            Reach us at{' '}
            <a href="mailto:luckyheartayurveda@gmail.com">
              luckyheartayurveda@gmail.com
            </a>
            , call{' '}
            <a href={SUPPORT_PHONE_TEL_HREF}>{SUPPORT_PHONE_DISPLAY}</a>, or
            message us on{' '}
            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            . Please include your order ID and a short description of the issue.
          </p>
        </div>
      </div>
    </div>
  );
}
