import React, {useState} from 'react';

import MenuMobile from './MenuMobile';

export default () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <header className="header-mobile d-block d-lg-none">
        <div className="header-mobile__bar">
            <div className="container-fluid">
                <div className="header-mobile-inner">

        {/* logo */}
        <a className="logo" href="index.html">
            <img src="/images/icon/logontc.png" width="45px" alt="NTC" />
        </a>

        {/* tombol menu */}
        <button onClick={handleOpenMenu}
            className={'hamburger hamburger--slider' + (openMenu ? ' is-active':'') }>
            <span className="hamburger-box">
                <i className={openMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
            </span>
        </button>

                </div>
            </div>
        </div>

        {/* menu */}
        <MenuMobile display={openMenu ? 'block' : 'none'}/>

    </header>
   );
}
