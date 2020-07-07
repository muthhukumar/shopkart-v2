import Head from "next/head";
import Layout from "../components/Layout";

export default function ({ data }) {
  return (
    <Layout disable={false}>
      <Head>
        <title>Favourites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="????">favourite</div>
      </main>
    </Layout>
  );
}
