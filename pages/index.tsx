import React from 'react';
import Dashboard from './dashboard';
import Head from 'next/head'

export default function Home(): React.FunctionComponentElement<{}> {
  return (
    <div className="inset-0 bg-gradient-to-r from-indigo-300 to-blue-900 shadow-lgsm:rounded-3xl scale-75">
      <Head><meta name="google-site-verification" content="pxFhH8IJ7Ra2Hpib1LtfYkbNPATpiUNeDrQk4KH4uSg" /></Head>
      <Dashboard />
    </div>
  );
}
