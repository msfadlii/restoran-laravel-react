import React, { useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "../../assets/landing_page/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/landing_page/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/landing_page/vendor/aos/aos.css";
import "../../assets/landing_page/vendor/glightbox/css/glightbox.min.css";
import "../../assets/landing_page/vendor/swiper/swiper-bundle.min.css";
import "../../assets/landing_page/css/main.css";
import image1 from "../../assets/landing_page/img/eventsimg/events-1.jpg";
import image2 from "../../assets/landing_page/img/eventsimg/events-2.jpg";
import image3 from "../../assets/landing_page/img/eventsimg/events-3.jpg";
import image4 from "../../assets/landing_page/img/eventsimg/events-4.jpg";

function LandingPage() {
  useEffect(() => {
    AOS.init();
    const swiper = new Swiper(".init-swiper", {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
      },
    });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="index-page">
      <header
        id="header"
        className="header d-flex align-items-center sticky-top"
      >
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            <h1 className="sitename">Yummy</h1>
            <span>.</span>
          </Link>
          <nav
            id="navmenu"
            className="navmenu d-flex justify-content-between w-100"
          >
            <ul className="d-flex list-unstyled mb-0">
              <li>
                <a href="#hero" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>

            <ul className="d-flex list-unstyled mb-0 ml-auto">
              <li>
                <Link href="/book-meja" className="btn-getstarted">
                  Booking Meja
                </Link>
              </li>
              <li>
                <Link href="" className="btn-getstarted">
                  Reservasi Anda
                </Link>
              </li>
              <li>
                <Link href="/logout" className="btn-getstarted">
                  Logout
                </Link>
              </li>
            </ul>

            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section light-background">
          <div className="container">
            <div className="row gy-4 justify-content-center justify-content-lg-between">
              <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  Enjoy Your Healthy
                  <br />
                  Delicious Food
                </h1>
                <p data-aos="fade-up" data-aos-delay="100">
                  We are a team of talented designers making websites with
                  Bootstrap
                </p>
                <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                  <a href="#book-a-table" className="btn-get-started">
                    Book a Table
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=13ARO0HDZsQ&pp=ygUMc2FmZSBuIHNvdW5k"
                    className="glightbox btn-watch-video d-flex align-items-center"
                  >
                    <i className="bi bi-play-circle"></i>
                    <span>Watch Video</span>
                  </a>
                </div>
              </div>
              <div
                className="col-lg-5 order-1 order-lg-2 hero-img"
                data-aos="zoom-out"
              >
                <img
                  src="/assets/landing_page/img/hero-img.png"
                  className="img-fluid animated"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container section-title" data-aos="fade-up">
            <h2>
              About Us
              <br />
            </h2>
            <p>
              <span>Learn More</span>{" "}
              <span className="description-title">About Us</span>
            </p>
          </div>
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-12"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check-circle-fill"></i>{" "}
                      <span>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i>{" "}
                      <span>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit.
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i>{" "}
                      <span>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        trideta storacalaperda mastiro dolore eu fugiat nulla
                        pariatur.
                      </span>
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident
                  </p>

                  <div className="position-relative mt-4">
                    <img
                      src="/assets/landing_page/img/about-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <a
                      href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                      className="glightbox pulsating-play-btn"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="why-us section light-background">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="why-box">
                  <h3>Why Choose Yummy</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Duis aute irure dolor in reprehenderit Asperiores
                    dolores sed et. Tenetur quia eos. Autem tempore quibusdam
                    vel necessitatibus optio ad corporis.
                  </p>
                  <div className="text-center">
                    <a href="#" className="more-btn">
                      <span>Learn More</span>{" "}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div
                  className="row gy-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="col-xl-4">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-clipboard-data"></i>
                      <h4>Corporis voluptates officia eiusmod</h4>
                      <p>
                        Consequuntur sunt aut quasi enim aliquam quae harum
                        pariatur laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-gem"></i>
                      <h4>Ullamco laboris ladore lore pan</h4>
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-inboxes"></i>
                      <h4>Labore consequatur incidid dolore</h4>
                      <p>
                        Aut suscipit aut cum nemo deleniti aut omnis. Doloribus
                        ut maiores omnis facere
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="menu" className="menu section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Our Menu</h2>
            <p>
              <span>Check Our</span>{" "}
              <span className="description-title">Yummy Menu</span>
            </p>
          </div>
          <div className="container">
            <ul
              className="nav nav-tabs d-flex justify-content-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-starters"
                >
                  <h4>Starters</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-breakfast"
                >
                  <h4>Breakfast</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-lunch"
                >
                  <h4>Lunch</h4>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-dinner"
                >
                  <h4>Dinner</h4>
                </a>
              </li>
            </ul>
            <div
              className="tab-content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="tab-pane fade active show" id="menu-starters">
                <div className="tab-header text-center">
                  <p>Menu</p>
                  <h3>Starters</h3>
                </div>

                <div className="row gy-5">
                  {menuItems.map((item, index) => (
                    <div className="col-lg-4 menu-item" key={index}>
                      <a href={item.image} className="glightbox">
                        <img
                          src={item.image}
                          className="menu-img img-fluid"
                          alt={item.title}
                        />
                      </a>
                      <h4>{item.title}</h4>
                      <p className="ingredients">{item.ingredients}</p>
                      <p className="price">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-pane fade" id="menu-breakfast">
                <div className="tab-header text-center">
                  <p>Menu</p>
                  <h3>Breakfast</h3>
                </div>
                <div className="row gy-5"></div>
              </div>
              <div className="tab-pane fade" id="menu-lunch">
                <div className="tab-header text-center">
                  <p>Menu</p>
                  <h3>Lunch</h3>
                </div>
                <div className="row gy-5"></div>
              </div>
              <div className="tab-pane fade" id="menu-dinner">
                <div className="tab-header text-center">
                  <p>Menu</p>
                  <h3>Dinner</h3>
                </div>
                <div className="row gy-5"></div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="testimonials section light-background"
        >
          <div className="container section-title" data-aos="fade-up">
            <h2>TESTIMONIALS</h2>
            <p>
              What Are They{" "}
              <span className="description-title">Saying About Us</span>
            </p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper init-swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left"></i>
                            <span>
                              Proin iaculis purus consequat sem cure digni ssim
                              donec porttitora entum suscipit rhoncus.
                              Accusantium quam, ultricies eget id, aliquam eget
                              nibh et. Maecen aliquam, risus at semper.
                            </span>
                            <i className="bi bi-quote quote-icon-right"></i>
                          </p>
                          <h3>Saul Goodman</h3>
                          <h4>Ceo &amp; Founder</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          src="/assets/landing_page/img/testimonials/testimonials-1.jpg"
                          className="img-fluid testimonial-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left"></i>
                            <span>
                              Export tempor illum tamen malis malis eram quae
                              irure esse labore quem cillum quid cillum eram
                              malis quorum velit fore eram velit sunt aliqua
                              noster fugiat irure amet legam anim culpa.
                            </span>
                            <i className="bi bi-quote quote-icon-right"></i>
                          </p>
                          <h3>Sara Wilsson</h3>
                          <h4>Designer</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          src="/assets/landing_page/img/testimonials/testimonials-2.jpg"
                          className="img-fluid testimonial-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left"></i>
                            <span>
                              Enim nisi quem export duis labore cillum quae
                              magna enim sint quorum nulla quem veniam duis
                              minim tempor labore quem eram duis noster aute
                              amet eram fore quis sint minim.
                            </span>
                            <i className="bi bi-quote quote-icon-right"></i>
                          </p>
                          <h3>Jena Karlis</h3>
                          <h4>Store Owner</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          src="/assets/landing_page/img/testimonials/testimonials-3.jpg"
                          className="img-fluid testimonial-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left"></i>
                            <span>
                              Fugiat enim eram quae cillum dolore dolor amet
                              nulla culpa multos export minim fugiat minim velit
                              minim dolor enim duis veniam ipsum anim magna sunt
                              elit fore quem dolore labore illum veniam.
                            </span>
                            <i className="bi bi-quote quote-icon-right"></i>
                          </p>
                          <h3>John Larson</h3>
                          <h4>Entrepreneur</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          src="/assets/landing_page/img/testimonials/testimonials-4.jpg"
                          className="img-fluid testimonial-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section id="events" className="events section">
          <div
            className="container-fluid"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="swiper init-swiper">
              <div className="swiper-wrapper">
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{ backgroundImage: `url(${image1})` }} // Ensure the correct path
                >
                  <h3>Custom Parties</h3>
                  <div className="price align-self-start">$99</div>
                  <p className="description">
                    Quo corporis voluptas ea ad. Consectetur inventore sapiente
                    ipsum voluptas eos omnis facere. Enim facilis veritatis id
                    est rem repudiandae nulla expedita quas.
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{ backgroundImage: `url(${image2})` }}
                >
                  <h3>Private Parties</h3>
                  <div className="price align-self-start">$289</div>
                  <p className="description">
                    In delectus sint qui et enim. Et ab repudiandae inventore
                    quaerat doloribus. Facere nemo vero est ut dolores ea
                    assumenda et. Delectus saepe accusamus aspernatur.
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{ backgroundImage: `url(${image3})` }} // Ensure the correct path
                >
                  <h3>Birthday Parties</h3>
                  <div className="price align-self-start">$499</div>
                  <p className="description">
                    Laborum aperiam atque omnis minus omnis est qui assumenda
                    quos. Quis id sit quibusdam. Esse quisquam ducimus officia
                    ipsum ut quibusdam maxime. Non enim perspiciatis.
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{ backgroundImage: `url(${image4})` }} // Ensure the correct path
                >
                  <h3>Wedding Parties</h3>
                  <div className="price align-self-start">$899</div>
                  <p className="description">
                    Laborum aperiam atque omnis minus omnis est qui assumenda
                    quos. Quis id sit quibusdam. Esse quisquam ducimus officia
                    ipsum ut quibusdam maxime. Non enim perspiciatis.
                  </p>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
      </main>
      <script src="../../assets/landing_page/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="../../assets/landing_page/vendor/php-email-form/validate.js"></script>
      <script src="../../assets/landing_page/vendor/aos/aos.js"></script>
      <script src="../../assets/landing_page/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="../../assets/landing_page/vendor/purecounter/purecounter_vanilla.js"></script>
      <script src="../../assets/landing_page/vendor/swiper/swiper-bundle.min.js"></script>
      <script src="../../assets/landing_page/js/main.js"></script>
    </div>
  );
}

const menuItems = [
  {
    title: "Magnam Tiste",
    ingredients: "Lorem, deren, trataro, filede, nerada",
    price: "$5.95",
    image: "../../assets/landing_page/img/menu/menu-item-1.png",
  },
  {
    title: "Aut Luia",
    ingredients: "Lorem, deren, trataro, filede, nerada",
    price: "$14.95",
    image: "../../assets/landing_page/img/menu/menu-item-2.png",
  },
  {
    title: "Est Eligendi",
    ingredients: "Lorem, deren, trataro, filede, nerada",
    price: "$8.95",
    image: "../../assets/landing_page/img/menu/menu-item-3.png",
  },
  {
    title: "Eos Luibusdam",
    ingredients: "Lorem, deren, trataro, filede, nerada",
    price: "$12.95",
    image: "../../assets/landing_page/img/menu/menu-item-4.png",
  },
  {
    title: "Laboriosam Direva",
    ingredients: "Lorem, deren, trataro, filede, nerada",
    price: "$9.95",
    image: "../../assets/landing_page/img/menu/menu-item-5.png",
  },
  {
    title: "Laboriosam Direva",
    ingredients: "Lorem, deren, trataro, filede, nerada",
    price: "$12.95",
    image: "../../assets/landing_page/img/menu/menu-item-6.png",
  },
];

export default LandingPage;
