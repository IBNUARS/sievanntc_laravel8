import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const {data, setData, post, processing, errors, progress } = useForm({
    id_ujian: props.ujianaktif || "",
    file_import: "",
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

  //menangani upload file
  function handleUpload(e){
    let file = e.target.files[0];
  
    setData(data => ({
      ...data,
      file_import: file,
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault();
    console.log(data);
    post(route('admin.soal.import'), data)
  }

  return (
    <Layout>
      <Helmet title="Impor Soal" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Impor Soal
            </h3>

            <div  style={{padding: 30}}>
            {/* informasin inport data */}
            <div className="alert alert-info">Gunakan format Excel yang disediakan untuk import data dari Excel. 
              Jika soal mengandung gambar, import teksnya saja. Gambar diinput secara manual.<br/>
              <a href={route('admin.soal.format')} className="btn btn-success">
                  <i className="fas fa-download"></i> Download Format
              </a>
            </div>

            <form className="form-horizontal" onSubmit={handleSubmit}>
                 {/*buat kotak input pilihan ujian */}
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

                {/* kotak input file excel */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="file_import" className=" form-control-label">File Impor</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="file" id="file_import"
                            className={"form-control-file " + (errors.file_import ? 'is-invalid' : '')}
                            onChange={handleUpload}
                        />
                        {errors.file_import && (
                            <small className="form-text text-danger">{errors.file_import}</small>
                        )}
                    </div>
                </div>
                
                {progress && (
                  <div className="progress">
                    <div className="progress-bar" style={{width: progress.percentage+"%"}}></div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}} disabled={processing}>
                    <i className="fa fa-upload"></i> Impor
                </button>
                <InertiaLink href={route('admin.soal.show', props.ujianaktif)} className="btn btn-danger">
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
