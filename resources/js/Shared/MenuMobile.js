import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default (props) => {
  //buat array data menu
  const menu = [
    {icon: 'fas fa-tachometer-alt', title: "Dashboard", link: "/admin"},
    {icon: 'fas fa-book', title: "Ujian",  link: "/admin/ujian"},
    {icon: 'fas fa-question-circle', title: "Soal Ujian", link: "/admin/soal"},
    {icon: 'fas fa-clock', title: "Sesi Ujian", link: "/admin/sesi"},
    {icon: 'fas fa-user-circle', title: "Peserta Ujian", link: "/admin/peserta"},
    {icon: 'fas fa-users', title: "Peserta Per Sesi", link: "/admin/kelompok"},
    {icon: 'fas fa-check-square', title: "Hasil Ujian", link: "/admin/nilai"},
  ];

  return (
    <nav className="navbar-mobile" style={{display: props.display}}>
      <div className="container-fluid">
        <ul className="navbar-mobile__list list-unstyled">
            { menu.map((item) => (
            <li key={item.title}>
                <InertiaLink className="js-arrow" href={item.link}>
                    <i className={item.icon}></i> {item.title}
                </InertiaLink>
            </li>
            ))}
        </ul>
      </div>
    </nav>
   );
}
