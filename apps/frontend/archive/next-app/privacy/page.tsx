import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function PrivacyPage() {
  const page = await loadLegacyPage("privacy.html");
  return <LegacyPageView page={page} />;
}
