import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import { SidebarContextProvide } from '../context/sidebarContext.jsx';
import Breadcrumb from './custom/breadcrumb/breadcrumb.jsx';
import Header from './Header.js';
import HomeBanner from './home-banner.js';
import Footer from './footer/footer.js';

const LayoutOther = ({ children, location, edges }) => {
  const sidebarRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        let sidebar = sidebarRef.current;
        const computedStyle = window.getComputedStyle(sidebar);
        const leftValue = computedStyle.getPropertyValue('left');
        const position = computedStyle.getPropertyValue('position');
        if (leftValue == '0px' && position == 'fixed') {
          sidebar.style.left = '-320px';
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <SidebarContextProvide edges={edges}>
      <Header location={location} />    
      {/* {displayBanner && <HomeBanner />} */}
      {/* <div className="landing-container">
          <div>
            <h1>Magic Pixel</h1>
            <input type="text" className="search-bar" placeholder="Search..." />
          </div>
        </div> */}

      <MDXProvider components={mdxComponents}>
        <section className="container-fluid">
          <div className="row">
            <div className="sidebar-container" ref={sidebarRef}>
              <Sidebar location={location} />
            </div>

            <div className="col">
              <main>
                <Breadcrumb location={location} key={location.pathname} />
                {children}
              </main>
              {/* <Footer /> */}
            </div>

            <div className="d-none d-lg-block" style={{ width: '300px' }}>
              <RightSidebar location={location} />
            </div>
          </div>
        </section>
      </MDXProvider>
    </SidebarContextProvide>
  );
};

export default LayoutOther;
