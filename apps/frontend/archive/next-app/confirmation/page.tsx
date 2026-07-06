import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function ConfirmationPage() {
  const page = await loadLegacyPage("confirmation.html");
  return <LegacyPageView page={page} />;
}
