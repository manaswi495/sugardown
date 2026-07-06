import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function CartPage() {
  const page = await loadLegacyPage("cart.html");
  return <LegacyPageView page={page} />;
}
