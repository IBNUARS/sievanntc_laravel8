import React, {useRef, useState} from 'react';
import Helmet from 'react-helmet';
import { usePage, useForm } from '@inertiajs/inertia-react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './../../Shared/Layout';

export default (props) => {
  const {flash} = usePage().props;
  const user = props.user;

  //state untuk nilai input form
  const {data, setData, post, processing, errors } = useForm({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    password1: "",
    password2: "",
    picture: "",
    url_picture: "/images/icon/"+user.picture|| "",
    _method : 'put',
  });

  //mengatur toart tampil
  const [alert, setAlert] = useState(true);
  if(flash.message && alert){
    toast(flash.message);
    setAlert(false);
  }

  //menangani perubahan nilai input pada form
  function handleChange(e){
    const key = e.target.name;
    const value = e.target.value;

    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  const input = [
    {label: 'Name', name: 'name', type:"text"},
    {label: 'Username', name: 'username', type:"text"},
    {label: 'Email', name: 'email', type:"text"},
    {label: 'Password', name: 'password1', type:"password"},
    {label: 'Konfirmasi Password', name: 'password2', type:"password"},
  ];

  //menangani upload file
  const inputFile = useRef(null);
  function buttonClick(){
    inputFile.current.click();
  }

  function handleUpload(e){
    let file = e.target.files[0];
    let imgsrc = URL.createObjectURL(e.target.files[0]);

    setData(data => ({
      ...data,
      picture: file,
      url_picture: imgsrc, //ubah foto yang ditampilkan dg yg akan diupload
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
    console.log(data);

    post(route('admin.user.update', user.id), data)
  }

  return (
    <Layout>
      <Helmet title="Profil User" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Profil Admin
            </h3>

            <div  style={{padding: 30}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>

                {input.map((inp)=>(
                    <div key={inp.name} className="row form-group">
                        <div className="col col-md-2">
                            <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                        </div>
                        <div className="col-12 col-md-10">
                            <input type={inp.type} id={inp.name} name={inp.name} placeholder={inp.label}
                                className={"form-control " + (errors[inp.name] ? 'is-invalid' : '')}
                                value={data[inp.name]}
                                onChange={handleChange}
                            />
                            {errors[inp.name] && (
                                <small className="form-text text-danger">{errors[inp.name]}</small>
                            )}
                        </div>
                    </div>
                )) }

                <div className="row form-group">
                    <div className="col col-md-2">
                        <label htmlFor="picture" className=" form-control-label">Foto User</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input style={{display: 'none'}}
                            accept="image/*"
                            ref={inputFile}
                            id="picture"
                            type="file"
                            onChange={handleUpload}
                        />

                        <button onClick={buttonClick} type="button" className="btn btn-primary">
                            Upload Foto
                        </button>

                        {(data.url_picture!="") && (
                        <div style={{marginTop: 15}}>
                            <img src={data.url_picture} width="200" />
                        </div>
                        )}

                        {errors.picture && (
                            <small className="form-text text-danger">{errors.picture}</small>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginRight: 10}} disabled={processing}>
                    <i className="fa fa-save"></i> Simpan Perubahan
                </button>
            </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position='top-right'
        type='success'
        autoClose={5000}
      />

    </Layout>
  )
};
