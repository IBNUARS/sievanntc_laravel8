import React, {useRef, useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './../../Shared/Layout';
import Dialog from './../../Shared/Dialog';

export default (props) => {
    const soal = props.soal;
    
    //mengatur toast tampil
    const {flash} = usePage().props;
    const [alert, setAlert] = useState(true);    
    if(flash.message && alert){
      toast(flash.message);
      setAlert(false);
    }

    //state untuk dialog
    const [dialog, setDialog] = useState({
      open: false,
      route: null
    });

    //buka dialog
    const handleDialogOpen = (route) => {
      setDialog({open: true, route: route});
    };

    //tutup dialog
    const handleDialogClose = () => {
      setDialog({open: false, route: null});
    };
    
    //menangani ujian diubah
    const [ujian, setUjian] = useState(props.id);
    const changeUjian = (e) =>{
      setUjian(e.target.value);
    };

    //Ke halaman ujian/show jika nilai ujian diubah    
    const isMount = useRef(false);
    useEffect(()=>{
      if(isMount.current) Inertia.get(route('admin.soal.show', ujian));
      else isMount.current = true;
    }, [ujian]);

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'Soal', field: 'soal', width: 500 },
        { label: '', field: 'aksi', width: 100 },
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
                    if(so.kunci==pil.no) {
                      return (<li key={pil.no} style={{color: 'blue', fontWeight:'bold'}} 
                        dangerouslySetInnerHTML={{__html: pil.teks}}></li>);
                    }else{
                      return (<li key={pil.no} dangerouslySetInnerHTML={{__html: pil.teks}}></li>)
                    }
                  })}
              </ol>
            </div>
          ),
          aksi: (
            <div className="table-data-feature">            
              <button className="item primary" onClick={()=>Inertia.get(route('admin.soal.edit', so.id))}>
                  <i className="fas fa-edit"></i>
              </button>
              <button className="item danger"  onClick={()=>handleDialogOpen(route('admin.soal.destroy', so.id))}> 
                  <i className="fas fa-trash"></i>
              </button>
            </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Soal" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Soal Ujian
            </h3>

            <div  style={{padding: 30}}>

              {/*tombol dan select di atas tabel */}
              <div className="table-data__tool">
                <div className="table-data__tool-left">
                  {/* pilihan ujian */}
                    <select name="ujian" id="ujian"       
                        className="form-control-lg form-control"
                        value={ujian}
                        onChange={changeUjian}
                    >
                        <option value="0">Pilih Ujian</option>
                        {props.ujian.map((uji)=>(
                            <option key={uji.id} value={uji.id}>{uji.nama_ujian}</option>
                        ))}
                    </select>
                </div> 
 
                {/* tombol tambah */}
                <div className="table-data__tool-right">
                  <InertiaLink href={route('admin.soal.create')} className="au-btn au-btn-icon au-btn--green au-btn--small mr-1">
                      <i className="fas fa-plus-circle"></i> Tambah
                  </InertiaLink>
                  <InertiaLink href={route('admin.soal.importform')} className="au-btn au-btn-icon btn-primary au-btn--small">
                      <i className="fas fa-upload"></i> Import
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

      {/*menerapkan komponen dialog */}
      <Dialog
        openDialog={dialog.open}
        closeDialog={handleDialogClose}
        route={dialog.route}
      />
      
      {/*menerapkan komponen toast */}
      <ToastContainer 
        position='top-right'
        type='success'
        autoClose={5000}
      />
    </Layout>
  )
};
