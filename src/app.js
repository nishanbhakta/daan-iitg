import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Helper Components ---

// Icon component for skills and links
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// --- SVG Icons ---
const ICONS = {
  linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  academics: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.69L4.5 8 12 5l7.5 3L12 11.69z",
  hostel: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z",
  fests: "M12 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5zm0 17c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-2-9.5c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm4 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm-5 4c.83 1.17 2.25 2 4 2s3.17-.83 4-2H8z",
  arrowLeft: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  erp: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
  automation: "M21.99 8.89c0-1.23-1.04-2.22-2.32-2.22c-.37 0-.72.09-1.03.25l-1.48-1.48C16.3 4.58 15.23 4 14 4c-2.21 0-4 1.79-4 4c0 .89.29 1.71.78 2.38L4 17.17V20h2.83l6.79-6.79c.67.48 1.49.78 2.38.78c2.21 0 4-1.79 4-4c0-1.23-.58-2.3-1.44-3.02l1.48-1.48c.16.31.25.66.25 1.03c0 .34-.05.67-.13.98l-2.09 7.12H22V8.89zM14 10c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z",
  oneStopApp: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z",
  admission: "M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  calendar: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z",
  suitcase: "M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z",
  laptop: "M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z",
  scholarship: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
  pushpin: "M16 9V4h2V2H6v2h2v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.74-.25 1.02l-2.2 2.2z",
};

// --- Data ---
const allSeniorsData = [
    { name: "Harshit Chachariya", admissionYear: 2022, school: "JNV Nagaur", branch: "Electronics & Communication Engineering" },
    { name: "Siba Sankar", admissionYear: 2023, school: "JNV Cuttack", branch: "Civil Engineering" },
    { name: "Adarsh Kumar", admissionYear: 2023, school: "JNV Siwan", branch: "Civil Engineering" },
    { name: "Brijesh Singh Bharti", admissionYear: 2022, school: "JNV Azamgarh", branch: "Computer Science & Engineering" },
    { name: "Ishita Brice", admissionYear: 2022, school: "JNV Ranchi", branch: "Computer Science & Engineering" },
    { name: "Nishan Bhakta", admissionYear: 2023, school: "JNV Cooch Behar", branch: "Mechanical Engineering" },
    { name: "Kanak Kamini Maiti", admissionYear: 2023, school: "JNV Bankura", branch: "Chemical Engineering" },
    { name: "Vaibhav C D", admissionYear: 2024, school: "JNV Bangalore Urban", branch: "Computer Science & Engineering" },
    { name: "Ayush Kumar Gupta", admissionYear: 2024, school: "JNV Raebareli", branch: "Electronics & Communication Engineering" },
    { name: "Ashutosh Kumar", admissionYear: 2022, school: "JNV Gopalganj", branch: "Mechanical Engineering" },
    { name: "Yash Raj", admissionYear: 2021, school: "JNV Pune", branch: "Chemical Engineering" },
    { name: "Aniket Kumar", admissionYear: 2021, school: "JNV West Champaran", branch: "Chemical Engineering" },
    { name: "Divue Kumar", admissionYear: 2021, school: "JNV Sheikhpura", branch: "Chemical Engineering" },
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
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // A student admitted in 2024 is in 1st year.
    const yearOfStudy = currentYear - admissionYear + 1;

    if (yearOfStudy > 4) return "Alumnus/Alumna";
    if (yearOfStudy === 1) return "1st Year";
    if (yearOfStudy === 2) return "2nd Year";
    if (yearOfStudy === 3) return "3rd Year";
    if (yearOfStudy === 4) return "4th Year";
    return "Graduate"; // Fallback
};

// --- Page Components ---

const Header = ({ activeSection, onNavClick }) => {
  const navLinks = ["Home", "About", "Notices", "Links", "Seniors", "Map", "Gallery", "Contact"];
  return (
    

      

         onNavClick('home')} className="text-2xl font-bold text-white">DAAN IITG
        

          {navLinks.map(link => (
             {
                  e.preventDefault();
                  onNavClick(link.toLowerCase().replace(' ', '-'));
              }}
              className={`text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative font-medium
                ${activeSection === link.toLowerCase().replace(' ', '-') ? 'text-cyan-400' : ''}`}
            >
              {link}
              {activeSection === link.toLowerCase().replace(' ', '-') && (
                 
              )}
            
          ))}
        

      

    

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
    

      

      

        

          Welcome, Dakshana Scholars!
        

        

          Welcome {typedText}
          |
        


         onNavClick('notices')} className="mt-12 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
          Get Started
        
      

    

  );
};

const About = () => {
  const resources = [
    { name: "Academics", icon: ICONS.academics },
    { name: "Hostel Life", icon: ICONS.hostel },
    { name: "Fests & Clubs", icon: ICONS.fests },
  ];

  return (
    

      

        
Your Journey Begins

        

          

            IIT Guwahati
          

          

            

              Congratulations on making it to IIT Guwahati! A new and exciting chapter of your life is about to begin. The Dakshana Alumni Association Network (DAAN) is here to welcome you and support you every step of the way.
            


            

              We are a community of your seniors who have walked the same path. We're here to help you navigate academic life, campus culture, and everything in between. Never hesitate to reach out!
            


            
What to Expect

            

              {resources.map(resource => (
                

                  
                  {resource.name}
                

              ))}
            

          

        

      

    

  );
};

const ImportantNotices = () => {
  const notices = [
    {
      icon: ICONS.calendar,
      title: "Joining Date",
      content: "The official joining date for all first-year students is 20th July. Please plan your travel accordingly.",
      rotation: "transform -rotate-2"
    },
    {
      icon: ICONS.suitcase,
      title: "Items to Bring",
      content: "A comprehensive list of essential items including documents, clothing, and other necessities will be shared soon.",
      rotation: "transform rotate-1"
    },
    {
      icon: ICONS.laptop,
      title: "Laptop Guide",
      content: "Confused about which laptop to buy? We've prepared a detailed guide based on different department needs.",
      rotation: "transform rotate-2"
    },
    {
      icon: ICONS.scholarship,
      title: "Scholarship Guide",
      content: "Information about various scholarships available at IITG and how to apply for them will be provided here.",
      rotation: "transform -rotate-1"
    },
  ];

  return (
    

      

        
Bulletin Board

        

            

            {notices.map((notice, index) => (
                

                    

                        
                    

                    

                        
                        
{notice.title}

                    

                    
{notice.content}


                

            ))}
            

        

      

    

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
    

      

        
Quick Links

        

          {links.map((link, index) => (
            
              

                

                  
                

              

              
{link.title}

              
{link.description}


            
          ))}
        

      

    

  );
};

const Seniors = ({ onShowAllSeniors }) => {
    const featuredSeniorNames = [
        "Harshit Chachariya", "Siba Sankar", "Adarsh Kumar", "Brijesh Singh Bharti", 
        "Ishita Brice", "Nishan Bhakta", "Kanak Kamini Maiti", "Vaibhav C D", 
        "Ayush Kumar Gupta", "Ashutosh Kumar"
    ];

    const seniors = featuredSeniorNames.map(name => 
        allSeniorsData.find(s => s.name === name)
    ).filter(Boolean); // filter(Boolean) removes any undefined if a name wasn't found

  return (
    

      

        
Meet Your Seniors

        

          {seniors.map((senior, index) => (
            

              n[0]).join('')}`} alt={senior.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400" />
              
{senior.name}

              
{senior.branch}


              
{getYearOfStudy(senior.admissionYear)}


              
{senior.school}


               e.preventDefault()} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                
              
            

          ))}
        

        

            
                More About Seniors
            
        

      

    

  );
};

const CampusMap = () => {
    return (
        

            

                
Interactive Campus Map

                

                    
                

            

        

    );
};

const Gallery = () => {
    const images = [
        { src: "https://drive.google.com/uc?export=view&id=1FSlTBYHaqreLg9RqnWnhRnf1Xoeo_yh7", alt: "IITG Campus View" },
        { src: "https://drive.google.com/uc?export=view&id=1eO1v9oAzBG6r-QWt_lWAvo8E2ER_wU2w", alt: "IITG Academic Complex" },
        { src: "https://drive.google.com/uc?export=view&id=1eHjygxfCCe4PHR7-zYyeHx0pxgNgs8Vf", alt: "IITG Library" },
        { src: "https://drive.google.com/uc?export=view&id=16zq2GYYSzdLHq5s9XnP2hpR7tFclB72O", alt: "IITG Hostel Area" },
        { src: "https://drive.google.com/uc?export=view&id=1E-fxxb66BRoP7_YvpCA1Y52kfm5YbgQk", alt: "IITG Sports Complex" },
        { src: "https://drive.google.com/uc?export=view&id=11PdE5cZ7i7KwBc8Xp-eCmUBKn2np2pd1", alt: "IITG River View" },
        { src: "https://drive.google.com/uc?export=view&id=1UEl8nbxVGfZkgkiIvILYgcD9UC3usASD", alt: "IITG Campus Entrance" },
        { src: "https://drive.google.com/uc?export=view&id=17ip0S_EB-k2fujRD9T4YHQpVo40f1cU1", alt: "IITG Lecture Hall" },
        { src: "https://drive.google.com/uc?export=view&id=1Oj52O3hwEhoxWZJGHgT0aSetmPQVU5MT", alt: "IITG Campus Festival" },
        { src: "https://drive.google.com/uc?export=view&id=18fAEvNZxdG84BBWlpTudts2w0nIJ-hXy", alt: "IITG Campus Nature" },
    ];

    return (
        

            

                
Campus Gallery

                

                    {images.map((image, index) => (
                        

                            {image.alt}
                        

                    ))}
                

            

        

    );
};


const Contact = () => {
  const contacts = [
      { name: "Adarsh Kumar", phone: "+91 76675 91456", year: getYearOfStudy(2022) },
      { name: "Nishan Bhakta", phone: "+91 75858 42982", year: getYearOfStudy(2023) },
      { name: "Ayush Kumar Gupta", phone: "+91 6266 110 461", year: getYearOfStudy(2023) },
      { name: "Kanak K Maiti", phone: "+91 6297 558 783", year: getYearOfStudy(2023) },
  ];

  return (
    

      

        
Have Questions?

        

          Your seniors at DAAN are here to help. Whether you have questions about academics, hostels, or just want to chat, feel free to reach out. We're excited to meet you!
        


        

            {contacts.map((contact, index) => (
                

                    
{contact.name}

                    
{contact.year}


                    

                        
                        {contact.phone}
                    

                

            ))}
        

      

    

  );
};

const Footer = () => {
  return (
    

      

        
© {new Date().getFullYear()} DAAN IIT Guwahati. All Rights Reserved.


      

    

  );
};

const AllSeniorsPage = ({ onBack }) => {
    const admissionYears = [2021, 2022, 2023, 2024];
    const seniorsByBatch = admissionYears.map(year => ({
        year,
        students: allSeniorsData.filter(s => s.admissionYear === year)
    })).filter(group => group.students.length > 0);

    return (
        

            

                
                    
                    Back to Main Page
                
                
All Seniors

                
                {seniorsByBatch.map(({ year, students }) => (
                    

                        
Batch of {year} ({getYearOfStudy(year)})

                        

                            
                                    {students.map((student, index) => (
                                        
                                    ))}
                                
Name	Branch	School
{student.name}	{student.branch}	{student.school}

                        

                    

                ))}
            

        

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

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [page]);
  
  if (page === 'allSeniors') {
      return  setPage('main')} />;
  }

  return (
    

      
      

      

        

        

        

        

        
 setPage('allSeniors')} />

        

        

        

      

      

    

  );
}
