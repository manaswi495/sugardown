import type { Route } from './+types/policies.$handle';

export const meta: Route.MetaFunction = ({ params }) => {
  const titles: Record<string, string> = {
    'privacy': 'Privacy Policy',
    'terms': 'Terms & Conditions',
    'refund': 'Refund & Cancellation Policy',
    'shipping': 'Shipping & Delivery Policy'
  };
  return [{ title: `${titles[params.handle] || 'Policy'} — Sugar Down` }];
};

export default function PolicyPage({ params }: Route.ComponentProps) {
  const { handle } = params;

  const content: Record<string, { title: string, body: React.ReactNode }> = {
    'privacy': {
      title: 'Privacy Policy',
      body: (
        <>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Sugar Down ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Sugar Down.</p>
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, payment method, and other information you choose to provide.</p>
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect about you to: Provide, maintain, and improve our Services; Process and complete transactions; Send you related information, including purchase confirmations and invoices; Respond to your comments, questions, and requests.</p>
        </>
      )
    },
    'terms': {
      title: 'Terms & Conditions',
      body: (
        <>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Please read these Terms and Conditions carefully before using the Sugar Down website operated by us.</p>
          <h3>Conditions of Use</h3>
          <p>By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly.</p>
          <h3>Age Restriction</h3>
          <p>You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement.</p>
        </>
      )
    },
    'refund': {
      title: 'Refund & Cancellation Policy',
      body: (
        <>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h3>Returns</h3>
          <p>Our policy lasts 7 days. If 7 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.</p>
          <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
          <h3>Refunds</h3>
          <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.</p>
          <h3>Cancellations</h3>
          <p>Orders can only be cancelled before they are dispatched. Once shipped, the return policy will apply.</p>
        </>
      )
    },
    'shipping': {
      title: 'Shipping & Delivery Policy',
      body: (
        <>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h3>Processing Time</h3>
          <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
          <h3>Shipping Rates & Delivery Estimates</h3>
          <p>Shipping charges for your order will be calculated and displayed at checkout. Standard delivery typically takes 3-5 business days across India.</p>
          <h3>Order Tracking</h3>
          <p>You can track your order using the Track Order link in our website navigation menu by entering your phone number.</p>
        </>
      )
    }
  };

  const policy = content[handle];

  if (!policy) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <h1>Policy Not Found</h1>
        <p>The policy document you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '32px', color: '#1B4D2E' }}>{policy.title}</h1>
      <div className="policy-content" style={{ color: '#444' }}>
        {policy.body}
      </div>
    </div>
  );
}
