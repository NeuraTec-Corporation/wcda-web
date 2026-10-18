"use client";

import $ from "jquery";
import { useEffect, useRef } from "react";

import aboutImage from "../../reference-html/img/about.jpg";
import service01 from "../../reference-html/img/services/01.jpg";
import service02 from "../../reference-html/img/services/02.jpg";
import service03 from "../../reference-html/img/services/03.jpg";
import service04 from "../../reference-html/img/services/04.jpg";
import service05 from "../../reference-html/img/services/05.jpg";
import service06 from "../../reference-html/img/services/06.jpg";

const services = [
  {
    title: "Cleaning & Prevention",
    image: service01.src,
    href: "services-details-CleaningPrevention.html",
  },
  {
    title: "Family Dentistry",
    image: service02.src,
    href: "services-details-FamilyDentistry.html",
  },
  {
    title: "Children's Dentistry",
    image: service03.src,
    href: "services-details-ChildrensDentistry.html",
  },
  {
    title: "Cosmetic Dentistry",
    image: service04.src,
    href: "services-details-CosmeticDentistry.html",
  },
  {
    title: "Tooth Replacement",
    image: service05.src,
    href: "services-details-ToothReplacement.html",
  },
  {
    title: "Extractions & Preservation",
    image: service06.src,
    href: "services-details-ExtractionsPreservation.html",
  },
  {
    title: "Invisalign®",
    image: service01.src,
    href: "services-details-Invisalign.html",
  },
  {
    title: "Oral Appliances",
    image: service02.src,
    href: "services-details-OralAppliances.html",
  },
  {
    title: "Holistic Services",
    image: service03.src,
    href: "services-details-HolisticServices.html",
  },
  {
    title: "Dental Implants - Cranford",
    image: service04.src,
    href: "services-details-DentalImplantsCranford.html",
  },
] as const;

function useOriginalSectionBehavior(
  rootRef: React.RefObject<HTMLElement | null>,
  carouselRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const carousel = carouselRef.current;
    if (!root || !carousel) return;

    let disposed = false;
    let animationFrame = 0;
    let carouselInitialized = false;

    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= viewportHeight && rect.top <= viewportHeight) ||
        (rect.top >= 0 && rect.bottom <= viewportHeight)
      );
    };

    const animateVisibleElements = () => {
      root.querySelectorAll<HTMLElement>(".wow, .reveal-effect").forEach((element) => {
        if (!isInViewport(element)) return;
        const delay = element.dataset.wowDelay;
        if (delay) element.style.animationDelay = delay;
        element.classList.add("animated");
      });
      animationFrame = window.requestAnimationFrame(animateVisibleElements);
    };

    window.$ = $;
    window.jQuery = $;
    animationFrame = window.requestAnimationFrame(animateVisibleElements);

    void import("owl.carousel").then(() => {
      if (disposed || !carousel.isConnected) return;
      const $carousel = $(carousel);
      if ($carousel.hasClass("owl-loaded")) return;
      $carousel.owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        touchDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: true,
        nav: false,
        navText: [
          "<span class='lnr ti-angle-left'></span>",
          "<span class='lnr ti-angle-right'></span>",
        ],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      });
      carouselInitialized = true;
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      if (carouselInitialized) {
        $(carousel).trigger("destroy.owl.carousel");
      }
    };
  }, [carouselRef, enabled, rootRef]);
}

export default function AboutServicesHomologation({
  managedByLegacyRuntime = false,
}: {
  managedByLegacyRuntime?: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  useOriginalSectionBehavior(rootRef, carouselRef, !managedByLegacyRuntime);

  return (
    <main ref={rootRef}>
      <div className="about section-padding">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5 col-md-12 mb-30">
              <div className="section-subtitle wow zoomIn" data-wow-delay=".1s">
                <i className="icon" /> About us
              </div>
              <div className="section-title wow zoomIn" data-wow-delay=".2s">
                Your Trusted Partner for <span>Dental Health</span>
              </div>
              <p className="wow fadeInUp mb-25" data-wow-delay=".3s">
                Dr. Jonnathan Matute is a dedicated general dentist committed to high-quality,
                patient-centered care. He earned his Doctor of Dental Medicine from Rutgers School
                of Dental Medicine in 2020 and completed a General Practice Residency at Mountainside
                Hospital in Montclair, NJ. Born in Ecuador, he moved to the U.S. in 2010 and earned
                his Bachelor&apos;s in Biology from Kean University. Dr. Matute has advanced training
                in implant dentistry, clear aligner therapy, and esthetic dentistry, and has served
                in leadership roles as primary dentist and managing doctor. He gives back through
                annual dental outreach in the Dominican Republic and serves as a Board Member of
                World of Smiles and with the New York Academy of Dentistry. His combination of
                clinical excellence, leadership, and genuine care makes him a trusted provider in
                the community.
              </p>
              <ul className="page-list list-unstyled wow fadeInUp" data-wow-delay=".4s">
                <li>
                  <div className="page-list-icon">
                    <i className="dental-icon-asset-15" />
                  </div>
                  <div className="page-list-text">
                    <p>Experienced Dentist</p>
                  </div>
                </li>
                <li>
                  <div className="page-list-icon">
                    <i className="dental-icon-asset-25" />
                  </div>
                  <div className="page-list-text">
                    <p>Affordable Pricing</p>
                  </div>
                </li>
              </ul>
              <a href="about.html" className="durubtn2 wow fadeInUp" data-wow-delay=".5s">
                <span className="text-wrapper">
                  <span className="text slide-up">Read more</span>
                  <span className="text slide-down">Read more</span>
                </span>
                <i className="fa-regular fa-arrow-up-right ml-10" />
              </a>
            </div>
            <div className="col-lg-4 offset-lg-1 col-md-12 mb-25">
              <div className="item">
                <div className="reveal-effect" style={{ overflow: "visible" }}>
                  <img
                    src={aboutImage.src}
                    className="img-fluid"
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "120%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
                <div className="icon">
                  <a href="about.html" className="circle-button-overlay wow zoomIn">
                    <div className="circle-button in-bord hover-anim">
                      <div className="rotate-circle">
                        <svg className="textcircle" viewBox="0 0 500 500">
                          <defs>
                            <path
                              id="textcircle"
                              d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                            />
                          </defs>
                          <text>
                            <textPath href="#textcircle" startOffset="0">
                              {" "}
                              Free dental exam and x-ray{" "}
                            </textPath>
                          </text>
                        </svg>
                      </div>
                      <div className="in-circle text-center">
                        <i className="dental-icon-asset-8" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-25">
              <div className="wow imago">
                <img
                  src="img/about2.jpg"
                  className="img-fluid mb-25 br-20"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="wow imago">
                <img
                  src="img/about3.jpg"
                  className="img-fluid br-20"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="services3 section-padding bg-lightblue">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="section-subtitle bg-white wow zoomIn" data-wow-delay=".1s">
                <i className="icon" /> Our services
              </div>
              <div className="section-title wow zoomIn" data-wow-delay=".2s">
                Dental Care <span>We Provide</span>
              </div>
              <p>
                We provide complete dental care, from check-ups and cleanings to restorative and
                cosmetic treatments.
              </p>
              <a href="about.html" className="durubtn2 wow fadeInUp" data-wow-delay=".5s">
                <span className="text-wrapper">
                  <span className="text slide-up">All services</span>
                  <span className="text slide-down">All services</span>
                </span>
                <i className="fa-regular fa-arrow-up-right ml-10" />
              </a>
            </div>
            <div className="col-lg-8 offset-lg-1 col-md-12">
              <div className="services3-container">
                <div ref={carouselRef} className="owl-carousel owl-theme">
                  {services.map((service) => (
                    <div className="item" key={service.title}>
                      <div className="img">
                        <img src={service.image} alt="" />
                      </div>
                      <div className="text-overlay">
                        <h3>{service.title}</h3>
                      </div>
                      <div className="icon">
                        <a href={service.href} className="arrow" aria-label={service.title}>
                          <span className="ti-arrow-top-right" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
