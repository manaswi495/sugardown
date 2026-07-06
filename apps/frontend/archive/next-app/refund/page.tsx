import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function RefundPage() {
  const page = await loadLegacyPage("refund.html");
  return <LegacyPageView page={page} />;
}
