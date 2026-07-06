import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function AboutPage() {
  const page = await loadLegacyPage("about.html");
  return <LegacyPageView page={page} />;
}
