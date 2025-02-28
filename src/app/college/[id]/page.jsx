"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar/page";
import Head from "next/head";

export default function CollegePage() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      try {
        const response = await fetch(`/api/colleges/${id}`);
        const data = await response.json();
        console.log("Fetched College Data:", data); // Debugging
        setCollege(data);
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollege();
  }, [id]);

  // Change title dynamically when college data is available
  useEffect(() => {
    if (college?.college_name) {
      document.title = `${college.college_name} | College Junction`;
    }
  }, [college]);

  if (loading) return <p className="loading-text">Loading college details...</p>;
  if (!college) return <p className="loading-text">College not found.</p>;

  // Check if the map URL exists and is a valid embed URL
  const isValidMapUrl = college.Map?.includes("https://www.google.com/maps/embed");

  return (
    <>
      <Head>
        <meta name="description" content="Welcome to the home page of College Junction." />
      </Head>
      <Navbar />
      <div className="review-section">
        <div className="review-left">
          <h1>{college.college_name}</h1>
          <h2>Courses: {college.courses?.join(", ") || "N/A"}</h2>
          <h3>Rating: {college.Rating || "N/A"} ⭐</h3>
        </div>
        <div className="review-right">
          {college.photo ? (
            <Image src={college.photo} alt="College Image" height={315} width={630} unoptimized />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </div>

      <div className="college-address">
        <div className="college-details">
          <h3>College Details & Address</h3>
          {isValidMapUrl ? (
            <iframe
              src={college.Map}
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="College Location"
            ></iframe>
          ) : (
            <p>No Map Available or Invalid URL</p>
          )}
        </div>
        <div className="college-timings">
          <h3>Monday - Saturday: 09:00 AM to 06:00 PM</h3>
          <h3>Sunday: Closed</h3>
        </div>
      </div>

      <div className="review-summary">
        <h1>Review</h1>
        <h1>⭐ {college.Rating || "N/A"}</h1>
      </div>
    </>
  );
}
