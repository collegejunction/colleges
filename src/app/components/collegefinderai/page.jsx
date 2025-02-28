'use client';

import { useState } from 'react';

const colleges = [
    { name: "College A", department: "Computer Science", cutoff: 75, location: "City X", surrounding: ["College B", "College C"], ranking: 1 },
    { name: "College A", department: "Mechanical Engineering", cutoff: 70, location: "City X", surrounding: ["College B", "College C"], ranking: 2 },
    { name: "College B", department: "Mechanical Engineering", cutoff: 60, location: "City Y", surrounding: ["College A", "College D"], ranking: 5 },
    { name: "College C", department: "Civil Engineering", cutoff: 70, location: "City X", surrounding: ["College A", "College B"], ranking: 3 },
    { name: "College D", department: "Electrical Engineering", cutoff: 65, location: "City Z", surrounding: ["College B", "College C"], ranking: 2 },
    { name: "College D", department: "Computer Science", cutoff: 80, location: "City Z", surrounding: ["College B", "College C"], ranking: 4 },
];

export default function CollegeSuggestions() {
    const [percentage, setPercentage] = useState('');
    const [location, setLocation] = useState('');
    const [department, setDepartment] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const getCollegeSuggestions = () => {
        const percent = parseInt(percentage);
        if (isNaN(percent) || percent < 0 || percent > 100) {
            alert("Please enter a valid percentage between 0 and 100.");
            return;
        }

        const filteredColleges = colleges.filter(college => {
            const matchesPercentage = college.cutoff <= percent;
            const matchesLocation = location ? college.location.toLowerCase().includes(location.toLowerCase()) : true;
            const matchesDepartment = department ? college.department === department : true;
            return matchesPercentage && matchesLocation && matchesDepartment;
        });

        setSuggestions(filteredColleges);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold mb-4">Find Colleges Based on Your Marks</h1>
            <label className="block mb-2">Enter Your Percentage:</label>
            <input 
                type="number" 
                value={percentage} 
                onChange={e => setPercentage(e.target.value)} 
                min="0" max="100" 
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            />
            <label className="block mb-2">Preferred Location (City Name):</label>
            <input 
                type="text" 
                value={location} 
                onChange={e => setLocation(e.target.value)} 
                placeholder="Enter city (optional)"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            />
            <label className="block mb-2">Preferred Department:</label>
            <select 
                value={department} 
                onChange={e => setDepartment(e.target.value)} 
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            >
                <option value="">Select Department (optional)</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
            </select>
            <button onClick={getCollegeSuggestions} className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold mb-4">
                Get Suggestions
            </button>
            <h2 className="text-xl font-bold mt-4">Suggested Colleges:</h2>
            <ul className="mt-2">
                {suggestions.length === 0 ? <li>No colleges found for your criteria.</li> :
                    suggestions.map((college, index) => (
                        <li key={index} className="p-2 bg-gray-800 rounded mb-2">
                            <strong>{college.name}</strong><br />
                            Location: {college.location}<br />
                            Department: {college.department} (Cutoff: {college.cutoff}%)<br />
                            Surrounding Colleges: {college.surrounding.join(", ")}<br />
                            Ranking: {college.ranking}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
