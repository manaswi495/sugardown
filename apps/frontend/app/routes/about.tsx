import type {MetaFunction} from 'react-router';
import sugarDownPagesStyles from '~/styles/sugar-down-pages.css?url';
import {SugarDownAbout} from '~/components/sugar-down/SugarDownAbout';

export const meta: MetaFunction = () => {
  return [{title: 'About Us — Sugar Down | LUCKY HEART'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownPagesStyles}];
}

export default function AboutRoute() {
  return <SugarDownAbout />;
}
