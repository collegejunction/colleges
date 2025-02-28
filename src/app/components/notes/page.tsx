"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/page";
// import "./NotesPage.css"; // Import the CSS file

const NotesPage = () => {
  const [years, setYears] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [notes, setNotes] = useState([]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  useEffect(() => {
    fetchYears();
  }, []);
  useEffect(() => {
    document.title = `Notes | College Junction`;
});
  const fetchYears = async () => {
    try {
      const response = await axios.get("/api/notes");
      setYears(response.data.data.years);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const fetchBranches = async (yearId) => {
    try {
      setSelectedYear(yearId);
      setSelectedBranch(null);
      setSelectedSemester(null);
      setNotes([]);

      const response = await axios.get(`/api/notes?yearId=${yearId}`);
      setBranches(response.data.data.branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchSemesters = async (branchId) => {
    try {
      setSelectedBranch(branchId);
      setSelectedSemester(null);
      setNotes([]);

      const response = await axios.get(`/api/notes?yearId=${selectedYear}&branchId=${branchId}`);
      setSemesters(response.data.data.semesters);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const fetchNotes = async (semesterId) => {
    try {
      setSelectedSemester(semesterId);
      const response = await axios.get(`/api/notes?yearId=${selectedYear}&branchId=${selectedBranch}&semesterId=${semesterId}`);
      setNotes(response.data.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="noo">

      <Navbar/>
    <div className="notes-container">
      <h1 className="title">📚 Notes Collection</h1>

      {/* Select Year */}
      <div className="section">
        <h2>Select Year:</h2>
        <div className="button-group">
          {years.map((year) => (
            <button
              key={year.id}
              className={selectedYear === year.id ? "active" : ""}
              onClick={() => fetchBranches(year.id)}
            >
              {year.name}
            </button>
          ))}
        </div>
      </div>

      {/* Select Branch */}
      {branches.length > 0 && (
        <div className="section">
          <h2>Select Branch:</h2>
          <div className="button-group">
            {branches.map((branch) => (
              <button
                key={branch.id}
                className={selectedBranch === branch.id ? "active" : ""}
                onClick={() => fetchSemesters(branch.id)}
              >
                {branch.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Select Semester */}
      {semesters.length > 0 && (
        <div className="section">
          <h2>Select Semester:</h2>
          <div className="button-group">
            {semesters.map((semester) => (
              <button
                key={semester.id}
                className={selectedSemester === semester.id ? "active" : ""}
                onClick={() => fetchNotes(semester.id)}
              >
                {semester.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show Notes */}
      {notes.length > 0 && (
        <div className="section">
          <h2>Available Notes:</h2>
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.name}>
                <a href={note.webViewLink} target="_blank" rel="noopener noreferrer">
                  📄 {note.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default NotesPage;
