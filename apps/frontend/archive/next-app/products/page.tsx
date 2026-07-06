import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function ProductsPage() {
  const page = await loadLegacyPage("products.html");
  return <LegacyPageView page={page} />;
}
