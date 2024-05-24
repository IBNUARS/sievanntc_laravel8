import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const {data, setData, post, processing, errors } = useForm({
    sesi: "",
    id_ujian: props.ujianaktif || "",
    nama_sesi: "",
    mulai: "",
    selesai: "",
  });
  
  //menangani perubahan nilai input pada form
  function handleChange(e){
    const key = e.target.name;
    const value = e.target.value;

    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  //menangani perubahan input tanggal
  function handleDateChange(name, value){
    setData(data => ({
      ...data,
      [name]: value,
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
    post(route('admin.sesi.store'), data);
  }

  return (
    <Layout>
      <Helmet title="Tambah Sesi Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Tambah Sesi Ujian
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
              
                {/* input pilih ujian */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="id_ujian" className=" form-control-label">Ujian</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select id="id_ujian" name="id_ujian" placeholder="Ujian" 
                            className={"form-control " + (errors.id_ujian ? 'is-invalid' : '')}
                            value={data.id_ujian}
                            onChange={handleChange}
                        >
                          <option value="">-Pilih Ujian-</option>
                        {props.ujian.map((kat)=>(
                            <option key={kat.id} value={kat.id}>{kat.nama_ujian}</option>
                        ))}
                        </select>
                        {errors.id_ujian && (
                            <small className="form-text text-danger">{errors.id_ujian}</small>
                        )}
                    </div>
                </div>

                {/* input nama sesi */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="nama_sesi" className=" form-control-label">Nama Sesi</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" id="nama_sesi" name="nama_sesi" placeholder="Nama Sesi" 
                            className={"form-control " + (errors.nama_sesi ? 'is-invalid' : '')}
                            value={data.nama_sesi}
                            onChange={handleChange}
                        />
                        {errors.nama_sesi && (
                            <small className="form-text text-danger">{errors.nama_sesi}</small>
                        )}
                    </div>
                </div>
                
                {/* input tanggal dan waktu mulai*/}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="mulai" className=" form-control-label">Mulai</label>
                    </div>
                    <div className="col-12 col-md-5">
                        <DatePicker  className="form-control"
                          showTimeSelect
                          dateFormat="yyyy-MM-dd HH:mm"
                          selected={data.mulai} 
                          onChange={date => handleDateChange('mulai', date)} 
                        />
                        {errors.mulai && (
                            <small className="form-text text-danger">{errors.mulai}</small>
                        )}
                    </div>
                </div>

                {/* input tanggal dan waktu selesai */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="selesai" className=" form-control-label">Selesai</label>
                    </div>
                    <div className="col-12 col-md-5">
                        <DatePicker className="form-control"
                          showTimeSelect
                          dateFormat="yyyy-MM-dd HH:mm"
                          selected={data.selesai} 
                          onChange={date => handleDateChange('selesai', date)}
                        />
                        {errors.selesai && (
                            <small className="form-text text-danger">{errors.selesai}</small>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}} disabled={processing}>
                    <i className="fa fa-save"></i> Simpan
                </button>
                <InertiaLink href={route('admin.sesi.show', props.ujianaktif)} className="btn btn-danger">
                    <i className="fa fa-ban"></i> Batal
                </InertiaLink>
            </form>
            </div>  
          </div>
        </div>
      </div>
    </Layout>
  )
};
