import { LegacyPageView, loadLegacyPage } from "../_lib/legacy-page";

export default async function TrackPage() {
  const page = await loadLegacyPage("track.html");
  return <LegacyPageView page={page} />;
}
