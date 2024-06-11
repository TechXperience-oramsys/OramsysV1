import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleRight, faComments, faHandPointRight } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  // useEffect(() => {



  //   window.on('scroll', function () {

  //     // Back Top Button
  //     if (window.scrollTop() > 500) {
  //       '.scrollup'.addClass('back-top');
  //     } else {
  //       '.scrollup'.removeClass('back-top');
  //     }
  //     // Sticky Header
  //     if ('body'.hasClass('sticky-header')) {
  //       var stickyPlaceHolder = "#rt-sticky-placeholder",
  //         menu = "#header-menu",
  //         menuH = menu.outerHeight(),
  //         topHeaderH = '#header-topbar'.outerHeight() || 0,
  //         middleHeaderH = '#header-middlebar'.outerHeight() || 0,
  //         targrtScroll = topHeaderH + middleHeaderH;
  //       if (window.scrollTop() > targrtScroll) {
  //         menu.addClass('rt-sticky');
  //         stickyPlaceHolder.height(menuH);
  //       } else {
  //         menu.removeClass('rt-sticky');
  //         stickyPlaceHolder.height(0);
  //       }
  //     }
  //   });
  // })

  return (
    <header className="header">
      <div id="header-topbar" className="header-topbar-layout1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="topbar-left">
                <p className="item-paragraph">Not a User?</p>
                <div className="header-button">
                  <a href="/">You have to be registered under an institution <FontAwesomeIcon icon={faArrowRightLong} style={{ color: "#da251e" }}></FontAwesomeIcon></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <div className="topbar-right">
                {/* <ul>
                  <li className="topbar-social">
                    <div className="social-icon">
                      <a href="/"><i className="fab fa-facebook-square"></i></a>
                      <a href="/"><i className="fab fa-twitter"></i></a>
                      <a href="/"><i className="fab fa-linkedin-in"></i></a>
                      <a href="/"><i className="fab fa-pinterest"></i></a>
                      <a href="/"><i className="fab fa-skype"></i></a>
                    </div>
                  </li>
                </ul> */}
                <div className="header-right-button">
                  {/* <a onClick={() =>navigate('/signup') } className="header-btn">Register Now</a> */}
                  <a onClick={() => navigate('/admin-login')} className="header-btn s-up">Administration</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="rt-sticky-placeholder"></div>
      <div id="header-menu" className="header-menu menu-layout1">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-xl-2 col-lg-2">
              <div className="logo-area">
                <a href="/" className="temp-logo">
                  {/* <!-- <img src="img/logo/logo2.png" width="180" height="45" alt="logo" className="img-fluid"> --> */}
                  <div className="lgo-img">
                    <img src="./assets/img/my-img/lgo-red.png" alt="logo" />
                  </div>
                  {/* <div className="lgo-img" style={{backgroundImage:url('img/my-img/lgo-red.png')}}></div> */}
                </a>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 d-flex justify-content-center position-static">
              <nav id="dropdown" className="template-main-menu">
                <ul>
                  {/* <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="/">Contact</a>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-lg-3 d-flex justify-content-end">
              <div className="header-action-layout1">
                <ul>
                  <li className="header-number">
                    <div className="media d-flex">
                      <div className="item-icon">
                        <FontAwesomeIcon icon={faComments} style={{ color: "#da251e" }}></FontAwesomeIcon>
                      </div>
                      <div className="media-body">
                        <div className="item-label">Hotline Number</div>
                        <div className="item-number">0904567987</div>
                      </div>
                    </div>
                  </li>
                  <li className="offcanvas-menu-trigger-wrap">
                    <button type="button" className="offcanvas-menu-btn menu-status-open">
                      <span className="btn-icon-wrap">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header