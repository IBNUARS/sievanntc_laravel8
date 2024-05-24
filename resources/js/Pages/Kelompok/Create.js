import React, {useRef, useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
// import { InertiaLink, usePage } from '@inertiajs/inertia-react';


import { MDBDataTableV5 } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

import Layout from '../../Shared/Layout';

export default (props) => {
    const peserta = props.peserta;
    const isMount = useRef(false);
    const [ujian, setUjian] = useState(props.ujianaktif);

    const {data, setData, post, processing, errors } = useForm({
        id_sesi: "",
        id_ujian: props.ujianaktif || "",
        peserta: [],
    });

    //set ujian jika ujian dipilih
    useEffect(()=>{
      if(isMount.current) Inertia.get(route('admin.kelompok.setujian', ujian));
      else isMount.current = true;
    }, [ujian]);

    //menangani perubahan nilai input pada form
    function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setData(data => ({
            ...data,
            [name]: value,
        }));

        if(name=="id_ujian"){
          setUjian(value);
        }
    }

    let datapeserta = [];
    //memasukkan data dari database ke tabel
    peserta.map( (pst, index) => {
      datapeserta.push(
        {
          no: index+1,
          no_ujian: pst.no_ujian,
          nama_peserta: pst.nama_peserta,
          jenis_kelamin: pst.jenis_kelamin,
          angkatan: pst.angkatan,
          kelas: pst.kelas,
        }
      )
    });

    //buat data tabel
    const [datatable, setDatatable] = useState({
      columns: [
        { label: 'No', field: 'no', sort: 'asc', width: 50 },
        { label: 'No. Ujian', field: 'no_ujian' },
        { label: 'Nama Peserta', field: 'nama_peserta' },
        { label: 'Jenis Kelamin', field: 'jenis_kelamin' },
        { label: 'Angkatan', field: 'angkatan' },
        { label: 'Kelas', field: 'kelas' },
      ],
      rows: datapeserta
    });

    //mengatur checkbox;
    var dataChecked = [];
    const getCheckboxData = (e) => {
      if(Array.isArray(e)){ //jika ckeckbox header diklik e=array
        e.map((data)=>{
          if(data.checked){ //jika dicentang
            if(!dataChecked.includes(data.no_ujian)) dataChecked.push(data.no_ujian); //tambahkan ke array hanya jika belum ada
          }
          else dataChecked.splice(dataChecked.indexOf(data.no_ujian),1); //hapus jika tidak dicentang
        });
      }else{ //jika checkbox body diklik e!=array
          if(e.checked) dataChecked.push(e.no_ujian); //tambahkan ke array (pasti belum ada)
          else dataChecked.splice(dataChecked.indexOf(e.no_ujian),1); // hapus jika tidak dicentang
      }
      //console.log(dataChecked)
      setData(data => ({
        ...data,
        peserta: dataChecked,
      }))
    };


    //mengirim data ketika form submit
    function handleSubmit(e){
      e.preventDefault();
      post(route('admin.kelompok.store'), data);
    }


  return (
    <Layout>
      <Helmet title="Tambah Kelompok" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">

            <h3 className="title-3">
                Tambah Kelompok Ujian
            </h3>

            <div  style={{padding: 30}}>
                <form className="form-horizontal" onSubmit={handleSubmit}>

                <div className="row mb-2">
                  {/* pilihan ujian */}
                    <label htmlFor="id_ujian" className="form-control-label col-md-1">Ujian</label>
                    <div className="col-md-4">
                        <select name="id_ujian" id="id_ujian"
                            className="form-control-lg form-control"
                            value={data.id_ujian}
                            onChange={handleChange}
                        >
                            <option value="">Pilih Ujian</option>
                            {props.ujian.map((uji)=>(
                                <option key={uji.id} value={uji.id}>{uji.nama_ujian}</option>
                            ))}
                        </select>
                        {errors.id_ujian && (
                              <small className="form-text text-danger">{errors.id_ujian}</small>
                        )}
                    </div>

                  {/* pilihan sesi */}
                  <label htmlFor="id_sesi" className="form-control-label col-md-1">Sesi</label>
                    <div className="col-md-3">
                        <select name="id_sesi" id="id_sesi"
                            className="form-control-lg form-control"
                            value={data.id_sesi}
                            onChange={handleChange}
                        >
                            <option value="">Pilih Sesi</option>
                            {props.sesi.map((se)=>(
                                <option key={se.id} value={se.id}>{se.nama_sesi}</option>
                            ))}
                        </select>
                        {errors.id_sesi && (
                              <small className="form-text text-danger">{errors.id_sesi}</small>
                        )}
                    </div>

                    <div className="col-md-3">
                        <button type="submit"  className="au-btn au-btn-icon au-btn--blue au-btn--medium" disabled={processing}>
                            <i className="fas fa-save"></i> Simpan
                        </button>
                    </div>
                </div>

              {/* tabel data responsive */}
              <div className="table-responsive table-data">
                <MDBDataTableV5
                  striped
                  bordered
                  hover
                  data={datatable}

                  pagingTop
                  searchTop
                  searchBottom={false}

                  checkbox
                  headCheckboxID='checkall'
                  bodyCheckboxID='id_peserta'
                  getValueCheckBox={(e) => {
                    getCheckboxData(e);
                  }}
                  getValueAllCheckBoxes={(e) => {
                    getCheckboxData(e);
                  }}
                  multipleCheckboxes
                />
              </div>

                </form>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
};
