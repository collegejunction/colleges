"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../Navbar/page";

export default function CollegePage() {
  const { id } = useParams(); // ✅ Get ID from the URL
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      if (!id) return;

      try {
        const response = await fetch(`/api/colleges/${id}`);
        const data = await response.json();
        if (response.ok) {
          setCollege(data);
        } else {
          setCollege(null);
        }
      } catch (error) {
        console.error("Error fetching college:", error);
        setCollege(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCollege();
  }, [id]);

  if (loading) {
    return <p>Loading college details...</p>;
  }

  if (!college) {
    return <p>⚠️ College not found. Please try again.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="college-details">
        <h1>{college.college_name}</h1>
        <h2>Courses: {college.courses?.join(", ") || "N/A"}</h2>

        <div className="rating">
          <p>Rating: {college.rating || "N/A"}</p>
        </div>

        {college.photo && (
          <Image src={college.photo} alt={college.college_name} width={200} height={150} />
        )}

        <p>{college.description || "No description available."}</p>

        <div className="address">
          <h3>Address: {college.address || "N/A"}</h3>
        </div>
      </div>
    </>
  );
}
