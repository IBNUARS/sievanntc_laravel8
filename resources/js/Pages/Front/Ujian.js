import React, {useState, useEffect} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import Countdown from 'react-countdown';

import Layout from './../../Shared/UjianLayout';
import Modal from './../../Shared/Modal';

export default (props) => {
    const {flash} = usePage().props;
    const [modal, setModal] = useState({
        open: false,
        isConfirm: false,
        text: '',
        link: ''
    });

    //membuatkan konstanta untuk masing2 props
    const ujian = props.ujian;
    const semuasoal = props.soal;
    const soal = props.soalaktif;
    const pilihan = props.pilihan;
    const dikerjakan = props.dikerjakan;
    const nosoal = props.nosoal;
    const nilai = props.nilai;

    const durasi = flash.durasi!=null ? flash.durasi : nilai.durasi;
    const [waktu, setWaktu] = useState(durasi); //state sisa waktu
    const [counter, setCounter] = useState(0);

    //buka modal
    function handleOpenModal(isConfirm, text, link){
        setModal({
            open: true,
            isConfirm: isConfirm,
            text: text,
            link: link
        });
    }

    //tutup modal
    function handleCloseModal(){
        setModal((values) => ({
            ...values,
            open: false
        }));
    }

    //update durasi setiap 10 detik
    useEffect(() => {
        setCounter(counter+1);
        if(counter%10==1 && soal!=null) axios.put(route('ujian.update', nilai.id), {durasi: waktu});
    }, [waktu]);

    //menampilkan dialog saat peserta menutup tab atau tutup jendela browser
    useEffect(() => {
        return () => {
            window.addEventListener('beforeunload', function(event){
                event.preventDefault();
                event.returnValue = '';
             })
        }
    })

  let huruf = ["A","B","C","D","E"];

  return (
    <Layout>
      <Helmet>
        <title>Halaman Ujian</title>
      </Helmet>
      <div className="row">


      {/* ------------ KOLOM SOAL -------------------*/}
      <div className="col-md-8">
        {soal !== null ? ( //cek apakah data soal ditemukan
            <div className="card">
                {/* ------------ HEADER SOAL -------------------*/}
                <div className="card-header">
                    Soal No. {nosoal}
                    <button className="btn btn-primary btn-sm float-right">
                        <Countdown
                            date={Date.now() + waktu}
                            renderer={({hours, minutes, seconds, completed}) => {
                                if (completed) {
                                    return <span>Selesai</span>;
                                } else {
                                    return <span>{hours}:{minutes}:{seconds}</span>;
                                }
                            }}
                            onTick={()=>{setWaktu(waktu-1000)}}
                            onComplete={()=>handleOpenModal(
                                false,
                                "Waktu ujian sudah berakhir",
                                route('ujian.selesai', ujian.id)
                            )}
                        />
                    </button>
                </div>

                {/* ------------ BODY SOAL -------------------*/}
                <div  style={{height: 450, overflowY: 'auto'}} className="card-body" >
                    <div dangerouslySetInnerHTML={{__html: soal.soal}}></div>
                    <table>
                        <tbody>
                            {pilihan.map((pil, index)=>(
                            <tr key={pil}>
                                <td width="50" style={{padding: 10}}>
                                {pil == soal.jawaban ? ( //cek pilihan sama dengan jawaban
                                    <a className="btn btn-primary btn-sm btn-block">{huruf[index]}</a>
                                ):(
                                    <a href="#" className="btn btn-outline-primary btn-sm btn-block"
                                        onClick={()=>Inertia.post(
                                            route('ujian.jawab', ujian.id),
                                            {
                                                soal: soal.id,
                                                jawab: pil,
                                                nosoal: nosoal,
                                                durasi: waktu,
                                                ujian: ujian.id
                                            }
                                        )}
                                    >{huruf[index]}</a>
                                )}
                                </td>
                                <td style={{padding: 10}} dangerouslySetInnerHTML={{__html: soal["pilihan_"+pil]}}></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ------------ FOOTER SOAL -------------------*/}
                <div className="card-footer">
                    {nosoal>1 && ( //jika bukan halaman pertama tampilkan tombol sebelumnya
                        <a onClick={()=>Inertia.put(route('ujian', parseInt(nosoal)-1), {durasi:waktu})} className="btn btn-primary btn-sm">
                           <i className="fas fa-angle-left"></i> Sebelumnya
                        </a>
                    )}

                    {nosoal<semuasoal.length && (//jika bukan halaman terakhir tampilkan tombol selanjutnya
                        <a style={{marginLeft: 10}} onClick={()=>Inertia.put(route('ujian', parseInt(nosoal)+1), {durasi:waktu})} className="btn btn-primary btn-sm">
                           Selanjutnya <i className="fas fa-angle-right"></i>
                        </a>
                    )}
                </div>
            </div>
        ) : ( //jika data soal tidak ditemukan
            <div className="card">
                <div className="card-body">Soal tidak ditemukan!</div>
            </div>
        )}
        </div>

        {/* ------------ KOLOM NO SOAL -------------------*/}
        <div className="col-md-4">
            <div className="card">
                <div className="card-header" style={{textAlign:"center"}}>
                   <div align="center" className="badge badge-primary"> {dikerjakan} dikerjakan</div>
                </div>
                <div  style={{height: 450, overflowY: 'auto'}} className="card-body" >

                    {semuasoal.map((so, index)=>(
                        <div key={so.id} width="20%" style={{width: "20%", float:"left"}}>
                            <div style={{padding: 5}}>
                            {index+1 == nosoal && (
                                <a className="btn btn-primary btn-sm btn-block">{index+1}</a>
                            )}

                            {(index+1 != nosoal && so.jawaban==0) && (
                                <a href="#" className="btn btn-outline-primary btn-sm btn-block"
                                    onClick={()=>Inertia.put(route('ujian', index+1), {durasi: waktu})}
                                >{index+1}</a>
                            )}

                            {(index+1 != nosoal && so.jawaban!=0) && (
                                <a href="#" className="btn btn-secondary btn-sm btn-block"
                                onClick={()=>Inertia.put(route('ujian', index+1), {durasi: waktu})}
                                >{index+1}</a>
                            )}
                            </div>
                        </div>
                    ))}

                </div>
                <div className="card-footer">
                    <a className="btn btn-primary btn-danger btn-block btn-sm"
                        onClick={()=>handleOpenModal(
                            true,
                            "Setelah mengakhiri ujian tidak dapat kembali ke ujian ini lagi. Yakin akan mengakhiri ujian?",
                            route('ujian.selesai', ujian.id)
                        )}
                    >
                        Akhiri Ujian
                    </a>
                </div>
            </div>
        </div>
    </div>


      <Modal
        modal={modal}
        closeModal={handleCloseModal}
      />
    </Layout>
  );
}
