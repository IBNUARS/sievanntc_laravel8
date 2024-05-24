import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink } from '@inertiajs/inertia-react';

import Layout from './../../Shared/Layout';

export default () => {
  return (
    <Layout>
      <Helmet title="Impor Peserta" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <div style={{padding: "0 30px 30px 30px"}}>
                <InertiaLink href={route('admin.peserta.index')} className="au-btn au-btn-icon btn-primary au-btn--small mr-1">
                    <i className="fas fa-arrow-left"></i> Kembali
                </InertiaLink>
                <br/><br/>

                <iframe width="100%" height="420" src={route('admin.peserta.kartupdf')} style={{border: 0}}></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};
