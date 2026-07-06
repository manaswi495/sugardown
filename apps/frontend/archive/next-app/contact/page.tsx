import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function ContactPage() {
  const page = await loadLegacyPage("contact.html");
  return <LegacyPageView page={page} />;
}
