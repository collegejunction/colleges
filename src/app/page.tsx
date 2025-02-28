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
import linkdeIn from "./img/linkedin.png";
import insta_white from "./img/insta_white.png";
import facebook from "./img/facebook.png";

// Team Photos
import aaryan from "./img/team/aaryan.png";
import satyam from "./img/team/satyam.png";
import shivam from "./img/team/shivam (1).png";

// Navbar import
import Navbar from "./components/Navbar/page";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

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
  }, [isMounted]);

  if (!isMounted) return null; // Prevent SSR mismatch

  return (
    <div className="container">
      <div className="heros">
        <Navbar scrolled={scrolled} />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>College Junction</h1>
            <p>Empowering Students with AI for Smarter Learning</p>
            <Link href="#" className="start">Get Started →</Link>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className="feature">
        <div className="firstbox">
          <center>
            <Image src={notes} alt="Educational Notes" />
          </center>
          <Link className="link" href="/components/notes"><h3>Educational Notes</h3></Link>
          <p>Access detailed notes and enhance your learning experience today!</p>
        </div>
        <div className="secondbox">
          <center>
            <Image src={college} alt="College Finder" />
          </center>
          <Link className="link" href="/components/college"><h3>College Finder</h3></Link>
          <p>Leverage our AI to find the best colleges and courses tailored to you.</p>
        </div>
        <div className="thirdbox">
          <center>
            <Image src={photo} alt="AI Features" />
          </center>
          <Link className="link" href="/components/collegefinderai"><h3>AI Features</h3></Link>
          <p>Explore AI features for personalized learning and study assistance!</p>
        </div>
      </div>

      {/* Other sections... */}
      <div className="empower">
        <h5>Diverse Resources</h5>
        <h1>Empowering Students with Comprehensive Educational Resources</h1>
        <p>College Junction offers comprehensive notes and resources tailored to aid every student's academic journey.</p>
      </div>

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
        <p>We're a passionate team dedicated to enhancing student learning experiences through innovative resources.</p>
      </center>
      <div className="ourteam">
        {[{ name: "Aaryan Pandey", role: "Frontend and Backend Developer", img: aaryan },
          { name: "Satyam Singh", role: "ML & Data Searching", img: satyam },
          { name: "Shivam Kumar", role: "AI & ML Solutions", img: shivam }].map((member, i) => (
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
                <a target="_blank" href="https://www.instagram.com/code_with_aaryan/">
                  <Image src={insta} alt="Instagram" />
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/aaryan-pandey/">
                  <Image src={linkdeIn} alt="LinkedIn" />
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
            <a href="#"><Image src={insta_white} alt="Instagram" /></a>
            <a href="#"><Image src={facebook} alt="Facebook" /></a>
          </div>
          <p>&copy; 2025 collegejunction.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
