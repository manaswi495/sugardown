import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';

import {SugarDownHome} from '~/components/sugar-down/SugarDownHome';
import {useRevealFadeUps} from '~/components/sugar-down/useRevealFadeUps';

import sugarDownHomeStyles from '~/styles/sugar-down-home.css?url';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Sugar Down — Ayurvedic Diabetes Care'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownHomeStyles}];
}

export async function loader() {
  return {
    isShopLinked: false,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const revealRef = useRevealFadeUps();
  return (
    <div className="home sd-index" ref={revealRef}>
      <SugarDownHome />
    </div>
  );
}
