import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/img/lgo-red.png'
// import {
//   faArrowAltCircleRight,
//   faComments,
//   faHandPointRight,
// } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
// import {  Menu } from 'antd';
// import { CaretDownOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';

const Header = () => {
  // const navigate = useNavigate();
  // const [expanded, setExpanded] = useState(false);

  // const handleMenuClick = (e) => {
  //   console.log('Selected language:', e.key);
  // };
  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="en">
  //       English
  //     </Menu.Item>
  //     <Menu.Item key="es">
  //       Español
  //     </Menu.Item>
  //     <Menu.Item key="fr">
  //       Français
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <>
      <header className="header">
        <div id="header-topbar" className="header-topbar-layout1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="topbar-left">
                  <p className="item-paragraph">Not a User?</p>
                  <div className="header-button">
                    <Link to="/">
                      You have to be registered under an institution{" "}
                      <FontAwesomeIcon
                        icon={faArrowRightLong}
                        style={{ color: "#da251e" }}
                      ></FontAwesomeIcon>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <div className="topbar-right">
                  {/* <ul>
                    <li className="topbar-social">
                      <div className="social-icon">
                        <Link href="/"><i className="fab fa-facebook-square"></i></Link>
                        <a href="/"><i className="fab fa-twitter"></i></a>
                        <a href="/"><i className="fab fa-linkedin-in"></i></a>
                        <a href="/"><i className="fab fa-pinterest"></i></a>
                        <a href="/"><i className="fab fa-skype"></i></a>
                      </div>
                    </li>
                  </ul> */}
                  <div className="header-right-button">
                    <Link to="/signin" className="header-btn"> Login </Link>
                    {/* <Link to="/admin-login"  className="header-btn s-up">Administration</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="rt-sticky-placeholder"></div>


        {/* <div id="header-menu" className="header-menu menu-layout1">
          <div className="container">
            <div className="row m-0 p-0 d-flex align-items-center">
              <div className="col-xl-2 col-lg-2">
                <div className="logo-area">
                  <a href="/" className="temp-logo">
                    <div className="lgo-img">
                      <img src="./assets/img/my-img/lgo-red.png" alt="logo" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 d-flex justify-content-center position-static">
                <nav id="dropdown" className="template-main-menu">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/">About Us</a>
                    </li>
                    <li>
                      <a href="/">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-lg-3 d-flex justify-content-end">
                <div className="header-action-layout1">
                  <ul>
                    <li className="header-number">
                      <div className="media d-flex">
                        <div className="item-icon">
                          <FontAwesomeIcon
                            icon={faComments}
                            style={{ color: "#da251e" }}
                          ></FontAwesomeIcon>
                        </div>
                        <div className="media-body">
                          <div className="item-label">Hotline Number</div>
                          <div className="item-number">0904567987</div>
                        </div>
                      </div>
                    </li>
                    <li className="offcanvas-menu-trigger-wrap">
                      <button
                        type="button"
                        className="offcanvas-menu-btn menu-status-open"
                      >
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
        </div> */}

        <nav className="navbar navbar-expand-lg navbar-white text-black navbar-dark">
          <div className="wrapper">

          </div>
          <div className="container-fluid all-show">
            {/* <a className="navbar-brand" href="/">Penton <i className="fa fa-codepen"></i></a> */}
            <div className="logo-area">
              <Link to="/" className="temp-logo">
                <div className="lgo-img">
                  <img src={logo} alt="logo" />
                </div>
              </Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse ms-6 navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto mb-2 text-dark mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" to="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#aboutUs">About us</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#insight">Insight</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#help">Help</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#contact">contact</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/"><i className="fa fa-search"></i></a>
                </li>


              </ul>
              {/* <div className="d-flex flex-column sim">

                  <Dropdown overlay={menu} className="me-3" trigger={['click']}>
                    <Button
                      icon={<GlobalOutlined style={{ fontSize: '24px', color: 'white' }} />} // Increased the icon size
                      shape="square"
                      style={{ width: 'auto', height: '30px', background: "#000" }} // Ensure the button adjusts with text
                    >
                      <span style={{ marginLeft: '8px' }}><CaretDownOutlined className="text-white" /></span>
                    </Button>
                  </Dropdown>


                </div> */}
            </div>
          </div>
        </nav>
      </header>

      {/* <Navbar expanded={expanded} expand="lg" className="navbar-red navbar-dark">
        <Container fluid>
          <Navbar.Brand  href="/">Penton <i className="fa fa-codepen"></i></Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarSupportedContent"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mr-auto mb-2 mb-lg-0">
              <Nav.Link  href="/" className="nav-link active">About us</Nav.Link>
              <Nav.Link  href="/">Products</Nav.Link>
              <Nav.Link  href="/">Services</Nav.Link>
              <Nav.Link  href="/">Events</Nav.Link>
              <Nav.Link  href="/">Contact</Nav.Link>
              <Nav.Link  href="/"><i className="fa fa-search"></i></Nav.Link>
            </Nav>
            <div className="d-flex flex-column sim">
              <span>1 item added to your quote</span>
              <small className="text-primary">view your quote</small>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};

export default Header;
