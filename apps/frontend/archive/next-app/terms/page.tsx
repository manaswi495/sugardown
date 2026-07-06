import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function TermsPage() {
  const page = await loadLegacyPage("terms.html");
  return <LegacyPageView page={page} />;
}
