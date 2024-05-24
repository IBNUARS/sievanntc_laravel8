import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';

import Layout from './../../Shared/UjianLayout';

const Home = (props) => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="row">
      {props.data.length <= 0 && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
                <h3 className="title-3">Anda belum punya jadwal sesi ujian</h3>
            </div>
          </div>
        </div>
      )}

      { props.data.map((data) => (
          <div key={data.ujian.id} className="col-md-4">
              <div className="card">
                  <div className="card-body">
                    <h4 className="title-5">{data.ujian.nama_ujian}</h4><br/>
                      <table>
                        <tbody>
                          <tr>
                            <td valign="top">Mapel</td>
                            <td valign="top">:</td>
                            <td valign="top"> {data.ujian.nama_mapel}</td>
                          </tr>
                          <tr>
                            <td valign="top">Sesi</td>
                            <td valign="top">: </td>
                            <td valign="top">{data.ujian.nama_sesi}</td>
                          </tr>
                          <tr>
                            <td valign="top">Mulai</td>
                            <td valign="top">:</td>
                            <td valign="top"> {data.ujian.mulai}</td>
                          </tr>
                          <tr>
                            <td valign="top">Selesai</td>
                            <td valign="top">:</td>
                            <td valign="top"> {data.ujian.selesai}</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  <div className="card-footer">

                      {data.nilai.selesai==null ? ( //cek kolom selesai null (ujian belum selesesai)
                        <>
                          {(new Date() >= new Date(data.ujian.mulai) && new Date() <= new Date (data.ujian.selesai)) ? (
                            //cek apakah ujian sudah dimulai dan belum terlewat
                            //Jika iya ujian dapat dapat dikerjakan
                            <>
                            {data.nilai.mulai == null ? ( //cek kolom mulai null (ujian belum dimulai)
                              <a onClick={()=>Inertia.post(route('ujian.konfirmasi', data.ujian.id))} className="btn btn-success btn-block">
                                Kerjakan
                              </a>
                            ):(//ujian sudah dimulai
                              <a onClick={()=>Inertia.post(route('ujian.konfirmasi', data.ujian.id))} className="btn btn-warning btn-block">
                                Lanjut Kerjakan
                              </a>
                            )}
                            </>
                          ):( // jika belum dimulai atau sudah terlewat
                            <>
                            { new Date() < new Date(data.ujian.mulai) && ( //Jika belum mulai
                              <a className="btn btn-secondary btn-block disabled">
                                  Belum Mulai
                              </a>
                            )}

                            { new Date() > new Date(data.ujian.selesai) && ( //Jika sudah terlewat
                              <a className="btn btn-secondary btn-block disabled">
                                  Waktu Terlewat
                              </a>
                            )}
                            </>
                          )}
                        </>
                      ):( //ujian sudah selesai
                          <a className="btn btn-danger btn-block disabled">
                              Sudah Dikerjakan
                          </a>
                      )}
                  </div>
              </div>
          </div>
      ))}

      </div>
    </div>
  );
}

Home.layout = page => <Layout children={page} />

export default Home;
