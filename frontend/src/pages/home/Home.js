import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from 'antd';
import { ArrowRightOutlined, MailOutlined, PhoneOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { homeImages  } from '../../assets/assests'


const Home = () => {


  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '500px',
    backgroundImage: 'linear-gradient(to right, #fbffff, #f8fcfc, #f5fafa, #f3f7f7, #f0f5f5)',
    color: '#181B1B',
    padding: '0 50px',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto'
  };

  return (
    <>
      <section className="">
        <div className="background-shape6">
          <img src={homeImages.img1} alt="figure" width="404" height="216" />
        </div>
        <div className="container my-5">
          <div className="slider-area slider-layout1">
            {/* <div className="slider-bg-img1" data-sal="zoom-in" data-sal-duration="1500" data-sal-delay="300">
              <img src="./assets/img/figure/figure96.png" alt="figure" />
            </div> */}
            <div className="slider-bg-img2">
              <img src={homeImages.img2} alt="figure" data-sal="slide-up" data-sal-duration="1300" data-sal-delay="700" />
            </div>

            <Carousel autoplay>
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={contentStyle}>
                  <div className="text-left mb-4 mb-md-0">
                    <p className="h5">Empowering Global Trade</p>
                    {/* <h2>A bespoke engineering product</h2> */}
                    <p className='fs-6'>Unlock new opportunities with innovative trade finance solutions tailored for your business growth.</p>
                    <div>
                      <a href="/" className="btn btn-danger mr-3">Read more<ArrowRightOutlined size={20} className='ml-2' /></a>
                      <a href="/" className="btn btn-secondary"><PlayCircleOutlined size={20} className='mr-2 font-bold' />Contact us</a>
                    </div>
                  </div>
                  <div>
                    <img src={homeImages.img3} alt="slider" width="960" height="720" />
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={contentStyle}>
                  <div className="text-left mb-4 mb-md-0">
                    <p className="h5">Seamless Transactions, Unmatched Efficiency</p>
                    {/* <h2>A bespoke engineering product</h2> */}
                    <p className='fs-6'>Streamline your trade operations with our cutting-edge technology and expert financial guidance.</p>
                    <div>
                      <a href="/" className="btn btn-danger mr-3">Read more<ArrowRightOutlined size={20} className='ml-2' /></a>
                      <a href="/" className="btn btn-secondary"><PlayCircleOutlined size={20} className='mr-2 font-bold' />Contact us</a>
                    </div>
                  </div>
                  <div className="background-shape7">
                    <img src={homeImages.img4} alt="slider" width="960" height="720" />
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={contentStyle}>
                  <div className="text-left mb-4 mb-md-0">
                    <p className="h5">Bridging Markets, Building Futures</p>
                    {/* <h2>A bespoke engineering product</h2> */}
                    <p className='fs-6'>Connecting businesses across borders with secure and reliable trade finance services.</p>
                    <div>
                      <a href="/" className="btn btn-danger mr-3">Read more<ArrowRightOutlined size={20} className='ml-2' /></a>
                      <a href="/" className="btn btn-secondary"><PlayCircleOutlined size={20} className='mr-2 font-bold' />Contact us</a>
                    </div>
                  </div>
                  <div>
                  <img src={homeImages.img4} alt="slider" width="960" height="720" />
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={contentStyle}>
                  <div className="text-left mb-4 mb-md-0 w-100">
                    <p className="h5">Target Focus</p>
                    <h2>What does it do?</h2>
                    <p className='fs-6'>Oramsys provides a compact flow for structured trade financing, streamlines and secures the process of obtaining financing for trade transactions, enabling businesses to manage and fund their supply chains efficiently. It provides tools for credit risk assessment, transaction monitoring, and documentation, ensuring transparency and compliance throughout the trade lifecycle.</p>
                    <div>
                      <a href="/" className="btn btn-danger mr-3">Read more<ArrowRightOutlined size={20} className='ml-2' /></a>
                      <a href="/" className="btn btn-secondary"><PlayCircleOutlined size={20} className='mr-2 font-bold' />Contact us</a>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={homeImages.img6} alt="slider" style={imageStyle} />
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={contentStyle}>
                  <div className="text-left mb-4 mb-md-0">
                    <p className="h5">Target Audience</p>
                    <h2>Who is it for?</h2>
                    <p className='fs-6'>Our platform is designed for businesses and financial institutions engaged in structured trade financing, helping them streamline transactions, manage risks, and optimize cash flow.</p>
                    <div>
                      <a href="/" className="btn btn-danger mr-3">Read more<ArrowRightOutlined size={20} className='ml-2' /></a>
                      <a href="/" className="btn btn-secondary"><PlayCircleOutlined size={20} className='mr-2 font-bold' />Contact us</a>
                    </div>
                  </div>
                  <div>
                    <img src={homeImages.img7} alt="slider" style={imageStyle} />
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className="background-shape7">
          <img src={homeImages.img8} alt="figure" width="747" height="256" />
        </div>
        {/* <div className="background-shape8">
          <img src="./assets/img/my-img/figure33.png" alt="figure" width="783" height="439" />
        </div> */}

      </section>

      <section className="financo-activities-wrap1">
        <div className="container">
          <div className="row pt-20">
            <div className="col-lg-4 col-md-6">
              <div className="financo-activities-box1">
                <div className="item-img-round">
                  <img src={homeImages.img9} alt="figure" height="81" width="81" />
                  <div className="item-img">
                    <img src={homeImages.img10} alt="figure" height="45" width="47" />
                  </div>
                </div>
                <h2 className="heading-title"><a href="/" className="text-decoration-none">Tailored Financing Solutions</a></h2>
                <p>We provide customized financial instruments designed to meet the unique needs of your trade transactions </p>
                <div className="item-button">
                  <a href="/" className="item-btn text-decoration-none">+ <span>Read More</span></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="financo-activities-box1">
                <div className="item-img-round">
                  <img src={homeImages.img9} alt="figure" height="81" width="81" />
                  <div className="item-img">
                    <img src={homeImages.img11} alt="figure" height="41" width="45" />
                  </div>
                </div>
                <h2 className="heading-title"><a href="/">Global Trade Expertise</a></h2>
                <p>Our team of specialists leverages extensive industry experience with the use of tecnology to solve your international trade endeavors</p>
                <div className="item-button">
                  <a href="/" className="item-btn">+ <span>Read More</span></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="financo-activities-box1 financo-activities-box3">
                <div className="item-img-round">
                  <img src={homeImages.img9} alt="figure" height="81" width="81" />
                  <div className="item-img">
                    <img src={homeImages.img12} alt="figure" height="45" width="49" />
                  </div>
                </div>
                <h2 className="heading-title"><a href="/">Risk Management Excellence</a></h2>
                <p>Identify, transfer and mitigate trade risks with our comprehensive solutions, ensuring your business stays secure in a volatile market</p>
                <div className="item-button">
                  <a href="/" className="item-btn">+ <span>Read More</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-finnaco-wrap1">
        <div className="background-shape6">
          <img src={homeImages.img13} alt="figure" width="404" height="216" />
        </div>
        <div className="background-shape7">
          <img src={homeImages.img8} alt="figure" width="747" height="256" />
        </div>
        <div className="background-shape8">
          <img src={homeImages.img14} alt="figure" width="783" height="439" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="about-box1">
                <p className="section-subtitle">About Oramsys</p>
                <h2 className="section-title">Who is oramsys and what do we offer?</h2>
                <p>Oramsys is a leading platform specifically designed to facilitate structured trade, providing businesses with robust tools and solutions to manage and streamline their trade processes efficiently. Our platform caters to various industries, offering a comprehensive suite of services that enhance trade operations and promote growth across board.</p>
                <div className="media d-flex">
                  <div className="item-img">
                    <img src={homeImages.img15} alt="figure" width="47" height="71" />
                  </div>
                  <div className="media-body">
                    <h3 className="heading-title"><a href="/">Trade Management Solutions</a></h3>
                    <p>Access to a range of trade financing options tailored to  <br /> meet the specific needs of your business.</p>
                    {/* <p>Secure and efficient payment processing systems to facilitate smooth transactions.</p> */}
                    <p>Transparent, competitive and current trade financing <br /> rates to support your trade activities.</p>
                  </div>
                </div>
                <div className="media d-flex">
                  <div className="item-img">
                    <img src={homeImages.img16} alt="figure" width="51" height="66" />
                  </div>
                  <div className="media-body">
                    <h3 className="heading-title"><a href="/">Risk Management Services</a></h3>
                    <p>Advanced analytics and reporting tools to identify and mitigate potential risks.</p>
                    <p>Insurance options to protect your trade investments <br /> against unforeseen events.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="about-box2">
                <div className="about-img">
                  {/* <!-- <img src="img/my-img/build-skt.png" alt="figure" width="800" height="700"> --> */}
                  {/* <div className="build-img" style="background-image:url(img/my-img/computer.png)"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="consulting-service-wrap1">
        <div className="container">
          <p className="section-subtitle">What We Do</p>
          <div className="row">
            <div className="grd-info grd-info-tw">
              <div className="info-in">
                <div className="consulting-service1">
                  <h2 className="section-title">Transforming  Structured Trade Finance</h2>
                </div>
              </div>
              <div className="info-in">
                <div className="consulting-service2">
                  <p>At <span className='font-bold'>ORAMSYS</span>, we offer a comprehensive suite of services designed to support every aspect of your trade finance needs.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="grd-info">
                <div className="info-in">
                  <div className="consulting-service3"
                  // data-bg-image="./assets/img/my-img/ser.png" width="555" height="299"
                  // style={{backgroundImage:'./assets/img/my-img/ser.png'}}
                  >
                    <div className="media d-flex">
                      <div className="item-img">
                        <img src={homeImages.img17} alt="figure" width="87" height="95" />
                        <div className="service-img">
                          <img src={homeImages.img18} alt="service" width="86" height="94" />
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="title-heading"><a href="/"> Financing Solutions</a></h3>
                        <p>From pre-shipment to post-delivery, we offer financing solutions that cater to every stage of your trade cycle.</p>
                        <div className="item-button">
                          <a href="/" className="item-btn">Read More
                            {/* <i className="fas fa-long-arrow-alt-right"></i> */}
                            <FontAwesomeIcon icon={faArrowRightLong} className="ms-3"></FontAwesomeIcon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-in">
                  <div className="consulting-service3" data-bg-image="img/my-img/ser.png" width="555" height="299">
                    <div className="media d-flex">
                      <div className="item-img">
                        <img src={homeImages.img19} alt="figure" width="76" height="93" />
                        <div className="service-img service-img2">
                          <img src={homeImages.img20} alt="service" width="76" height="93" />
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="title-heading"><a href="/">Risk Mitigation</a></h3>
                        <p>Our risk mitigation strategies protect your business from market volatility and unexpected disruptions.</p>
                        <div className="item-button">
                          <a href="/" className="item-btn">Read More
                            {/* <i className="fas fa-long-arrow-alt-right"></i> */}
                            <FontAwesomeIcon icon={faArrowRightLong} className="ms-3"></FontAwesomeIcon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-in">
                  <div className="consulting-service3" data-bg-image="img/my-img/ser.png" width="555" height="299">
                    <div className="media d-flex">
                      <div className="item-img">
                        <img src={homeImages.img31} alt="figure" width="76" height="93" />
                        <div className="service-img service-img3">
                          <img src={homeImages.img20} alt="service" width="76" height="93" />
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="title-heading"><a href="/">Advisory Services</a></h3>
                        <p>Leverage our expertise with tailored advisory services that guide you through the complexities of global trade.</p>
                        <div className="item-button">
                          <a href="/" className="item-btn">Read More
                            {/* <i className="fas fa-long-arrow-alt-right"></i> */}
                            <FontAwesomeIcon icon={faArrowRightLong} className="ms-3"></FontAwesomeIcon>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-in">
                  <div className="consulting-service3" data-bg-image="img/my-img/ser.png" width="555" height="299">
                    <div className="media d-flex">
                      <div className="item-img">
                        <img src={homeImages.img21} alt="figure" width="78" height="94" />
                        <div className="service-img service-img4">
                          <img src={homeImages.img22} alt="service" width="78" height="94" />
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="title-heading"><a href="/">Trade Facilitation</a></h3>
                        <p>We facilitate smoother transactions with our advanced technology platforms and strategic partnerships.</p>
                        <div className="item-button">
                          <a href="/" className="item-btn">Read More
                            {/* <i className="fas fa-long-arrow-alt-right"></i> */}
                            <FontAwesomeIcon icon={faArrowRightLong} className="ms-3"></FontAwesomeIcon>
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
      </section>

      {/* <section className="progress-bar-wrap1">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-lg-6 col-md-12 p-0">
              <div className="progress-bar-box1 progress-bar-box3">
                <h2 className="section-title">Register Now </h2>
                <p> All the tools required for a structured trade transaction in one placeful</p>
                <div className="item-button">
                  <a href="/" className="item-btn">Register and begin
                    <i className="fas fa-long-arrow-alt-right"></i>
                    <FontAwesomeIcon icon={faArrowRightLong} className="ms-3"></FontAwesomeIcon>
                  </a>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="progress-box">
                      <div className="circle-progress">
                        <span>95%</span>
                        <label>Investment</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 p-0">
              <div className="progress-bar-box2 progress-bar-box3">
                <div className="background-image5">
                  <img src="./assets/img/figure/figure38.png" alt="figure" width="475" height="553" />
                </div>
                <div className="item-img">
                  <div className="rgt-img"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      <section className="banner-wrap1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-box1">
                <div className="item-img">
                  {/* <!-- <img src="img/my-img/bot-bld.jpg" alt="blog" width="586" height="195"> --> */}
                  <div className="btm-img"></div>
                </div>
                <div className="bannar-details">
                  <h3 className="heading-title">Need Any Help?</h3>
                  <div className="contact-box2">
                    <div className="item-icon-box">
                      <div className="item-icon"><PhoneOutlined /></div>
                      <div className="banner-content">
                        <div className="item-hotline">Hotline</div>
                        <div className="item-number">001234 6789</div>
                      </div>
                    </div>
                    <div className="item-icon-box item-icon-box2">
                      <div className="item-icon"><MailOutlined /></div>
                      <div className="banner-content">
                        <div className="item-hotline">Send Us Email</div>
                        <div className="item-number">info@oramsys.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="project-wrap-layout1">
        <div className="container">
          <p className="section-subtitle">What do we offer?</p>
          <div className="row">
            <div className="col-lg-5">
              <div className="project-box1">
                <h2 className="section-title">What you get from Oramsys:</h2>
              </div>
            </div>
            <div className="col-lg-7">
              {/* <div className="project-box2">
                <p>Bookan unknown printer took a galley of type and scrambled make It has survived not only five centuries.Lorem ipsum dolor sitam consectetur adipiscg sedo eiusmod tempor incididuntlabore dolor ipsum dolor sit amet, consectetur.</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div className="portfolio-box1">
                <div className="item-img">
                  <a href="/">
                    {/* <!-- <img src="img/blog/blog5.jpg" alt="blog" width="570" height="650"> --> */}
                    <div className="blg-img"></div>
                  </a>
                  <div className="item-content">
                    <div className="item-number">01</div>
                    <p className="heading-subtitle"></p>
                    <h3 className="heading-title">Minimizing Credit Losses: </h3>
                    <p className="portfolio-para">The Oramsys platform has been designed to help financial institutions to minimize credit losses by improving the structure used for transactions. It achieves this through the knowledge that is embedded in the system as well as standardization of certain key processes that enhance decision-making.</p>
                    <div className="item-button">
                      <a href="/" className="item-btn">+ <span>Read More</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div className="portfolio-box1">
                <div className="item-img">
                  <a href="/">
                    <div className="blg-img bg-2" ></div>
                  </a>
                  <div className="item-content">
                    <div className="item-number">02</div>
                    <p className="heading-subtitle"></p>
                    <h3 className="heading-title">Improved staff productivity: </h3>
                    <p className="portfolio-para">The credit officers and other processing officers involved in structuring trade finance transactions will be more productive and efficient as they will have access to valuable insights and intelligence encoded into the system. It is also expected to reduce staffing costs across the credit value chain.</p>
                    <div className="item-button">
                      <a href="/" className="item-btn">+ <span>Read More</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div className="portfolio-box1">
                <div className="item-img">
                  <a href="/">
                    <div className="blg-img bg-3"></div>
                  </a>
                  <div className="item-content">
                    <div className="item-number">03</div>
                    <p className="heading-subtitle"></p>
                    <h3 className="heading-title">Access to trade counterparties </h3>
                    <p className="portfolio-para">Oramsys platform incorporates all stakeholders involved in completing a trade finance transaction. This includes locations of ports, airports, warehouses and logistics providers, enhancing transparency within the process. The platform ensures accurate documentation and adherence to regulatory requirements which minimizes errors and delays.</p>
                    <div className="item-button">
                      <a href="/" className="item-btn">+ <span>Read More</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 p-0">
              <div className="portfolio-box1">
                <div className="item-img">
                  <a href="/">
                    <div className="blg-img bg-4"></div>
                  </a>
                  <div className="item-content">
                    <div className="item-number">04</div>
                    <p className="heading-subtitle"></p>
                    <h3 className="heading-title">Data-Driven Decision-Making:</h3>
                    <p className="portfolio-para">The Oramsys platform enables the collection of comprehensive and accurate data, providing valuable insights that can inform decision- making processes. By harnessing the power of data analytics, financial institutions can optimize their operations and manage risks effectively.</p>
                    <div className="item-button">
                      <a href="/" className="item-btn">+ <span>Read More</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="company-profit-wrap1">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="company-profit-box1">
                {/* <p className="section-subtitle">Visualize Your Financial Path</p> */}
                <h4 className="section-title">Visualize Your Financial Path</h4>
                <p>Our interactive finance graph provides insights into your financial health and trade opportunities, helping you make informed decisions.</p>
                <div className="item-button">
                  <a href="/" className="item-btn">Join Now<i className="fas fa-long-arrow-alt-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="company-profit-box2">
                <div className="item-img">
                  <img src={homeImages.img23} alt="figure" width="586" height="283" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="call-back-wrap">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-5 col-md-12">
              <div className="call-back-box1">
                <h3 className="section-title">Request a Call Back</h3>
                <form className="message-box">
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <input type="text" className="form-control" id="inputAddress1" placeholder="Name" />
                    </div>
                    <div className="form-group col-lg-12">
                      <input type="text" className="form-control" id="inputAddress2" placeholder="Email" />
                    </div>
                    <div className="form-group col-lg-12">
                      <input type="text" className="form-control" id="inputAddress3" placeholder="Phone" />
                    </div>
                    <div className="form-group col-lg-12">
                      <textarea name="comment" id="message" className="form-control" placeholder="Message" cols="30" rows="4"></textarea>
                    </div>
                    <div className="form-group col-lg-12">
                      <input type="submit" className="item-btn" value="Submit Now" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="call-back-box2">
                <div className="item-img">
                  <img src={homeImages.img24} alt="blog" width="690" height="582" />
                  <div className="call-img">
                    <img src={homeImages.img25} alt="figure" width="145" height="295" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* <section className="location-wrap-layout1">
        <div className="container">
          <div className="item-heading">
            <p className="item-subtitle">Where are our services utilized?</p>
            <h2 className="section-heading">Lorem ipsum dolor sit amet.</h2>
            <div style={{ height: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: '48px', fontWeight: "bold" }}>Coming soon.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="location-box">
                <div className="item-img">
                  <img src="./assets/img/figure/figure10.png" alt="figure" width="805" height="377" />
                  <div className="map-icon">
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className=""></FontAwesomeIcon>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className=""></FontAwesomeIcon>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className=""></FontAwesomeIcon>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className=""></FontAwesomeIcon>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className=""></FontAwesomeIcon>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="testimonial-wrap1">
        <div className="container">
          <div className="testimonial-box1">
            <div className="slick-carousel slick-slider" data-slick='{"arrows": true, "slidesToShow": 1, "autoplay": false, "vertical": true}'>
              <div className="slick-slide">
                <div className="media">
                  <div className="item-img">
                    <img src={homeImages.img26} alt="blog" width="285" height="276" />
                    <div className="shape-box">Robert Smith CEO</div>
                  </div>
                  <div className="media-body">
                    <blockquote className="item-quotation">“ when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.”</blockquote>
                    <div className="quotation-marks"><i className="fas fa-quote-right"></i></div>
                  </div>
                </div>
              </div>
              <div className="slick-slide">
                <div className="media">
                  <div className="item-img">
                    <img src={homeImages.img37} alt="blog" width="285" height="276" />
                    <div className="shape-box">Robert Smith CEO</div>
                  </div>
                  <div className="media-body">
                    <blockquote className="item-quotation">“ when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.”</blockquote>
                    <div className="quotation-marks"><i className="fas fa-quote-right"></i></div>
                  </div>
                </div>
              </div>
              <div className="slick-slide">
                <div className="media">
                  <div className="item-img">
                    <img src={homeImages.img28} alt="blog" width="285" height="276" />
                    <div className="shape-box">Robert Smith CEO</div>
                  </div>
                  <div className="media-body">
                    <blockquote className="item-quotation">“ when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.”</blockquote>
                    <div className="quotation-marks"><i className="fas fa-quote-right"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="personal-info-wrap1">
        <div className="container-fluid">
          <div className="row align-items-center" style={{ justifyContent: "space-between" }}>
            <div className="col-xl-4 col-lg-8">
              <div className="personal-details">
                <div className="row">
                  <div className="col-xl-6 col-md-6 col-sm-6">
                    <div className="personal-info-box">
                      <h2 className="section-title">Lorem ipsum</h2>
                      <ul className="information-list">
                        <li>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-6">
                    <div className="personal-info-box">
                      <h2 className="section-title">Lorem ipsum</h2>
                      <ul className="information-list">
                        <li>
                          Oramsys is a Software as a Service Platform which is provisioned per institution based on your individual and internal use cases.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-6">
                    <div className="personal-info-box">
                      <h2 className="section-title">Lorem ipsum</h2>
                      <ul className="information-list">
                        <li>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-6">
                    <div className="personal-info-box">
                      <h2 className="section-title">Lorem ipsum</h2>
                      <ul className="information-list">
                        <li>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-4 d-xl-block d-none p-0">
              <div className="location-img">
                <div id="googleMap" className="google-map"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="figure-img1">
          <img src={homeImages.img29} alt="figure" width="872" height="724" />
        </div>
        <div className="figure-img2">
          <img src={homeImages.img30} alt="figure" width="487" height="269" />
        </div>
      </section>
    </>
  )
}

export default Home