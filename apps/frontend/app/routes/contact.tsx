import type {MetaFunction} from 'react-router';
import sugarDownPagesStyles from '~/styles/sugar-down-pages.css?url';
import {SugarDownContact} from '~/components/sugar-down/SugarDownContact';

export const meta: MetaFunction = () => {
  return [{title: 'Contact Us — Sugar Down'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownPagesStyles}];
}

export default function ContactRoute() {
  return <SugarDownContact />;
}
