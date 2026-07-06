import { LegacyPageView, loadLegacyPage } from "./_lib/legacy-page";

export default async function HomePage() {
  const page = await loadLegacyPage("sugardown_website.html");
  return <LegacyPageView page={page} />;
}
