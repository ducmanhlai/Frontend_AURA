import Image from "next/image";
import React from 'react';
import { Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Layout from 'antd/es/layout/layout';
export default function Home() {
  return <main style={{ height: '100vh', margin: 0, padding: 0 }}>
    <Layout>
        <Header></Header>
        <Sider></Sider>
      </Layout>
    </main>
}




