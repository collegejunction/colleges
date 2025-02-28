"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../Navbar/page";
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

  if (loading) return <p className="loading-text">Loading college details...</p>;
  if (!college) return <p className="loading-text">College not found.</p>;

  // 🛠 Extract the src URL from the iframe string
  const mapIframe = college.Map || "";
  const srcMatch = mapIframe.match(/src="([^"]+)"/);
  const mapSrc = srcMatch ? srcMatch[1] : null;

  return (
    <>
    <Navbar/>
      {/* College Details */}
      <div className="review-section">
        <div className="review-left">
          <h1>{college.college_name}</h1>
          <h2>Courses: {college.courses?.join(", ") || "N/A"}</h2>
          <h3>Rating: {college.Rating || "N/A"} ⭐</h3> {/* Fixed rating */}
        </div>

        <div className="review-right">
          {college.photo ? (
            <Image
              src={college.photo}
              alt="College Image"
              width={200}
              height={150}
              unoptimized
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </div>

      {/* College Address & Map */}
      <div className="college-address">
        <div className="college-details">
          <h3>College Details & Address</h3>
          {mapSrc ? (
            <iframe
              src={mapSrc} // ✅ Using extracted src URL
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

      {/* Review Summary */}
      <div className="review-summary">
        <h1>Review</h1>
        <h1>⭐ {college.Rating || "N/A"}</h1> {/* Fixed rating display */}
      </div>
    </>
  );
}
