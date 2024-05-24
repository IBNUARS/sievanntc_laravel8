import React, {useRef, useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../../Shared/Layout';
import Dialog from '../../Shared/Dialog';

export default (props) => {
    const sesi = props.sesi;

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

    //Ke halaman sesi/show jika nilai ujian diubah
    const isMount = useRef(false);
    useEffect(()=>{
      if(isMount.current) Inertia.get(route('admin.sesi.show', ujian));
      else isMount.current = true;
    }, [ujian]);

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'Nama Ujian', field: 'nama_ujian' },
        { label: 'Nama Sesi', field: 'nama_sesi' },
        { label: 'Mulai', field: 'mulai' },
        { label: 'Selesai', field: 'selesai' },
        { label: '', field: 'aksi', width: 100 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    sesi.map( (se, index) => {
      
      data.rows.push(
        { 
          no: index+1,
          nama_ujian: se.nama_ujian, 
          nama_sesi: se.nama_sesi, 
          mulai: se.mulai,
          selesai: se.selesai,
          aksi: (
            <div className="table-data-feature">            
              <button className="item primary" onClick={()=>Inertia.get(route('admin.sesi.edit', se.id))}>
                  <i className="fas fa-edit"></i>
              </button>
              <button className="item danger"  onClick={()=>handleDialogOpen(route('admin.sesi.destroy', se.id))}> 
                  <i className="fas fa-trash"></i>
              </button>
            </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Sesi" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Sesi Ujian
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
                        <option value="0">Semua Ujian</option>
                        {props.ujian.map((uji)=>(
                            <option key={uji.id} value={uji.id}>{uji.nama_ujian}</option>
                        ))}
                    </select>
                </div> 
 
                {/* tombol tambah */}
                <div className="table-data__tool-right">
                  <InertiaLink href={route('admin.sesi.create')} className="au-btn au-btn-icon au-btn--green au-btn--small">
                      <i className="fas fa-plus-circle"></i> Tambah
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
