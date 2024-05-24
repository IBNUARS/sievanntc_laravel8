import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { InertiaLink } from '@inertiajs/inertia-react';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';
import Dialog from './../../Shared/Dialog';

export default (props) => {
    const soal = props.soal;
    console.log(soal);
    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'Soal', field: 'soal', width: 500 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    soal.map( (so, index) => {
      let pilihan = [
        {no: 1, teks: so.pilihan_1},
        {no: 2, teks: so.pilihan_2},
        {no: 3, teks: so.pilihan_3},
        {no: 4, teks: so.pilihan_4},
        {no: 5, teks: so.pilihan_5},
      ];

      data.rows.push(
        { 
          no: index+1,
          soal: (
            <div>
              <div dangerouslySetInnerHTML={{__html: so.soal}}></div>
              <ol type="A" style={{marginLeft: 20}}>
                  {pilihan.map((pil) => {
                    if(so.kunci==pil.no && so.jawaban==pil.no) {
                      return (<li key={pil.no} style={{color: 'green', fontWeight:'bold'}} 
                        dangerouslySetInnerHTML={{__html: pil.teks}}></li>);
                    }else if(so.kunci==pil.no) {
                      return (<li key={pil.no} style={{color: 'blue', fontWeight:'bold'}} 
                            dangerouslySetInnerHTML={{__html: pil.teks}}></li>);
                    }else if(so.jawaban==pil.no) {
                      return (<li key={pil.no} style={{color: 'red', fontWeight:'bold'}} 
                          dangerouslySetInnerHTML={{__html: pil.teks}}></li>);              
                    }else{
                      return (<li key={pil.no} dangerouslySetInnerHTML={{__html: pil.teks}}></li>)
                    }
                  })}
              </ol>
            </div>
          ),
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Soal" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <div  style={{padding: "0 30px 30px 30px"}}>

              {/*tombol dan select di atas tabel */}
              <div className="table-data__tool"> 
                {/* tombol kembali */}
                <div className="table-data__tool-right">                
                    <InertiaLink href={route('admin.nilai.show', props.ujianaktif)} className="au-btn au-btn-icon btn-primary au-btn--small mr-1">
                        <i className="fas fa-arrow-left"></i> Kembali
                    </InertiaLink>
                </div>
              </div>

              {/*menerapkan komponen datatable */}
              <div className="table-responsive table-data">            
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={data}
                />            
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};
