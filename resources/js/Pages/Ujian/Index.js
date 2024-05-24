import React, {useState} from 'react';
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

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc'},
        { label: 'Nama Ujian', field: 'nama_ujian'},
        { label: 'Nama Mapel', field: 'nama_mapel'},
        { label: 'Julah Soal', field: 'jumlah_soal' },
        { label: 'Durasi', field: 'durasi' },
        { label: 'Acak Soal', field: 'acak_soal' },
        { label: 'Acak Jawaban', field: 'acak_jawaban' },
        { label: 'Tampilkan Hasil', field: 'tampilkan_hasil' },
        { label: '', field: 'aksi' },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    const ujian = props.ujian;
    ujian.map( (uj, index) => {
      data.rows.push(
        { 
          no: index+1,
          nama_ujian: uj.nama_ujian,
          nama_mapel : uj.nama_mapel,
          jumlah_soal : uj.jumlah_soal,
          durasi: uj.durasi + " menit",
          acak_soal : uj.acak_soal,
          acak_jawaban : uj.acak_jawaban,
          tampilkan_hasil : uj.tampilkan_hasil,
          aksi: (
            <div className="table-data-feature">            
              <button className="item primary" onClick={()=>Inertia.get(route('admin.ujian.edit', uj.id))}>
                  <i className="fas fa-edit"></i>
              </button>
              <button className="item danger"  onClick={()=>handleDialogOpen(route('admin.ujian.destroy', uj.id))}> 
                  <i className="fas fa-trash"></i>
              </button>
          </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Data Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Data Ujian
            </h3>

            <div  style={{padding: 30}}>

              {/*tombol di atas tabel */}
              <div className="table-data__tool">
                <div className="table-data__tool-left"></div>
                <div className="table-data__tool-right">
                  <InertiaLink href={route('admin.ujian.create')} className="au-btn au-btn-icon au-btn--green au-btn--small">
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
