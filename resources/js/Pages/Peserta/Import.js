import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const {data, setData, post, processing, errors, progress } = useForm({
    file_import: "",
  });

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
    
    post(route('admin.peserta.import'), data)
  }

  return (
    <Layout>
      <Helmet title="Impor Peserta" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Impor Peserta
            </h3>

            <div  style={{padding: 30}}>
            {/* informasin inport data */}
            <div className="alert alert-info">Gunakan format Excel yang disediakan untuk import data dari Excel. 
              Kolom password dapat dikosongi jika ingin password dibuat oleh sistem. <br/>
              <a href={route('admin.peserta.format')} className="btn btn-success">
                  <i className="fas fa-download"></i> Download Format
              </a>
            </div>

            <form className="form-horizontal" encType="multipart/form-data" onSubmit={handleSubmit}>
            
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
                <InertiaLink href={route('admin.peserta.index')} className="btn btn-danger">
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
