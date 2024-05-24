import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const {data, setData, post, processing, errors } = useForm({
    soal: "",
    id_ujian: props.ujianaktif || "",
    pilihan_1: "",
    pilihan_2: "",
    pilihan_3: "",
    pilihan_4: "",
    pilihan_5: "",
    kunci: "",
  });

  //buat array untuk membuat skrip kotak input pilihan lebih pendek dengan perulangan
  const pilihan = [
    {val: 1, label: 'Pilihan 1', name: 'pilihan_1'},
    {val: 2, label: 'Pilihan 2', name: 'pilihan_2'},
    {val: 3, label: 'Pilihan 3', name: 'pilihan_3'},
    {val: 4, label: 'Pilihan 4', name: 'pilihan_4'},
    {val: 5, label: 'Pilihan 5', name: 'pilihan_5'},
  ];

  //atur module react-quil text editor
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  //menangani perubahan nilai input pada form
  function handleChange(e){
    const key = e.target.name;
    const value = e.target.value;

    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  //menangani perubahan nilai react-quil text editor
  function handleEditorChange(name, value){
    setData(data => ({
      ...data,
      [name]: value,
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
    post(route('admin.soal.store'), data);
  }

  return (
    <Layout>
      <Helmet title="Tambah Soal Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Tambah Soal Ujian
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>                
                {/*buat kotak input pilihan ujian */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="id_ujian" className=" form-control-label">Ujian</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select id="id_ujian" name="id_ujian" placeholder="Ujian" 
                            className={"form-control " + ('id_ujian' in props.errors ? 'is-invalid' : '')}
                            value={data.id_ujian}
                            onChange={handleChange}
                        >
                          <option value="">-Pilih Ujian-</option>
                        {props.ujian.map((kat)=>(
                            <option key={kat.id} value={kat.id}>{kat.nama_ujian}</option>
                        ))}
                        </select>
                        {'id_ujian' in props.errors && (
                            <small className="form-text text-danger">{props.errors.id_ujian}</small>
                        )}
                    </div>
                </div>
                
                {/*buat kotak input soal dengan react-quil */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="soal" className=" form-control-label">Soal</label>
                    </div>
                    <div className="col-12 col-md-10">
                        <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            value={data.soal}
                            onChange={(value)=>handleEditorChange('soal', value)}
                        />
                        {errors.soal && (
                            <small className="form-text text-danger">{errors.soal}</small>
                        )}
                    </div>
                </div>

                {/*buat kotak input pilihan sesuai jumlah array pilihan */}
                {pilihan.map((pil)=>(
                    <div key={pil.val} className="row form-group">
                        <div className="col col-md-2">
                            <label htmlFor={pil.name} className=" form-control-label">{pil.label}</label>
                        </div>
                        <div className="col-10 col-md-8">
                            <ReactQuill theme="snow"
                                modules={modules}
                                formats={formats}
                                value={data[pil.name]}
                                onChange={(value)=>handleEditorChange(pil.name, value)}
                            />
                            {errors[pil.name] && (
                                <small className="form-text text-danger">{errors[pil.name]}</small>
                            )}
                        </div>
                    </div>
                )) }
                
                {/*buat kotak input pilihan kunci jawaban */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="kunci" className=" form-control-label">Jawaban Benar</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select type="text" id="kunci" name="kunci" placeholder="Jawaban Benar" 
                            className={"form-control " + (errors.kunci ? 'is-invalid' : '')}
                            value={data.kunci}
                            onChange={handleChange}
                        >
                          <option value="">-Pilih Jawaban Benar-</option>
                        {pilihan.map((pil)=>(
                            <option key={pil.val} value={pil.val}>{pil.label}</option>
                        ))}
                        </select>
                        {errors.kunci && (
                            <small className="form-text text-danger">{errors.kunci}</small>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}} disabled={processing}>
                    <i className="fa fa-save"></i> Simpan
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
