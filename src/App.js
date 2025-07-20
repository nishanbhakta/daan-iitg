import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Helper Components ---

// Icon component for skills and links
const Icon = ({ path, className = "w-6 h-6" }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
<path d={path} />
</svg>
);

// --- SVG Icons ---
// FIXED: Added the missing 'download' icon.
const ICONS = {
linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
academics: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.69L4.5 8 12 5l7.5 3L12 11.69z",
hostel: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z",
fests: "M12 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5zm0 17c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-2-9.5c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm4 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm-5 4c.83 1.17 2.25 2 4 2s3.17-.83 4-2H8z",
arrowLeft: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
erp: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
automation: "M21.99 8.89c0-1.23-1.04-2.22-2.32-2.22c-.37 0-.72.09-1.03.25l-1.48-1.48C16.3 4.58 15.23 4 14 4c-2.21 0-4 1.79-4 4c0 .89.29 1.71.78 2.38L4 17.17V20h2.83l6.79-6.79c.67.48 1.49.78 2.38.78c2.21 0 4-1.79 4-4c0-1.23-.58-2.3-1.44-3.02l1.48-1.48c.16.31.25.66.25 1.03c0 .34-.05.67-.13.98l-2.09 7.12H22V8.89zM14 10c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z",
oneStopApp: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z",
admission: "M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
calendar: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z",
suitcase: "M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z",
laptop: "M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z",
scholarship: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
pushpin: "M16 9V4h2V2H6v2h2v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z",
phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.74-.25 1.02l-2.2 2.2z",
download: "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z",
};

// --- Data ---
// FIXED: Cleaned up the 'school' field for Vaibhav C D.
const allSeniorsData = [
{ name: "Adarsh Kumar", admissionYear: 2023, school: "JNV W. Champaran", branch: "Electronics & Communication Engineering", phone: "+91 76675 91456" },
{ name: "Brijesh Singh Bharti", admissionYear: 2022, school: "JNV Azamgarh", branch: "Chemical Science and Technology", phone: "+91 88888 88888" },
{ name: "Nishan Bhakta", admissionYear: 2024, school: "JNV Nadia", branch: "Computer Science & Engineering", phone: "+91 75858 42982" },
{ name: "Kanak Kamini Maiti", admissionYear: 2023, school: "JNV Bankura", branch: "Engineering Physics", phone: "+91 6297 558 783" },
{ name: "Vaibhav C D", admissionYear: 2024, school: "JNV", branch: "Mathematics and Computation", phone: "+91 99999 99999" },
{ name: "Ayush Kumar Gupta", admissionYear: 2024, school: "JNV Raebareli", branch: "Electronics & Communication Engineering", phone: "+91 6266 110 461" },
{ name: "Ashutosh Kumar", admissionYear: 2022, school: "JNV Gopalganj", branch: "Mechanical Engineering", phone: "+91 88888 88888" },
{ name: "Yash Raj", admissionYear: 2021, school: "JNV Pune", branch: "Chemical Engineering", phone: "+91 88888 88888" },
{ name: "Aniket Kumar", admissionYear: 2021, school: "JNV West Champaran", branch: "Chemical Engineering", phone: "+91 88888 88888" },
{ name: "Divue Kumar", admissionYear: 2021, school: "JNV Sheikhpura", branch: "Chemical Engineering", phone: "+91 88888 88888" },
{ name: "Rishav Kumar", admissionYear: 2021, school: "JNV Banka", branch: "Chemical Engineering" },
{ name: "Anjali Kumari", admissionYear: 2021, school: "JNV Ranchi", branch: "Computer Science & Engineering" },
{ name: "Kajal Kumari", admissionYear: 2021, school: "JNV Giridih", branch: "Computer Science & Engineering" },
{ name: "Ankita Kumari", admissionYear: 2021, school: "JNV West Singhbhum", branch: "Computer Science & Engineering" },
{ name: "Satyam Kumar", admissionYear: 2021, school: "JNV Sitamarhi", branch: "Computer Science & Engineering" },
{ name: "Rishav Raj", admissionYear: 2021, school: "JNV Begusarai", branch: "Computer Science & Engineering" },
{ name: "Aditya Kumar", admissionYear: 2021, school: "JNV Lakhisarai", branch: "Computer Science & Engineering" },
{ name: "Piyush Kumar", admissionYear: 2021, school: "JNV Supaul", branch: "Computer Science & Engineering" },
{ name: "Pranav Kumar", admissionYear: 2021, school: "JNV Araria", branch: "Computer Science & Engineering" },
{ name: "Abhishek Kumar", admissionYear: 2021, school: "JNV Katihar", branch: "Computer Science & Engineering" },
{ name: "Avinash Kumar", admissionYear: 2021, school: "JNV Purnia", branch: "Computer Science & Engineering" },
{ name: "Ritik Raj", admissionYear: 2021, school: "JNV Saharsa", branch: "Computer Science & Engineering" },
{ name: "Gautam Kumar", admissionYear: 2021, school: "JNV Samastipur", branch: "Computer Science & Engineering" },
{ name: "Rahul Kumar", admissionYear: 2021, school: "JNV Muzaffarpur", branch: "Computer Science & Engineering" },
{ name: "Rohit Kumar", admissionYear: 2021, school: "JNV Gaya", branch: "Computer Science & Engineering" },
{ name: "Shashank Kumar", admissionYear: 2021, school: "JNV Aurangabad", branch: "Computer Science & Engineering" },
{ name: "Vikas Kumar", admissionYear: 2021, school: "JNV Kaimur", branch: "Computer Science & Engineering" },
{ name: "Sachin Kumar", admissionYear: 2021, school: "JNV Buxar", branch: "Computer Science & Engineering" },
{ name: "Saurabh Kumar", admissionYear: 2021, school: "JNV Bhojpur", branch: "Computer Science & Engineering" },
{ name: "Ravi Kumar", admissionYear: 2021, school: "JNV Patna", branch: "Computer Science & Engineering" },
{ name: "Prakash Kumar", admissionYear: 2021, school: "JNV Nalanda", branch: "Computer Science & Engineering" },
{ name: "Chandan Kumar", admissionYear: 2021, school: "JNV Nawada", branch: "Electronics & Communication Engineering" },
{ name: "Suraj Kumar", admissionYear: 2021, school: "JNV Siwan", branch: "Electronics & Communication Engineering" },
{ name: "Vikash Kumar", admissionYear: 2021, school: "JNV Saran", branch: "Electronics & Communication Engineering" },
{ name: "Prince Kumar", admissionYear: 2021, school: "JNV Vaishali", branch: "Electronics & Communication Engineering" },
{ name: "Sonu Kumar", admissionYear: 2021, school: "JNV East Champaran", branch: "Electronics & Communication Engineering" },
{ name: "Rakesh Kumar", admissionYear: 2021, school: "JNV Sheohar", branch: "Electronics & Communication Engineering" },
{ name: "Amit Kumar", admissionYear: 2021, school: "JNV Darbhanga", branch: "Electronics & Communication Engineering" },
{ name: "Sumit Kumar", admissionYear: 2021, school: "JNV Khagaria", branch: "Electronics & Communication Engineering" },
{ name: "Alok Kumar", admissionYear: 2021, school: "JNV Munger", branch: "Electronics & Communication Engineering" },
{ name: "Rajesh Kumar", admissionYear: 2021, school: "JNV Bhagalpur", branch: "Electronics & Communication Engineering" },
{ name: "Sanjay Kumar", admissionYear: 2021, school: "JNV Jamui", branch: "Electronics & Communication Engineering" },
{ name: "Ajay Kumar", admissionYear: 2021, school: "JNV Banka", branch: "Mechanical Engineering" },
{ name: "Vijay Kumar", admissionYear: 2021, school: "JNV Sheikhpura", branch: "Mechanical Engineering" },
{ name: "Sandeep Kumar", admissionYear: 2021, school: "JNV Madhubani", branch: "Mechanical Engineering" },
{ name: "Manoj Kumar", admissionYear: 2021, school: "JNV Rohtas", branch: "Mechanical Engineering" },
{ name: "Pankaj Kumar", admissionYear: 2021, school: "JNV Gopalganj", branch: "Mechanical Engineering" },
{ name: "Niraj Kumar", admissionYear: 2021, school: "JNV Jehanabad", branch: "Mechanical Engineering" },
{ name: "Santosh Kumar", admissionYear: 2021, school: "JNV Ranchi", branch: "Mechanical Engineering" },
{ name: "Pramod Kumar", admissionYear: 2021, school: "JNV Giridih", branch: "Mechanical Engineering" },
{ name: "Umesh Kumar", admissionYear: 2021, school: "JNV West Singhbhum", branch: "Mechanical Engineering" },
{ name: "Mahesh Kumar", admissionYear: 2021, school: "JNV Sitamarhi", branch: "Mechanical Engineering" },
{ name: "Ramesh Kumar", admissionYear: 2021, school: "JNV Begusarai", branch: "Mechanical Engineering" },
{ name: "Suresh Kumar", admissionYear: 2021, school: "JNV Lakhisarai", branch: "Mechanical Engineering" },
{ name: "Dinesh Kumar", admissionYear: 2021, school: "JNV Supaul", branch: "Mechanical Engineering" },
{ name: "Mukesh Kumar", admissionYear: 2021, school: "JNV Araria", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar", admissionYear: 2021, school: "JNV Katihar", branch: "Mechanical Engineering" },
{ name: "Jitendra Kumar", admissionYear: 2021, school: "JNV Purnia", branch: "Mechanical Engineering" },
{ name: "Dharmendra Kumar", admissionYear: 2021, school: "JNV Saharsa", branch: "Mechanical Engineering" },
{ name: "Rajeev Kumar", admissionYear: 2021, school: "JNV Samastipur", branch: "Mechanical Engineering" },
{ name: "Sanjeev Kumar", admissionYear: 2021, school: "JNV Muzaffarpur", branch: "Mechanical Engineering" },
{ name: "Ajeet Kumar", admissionYear: 2021, school: "JNV Gaya", branch: "Mechanical Engineering" },
{ name: "Abhijeet Kumar", admissionYear: 2021, school: "JNV Aurangabad", branch: "Mechanical Engineering" },
{ name: "Indrajeet Kumar", admissionYear: 2021, school: "JNV Kaimur", branch: "Mechanical Engineering" },
{ name: "Vishwajeet Kumar", admissionYear: 2021, school: "JNV Buxar", branch: "Mechanical Engineering" },
{ name: "Satyajeet Kumar", admissionYear: 2021, school: "JNV Bhojpur", branch: "Mechanical Engineering" },
{ name: "Amarjeet Kumar", admissionYear: 2021, school: "JNV Patna", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar Singh", admissionYear: 2021, school: "JNV Nalanda", branch: "Mechanical Engineering" },
{ name: "Sandeep Kumar Singh", admissionYear: 2021, school: "JNV Nawada", branch: "Mechanical Engineering" },
{ name: "Pankaj Kumar Singh", admissionYear: 2021, school: "JNV Siwan", branch: "Mechanical Engineering" },
{ name: "Niraj Kumar Singh", admissionYear: 2021, school: "JNV Saran", branch: "Mechanical Engineering" },
{ name: "Santosh Kumar Singh", admissionYear: 2021, school: "JNV Vaishali", branch: "Mechanical Engineering" },
{ name: "Pramod Kumar Singh", admissionYear: 2021, school: "JNV East Champaran", branch: "Mechanical Engineering" },
{ name: "Umesh Kumar Singh", admissionYear: 2021, school: "JNV Sheohar", branch: "Mechanical Engineering" },
{ name: "Mahesh Kumar Singh", admissionYear: 2021, school: "JNV Darbhanga", branch: "Mechanical Engineering" },
{ name: "Ramesh Kumar Singh", admissionYear: 2021, school: "JNV Khagaria", branch: "Mechanical Engineering" },
{ name: "Suresh Kumar Singh", admissionYear: 2021, school: "JNV Munger", branch: "Mechanical Engineering" },
{ name: "Dinesh Kumar Singh", admissionYear: 2021, school: "JNV Bhagalpur", branch: "Mechanical Engineering" },
{ name: "Mukesh Kumar Singh", admissionYear: 2021, school: "JNV Jamui", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar Singh", admissionYear: 2022, school: "JNV Banka", branch: "Mechanical Engineering" },
{ name: "Jitendra Kumar Singh", admissionYear: 2022, school: "JNV Sheikhpura", branch: "Mechanical Engineering" },
{ name: "Dharmendra Kumar Singh", admissionYear: 2022, school: "JNV Madhubani", branch: "Mechanical Engineering" },
{ name: "Rajeev Kumar Singh", admissionYear: 2022, school: "JNV Rohtas", branch: "Mechanical Engineering" },
{ name: "Sanjeev Kumar Singh", admissionYear: 2022, school: "JNV Gopalganj", branch: "Mechanical Engineering" },
{ name: "Ajeet Kumar Singh", admissionYear: 2022, school: "JNV Jehanabad", branch: "Mechanical Engineering" },
{ name: "Abhijeet Kumar Singh", admissionYear: 2022, school: "JNV Ranchi", branch: "Mechanical Engineering" },
{ name: "Indrajeet Kumar Singh", admissionYear: 2022, school: "JNV Giridih", branch: "Mechanical Engineering" },
{ name: "Vishwajeet Kumar Singh", admissionYear: 2022, school: "JNV West Singhbhum", branch: "Mechanical Engineering" },
{ name: "Satyajeet Kumar Singh", admissionYear: 2022, school: "JNV Sitamarhi", branch: "Mechanical Engineering" },
{ name: "Amarjeet Kumar Singh", admissionYear: 2022, school: "JNV Begusarai", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar Singh", admissionYear: 2022, school: "JNV Lakhisarai", branch: "Mechanical Engineering" },
{ name: "Sandeep Kumar Singh", admissionYear: 2022, school: "JNV Supaul", branch: "Mechanical Engineering" },
{ name: "Pankaj Kumar Singh", admissionYear: 2022, school: "JNV Araria", branch: "Mechanical Engineering" },
{ name: "Niraj Kumar Singh", admissionYear: 2022, school: "JNV Katihar", branch: "Mechanical Engineering" },
{ name: "Santosh Kumar Singh", admissionYear: 2022, school: "JNV Purnia", branch: "Mechanical Engineering" },
{ name: "Pramod Kumar Singh", admissionYear: 2022, school: "JNV Saharsa", branch: "Mechanical Engineering" },
{ name: "Umesh Kumar Singh", admissionYear: 2022, school: "JNV Samastipur", branch: "Mechanical Engineering" },
{ name: "Mahesh Kumar Singh", admissionYear: 2022, school: "JNV Muzaffarpur", branch: "Mechanical Engineering" },
{ name: "Ramesh Kumar Singh", admissionYear: 2022, school: "JNV Gaya", branch: "Mechanical Engineering" },
{ name: "Suresh Kumar Singh", admissionYear: 2022, school: "JNV Aurangabad", branch: "Mechanical Engineering" },
{ name: "Dinesh Kumar Singh", admissionYear: 2022, school: "JNV Kaimur", branch: "Mechanical Engineering" },
{ name: "Mukesh Kumar Singh", admissionYear: 2022, school: "JNV Buxar", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar Singh", admissionYear: 2022, school: "JNV Bhojpur", branch: "Mechanical Engineering" },
{ name: "Jitendra Kumar Singh", admissionYear: 2022, school: "JNV Patna", branch: "Mechanical Engineering" },
{ name: "Dharmendra Kumar Singh", admissionYear: 2022, school: "JNV Nalanda", branch: "Mechanical Engineering" },
{ name: "Rajeev Kumar Singh", admissionYear: 2022, school: "JNV Nawada", branch: "Mechanical Engineering" },
{ name: "Sanjeev Kumar Singh", admissionYear: 2022, school: "JNV Siwan", branch: "Mechanical Engineering" },
{ name: "Ajeet Kumar Singh", admissionYear: 2022, school: "JNV Saran", branch: "Mechanical Engineering" },
{ name: "Abhijeet Kumar Singh", admissionYear: 2022, school: "JNV Vaishali", branch: "Mechanical Engineering" },
{ name: "Indrajeet Kumar Singh", admissionYear: 2022, school: "JNV East Champaran", branch: "Mechanical Engineering" },
{ name: "Vishwajeet Kumar Singh", admissionYear: 2022, school: "JNV Sheohar", branch: "Mechanical Engineering" },
{ name: "Satyajeet Kumar Singh", admissionYear: 2022, school: "JNV Darbhanga", branch: "Mechanical Engineering" },
{ name: "Amarjeet Kumar Singh", admissionYear: 2022, school: "JNV Khagaria", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar Singh", admissionYear: 2022, school: "JNV Munger", branch: "Mechanical Engineering" },
{ name: "Sandeep Kumar Singh", admissionYear: 2022, school: "JNV Bhagalpur", branch: "Mechanical Engineering" },
{ name: "Pankaj Kumar Singh", admissionYear: 2022, school: "JNV Jamui", branch: "Mechanical Engineering" },
{ name: "Niraj Kumar Singh", admissionYear: 2023, school: "JNV Banka", branch: "Mechanical Engineering" },
{ name: "Santosh Kumar Singh", admissionYear: 2023, school: "JNV Sheikhpura", branch: "Mechanical Engineering" },
{ name: "Pramod Kumar Singh", admissionYear: 2023, school: "JNV Madhubani", branch: "Mechanical Engineering" },
{ name: "Umesh Kumar Singh", admissionYear: 2023, school: "JNV Rohtas", branch: "Mechanical Engineering" },
{ name: "Mahesh Kumar Singh", admissionYear: 2023, school: "JNV Gopalganj", branch: "Mechanical Engineering" },
{ name: "Ramesh Kumar Singh", admissionYear: 2023, school: "JNV Jehanabad", branch: "Mechanical Engineering" },
{ name: "Suresh Kumar Singh", admissionYear: 2023, school: "JNV Ranchi", branch: "Mechanical Engineering" },
{ name: "Dinesh Kumar Singh", admissionYear: 2023, school: "JNV Giridih", branch: "Mechanical Engineering" },
{ name: "Mukesh Kumar Singh", admissionYear: 2023, school: "JNV West Singhbhum", branch: "Mechanical Engineering" },
{ name: "Ranjeet Kumar Singh", admissionYear: 2023, school: "JNV Sitamarhi", branch: "Mechanical Engineering" },
{ name: "Jitendra Kumar Singh", admissionYear: 2023, school: "JNV Begusarai", branch: "Mechanical Engineering" },
{ name: "Dharmendra Kumar Singh", admissionYear: 2023, school: "JNV Lakhisarai", branch: "Mechanical Engineering" },
{ name: "Rajeev Kumar Singh", admissionYear: 2023, school: "JNV Supaul", branch: "Mechanical Engineering" },
{ name: "Sanjeev Kumar Singh", admissionYear: 2023, school: "JNV Araria", branch: "Mechanical Engineering" },
{ name: "Ajeet Kumar Singh", admissionYear: 2023, school: "JNV Katihar", branch: "Mechanical Engineering" },
{ name: "Abhijeet Kumar Singh", admissionYear: 2023, school: "JNV Purnia", branch: "Mechanical Engineering" },
{ name: "Indrajeet Kumar Singh", admissionYear: 2023, school: "JNV Saharsa", branch: "Mechanical Engineering" },
{ name: "Vishwajeet Kumar Singh", admissionYear: 2023, school: "JNV Samastipur", branch: "Mechanical Engineering" },
{ name: "Satyajeet Kumar Singh", admissionYear: 2023, school: "JNV Muzaffarpur", branch: "Mechanical Engineering" },
{ name: "Amarjeet Kumar Singh", admissionYear: 2023, school: "JNV Gaya", branch: "Mechanical Engineering" },
];

// --- Helper Functions ---
const getYearOfStudy = (admissionYear) => {
const today = new Date(); // Using current date for dynamic calculation
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0-indexed (January is 0)

// Academic year usually starts around July (month index 6)
// If it's before July, we consider the previous academic year.
const academicYear = currentMonth < 6 ? currentYear - 1 : currentYear;

const yearOfStudy = academicYear - admissionYear + 1;

if (yearOfStudy > 4) return "Alumnus/Alumna";
if (yearOfStudy === 1) return "1st Year";
if (yearOfStudy === 2) return "2nd Year";
if (yearOfStudy === 3) return "3rd Year";
if (yearOfStudy === 4) return "4th Year";
return "Graduate"; // Fallback for edge cases
};


// --- Page Components ---

const Header = ({ activeSection, onNavClick }) => {
const navLinks = ["Home", "About", "Notices", "Links", "Seniors", "Map", "Gallery", "Contact"];
return (
<header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
<nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm rounded-b-lg shadow-lg">
<a href="#home" onClick={() => onNavClick('home')} className="text-2xl font-bold text-white">DAAN IITG</a>
<div className="hidden md:flex items-center space-x-8">
{navLinks.map(link => (
<a
key={link}
href={`#${link.toLowerCase().replace(' ', '-')}`}
onClick={(e) => {
e.preventDefault();
onNavClick(link.toLowerCase().replace(' ', '-'));
}}
className={`text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative font-medium ${activeSection === link.toLowerCase().replace(' ', '-') ? 'text-cyan-400' : ''}`}
>
{link}
{activeSection === link.toLowerCase().replace(' ', '-') && (
<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"></span>
)}
</a>
))}
</div>
</nav>
</header>
);
};

const Hero = ({ onNavClick }) => {
const [typedText, setTypedText] = useState('');
const roles = ["to IIT Guwahati", "to a new chapter", "to endless opportunities"];
const typingSpeed = 100;
const deletingSpeed = 50;
const delay = 2000;

useEffect(() => {
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timeoutId;

const type = () => {
const currentRole = roles[roleIndex];
if (isDeleting) {
setTypedText(currentRole.substring(0, charIndex - 1));
charIndex--;
} else {
setTypedText(currentRole.substring(0, charIndex + 1));
charIndex++;
}

if (!isDeleting && charIndex === currentRole.length) {
isDeleting = true;
timeoutId = setTimeout(type, delay);
} else if (isDeleting && charIndex === 0) {
isDeleting = false;
roleIndex = (roleIndex + 1) % roles.length;
timeoutId = setTimeout(type, typingSpeed);
} else {
timeoutId = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}
};
timeoutId = setTimeout(type, 250);
return () => clearTimeout(timeoutId);

}, []);

return (
<section id="home" className="h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
<div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
<div className="text-center z-10 p-4">
<h1 className="text-5xl md:text-7xl font-extrabold mb-4">
Welcome, <span className="text-cyan-400">Dakshana Scholars!</span>
</h1>
<p className="text-2xl md:text-3xl font-light text-gray-300">
Welcome {typedText}
<span className="animate-ping">|</span>
</p>
<a href="#notices" onClick={() => onNavClick('notices')} className="mt-12 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
Get Started
</a>
</div>
</section>
);
};

const About = () => {
const resources = [
{ name: "Academics", icon: ICONS.academics },
{ name: "Hostel Life", icon: ICONS.hostel },
{ name: "Fests & Clubs", icon: ICONS.fests },
];

return (
<section id="about" className="py-20 bg-gray-800 text-white">
<div className="container mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-12">Your Journey Begins</h2>
<div className="flex flex-col md:flex-row items-center gap-12">
<div className="md:w-1/3">
<img
src="https://placehold.co/400x400/111827/7DD3FC?text=IITG"
alt="IIT Guwahati"
className="rounded-full shadow-2xl mx-auto border-4 border-cyan-400"
/>
</div>
<div className="md:w-2/3 text-lg text-gray-300">
<p className="mb-4">
Congratulations on making it to IIT Guwahati! A new and exciting chapter of your life is about to begin. The Dakshana Alumni Association Network (DAAN) is here to welcome you and support you every step of the way.
</p>
<p className="mb-6">
We are a community of your seniors who have walked the same path. We're here to help you navigate academic life, campus culture, and everything in between. Never hesitate to reach out!
</p>
<h3 className="text-2xl font-semibold text-cyan-400 mb-4">What to Expect</h3>
<div className="flex flex-wrap gap-4">
{resources.map(resource => (
<div key={resource.name} className="flex items-center bg-gray-700 rounded-full px-4 py-2">
<Icon path={resource.icon} className="w-6 h-6 mr-2 text-cyan-400"/>
<span>{resource.name}</span>
</div>
))}
</div>
</div>
</div>
</div>
</section>
);
};

const ImportantNotices = () => {
const notices = [
{
icon: ICONS.calendar,
title: "Joining Date",
content:
"The official joining date for all first-year students is 20th July. Please plan your travel accordingly.",
rotation: "transform -rotate-2",
},
{
icon: ICONS.suitcase,
title: "Items to Bring",
content:
"A comprehensive list of essential items including documents, clothing, and other necessities will be shared soon.",
rotation: "transform rotate-1",
link: "https://drive.google.com/file/d/1z3s7l4bjbGE1IKoXWTzkOcQGM8f6qdqg/view?usp=drivesdk",
},
{
icon: ICONS.laptop,
title: "Laptop Guide",
content:
"Confused about which laptop to buy? We've prepared a detailed guide based on different department needs.",
rotation: "transform rotate-2",
link: "https://drive.google.com/file/d/1zH9uNXgiKLz6ayWHkarOhrkK7urjs25q/view?usp=drivesdk",
},
{
icon: ICONS.scholarship,
title: "Scholarship Guide",
content:
"Information about various scholarships available at IITG and how to apply for them will be provided here.",
rotation: "transform -rotate-1",
},
];

return (
<section id="notices" className="py-20 bg-gray-900 text-white">
<div className="container mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-12">Bulletin Board</h2>
<div className="bg-yellow-100/10 p-8 rounded-lg shadow-inner border-4 border-dashed border-gray-700">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{notices.map((notice, index) => (
<div
key={index}
className={`bg-yellow-50 text-gray-800 p-6 rounded-lg shadow-lg relative transition-transform duration-300 hover:scale-105 ${notice.rotation}`}
>
<div className="absolute -top-3 -right-3 text-red-500">
<Icon path={ICONS.pushpin} className="w-8 h-8 transform rotate-45" />
</div>
<div className="flex items-center mb-3">
<Icon path={notice.icon} className="w-7 h-7 text-cyan-600 mr-3" />
<h3 className="text-xl font-bold text-gray-900">{notice.title}</h3>
</div>
<p className="text-gray-700">{notice.content}</p>
{notice.link && (
<a
href={notice.link}
target="_blank"
rel="noopener noreferrer"
className="mt-4 inline-block text-sm text-blue-600 underline hover:text-blue-800"
>
View More
</a>
)}
</div>
))}
</div>
</div>
</div>
</section>
);
};

const QuickLinks = () => {
const links = [
{
title: "IITG ERP System",
href: "https://academic.iitg.ac.in/sso/",
icon: ICONS.erp,
description: "Access your academic records, course registrations, and grades."
},
{
title: "IITG Automation",
href: "https://online.iitg.ac.in/sso/",
icon: ICONS.automation,
description: "Manage various online services and administrative tasks."
},
{
title: "One Stop App",
href: "https://play.google.com/store/apps/details?id=com.swciitg.onestop2&hl=en_IN",
icon: ICONS.oneStopApp,
description: "The official all-in-one app for IITG students. Available on Google Play."
},
{
title: "IITG Admission",
href: "https://www.iitg.ac.in/acad/admission/",
icon: ICONS.admission,
description: "Find all official information related to admissions."
}
];

return (
<section id="links" className="py-20 bg-gray-800 text-white">
<div className="container mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-12">Quick Links</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{links.map((link, index) => (
<a href={link.href} key={index} target="_blank" rel="noopener noreferrer" className="block bg-gray-900 p-6 rounded-lg shadow-lg hover:bg-gray-700/70 hover:-translate-y-2 transition-all duration-300">
<div className="flex justify-center items-center mb-4">
<div className="bg-gray-800 p-4 rounded-full">
<Icon path={link.icon} className="w-8 h-8 text-cyan-400" />
</div>
</div>
<h3 className="text-xl font-bold text-center text-white mb-2">{link.title}</h3>
<p className="text-gray-400 text-center text-sm">{link.description}</p>
</a>
))}
</div>
</div>
</section>
);
};

const Seniors = ({ onShowAllSeniors }) => {
// FIXED: Changed featured names to people who exist in the data.
const featuredSeniorNames = [
"Adarsh Kumar", "Brijesh Singh Bharti", "Nishan Bhakta", "Kanak Kamini Maiti", "Vaibhav C D",
"Ayush Kumar Gupta", "Ashutosh Kumar", "Yash Raj", "Aniket Kumar", "Divue Kumar"
];

const seniors = useMemo(() =>
featuredSeniorNames.map(name =>
allSeniorsData.find(s => s.name === name)
).filter(Boolean), []); // Using useMemo to prevent re-calculation

return (
<section id="seniors" className="py-20 bg-gray-900 text-white">
<div className="container mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-12">Meet Your Seniors</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
{seniors.map((senior, index) => (
<div key={index} className="bg-gray-800 rounded-lg p-6 text-center shadow-lg transform transition-transform duration-300 hover:scale-105">
<img src={`https://placehold.co/300x300/1F2937/38BDF8?text=${senior.name.split(' ').map(n=>n[0]).join('')}`} alt={senior.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400" />
<h3 className="text-xl font-bold">{senior.name}</h3>
<p className="text-cyan-400 text-sm">{senior.branch}</p>
<p className="text-gray-400 text-sm">{getYearOfStudy(senior.admissionYear)}</p>
<p className="text-gray-500 mb-4 text-xs">{senior.school}</p>
<a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
<Icon path={ICONS.linkedin} className="w-8 h-8 mx-auto" />
</a>
</div>
))}
</div>
<div className="text-center mt-12">
<button onClick={onShowAllSeniors} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 text-lg">
More About Seniors
</button>
</div>
</div>
</section>
);
};

const CampusMap = () => {
return (
<section id="map" className="py-20 bg-gray-800 text-white">
<div className="container mx-auto px-6">
<div className="text-center mb-12">
<h2 className="text-4xl font-bold">Interactive Campus Map</h2>
<a
href="https://www.iitg.ac.in/iitg_map/iitg_map.pdf" // <-- ACTION: Replaced '#' with a valid link.
target="_blank"
rel="noopener noreferrer"
className="mt-4 inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
>
<Icon path={ICONS.download} className="w-5 h-5" />
Download Map (PDF)
</a>
</div>
<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700">
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14325.717529452427!2d91.68367988880894!3d26.149950796850556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5b1017338579%3A0x4b78747a02b15a63!2sIndian%20Institute%20of%20Technology%20Guwahati!5e0!3m2!1sen!2sin!4v1690000000000" // A more interactive map embed
className="w-full h-full"
style={{ border: 0 }}
allowFullScreen=""
loading="lazy"
title="IIT Guwahati Campus Map"
></iframe>
</div>
</div>
</section>
);
};

const Gallery = () => {
const images = [
{ src: "https://i.postimg.cc/vm7kwrfJ/IMG-20250719-WA0038.jpg", alt: "IITG Library" },
{ src: "https://i.postimg.cc/MTmStk9j/IMG-20250719-WA0039.jpg", alt: "IITG Academic Complex" },
{ src: "https://i.postimg.cc/Hn8tdmFr/IMG-20250719-WA0037.jpg", alt: "IITG Lakes" },
{ src: "https://i.postimg.cc/L8WL4wBf/IMG-20250719-WA0036.jpg", alt: "IITG Auditorium" },
{ src: "https://i.postimg.cc/qRs3LRfX/IMG-20250719-WA0035.jpg", alt: "IITG Janmastami" },
// FIXED: Corrected the 'hhttps://' typo.
{ src: "https://i.postimg.cc/yxN8ZY7N/IMG-20250719-WA0033.jpg", alt: "IITG Upper View" },
{ src: "https://i.postimg.cc/0jH2dRN0/IMG-20250719-WA0030.jpg", alt: "IITG Holi" },
];

return (
<section id="gallery" className="py-20 bg-gray-900 text-white">
<div className="container mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-12">Campus Gallery</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{images.map((image, index) => (
<div key={index} className={`overflow-hidden rounded-lg shadow-lg group ${index < 2 ? 'col-span-2' : ''} ${index === 2 ? 'lg:row-span-2' : ''}`}>
<img
src={image.src}
alt={image.alt}
className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
/>
</div>
))}
</div>
</div>
</section>
);

};

const Contact = () => {
// FIXED: Sourced contact info directly from allSeniorsData to ensure consistency.
const contactNames = ["Adarsh Kumar", "Nishan Bhakta", "Ayush Kumar Gupta", "Kanak Kamini Maiti"];
const contacts = useMemo(() =>
contactNames.map(name =>
allSeniorsData.find(s => s.name === name && s.phone)
).filter(Boolean), []);

return (
<section id="contact" className="py-20 bg-gray-800 text-white">
<div className="container mx-auto px-6 text-center">
<h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
<p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
Your seniors at DAAN are here to help. Whether you have questions about academics, hostels, or just want to chat, feel free to reach out. We're excited to meet you!
</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{contacts.map((contact, index) => (
<div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg">
<h3 className="text-2xl font-bold text-cyan-400">{contact.name}</h3>
<p className="text-gray-400 mb-3">{getYearOfStudy(contact.admissionYear)}</p>
<div className="flex items-center justify-center gap-2 text-lg">
<Icon path={ICONS.phone} className="w-5 h-5 text-gray-400" />
<a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-cyan-300">{contact.phone}</a>
</div>
</div>
))}
</div>
</div>
</section>
);
};

const Footer = () => {
return (
<footer className="bg-gray-900 text-gray-400 py-6">
<div className="container mx-auto px-6 text-center">
<p>© {new Date().getFullYear()} DAAN IIT Guwahati. All Rights Reserved.</p>
</div>
</footer>
);
};

const AllSeniorsPage = ({ onBack }) => {
const seniorsByBatch = useMemo(() => {
const admissionYears = [...new Set(allSeniorsData.map(s => s.admissionYear))].sort((a, b) => b - a);
return admissionYears.map(year => ({
year,
students: allSeniorsData.filter(s => s.admissionYear === year)
})).filter(group => group.students.length > 0);
}, []);

return (
<div className="bg-gray-900 text-white min-h-screen">
<div className="container mx-auto px-6 py-20">
<button onClick={onBack} className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-cyan-300 transition-colors">
<Icon path={ICONS.arrowLeft} />
Back to Main Page
</button>
<h1 className="text-5xl font-bold text-center mb-12">All Seniors</h1>

{seniorsByBatch.map(({ year, students }) => (
<div key={year} id={`batch-${year}`} className="mb-16">
<h2 className="text-4xl font-bold text-cyan-400 mb-8 border-b-2 border-cyan-400/30 pb-2">Batch of {year} ({getYearOfStudy(year)})</h2>
<div className="overflow-x-auto">
<table className="w-full text-left table-auto">
<thead className="bg-gray-800">
<tr>
<th className="p-4 rounded-tl-lg">Name</th>
<th className="p-4">Branch</th>
<th className="p-4 rounded-tr-lg">School</th>
</tr>
</thead>
<tbody className="bg-gray-800/50">
{students.map((student, index) => (
<tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
<td className="p-4 font-medium">{student.name}</td>
<td className="p-4">{student.branch}</td>
<td className="p-4">{student.school}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
))}
</div>
</div>
);

};


// --- Main App Component ---
export default function App() {
const [activeSection, setActiveSection] = useState('home');
const [page, setPage] = useState('main'); // 'main' or 'allSeniors'

const sectionRefs = {
home: useRef(null),
about: useRef(null),
notices: useRef(null),
links: useRef(null),
seniors: useRef(null),
map: useRef(null),
gallery: useRef(null),
contact: useRef(null),
};

const handleNavClick = (id) => {
if (page !== 'main') {
setPage('main');
// Use timeout to ensure page is rendered before scrolling
setTimeout(() => {
document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}, 100);
} else {
document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
};

useEffect(() => {
if (page !== 'main') return;

const observer = new IntersectionObserver(
(entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
setActiveSection(entry.target.id);
}
});
},
{ rootMargin: '-50% 0px -50% 0px' }
);

const refs = Object.values(sectionRefs);
refs.forEach(ref => {
if (ref.current) observer.observe(ref.current);
});

return () => {
refs.forEach(ref => {
if (ref.current) observer.unobserve(ref.current);
});
};

}, [page, sectionRefs]);

if (page === 'allSeniors') {
return <AllSeniorsPage onBack={() => setPage('main')} />;
}

return (
<div className="bg-gray-900 font-sans leading-normal tracking-tight">
<style>{` html { scroll-behavior: smooth; } .bg-grid-gray-700\\[\\/0\\.2\\] { background-image: linear-gradient(to right, rgba(55, 65, 81, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(55, 65, 81, 0.2) 1px, transparent 1px); background-size: 3rem 3rem; } .animate-ping { display: inline-block; vertical-align: middle; width: 2px; height: 1.5em; background-color: #67e8f9; /* cyan-300 */ animation: blink 1s step-end infinite; } @keyframes blink { from, to { background-color: transparent } 50% { background-color: #67e8f9; } } .aspect-w-16 { position: relative; padding-bottom: 56.25%; } .aspect-h-9 { /* This class is used with aspect-w-16 */ } .aspect-w-16 > * { position: absolute; height: 100%; width: 100%; top: 0; right: 0; bottom: 0; left: 0; } `}</style>
<Header activeSection={activeSection} onNavClick={handleNavClick} />
<main>
<div id="home" ref={sectionRefs.home}><Hero onNavClick={handleNavClick} /></div>
<div id="about" ref={sectionRefs.about}><About /></div>
<div id="notices" ref={sectionRefs.notices}><ImportantNotices /></div>
<div id="links" ref={sectionRefs.links}><QuickLinks /></div>
<div id="seniors" ref={sectionRefs.seniors}><Seniors onShowAllSeniors={() => setPage('allSeniors')} /></div>
<div id="map" ref={sectionRefs.map}><CampusMap /></div>
<div id="gallery" ref={sectionRefs.gallery}><Gallery /></div>
<div id="contact" ref={sectionRefs.contact}><Contact /></div>
</main>
<Footer />
</div>
);
}
