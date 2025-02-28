"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import notes from "./img/notes (1).png";
import college from "./img/user.png";
import photo from "./img/play.png";
import unlock from "./img/unlock.png";
import insta from "./img/instagram.png";
import linkdeIn from "./img/linkedin.png";
import insta_white from "./img/insta_white.png";
import facebook from "./img/facebook.png";
import Form from "next/form";
// Team Photo
import aaryan from "./img/team/aaryan.png";
import satyam from "./img/team/satyam.png";
import shivam from "./img/team/shivam (1).png"
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
    if (isMounted) {
      // GSAP Animations
      gsap.from(".hero-content h1", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
      gsap.from(".hero-content p", { opacity: 0, y: 50, duration: 1, delay: 0.3, ease: "power2.out" });
      gsap.from(".btn", { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.6, ease: "back.out(1.7)" });

      gsap.utils.toArray<HTMLElement>(".feature div").forEach((box, i) => {
        gsap.from(box, {
          opacity: 0,
          y: 100,
          duration: 1,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: box as HTMLElement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Navbar scroll effect
      const handleScroll = () => {
        if (window.scrollY > document.querySelector(".hero")?.clientHeight! - 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null; // Prevent SSR mismatch
  }
  // const router = useRouter();
  return (
    <div className="container">
      <div className="heros">
        {/* Navbar */}
        <Navbar/>

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
          <p>Access detailed notes and enhance your learning experience today! </p>
        </div>
        <div className="secondbox">
          <center>
            <Image src={college} alt="College Finder" />
          </center>
          <Link className="link" href="/components/college"><h3>College Finder</h3></Link>
          <p>Leverage our AI to find the best colleges and courses tailored to you. </p>
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
          <Image src={unlock} alt="Hero Image" />
        </div>
      </div>

        <center>
        <h2>Our Team</h2>
        <p>We're a passionate team dedicated to enhancing student learning experiences through innovative resources.</p>
        </center>
      <div className="ourteam">
        <div className="team">
          <center>
          <Image src={aaryan} alt="Hero Image" />
          </center>
          <div className="info">
            <div className="info_left">
              <h3>Aaryan Pandey</h3>
              <p>Frontend and Backend Developer</p>
            </div>
            <div className="info_right">
            <a target="_blank" href="https://www.instagram.com/code_with_aaryan/"><Image src={insta} alt="Hero Image" /></a>
            <a target="_blank" href="https://www.linkedin.com/in/aaryan-pandey-%F0%9F%98%8E-107a01344/"><Image src={linkdeIn} alt="Hero Image" /></a>
            </div>
          </div>
        </div>
        <div className="team">
          <center>
          <Image src={satyam} alt="Hero Image" />
          </center>
          <div className="info">
            <div className="info_left">
              <h3>Satyam Singh</h3>
              <p>ML & Data Searching</p>
            </div>
            <div className="info_right">
            <a target="_blank" href="https://www.instagram.com/code_with_aaryan/"><Image src={insta} alt="Hero Image" /></a>
            <a target="_blank" href="https://www.linkedin.com/in/aaryan-pandey-%F0%9F%98%8E-107a01344/"><Image src={linkdeIn} alt="Hero Image" /></a>
            </div>
          </div>
        </div>
        <div className="team">
          <center>
          <Image src={shivam} alt="Hero Image" />
          </center>
          <div className="info">
            <div className="info_left">
              <h3>Shivam Kumar</h3>
              <p>AI&ML Solutions</p>
            </div>
            <div className="info_right">
            <a target="_blank" href="https://www.instagram.com/code_with_aaryan/"><Image src={insta} alt="Hero Image" /></a>
            <a target="_blank" href="https://www.linkedin.com/in/aaryan-pandey-%F0%9F%98%8E-107a01344/"><Image src={linkdeIn} alt="Hero Image" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footerr">

      <div className="today">
        <h1>Join College Junction Today!</h1>
        <p>Explore our extensive collection of student notes and college listings powered by AI.</p>
        <div className="subscription">
            <input type="email" placeholder="Enter your email"/>
            <button>Subscribe</button>
        </div>
    </div>
    
    <footer>
        <div className="footer-content">
            <h2>College Junction</h2>
            <p>Join College Junction to access comprehensive study notes and a complete list of colleges tailored for your academic journey. Empowering students with innovative AI features for personalized learning!</p>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Courses</a>
                <a href="#">Instructors</a>
            </nav>
            <div className="social-icons">
                <a href="#"><Image src={insta_white} alt="Hero Image" /></a>
                <a href="#"><Image src={facebook} alt="Hero Image" /></a>
            </div>
            <p>&copy; 2025 collegejunction.com. All rights reserved.</p>
        </div>
    </footer>
      </div>


    </div>
  );
}
