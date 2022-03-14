import React, { Fragment, lazy, Suspense, memo } from 'react'
import Layout from '@/components/Layout';
import "@/styles/page/Dashboard/index.less";

import QueryFreightForm from './module/QueryFreightForm'

function Home() {
  return (
    <Layout title="查询运费">
      <QueryFreightForm />
    </Layout>
  );
}

export default memo(Home);
