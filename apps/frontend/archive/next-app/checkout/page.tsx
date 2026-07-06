import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function CheckoutPage() {
  const page = await loadLegacyPage("checkout.html");
  return <LegacyPageView page={page} />;
}
