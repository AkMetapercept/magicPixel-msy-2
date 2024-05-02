import * as React from 'react';
import Link from './link';
import Sidebar from './sidebar';
import Search from './custom/search/search.jsx';

// ----------logo-----------------
import logoImg from './images/magicPixel.png';
import Search2 from './custom/search/search-2.jsx';
import MediaIcon from './custom/media-icon.jsx';

const toggleSidebar = () => {
  let sidebar = document.querySelector('.sidebar-container');
  const computedStyle = window.getComputedStyle(sidebar);
  const leftValue = computedStyle.getPropertyValue('left');
  if (leftValue == '0px') {
    sidebar.style.left = '-320px';
  } else {
    sidebar.style.left = '0px';
  }
};

const Header = ({ location }) => {
  return (
    <>
      <header>
        <nav className="container-fluid">
          <div className="d-flex justify-content-between ">
            <div className={'navBarHeader'}>
              <i className="fa-solid fa-bars me-3 d-block d-xl-none" onClick={toggleSidebar}></i>
              <Link to={'/'} className={'navBarBrand'}>
                <img className={'img-responsive displayInline'} src={logoImg} alt={'magic pixel'} />
              </Link>
            </div>
            <Search2 />
            <MediaIcon/>
            {/* <Search /> */}
          </div>
        </nav>

        {/* ========for mobile view========= */}
        <div id="navbar" className={'topnav'}>
          <div className={'visibleMobile'}>
            <Sidebar location={location} />
            <hr />
          </div>
        </div>
      </header>
      <div className="fill-header-hight"></div>
    </>
  );
};

export default Header;
