import React, {useRef, useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from './../../Shared/Layout';

export default (props) => {

    //mengatur toast tampil
    const {flash} = usePage().props;
    const [alert, setAlert] = useState(true);    
    if(flash.message && alert){
      toast(flash.message);
      setAlert(false);
    }

    //menangani ujian diubah
    const [ujian, setUjian] = useState(props.id);
    const changeUjian = (e) =>{
      setUjian(e.target.value);
    };
    
    //Ke halaman ujian/show jika nilai ujian diubah
    const isMount = useRef(false);
    useEffect(()=>{
      if(isMount.current) Inertia.get(route('admin.nilai.show', ujian));
      else isMount.current = true;
    }, [ujian]);

    //buat data tabel
    let data = {
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'NO. Ujian', field: 'no_ujian' },
        { label: 'Nama Peserta', field: 'nama_peserta' },
        { label: 'Mulai', field: 'mulai' },
        { label: 'Selesai', field: 'selesai' },
        { label: 'Jml. Benar', field: 'benar' },
        { label: 'Nilai', field: 'nilai'},
        { label: '', field: 'aksi', width: 50 },
      ],
      rows: []
    };

    //memasukkan data dari database ke tabel
    const nilai = props.nilai;
    nilai.map( (nil, index) => {
      data.rows.push(
        { 
          no: index+1,
          no_ujian: nil.no_ujian,
          nama_peserta: nil.nama_peserta,
          mulai: nil.mulai,
          selesai: nil.selesai,
          benar: nil.jml_benar,
          nilai: nil.nilai,
          aksi: (
            <div className="table-data-feature">            
              <button className="item primary" onClick={()=>Inertia.get(route('admin.nilai.view', nil.id_peserta))}>
                  <i className="fas fa-eye"></i>
              </button> 
            </div>
          )
        }
      )
    });

  return (
    <Layout>
      <Helmet title="Nilai" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Hasil Ujian
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

                {/*tombol ekspor */}
                <div className="table-data__tool-right">
                  {props.id != 0 && (
                    <>
                    <a href={route('admin.nilai.export', ujian)} className="au-btn au-btn-icon au-btn--green au-btn--small mr-1">
                        <i className="fas fa-file-excel"></i> Export Nilai
                    </a>
                    <a href={route('admin.nilai.export_jawaban', ujian)} className="au-btn au-btn-icon au-btn--green au-btn--small">
                        <i className="fas fa-file-excel"></i> Export Jawaban
                    </a>
                    </>
                  )}
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
