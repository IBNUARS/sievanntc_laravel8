import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';

import Layout from './../../Shared/UjianLayout';

export default (props) => {
  return (
    <Layout>
      <Helmet>
        <title>Konfirmasi Ujian</title>
      </Helmet>

      <div className="row">
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    Identitas Peserta
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                        <tr><td><b>No. Ujian</b></td><td>: {props.peserta.no_ujian}</td></tr>
                        <tr><td><b>Nama</b></td><td>: {props.peserta.nama_peserta}</td></tr>
                        <tr><td><b>Angkatan</b></td><td>: {props.peserta.angkatan}</td></tr>
                        <tr><td><b>Kelas</b></td><td>: {props.peserta.kelas}</td></tr>

                        <tr><td><b>Nama Ujian</b></td><td>: {props.ujian.nama_ujian}</td></tr>
                        <tr><td><b>Nama Mapel</b></td><td>: {props.ujian.nama_mapel}</td></tr>
                        <tr><td><b>Durasi</b></td><td>: {props.ujian.durasi} menit</td></tr>
                        <tr><td></td><td></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    Deskripsi Ujian
                </div>
                <div dangerouslySetInnerHTML={{__html: props.ujian.deskripsi}}
                    style={{height: 360, overflowY: 'auto'}} className="card-body"
                ></div>
                <div className="card-footer">
                    {props.nilai.selesai==null ? (
                        <a onClick={()=>Inertia.post(route('ujian.mulai', props.ujian.id))} className="btn btn-success btn-block">
                            Kerjakan
                        </a>
                    ):(
                        <a className="btn btn-primary btn-block disabled">
                            Sudah Mengerjakan
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
    </Layout>
  );
}
