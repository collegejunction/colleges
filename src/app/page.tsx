"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Import images
import notes from "./img/notes (1).png";
import college from "./img/user.png";
import photo from "./img/play.png";
import unlock from "./img/unlock.png";
import insta from "./img/instagram.png";
import linkedin from "./img/linkedin.png";
import instaWhite from "./img/insta_white.png";
import facebook from "./img/facebook.png";

// Team Photos
import aaryan from "./img/team/aaryan.png";
import satyam from "./img/team/satyam.png";
import shivam from "./img/team/shivam (1).png";

// Navbar import
import Navbar from "./components/Navbar/page";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // GSAP Animations
    gsap.from(".hero-content h1", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
    gsap.from(".hero-content p", { opacity: 0, y: 50, duration: 1, delay: 0.3, ease: "power2.out" });
    gsap.from(".btn", { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.6, ease: "back.out(1.7)" });

    document.querySelectorAll<HTMLElement>(".feature div").forEach((box, i) => {
      gsap.from(box, {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: i * 0.3,
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Navbar scroll effect
    const handleScroll = () => {
      const heroHeight = document.querySelector(".hero")?.clientHeight || 0;
      setScrolled(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <div className="heros">
        <Navbar scrolled={scrolled} />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>College Junction</h1>
            <p>Empowering Students with AI for Smarter Learning</p>
            <Link href="#" className="start">
              Get Started →
            </Link>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className="feature">
        {[
          { img: notes, title: "Educational Notes", desc: "Access detailed notes and enhance your learning experience today!", link: "/components/notes" },
          { img: college, title: "College Finder", desc: "Leverage our AI to find the best colleges and courses tailored to you.", link: "/components/college" },
          { img: photo, title: "AI Features", desc: "Explore AI features for personalized learning and study assistance!", link: "/components/collegefinderai" }
        ].map((feature, i) => (
          <div key={i} className={`box-${i + 1}`}>
            <center>
              <Image src={feature.img} alt={feature.title} />
            </center>
            <Link className="link" href={feature.link}>
              <h3>{feature.title}</h3>
            </Link>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Empower Section */}
      <div className="empower">
        <h5>Diverse Resources</h5>
        <h1>Empowering Students with Comprehensive Educational Resources</h1>
        <p>College Junction offers comprehensive notes and resources tailored to aid every student&#39;s academic journey.</p>
      </div>

      {/* Unlock Section */}
      <div className="unlock">
        <div className="left_unlock">
          <h2>Unlock Your Learning Potential Today</h2>
          <p>Join College Junction for unmatched resources, including notes, college lists, and innovative AI features.</p>
          <ul>
            <li>Personalized Notes</li>
            <li>AI College Tools</li>
            <li>Seamless Access</li>
          </ul>
        </div>
        <div className="right_unlock">
          <Image src={unlock} alt="Unlock Learning Potential" />
        </div>
      </div>

      {/* Team Section */}
      <center>
        <h2>Our Team</h2>
        <p>We&#39;re a passionate team dedicated to enhancing student learning experiences through innovative resources.</p>
      </center>
      <div className="ourteam">
        {[
          { name: "Aaryan Pandey", role: "Frontend and Backend Developer", img: aaryan },
          { name: "Satyam Singh", role: "ML & Data Searching", img: satyam },
          { name: "Shivam Kumar", role: "AI & ML Solutions", img: shivam }
        ].map((member, i) => (
          <div className="team" key={i}>
            <center>
              <Image src={member.img} alt={member.name} />
            </center>
            <div className="info">
              <div className="info_left">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              <div className="info_right">
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/code_with_aaryan/">
                  <Image src={insta} alt="Instagram" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/aaryan-pandey/">
                  <Image src={linkedin} alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <h2>College Junction</h2>
          <p>Join College Junction to access comprehensive study notes and a complete list of colleges tailored for your academic journey.</p>
          <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Courses</a>
            <a href="#">Instructors</a>
          </nav>
          <div className="social-icons">
            <a href="#">
              <Image src={instaWhite} alt="Instagram" />
            </a>
            <a href="#">
              <Image src={facebook} alt="Facebook" />
            </a>
          </div>
          <p>&copy; 2025 collegejunction.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
