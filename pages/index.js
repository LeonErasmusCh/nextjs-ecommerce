import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layouts';

export default function Home() {
  return (
    <Layout>
      <h1>Products</h1>
      <ul>
        <li>product 1</li>
        <li>product 2</li>
        <li>product 3</li>
      </ul>
    </Layout>
  );
}
