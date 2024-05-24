import React, {useState} from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default (props) => {
  const {user} = usePage().props;
  const [openMenu, setOpenMenu] = useState(false);

  const style = {
      dropdown:{
          transform: openMenu ? 'scale(1)' : 'scale(0)'
      }
  }

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <header className="header-desktop">
        <div className="section__content section__content--p30">
            <div className="container-fluid">
                <div className="header-wrap">
                    <div className="form-header" > </div>
                    <div className="header-button">
                        <div className="noti-wrap"></div>
                        
    {/* menu user */}  
    <div className="account-wrap">
        <div className="account-item clearfix js-item-menu">
            <div className="image" onClick={handleOpenMenu}>
                <img src={'/images/icon/'+user.picture} alt={user.name} />
            </div>

            <div className="content">
                <a onClick={handleOpenMenu}>{user.name} <i className="fas fa-angle-down"></i></a>
            </div>

            <div className="account-dropdown" style={style.dropdown}>
                <div className="info clearfix">
                    <div className="image">
                        <a href="#">
                            <img src={'/images/icon/'+user.picture} alt={user.name}/>
                        </a>
                    </div>
                    <div className="content">
                        <h5 className="name">
                            <a href="#">{user.name}</a>
                        </h5>
                        <span className="email">{user.email}</span>
                    </div>
                </div>
                <div className="account-dropdown__body">
                    <div className="account-dropdown__item">
                        <a href="#" onClick={() => Inertia.get('/admin/profil')}>
                            <i className="fa fa-user"></i>Profil
                        </a>
                    </div>
                    <div className="account-dropdown__item">
                        <a href="#" onClick={() => Inertia.post("/logout")}>
                            <i className="fa fa-sign-out-alt"></i>Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

                    </div>
                </div>
            </div>
        </div>
    </header>
   );
}
