"use client";

import Navbar from "../Navbar/page";
import Image from "next/image";
import ReactStars from "react-stars";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CollegePage() {
  const { id } = useParams(); // Get college ID from URL
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollegeDetails() {
      try {
        const response = await fetch(`/api/colleges/${id}`);
        if (!response.ok) throw new Error("College not found");
        const data = await response.json();
        setCollege(data);
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCollegeDetails();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading college details...</p>;
  if (!college) return <p style={{ textAlign: "center", fontSize: "18px" }}>College not found.</p>;

  return (
    <>
      <Navbar />
      <div className="review-section">
        <div className="review-left">
          <h1>{college.college_name}</h1>
          <h2>Courses: {college.courses?.join(", ") || "N/A"}</h2>
          <div className="star">
            <ReactStars 
              count={5} 
              size={24} 
              value={college.rating || 0} 
              color1="lightgray" 
              color2="gold" 
              edit={false} 
              half={true} 
            />
          </div>
          <h3>Rating: {college.rating}</h3>
        </div>

        <div className="review-right">
          <Image 
            src={college.photo || "/default-college.jpg"} 
            alt="College Image" 
            width={200} 
            height={150} 
            unoptimized 
          />
        </div>
      </div>
    </>
  );
}
