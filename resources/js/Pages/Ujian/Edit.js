import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Layout from './../../Shared/Layout';

export default (props) => {
  const ujian = props.ujian;
  //state untuk nilai input form
  const {data, setData, put, processing, errors } = useForm({
    nama_ujian: ujian.nama_ujian || "",
    nama_mapel: ujian.nama_mapel || "",
    jumlah_soal: ujian.jumlah_soal || "",
    durasi: ujian.durasi || "",
    deskripsi: ujian.deskripsi || "",
    acak_soal: ujian.acak_soal || "Y",
    acak_jawaban: ujian.acak_jawaban || "Y",
    tampilkan_hasil: ujian.tampilkan_hasil || "N",
  });

  //pilihan acak
  const optionAcak = [
    {val: "Y", text: "Ya"},
    {val: "N", text: "Tidak"}
  ];

  //buat array untuk membuat skrip kotak input lebih pendek dengan perulangan
  const arrayInput = [
    {label: 'Nama Ujian', name: 'nama_ujian', type:"text", size: 4},
    {label: 'Nama Mapel', name: 'nama_mapel', type:"text", size: 4},
    {label: 'Jumlah Soal', name: 'jumlah_soal', type:"number", size: 2},
    {label: 'Durasi (menit)', name: 'durasi', type:"number", size: 2},
    {label: 'Acak Soal', name: 'acak_soal', type:"select", size: 2, option: optionAcak},
    {label: 'Acak Jawaban', name: 'acak_jawaban', type:"select", size: 2, option: optionAcak},
    {label: 'Tampilkan Hasil', name: 'tampilkan_hasil', type:"select", size: 2, option: optionAcak},
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
    put(route('admin.ujian.update', ujian.id), data)
  }

  return (
    <Layout>
      <Helmet title="Edit Ujian" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Edit Ujian
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                {/*buat kotak input sesuai array input */}
                {arrayInput.map((inp)=>(
                    <div key={inp.name} className="row form-group">
                        <div className="col col-md-2">
                            <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                        </div>
                        <div className={"col-md-"+inp.size}>
                          {inp.type == "select" ? ( //jika tipe input select
                            <select d={inp.name} name={inp.name}
                                className={"form-control " + (errors[inp.name] ? 'is-invalid' : '')}
                                value={data[inp.name]}
                                onChange={handleChange}
                            >
                            {inp.option.map((opt)=>(
                                <option key={opt.val} value={opt.val}>{opt.text}</option>
                            ))}
                            </select>
                          ):( //jika tipe input selain select
                            <input type={inp.type} id={inp.name} name={inp.name} placeholder={inp.label} 
                                className={"form-control " + (errors[inp.name] ? 'is-invalid' : '')}
                                value={'value' in inp ? inp.value : data[inp.name]}
                                onChange={handleChange}
                            />
                          )}

                          {errors[inp.name] && (
                              <small className="form-text text-danger">{errors[inp.name]}</small>
                          )}
                        </div>
                    </div>
                )) }

                {/*text editor dengan react-quil */}
                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="deskripsi" className=" form-control-label">Deskripsi</label>
                    </div>
                    <div className="col-12 col-md-10">
                        <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            value={data.deskripsi}
                            onChange={(value)=>handleEditorChange('deskripsi', value)}
                        />
                        {errors.deskripsi && (
                            <small className="form-text text-danger">{errors.deskripsi}</small>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}} disabled={processing}>
                    <i className="fa fa-save"></i> Simpan
                </button>
                <InertiaLink href={route('admin.ujian.index')} className="btn btn-danger">
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
