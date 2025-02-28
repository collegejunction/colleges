"use client";
import Navbar from "../Navbar/page";
import Image from "next/image";
import aboutimage from "../img/about1.jpg"
import insta_white from "../img/insta_white.png";
import facebook from "../img/facebook.png";
import { useEffect } from "react";
export default function Login() {
  useEffect(() => {
      document.title = `About | College Junction`;
  });
    return (
      <div>
        <div className="about">
          <div className="aboutupper">
        <Navbar/>
        <div className="uppercontent">
            <center>
            <h1>Defining your future Starts with growing your skills</h1>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ipsum.</h4>
            <button>Find Courses</button>
            </center>
        </div>
          </div>
          <div className="aboutmiddle">
            <div className="aboutleft">
              <Image src={aboutimage}/>
            </div>
            <div className="aboutright">
              <h1>Our online learning platform Top Skills You Need To Know</h1>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, a!</p>
              <ul>
                <li>Best Review of Colleges</li>
                <li>Best Notes for your study</li>
                <li>24/7 Online Support</li>
                <li>AI Bot</li>
              </ul>
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
      </div>
    );
  }
  