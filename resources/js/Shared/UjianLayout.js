import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

export default function Layout({ children }) {
  const {peserta, sessionujian} = usePage().props;

  return (
    <div className="page-wrapper">
       <div className="page-container3">

            <header className="header-desktop2" style={{left: 0}}>
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="header-wrap2 d-flex align-items-center justify-content-between">
                            <div className="logo">
                                <a href="#">
                                    <img src="/images/icon/logontc.png" width="50px" alt="LPKNTC"/>
                                </a>
                            </div>
                            <div className="header-button2">
                                <big className="d-none d-sm-block text-white">
                                    {peserta!==null && peserta.no_ujian + ' - ' + peserta.nama_peserta}
                                </big>
                            </div>
                            <div className="header-button2">
                                <div className="header-button-item">
                                {sessionujian == null && (//jika ujian tidak sedang berlangsung
                                    <InertiaLink className="btn text-white" href={route('ujian.logout')} method="post" as="button">
                                        <i className="fas fa-sign-out-alt"></i> <span className="d-none d-sm-block">Keluar</span>
                                    </InertiaLink>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="main-content">
                <div className="container-fluid">

                    {children}

                </div>
            </div>
        </div>
    </div>
   );
}
