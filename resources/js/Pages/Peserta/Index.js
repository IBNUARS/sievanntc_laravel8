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
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'No. Ujian', field: 'no_ujian' },
        { label: 'Nama Peserta', field: 'nama_peserta' },
        { label: 'Jenis Kelamin', field: 'jk' },
        { label: 'Angkatan', field: 'angkatan'},
        { label: 'Kelas', field: 'kelas' },
        { label: 'Password', field: 'password' },
        { label: '', field: 'aksi', width: 100 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    const peserta = props.peserta;
    peserta.map( (pst, index) => {
      data.rows.push(
        {
          no: index+1,
          no_ujian: pst.no_ujian,
          nama_peserta: pst.nama_peserta,
          jk: pst.jenis_kelamin,
          angkatan: pst.angkatan,
          kelas: pst.kelas,
          password: pst.password,
          aksi: (
            <div className="table-data-feature">
              <button className="item primary" onClick={()=>Inertia.get(route('admin.peserta.edit', pst.id))}>
                  <i className="fas fa-edit"></i>
              </button>
              <button className="item danger"  onClick={()=>handleDialogOpen(route('admin.peserta.destroy', pst.id))}>
                  <i className="fas fa-trash"></i>
              </button>
          </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Peserta" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Peserta Ujian
            </h3>

            <div  style={{padding: 30}}>

              {/*tombol di atas tabel */}
              <div className="table-data__tool">
                <div className="table-data__tool-left"></div>
                <div className="table-data__tool-right">
                  <InertiaLink href={route('admin.peserta.create')} className="au-btn au-btn-icon au-btn--green au-btn--small mr-1">
                      <i className="fas fa-plus-circle"></i> Tambah
                  </InertiaLink>
                  <InertiaLink href={route('admin.peserta.importform')} className="au-btn au-btn-icon btn-primary au-btn--small mr-1">
                      <i className="fas fa-upload"></i> Import
                  </InertiaLink>
                  <a href={route('admin.peserta.export')} className="au-btn au-btn-icon btn-info au-btn--small mr-1">
                      <i className="fas fa-download"></i> Export
                  </a>
                  <InertiaLink href={route('admin.peserta.print')} className="au-btn au-btn-icon btn-primary au-btn--small">
                      <i className="fas fa-print"></i> Cetak Kartu
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
