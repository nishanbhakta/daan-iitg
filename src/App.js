import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Helper Components ---

/**
 * Renders an SVG icon.
 * @param {object} props - The component props.
 * @param {string} props.path - The SVG path data.
 * @param {string} [props.className="w-6 h-6"] - Tailwind CSS classes for styling.
 */
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// --- SVG Icon Paths ---
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
  search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
};

// --- Data ---
const allSeniorsData = [
  { "name": "Mohit Kumar", "admissionYear": 2025, "school": "Non JNV", "branch": "CSE", "phone": "+91 0000000000" },
  { "name": "VIKASH KUMAR MAHRA", "admissionYear": 2025, "school": "JNV Amarkantak Anuppur Madhya Pradesh", "branch": "MNC", "phone": "+91 9098703807" },
  { "name": "Pratibha", "admissionYear": 2025, "school": "Non JNV", "branch": "ECE", "phone": "+91 9354029030" },
  { "name": "NITIN KUMAR MEENA", "admissionYear": 2025, "school": "ALWAR RAJASTHAN", "branch": "MNC", "phone": "+91 9414804982" },
  { "name": "Ankit Dhakad", "admissionYear": 2025, "school": "Jnv Shivpuri mp", "branch": "CE", "phone": "+91 8817468685" },
  { "name": "Sacheth Gowda.k", "admissionYear": 2025, "school": "JNV Mandya", "branch": "CST", "phone": "+91 6362451091" },
  { "name": "Siddharth Maruti Sanap", "admissionYear": 2025, "school": "JNV Nashik", "branch": "ME", "phone": "+91 9923012640" },
  { "name": "Sayan Majee", "admissionYear": 2025, "school": "Jnv Purulia", "branch": "EEE", "phone": "+91 9883841404" },
  { "name": "Aryan", "admissionYear": 2025, "school": "Jethian, gaya-1, bihar", "branch": "CSE", "phone": "+91 7739713126" },
  { "name": "Mehak", "admissionYear": 2025, "school": "Jnv jhajjar", "branch": "ME", "phone": "+91 7027321340" },
  { "name": "SATISH KUMAR JARABALA", "admissionYear": 2025, "school": "WEST GODAVARI", "branch": "NOT AVAILABLE", "phone": "+91 9347284002" },
  { "name": "Ankit chaurasiya", "admissionYear": 2025, "school": "JNV SIDDHARTH NAGAR", "branch": "ECE", "phone": "+91 9336062390" },
  { "name": "Navaneeth Kumar", "admissionYear": 2025, "school": "J N V Kolar", "branch": "ME", "phone": "+91 6361176947" },
  { "name": "Sajan kumar", "admissionYear": 2025, "school": "East Champaran", "branch": "CSE", "phone": "+91 8651462479" },
  { "name": "Ujjwal Ahirwar", "admissionYear": 2025, "school": "JNV VIDISHA", "branch": "CSE", "phone": "+91 6263610945" },
  { "name": "Pushpendra Kurrey", "admissionYear": 2025, "school": "PM Shree Jawahar Navodaya Vidyalaya Bahera, Bemetara, Chhattisgarh", "branch": "ECE", "phone": "+91 9238569175" },
  { "name": "Laxmidhar Mohapatra", "admissionYear": 2025, "school": "JNV Balasore", "branch": "CSE", "phone": "+91 9861783046" },
  { "name": "Kshetrimayum Naresh Singh", "admissionYear": 2025, "school": "Jnv Kakching", "branch": "DSAI", "phone": "+91 7085177536" },
  { "name": "Suresh Kumar", "admissionYear": 2025, "school": "Jnv chitrakoot", "branch": "CHE", "phone": "+91 0000000000" },
  { "name": "Aman", "admissionYear": 2025, "school": "Jnv alwar rajasthan", "branch": "MNC", "phone": "+91 0000000000" },
  { "name": "Ekta Yadav", "admissionYear": 2025, "school": "JNV Deoria ,Uttar Pradesh", "branch": "CHE", "phone": "+91 9695562256" },
  { "name": "Priyanka sandilya", "admissionYear": 2025, "school": "Jnv koria chattisgarh", "branch": "ECE", "phone": "+91 9303402450" },
  { "name": "Anupam Jagadev", "admissionYear": 2025, "school": "Jnv khurdha, odisha", "branch": "ECE", "phone": "+91 8249902050" },
  { "name": "Satyam", "admissionYear": 2025, "school": "Mitauli Lakhimpur Kheri,Uttar Pradesh", "branch": "CE", "phone": "+91 9793963075" },
  { "name": "Ram Singh Malviya", "admissionYear": 2025, "school": "Agar malwa mp", "branch": "CST", "phone": "+91 9981451102" },
  { "name": "RAVINDRA SINGH", "admissionYear": 2025, "school": "JNV MORADABAD UTTAR PRADESH", "branch": "ME", "phone": "+91 9520566214" },
  { "name": "Gourav", "admissionYear": 2025, "school": "Jhajjar", "branch": "CST", "phone": "+91 9306563178" },
  { "name": "MOIRANGTHEM ARLEX SINGH", "admissionYear": 2025, "school": "JNV KAKCHING(MANIPUR)", "branch": "DSAI", "phone": "+91 8575588149" },
  { "name": "Aditya Aghame", "admissionYear": 2025, "school": "JNV Akola", "branch": "ECE", "phone": "+91 8080510401" },
  { "name": "Praveen Kumar", "admissionYear": 2025, "school": "Mau (Uttar Pradesh)", "branch": "DSAI", "phone": "+91 7084819498" },
  { "name": "Akash V", "admissionYear": 2025, "school": "Chikkamagaluru,Karnataka", "branch": "MNC", "phone": "+91 6360472205" },
  { "name": "Guguloth Vinay", "admissionYear": 2025, "school": "Not JNV Iam From A Government College From Telangana", "branch": "CHE", "phone": "+91 9347603996" },
  { "name": "Manas Mistry", "admissionYear": 2025, "school": "JNV Durgapur (wb)", "branch": "NOT AVAILABLE", "phone": "+91 9083657678" },
  { "name": "Vaibhav", "admissionYear": 2025, "school": "Jnv Amethi Uttar Pradesh", "branch": "CST", "phone": "+91 9569938792" },
  { "name": "Sanjay Varun", "admissionYear": 2021, "school": "JNV Siddharth Nagar Uttar Pradesh", "branch": "ECE", "phone": "+919579222490" },
  { "name": "Kesh Pratap Singh", "admissionYear": 2021, "school": "JNV Gorakhpur Uttar Pradesh", "branch": "CHE", "phone": "+918303250609" },
  { "name": "Upesh Jeenagar", "admissionYear": 2021, "school": "JNV Rajasamand Rajasthan", "branch": "MNC", "phone": "+916367158437" },
  { "name": "Devesh Anjane", "admissionYear": 2021, "school": "JNV Harda Madhya Pradesh", "branch": "CST", "phone": "+919171523208" },
  { "name": "Ravi Lahare", "admissionYear": 2021, "school": "JNV Korba Chhattisgarh", "branch": "CSE", "phone": "+916261367276" },
  { "name": "Neelima Pulipati", "admissionYear": 2021, "school": "JNV Prakasam - I Andhra Pradesh", "branch": "EEE", "phone": "+919441416573" },
  { "name": "Ranjeet Soren", "admissionYear": 2021, "school": "JNV Dumka Jharkhand", "branch": "EEE", "phone": "+916204608007" },
  { "name": "Nitin Fatchchand", "admissionYear": 2021, "school": "JNV Faridabad Haryana", "branch": "CHE", "phone": "+917011423245" },
  { "name": "Parul Bhagat", "admissionYear": 2021, "school": "JNV Jammu - I Jammu & Kashmir", "branch": "ME", "phone": "+916006024537" },
  { "name": "Jyotish Kumar", "admissionYear": 2021, "school": "JNV Etawah Uttar Pradesh", "branch": "MNC", "phone": "+918822300668" },
  { "name": "Amit Kumar", "admissionYear": 2021, "school": "JNV Bageshwar Uttarakhand", "branch": "CSE", "phone": "+917088806959" },
  { "name": "Tanushri Rana", "admissionYear": 2021, "school": "JNV Rajasamand Rajasthan", "branch": "CSE", "phone": "+918302756614" },
  { "name": "Kundan Meena", "admissionYear": 2021, "school": "JNV Kota Rajasthan", "branch": "CSE", "phone": "+917340497817" },
  { "name": "Naresh Thakare", "admissionYear": 2021, "school": "JNV Washim Maharashtra", "branch": "CHE", "phone": "+919763908521" },
  { "name": "Rajeev Sutrakar", "admissionYear": 2021, "school": "JNV Tikamgarh Madhya Pradesh", "branch": "ME", "phone": "+918817524748" },
  { "name": "Tanuja Painkra", "admissionYear": 2021, "school": "JNV Raigarh Chhattisgarh", "branch": "EEE", "phone": "+916264094756" },
  { "name": "Nishant Bhagat", "admissionYear": 2021, "school": "JNV Surajpur (Sarguja) Chhattisgarh", "branch": "ECE", "phone": "+917898492184" },
  { "name": "Abinash Sonowal", "admissionYear": 2021, "school": "JNV Dhemaji Assam", "branch": "CSE", "phone": "+919707143035" },
  { "name": "Moirangthem Hollywood", "admissionYear": 2021, "school": "JNV Thoubal Manipur", "branch": "CE", "phone": "+919378022133" },
  { "name": "Litesh Kumar", "admissionYear": 2021, "school": "JNV Mandi Himachal Pradesh", "branch": "MNC", "phone": "+917807072144" },
  { "name": "Shikha Singh", "admissionYear": 2021, "school": "JNV Meerut Uttar Pradesh", "branch": "CE", "phone": "+917417661219" },
  { "name": "Satyam Chaurasia", "admissionYear": 2021, "school": "JNV Azamgarh Uttar Pradesh", "branch": "MNC", "phone": "+919415851404" },
  { "name": "Radhika Dargar", "admissionYear": 2021, "school": "JNV Bhilwara Rajasthan", "branch": "CHE", "phone": "+919461322889" },
  { "name": "Parmeshwar Mali", "admissionYear": 2021, "school": "JNV Bundi Rajasthan", "branch": "CE", "phone": "+919352022578" },
  { "name": "Divyesh Vankar", "admissionYear": 2021, "school": "JNV Bharuch Gujarat", "branch": "CSE", "phone": "+917573853920" },
  { "name": "Tanushree J Deogade", "admissionYear": 2021, "school": "JNV Nagpur Maharashtra", "branch": "ME", "phone": "+918077766089" },
  { "name": "Mousam Kumari", "admissionYear": 2021, "school": "JNV Bhagalpur Bihar", "branch": "CE", "phone": "+917764988870" },
  { "name": "Anand Keshav", "admissionYear": 2021, "school": "JNV Giridih Jharkhand", "branch": "CSE", "phone": "+917061655987" },
  { "name": "Shivam Kumar", "admissionYear": 2022, "school": "JNV Lucknow Uttar Pradesh", "branch": "MNC", "phone": "+917906664809" },
  { "name": "Kethavath Durga Prasad", "admissionYear": 2022, "school": "JNV Kottayam Kerala", "branch": "CSE", "phone": "+919703284221" },
  { "name": "Brijesh Singh Bharti", "admissionYear": 2022, "school": "JNV Kottayam Kerala", "branch": "CST", "phone": "+919569061042", "image": "https://i.postimg.cc/CKNb3BqY/Brijesh.png" },
  { "name": "Sandesh Jogdande", "admissionYear": 2022, "school": "JNV Bundi Rajasthan", "branch": "ECE", "phone": "+919527714562" },
  { "name": "Alku Mandal", "admissionYear": 2022, "school": "JNV Bundi Rajasthan", "branch": "CSE", "phone": "+919263164582" },
  { "name": "Rohit Keshri", "admissionYear": 2022, "school": "JNV Kottayam Kerala", "branch": "MNC", "phone": "+918857092573" },
  { "name": "Ashutosh Kumar (Ex CR)", "admissionYear": 2022, "school": "JNV Ballia Uttar Pradesh", "branch": "EEE", "phone": "+919794301288", "image": "https://i.postimg.cc/jdbPS44K/Ashutosh-Kumar.png" },
  { "name": "Bhairu Singh Kanawat", "admissionYear": 2022, "school": "JNV Bhilwara Rajasthan", "branch": "ECE", "phone": "+919672401165" },
  { "name": "Saurabh Kumbhare", "admissionYear": 2022, "school": "JNV Chandrapur Maharashtra", "branch": "EEE", "phone": "+918767589268" },
  { "name": "Harshit Chachriya", "admissionYear": 2022, "school": "JNV Khandwa Madhya Pradesh", "branch": "CSE", "phone": "+919302057401" },
  { "name": "Vishnu Shakya", "admissionYear": 2022, "school": "JNV Bhind Madhya Pradesh", "branch": "CSE", "phone": "+918889764357" },
  { "name": "Monu Singh Bhargav", "admissionYear": 2022, "school": "JNV Morena Madhya Pradesh", "branch": "MNC", "phone": "+919945644977" },
  { "name": "Tapan Sethi", "admissionYear": 2022, "school": "JNV Ganjam Odisha", "branch": "CSE", "phone": "+919556884422" },
  { "name": "Don Basumatary", "admissionYear": 2022, "school": "JNV Baksa Assam", "branch": "MNC", "phone": "+916000846891" },
  { "name": "Anand Kumar", "admissionYear": 2022, "school": "JNV Chatra Jharkhand", "branch": "CE", "phone": "+917061959589" },
  { "name": "Rigzen Chosdon", "admissionYear": 2022, "school": "Government Boys Higher Secondary School Leh Ladakh", "branch": "MNC", "phone": "+917780940615" },
  { "name": "Abhishek Shuash", "admissionYear": 2022, "school": "JNV Ambedkar Nagar Uttar Pradesh", "branch": "MNC", "phone": "+917275969053" },
  { "name": "Ritik Rajvanshi", "admissionYear": 2022, "school": "JNV Sitapur - I Uttar Pradesh", "branch": "MNC", "phone": "+919555320565" },
  { "name": "Prince Lidhoriya", "admissionYear": 2022, "school": "JNV Jhansi Uttar Pradesh", "branch": "MNC", "phone": "+919026078954" },
  { "name": "Mahesh Gugulothu", "admissionYear": 2022, "school": "JNV Warangal Telangana", "branch": "CHE", "phone": "+917989844171" },
  { "name": "Duryodhan Deep", "admissionYear": 2022, "school": "JNV Bolangir Odisha", "branch": "CSE", "phone": "+917990108498" },
  { "name": "Rakesh Kumar", "admissionYear": 2022, "school": "Shershah College Sasaram Rohtas Bihar", "branch": "MNC", "phone": "+917020111532" },
  { "name": "Niku Raj", "admissionYear": 2022, "school": "JNV Palamu - II Jharkhand", "branch": "MNC", "phone": "+919334410813" },
  { "name": "Abhishek Kumar", "admissionYear": 2022, "school": "JNV Ambedkar Nagar Uttar Pradesh", "branch": "CSE", "phone": "+917007870957" },
  { "name": "Sanjana Kumari", "admissionYear": 2022, "school": "JNV Kaushambi Uttar Pradesh", "branch": "MNC", "phone": "+917380547173" },
  { "name": "Amar Kumar", "admissionYear": 2022, "school": "JNV Mau Uttar Pradesh", "branch": "CHE", "phone": "+917348113550" },
  { "name": "Kunal Mahale", "admissionYear": 2022, "school": "JNV Aurangabad Maharashtra", "branch": "ME", "phone": "+919137073012" },
  { "name": "Gayathri Peddapolu", "admissionYear": 2022, "school": "JNV Khammam - I Telangana", "branch": "EP", "phone": "+919440598717" },
  { "name": "Sahil Raj", "admissionYear": 2022, "school": "JNV Nalanda Bihar", "branch": "NOT AVAILABLE", "phone": "+918271570977" },
  { "name": "Adarsh Manupati", "admissionYear": 2022, "school": "JNV Karimnagar Telangana", "branch": "CSE", "phone": "+919182032323" },
  { "name": "Abhishek Kumar", "admissionYear": 2022, "school": "JNV Begusarai Bihar", "branch": "CSE", "phone": "+916351764944" },
  { "name": "Akash Rai", "admissionYear": 2022, "school": "JNV Mau Uttar Pradesh", "branch": "ECE", "phone": "+917498768424" },
  { "name": "Himanshu Kumar", "admissionYear": 2023, "school": "JNV Bareilly Uttar Pradesh", "branch": "CSE", "phone": "+919548687823" },
  { "name": "Himanshu Paswan (Associate CR)", "admissionYear": 2023, "school": "JNV Udham Singh Nagar Uttarakhand", "branch": "EEE", "phone": "+916395325991", "image": "https://i.postimg.cc/qRhp5G1Z/IMG-20250720-201942.jpg" },
  { "name": "Rahul Yadav", "admissionYear": 2023, "school": "JNV Jaipur Rajasthan", "branch": "CST", "phone": "+919928007339" },
  { "name": "Mohit Nagraj", "admissionYear": 2023, "school": "JNV Harda Madhya Pradesh", "branch": "CE", "phone": "+919340923056" },
  { "name": "Kanchari Praveen", "admissionYear": 2023, "school": "JNV Srikakulam Andhra Pradesh", "branch": "CSE", "phone": "+917013015077" },
  { "name": "Biraj Sarkar", "admissionYear": 2023, "school": "JNV North 24 Parganas West Bengal", "branch": "CSE", "phone": "+917557817318" },
  { "name": "Satyabrata Biswal", "admissionYear": 2023, "school": "JNV Bhadrak Odisha", "branch": "CHE", "phone": "+919777004253" },
  { "name": "Dineswar Boro", "admissionYear": 2023, "school": "JNV Baksa Assam", "branch": "BSBE", "phone": "+919707970588" },
  { "name": "Ramvilash Kumar Poddar", "admissionYear": 2023, "school": "JNV Deoghar Jharkhand", "branch": "ECE", "phone": "+919766064679" },
  { "name": "Harish Kumar", "admissionYear": 2023, "school": "JNV South West Delhi", "branch": "CHE", "phone": "+919871440703" },
  { "name": "Nitin Kalsi", "admissionYear": 2023, "school": "JNV Jammu - I Jammu & Kashmir", "branch": "ECE", "phone": "+919541524969" },
  { "name": "Deepesh Kumar", "admissionYear": 2023, "school": "JNV Aligarh Uttar Pradesh", "branch": "CE", "phone": "+919119758200" },
  { "name": "Vasudev Kumar", "admissionYear": 2023, "school": "JNV Kannauj Uttar Pradesh", "branch": "CE", "phone": "+917007108666" },
  { "name": "Akash Ahirwar", "admissionYear": 2023, "school": "JNV Mahoba Uttar Pradesh", "branch": "ME", "phone": "+916386194920" },
  { "name": "Ajeet Kumar", "admissionYear": 2023, "school": "JNV Firozabad Uttar Pradesh", "branch": "CSE", "phone": "+918279770594" },
  { "name": "Amaresh Rathod", "admissionYear": 2023, "school": "JNV Koppal Karnataka", "branch": "ME", "phone": "+918904104346" },
  { "name": "Sagar Barman", "admissionYear": 2023, "school": "JNV Coochbehar West Bengal", "branch": "MNC", "phone": "+918391998418" },
  { "name": "Jit Barui", "admissionYear": 2023, "school": "JNV Nadia West Bengal", "branch": "EEE", "phone": "+919832298456" },
  { "name": "Siba Sankar", "admissionYear": 2023, "school": "JNV Rayagada Odisha", "branch": "MNC", "phone": "+918456069935" },
  { "name": "Kedar Kisan", "admissionYear": 2023, "school": "JNV Sambalpur Odisha", "branch": "MNC", "phone": "+916003776308" },
  { "name": "Adarsh Kumar (CR)", "admissionYear": 2023, "school": "JNV West Champaran Bihar", "branch": "ECE", "phone": "+917667591456", "image": "https://i.postimg.cc/rsvbHZ45/Whats-App-Image-2025-07-20-at-19-09-15-d9b02464.jpg" },
  { "name": "Zulfiqar Ali", "admissionYear": 2023, "school": "Government Higher Sec School Trespone Ladakh", "branch": "ECE", "phone": "+916005440362" },
  { "name": "Priyanka Agarwal", "admissionYear": 2023, "school": "JNV Moradabad Uttar Pradesh", "branch": "MNC", "phone": "+919557437367" },
  { "name": "Shalini Rao", "admissionYear": 2023, "school": "Central Hindu Boys School Varanasi Uttar Pradesh", "branch": "CHE", "phone": "+918418901761" },
  { "name": "Sanket D Jambhule", "admissionYear": 2023, "school": "JNV Wardha Maharashtra", "branch": "ME", "phone": "+919322063369" },
  { "name": "Kaberi Pegu", "admissionYear": 2023, "school": "JNV Lakhimpur Assam", "branch": "CHE", "phone": "+916001715643" },
  { "name": "Ishita Brice", "admissionYear": 2023, "school": "JNV Kinnaur Himachal Pradesh", "branch": "MNC", "phone": "+919317631150" },
  { "name": "Arshad Ali", "admissionYear": 2023, "school": "JNV Moradabad Uttar Pradesh", "branch": "CE", "phone": "+917037163563" },
  { "name": "Abhishek Kumar", "admissionYear": 2023, "school": "JNV Lakhimpur Kheri Uttar Pradesh", "branch": "CSE", "phone": "+918874349707" },
  { "name": "Ajay Pratap", "admissionYear": 2023, "school": "JNV Pilibhit Uttar Pradesh", "branch": "CHE", "phone": "+916395338731" },
  { "name": "Aniket Ingle", "admissionYear": 2023, "school": "JNV Amravati Maharashtra", "branch": "MNC", "phone": "+919579645660" },
  { "name": "Abhinav Soni", "admissionYear": 2023, "school": "JNV Jashpur Chhattisgarh", "branch": "ECE", "phone": "+918319316263" },
  { "name": "Bibungsha Boro", "admissionYear": 2023, "school": "JNV Udalguri Assam", "branch": "ME", "phone": "+919678771379" },
  { "name": "Otsur Pegu", "admissionYear": 2023, "school": "JNV Dhemaji Assam", "branch": "CST", "phone": "+919394497253" },
  { "name": "Vansh", "admissionYear": 2024, "school": "JNV Chandigarh Chandigarh", "branch": "MNC", "phone": "+918847252356" },
  { "name": "Lalu", "admissionYear": 2024, "school": "JNV Kannauj Uttar Pradesh", "branch": "ME", "phone": "+918853777240" },
  { "name": "Anuj Kumar", "admissionYear": 2024, "school": "JNV Pithoragarh Uttarakhand", "branch": "DSAI", "phone": "+919456509728" },
  { "name": "Yogesh Meena", "admissionYear": 2024, "school": "JNV Baran Rajasthan", "branch": "MNC", "phone": "+917891129369" },
  { "name": "Alok Mahla", "admissionYear": 2024, "school": "JNV Gandhinagar Gujarat", "branch": "ME", "phone": "+918849872476" },
  { "name": "Appa Ramchandra Malave", "admissionYear": 2024, "school": "Shri. Bhavani Vidyalaya and A.K. Junior College of Science Atpadi Maharashtra", "branch": "ECE", "phone": "+917775026416" },
  { "name": "Vaibhav Anil Kadav", "admissionYear": 2024, "school": "JNV Prayagraj Uttar Pradesh", "branch": "MNC", "phone": "+919307529576" },
  { "name": "Vomeshwar Banchhor", "admissionYear": 2024, "school": "JNV Durg Chhattisgarh", "branch": "EP", "phone": "+919303900573" },
  { "name": "Silpipriya Bora", "admissionYear": 2024, "school": "JNV Jorhat Assam", "branch": "CHE", "phone": "+918822136260" },
  { "name": "Shandar Mili", "admissionYear": 2024, "school": "JNV Dhemaji Assam", "branch": "MNC", "phone": "+918638543829" },
  { "name": "Gungli Opat", "admissionYear": 2024, "school": "JNV Lower Subansiri Arunachal Pradesh", "branch": "CE", "phone": "+918258049236" },
  { "name": "Daman Lang I Makri", "admissionYear": 2024, "school": "JNV Ri-Bhoi Meghalaya", "branch": "BSBE", "phone": "+919366578391" },
  { "name": "Krishna Kumar", "admissionYear": 2024, "school": "Ramdhari Dwivedi Inter College Deoria Uttar Pradesh", "branch": "CE", "phone": "+919110189847" },
  { "name": "Roshan Gautam", "admissionYear": 2024, "school": "JNV Unnao Uttar Pradesh", "branch": "ECE", "phone": "+916284730545" },
  { "name": "Deepak Kumar", "admissionYear": 2024, "school": "JNV Badaun Uttar Pradesh", "branch": "CSE", "phone": "+919675777353" },
  { "name": "Jagjot Singh", "admissionYear": 2024, "school": "JNV Sri Ganganagar - II Rajasthan", "branch": "EEE", "phone": "+919636664197" },
  { "name": "Sarthak C Karpe", "admissionYear": 2024, "school": "JNV Wardha Maharashtra", "branch": "EEE", "phone": "+917666608757" },
  { "name": "Jaypal Malviya", "admissionYear": 2024, "school": "JNV Shajapur Madhya Pradesh", "branch": "DSAI", "phone": "+919826805648" },
  { "name": "Battula Uday Kiran", "admissionYear": 2024, "school": "JNV Khammam - I Telangana", "branch": "CSE", "phone": "+918978909914" },
  { "name": "Ram Tej Duvvuri", "admissionYear": 2024, "school": "JNV West Godavari Andhra Pradesh", "branch": "CSE", "phone": "+917569347325" },
  { "name": "Ajaya", "admissionYear": 2024, "school": "JNV Koppal Karnataka", "branch": "ME", "phone": "+919900759118" },
  { "name": "Dipanjan Ghosh", "admissionYear": 2024, "school": "JNV Burdwan West Bengal", "branch": "CHE", "phone": "+919800687453" },
  { "name": "Kanak Kamini Maiti", "admissionYear": 2024, "school": "JNV Prayagraj Uttar Pradesh", "branch": "EP", "phone": "+918509668934", "image": "https://i.postimg.cc/yd6w3rcT/Whats-App-Image-2025-07-20-at-19-57-39-20b767bd.jpg" },
  { "name": "Nishan Bhakta", "admissionYear": 2024, "school": "JNV Nadia West Bengal", "branch": "CSE", "phone": "+917585842982", "image": "https://i.postimg.cc/Z5YyDPKk/IMG-20250720-153404.jpg" },
  { "name": "Tushar Raj Prasad", "admissionYear": 2024, "school": "JNV Sitamarhi Bihar", "branch": "CE", "phone": "+919199793074" },
  { "name": "Sakshi Mehra", "admissionYear": 2024, "school": "JNV Bundi Rajasthan", "branch": "CHE", "phone": "+919424667983" },
  { "name": "Vasava Bhargav", "admissionYear": 2023, "school": "JNV Bharuch Gujarat", "branch": "CHE", "phone": "+916352483669" },
  { "name": "Sapna Thakur", "admissionYear": 2024, "school": "JNV Durg Chhattisgarh", "branch": "CE", "phone": "+917415989909" },
  { "name": "Prashant Bisht", "admissionYear": 2024, "school": "JNV Almora Uttarakhand", "branch": "EP", "phone": "+917456891622" },
  { "name": "Ayush Kumar Gupta", "admissionYear": 2024, "school": "JNV Jashpur Chhattisgarh", "branch": "EEE", "phone": "+916266110461", "image": "https://i.postimg.cc/ryW5TPWQ/Ayush-Kumar-Gupta.png" },
  { "name": "Vaibhav C D", "admissionYear": 2024, "school": "JNV Mysuru Karnataka", "branch": "MNC", "phone": "+919986329765", "image": "https://i.postimg.cc/65fR24MZ/Vaibhav-C-D.png" },
  { "name": "Manish Sharma", "admissionYear": 2024, "school": "JNV Siwan Bihar", "branch": "CE", "phone": "+919931676737" }
];

const galleryData = {
  "Festivals": {
    thumbnail: "https://i.postimg.cc/0jH2dRN0/IMG-20250719-WA0030.jpg",
    images: [
      { src: "https://i.postimg.cc/0jH2dRN0/IMG-20250719-WA0030.jpg", alt: "Holi Celebration" },
      { src: "https://i.postimg.cc/qRs3LRfX/IMG-20250719-WA0035.jpg", alt: "Janmashtami Celebration" },
    ]
  },
  "Campus Scenes": {
    thumbnail: "https://i.postimg.cc/MTmStk9j/IMG-20250719-WA0039.jpg",
    images: [
      { src: "https://i.postimg.cc/vm7kwrfJ/IMG-20250719-WA0038.jpg", alt: "IITG Library" },
      { src: "https://i.postimg.cc/MTmStk9j/IMG-20250719-WA0039.jpg", alt: "IITG Academic Complex" },
      { src: "https://i.postimg.cc/Hn8tdmFr/IMG-20250719-WA0037.jpg", alt: "IITG Lake View" },
      { src: "https://i.postimg.cc/yxN8ZY7N/IMG-20250719-WA0033.jpg", alt: "IITG Campus Upper View" },
    ]
  },
  "Events": {
    thumbnail: "https://i.postimg.cc/L8WL4wBf/IMG-20250719-WA0036.jpg",
    images: [
       { src: "https://i.postimg.cc/L8WL4wBf/IMG-20250719-WA0036.jpg", alt: "IITG Auditorium during a fest" },
    ]
  },
  "Hostel Life": {
    thumbnail: "https://i.postimg.cc/tC02M4cd/1.png",
    images: [
       
    ]
  }
};


// --- Helper Functions ---

/**
 * Calculates the current year of study for a student based on their admission year.
 * Assumes the academic year starts in July.
 * @param {number} admissionYear - The year the student was admitted.
 * @returns {string} The year of study (e.g., "1st Year", "Alumnus/Alumna").
 */
const getYearOfStudy = (admissionYear) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11 (Jan-Dec)

  // Academic year starts in July (month index 6)
  const academicYear = currentMonth < 6 ? currentYear - 1 : currentYear;
  const yearOfStudy = academicYear - admissionYear + 1;

  if (yearOfStudy > 4) return `Alumnus/Alumna (Batch of ${admissionYear})`;
  if (yearOfStudy === 1) return "1st Year";
  if (yearOfStudy === 2) return "2nd Year";
  if (yearOfStudy === 3) return "3rd Year";
  if (yearOfStudy === 4) return "4th Year";
  return `Graduate (Batch of ${admissionYear})`;
};

// --- Page Components ---

const Header = ({ activeSection, onNavClick }) => {
  const navLinks = ["Home", "About", "Notices", "Links", "Seniors", "Map", "Gallery", "Achievers", "Contact", "Feedback"];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm rounded-b-lg shadow-lg">
        <a href="#home" onClick={() => onNavClick('home')} className="text-2xl font-bold text-white">DAAN IITG</a>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(link.toLowerCase().replace(/\s/g, '-'));
              }}
              className={`text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative font-medium ${activeSection === link.toLowerCase().replace(/\s/g, '-') ? 'text-cyan-400' : ''}`}
            >
              {link}
              {activeSection === link.toLowerCase().replace(/\s/g, '-') && (
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
              src="https://i.postimg.cc/FsGw0LZf/IMG-20250720-WA0017.jpg"
              alt="IIT Guwahati campus view"
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
                  <Icon path={resource.icon} className="w-6 h-6 mr-2 text-cyan-400" />
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
        "A comprehensive list of essential items including documents, clothing, and other necessities.",
      rotation: "transform rotate-1",
      link: "https://drive.google.com/file/d/1z3s7l4bjbGE1IKoXWTzkOcQGM8f6qdqg/view?usp=drivesdk",
    },
    {
      icon: ICONS.laptop,
      title: "Laptop Guide",
      content:
        "Confused about which laptop to buy? We've prepared a detailed guide based on department needs.",
      rotation: "transform rotate-2",
      link: "https://drive.google.com/file/d/1zH9uNXgiKLz6ayWHkarOhrkK7urjs25q/view?usp=drivesdk",
    },
    {
      icon: ICONS.scholarship,
      title: "Scholarship Guide",
      content:
        "Information about various scholarships available at IITG and how to apply for them.",
      rotation: "transform -rotate-1",
      link: "https://drive.google.com/file/d/1cg59qTI1ftqwB12WW6Ex7Iwlq7I3dRsU/view?usp=sharing",
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
                    View Guide
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
    },
    {
      title: "Academic Calendar",
      href: "https://drive.google.com/file/d/1P7YyDzf2xh-MYQweGl1LWi91FPBsvjBs/view?usp=sharing/",
      icon: ICONS.calendar,
      description: "View the academic schedule for the entire year."
    },
    {
      title: "Cepstrum (Freshmen)",
      href: "https://iitgoffice-my.sharepoint.com/personal/cepstrum_iitg_ac_in/_layouts/15/onedrive.aspx?e=5%3Ac5eb2313bc004fc7866eca8c25526b35&at=9&FolderCTID=0x012000AB4F8FCCB94C08499FED21F13A11E188&id=%2Fpersonal%2Fcepstrum%5Fiitg%5Fac%5Fin%2FDocuments%2FPaperMan%2FFreshmen%20Year",
      icon: ICONS.academics,
      description: "Access academic resources and materials for your first year."
    }
  ];

  return (
    <section id="links" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  const featuredSeniorNames = [
    "Adarsh Kumar (CR)", "Himanshu Paswan (Associate CR)", "Ashutosh Kumar (Ex CR)", "Brijesh Singh Bharti", "Nishan Bhakta", "Kanak Kamini Maiti", "Vaibhav C D",
    "Ayush Kumar Gupta"
  ];

  const seniors = useMemo(() =>
    featuredSeniorNames.map(name =>
      allSeniorsData.find(s => s.name.trim() === name.trim())
    ).filter(Boolean), []);

  return (
    <section id="seniors" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Your Seniors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {seniors.map((senior, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 text-center shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center">
              <img
                src={senior.image || `https://ui-avatars.com/api/?name=${senior.name.replace(/\s/g, '+')}&background=0D9488&color=fff`}
                alt={`Profile of ${senior.name}`}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400 object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${senior.name.replace(/\s/g, '+')}&background=0D9488&color=fff`;
                  e.currentTarget.onerror = null;
                }}
              />
              <h3 className="text-xl font-bold">{senior.name}</h3>
              <p className="text-cyan-400 text-sm">{senior.branch}</p>
              <p className="text-gray-400 text-sm">{getYearOfStudy(senior.admissionYear)}</p>
              <p className="text-gray-500 mb-4 text-xs flex-grow">{senior.school}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={onShowAllSeniors} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 text-lg">
            View All Student Details
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
            href="https://www.iitg.ac.in/iitg_map/iitg_map.pdf"
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.1030070297923!2d91.69779531503427!3d26.202743549625048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5aea122132c3%3A0x44767bb468a831d1!2sIIT%20Guwahati!5e0!3m2!1sen!2sin!4v1721461358423!5m2!1sen!2sin"
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

const Gallery = ({ onCategoryClick, onShowTouristSites }) => {
  return (
    <section id="gallery" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Glimpses of Campus Life</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(galleryData).map(([category, data]) => (
            <div 
              key={category} 
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer h-64"
              onClick={() => onCategoryClick(category)}
            >
              <img
                src={data.thumbnail}
                alt={category}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-100">
                <h3 className="text-2xl font-bold text-white">{category}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={onShowTouristSites} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20 text-lg">
            Explore Nearby Tourist Sites
          </button>
        </div>
      </div>
    </section>
  );
};

const GalleryPage = ({ category, onBack }) => {
  const { images } = galleryData[category] || { images: [] };
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-10 md:py-20">
        <button onClick={onBack} className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-cyan-300 transition-colors">
          <Icon path={ICONS.arrowLeft} />
          Back to Main Page
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">{category}</h1>
        {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
                <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                </div>
            ))}
            </div>
        ) : (
            <p className="text-center text-gray-400">More photos coming soon!</p>
        )}
      </div>
    </div>
  );
};

const TouristSitesPage = ({ onBack }) => {
  const sites = [
    {
      name: "Kamakhya Temple",
      distance: "~15 km",
      features: "A major Hindu pilgrimage site, one of the oldest 51 Shakti Pithas, located atop the Nilachal Hills with panoramic views.",
      image: "https://i.postimg.cc/k4zZgGqf/kamakhya-temple-guwahati-tourism-entry-fee-timings-holidays-reviews-header.jpg",
      mapLink: "https://www.google.com/maps/place/Kamakhya+Temple/@26.1664,91.7058,15z"
    },
    {
      name: "Umananda Temple",
      distance: "~20 km (incl. ferry)",
      features: "A Shiva temple on Peacock Island in the Brahmaputra. Known for its tranquility and the endangered golden langurs.",
      image: "https://i.postimg.cc/J0G9nJzR/Umananda-Temple-Guwahati.jpg",
      mapLink: "https://www.google.com/maps/place/Umananda+Temple/@26.1910,91.7451,15z"
    },
    {
      name: "Assam State Zoo",
      distance: "~23 km",
      features: "Home to diverse wildlife, including the one-horned rhinoceros, tigers, and various bird species. A green oasis in the city.",
      image: "https://i.postimg.cc/t4hG9G0b/assam-zoo.jpg",
      mapLink: "https://www.google.com/maps/place/Assam+State+Zoo+cum+Botanical+Garden/@26.1661,91.7905,15z"
    },
    {
      name: "Chandubi Lake",
      distance: "~64 km",
      features: "A natural lake formed by an earthquake, offering serene views, boating, and a popular picnic spot, especially in winter.",
      image: "https://i.postimg.cc/W47MhL6m/Chandubi-Lake-Assam.jpg",
      mapLink: "https://www.google.com/maps/place/Chandubi+Lake/@25.8617,91.4111,15z"
    },
    {
      name: "Shillong",
      distance: "~100 km",
      features: "The 'Scotland of the East.' A popular weekend getaway with beautiful landscapes, waterfalls, lakes, and a vibrant cafe culture.",
      image: "https://i.postimg.cc/MHZ1vLpM/feature-shillong.jpg",
      mapLink: "https://www.google.com/maps/place/Shillong,+Meghalaya"
    },
    {
      name: "Assam State Museum",
      distance: "~20 km",
      features: "Showcases the rich cultural history of Assam through artifacts, sculptures, and manuscripts near Dighalipukhuri.",
      image: "https://i.postimg.cc/44YtX33v/assam-state-museum.jpg",
      mapLink: "https://www.google.com/maps/place/Assam+State+Museum/@26.1865,91.7513,15z"
    },
    {
      name: "ISKCON Guwahati",
      distance: "~20 km",
      features: "A beautiful temple dedicated to Lord Krishna, known for its peaceful ambiance, intricate architecture, and spiritual gatherings.",
      image: "https://i.postimg.cc/4xYdKq1p/iskcon-guwahati.jpg",
      mapLink: "https://www.google.com/maps/place/ISKCON+Guwahati/@26.1445,91.7735,15z"
    },
    {
      name: "Kakochang Waterfalls",
      distance: "~160 km",
      features: "A beautiful, cascading waterfall surrounded by lush greenery. Often visited as part of a trip to Kaziranga National Park.",
      image: "https://i.postimg.cc/PqBYW8j3/Kakochang-waterfall-jorhat.jpg",
      mapLink: "https://www.google.com/maps/place/Kakochang+Waterfalls/@26.5936,93.8126,15z"
    }
  ];

  return (
     <div className="bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto px-6 py-10 md:py-20">
        <button onClick={onBack} className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-cyan-300 transition-colors">
          <Icon path={ICONS.arrowLeft} />
          Back to Main Page
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Explore Around Guwahati</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sites.map((site) => (
            <div key={site.name} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col">
              <img src={site.image} alt={site.name} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{site.name}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{site.features}</p>
                <div className="mt-auto">
                  <p className="text-sm text-cyan-400 font-semibold mb-3">Distance from IITG: {site.distance}</p>
                  <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-700 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors">
                    <Icon path={ICONS.location} className="w-4 h-4" />
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Achievers = () => {
  const achieversData = [
    {
      name: "Vaibhav CD",
      image: "https://i.postimg.cc/65fR24MZ/Vaibhav-C-D.png",
      achievement: "CGPI: 8.87",
      branch: "MNC",
      year: 2024,
    },
    {
      name: "Rahul Kumar",
      image: "https://i.postimg.cc/C1R1QvV4/Rahul-Kumar.png",
      achievement: "AIR 3 in GATE 2024 (CS)",
      branch: "Computer Science & Engineering",
      year: 2024,
    },
    {
      name: "Kundan Meena",
      image: "https://i.postimg.cc/8cMQLs4J/Kundan-Meena.png",
      achievement: "AIR 4 in GATE 2024 (DA)",
      branch: "Computer Science & Engineering",
      year: 2021,
    },
     {
      name: "Anand Keshav",
      image: "https://i.postimg.cc/y8YJgTcf/Anand-Keshav.png",
      achievement: "AIR 12 in GATE 2024 (DA)",
      branch: "Computer Science & Engineering",
      year: 2021,
    },
  ];

  return (
    <section id="achievers" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Achievers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {achieversData.map((achiever, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 text-center shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center">
              <img
                src={achiever.image || `https://ui-avatars.com/api/?name=${achiever.name.replace(/\s/g, '+')}&background=facc15&color=fff`}
                alt={`Profile of ${achiever.name}`}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-400 object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${achiever.name.replace(/\s/g, '+')}&background=facc15&color=fff`;
                  e.currentTarget.onerror = null;
                }}
              />
              <h3 className="text-xl font-bold text-white">{achiever.name}</h3>
              <div className="text-yellow-400 font-semibold text-md mt-2 mb-1 flex items-center justify-center gap-2">
                <Icon path={ICONS.star} className="w-5 h-5" />
                <span>{achiever.achievement}</span>
              </div>
              <p className="text-gray-400 text-sm">{achiever.branch}</p>
              <p className="text-gray-500 text-xs"> {getYearOfStudy(achiever.year)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Contact = () => {
  const contactNames = ["Adarsh Kumar (CR)", "Nishan Bhakta", "Ayush Kumar Gupta", "Kanak Kamini Maiti"];
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

const Feedback = () => {
    return (
      <section id="feedback" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">We Value Your Feedback</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Help us improve! Share your thoughts, suggestions, or any issues you've faced with this website.
          </p>
          <a
            href="https://forms.gle/Rn5az3L5cAPwJg4W7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 text-lg"
          >
            Give Feedback
          </a>
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSeniors = useMemo(() => {
    const admissionYears = [...new Set(allSeniorsData.map(s => s.admissionYear))].sort((a, b) => b - a);
    
    const sortStudentsByBranch = (students) => {
        return students.sort((a, b) => a.branch.localeCompare(b.branch));
    };

    if (!searchTerm) {
        return admissionYears.map(year => ({
            year,
            students: sortStudentsByBranch(allSeniorsData.filter(s => s.admissionYear === year))
        })).filter(group => group.students.length > 0);
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredStudents = allSeniorsData.filter(student =>
        student.name.toLowerCase().includes(lowercasedFilter) ||
        student.branch.toLowerCase().includes(lowercasedFilter) ||
        student.school.toLowerCase().includes(lowercasedFilter)
    );
    
    return admissionYears.map(year => ({
        year,
        students: sortStudentsByBranch(filteredStudents.filter(s => s.admissionYear === year))
    })).filter(group => group.students.length > 0);

  }, [searchTerm]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-10 md:py-20">
        <button onClick={onBack} className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-cyan-300 transition-colors">
          <Icon path={ICONS.arrowLeft} />
          Back to Main Page
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">All Student Details</h1>
        
        <div className="relative max-w-2xl mx-auto mb-12">
            <input
                type="text"
                placeholder="Search by name, branch, or school..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 text-lg bg-gray-800 border-2 border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
            />
            <div className="absolute top-0 left-0 h-full flex items-center pl-4">
                <Icon path={ICONS.search} className="w-6 h-6 text-gray-400" />
            </div>
        </div>

        {filteredSeniors.length > 0 ? filteredSeniors.map(({ year, students }) => (
          <div key={year} id={`batch-${year}`} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-8 border-b-2 border-cyan-400/30 pb-2">
              {year === 2025 ? `Batch of 2025 (Freshers this year)` : `Batch of ${year} (${getYearOfStudy(year)})`}
            </h2>
            <div className="overflow-x-auto bg-gray-800/50 rounded-lg shadow-md">
              <table className="w-full text-left table-auto">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-4 text-sm font-semibold tracking-wider rounded-tl-lg">Name</th>
                    <th className="p-4 text-sm font-semibold tracking-wider">Branch</th>
                    <th className="p-4 text-sm font-semibold tracking-wider">School</th>
                    <th className="p-4 text-sm font-semibold tracking-wider rounded-tr-lg">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="p-4 font-medium">{student.name}</td>
                      <td className="p-4">{student.branch}</td>
                      <td className="p-4">{student.school}</td>
                      <td className="p-4">
                        <a href={`tel:${student.phone.replace(/\s/g, '')}`} className="hover:text-cyan-300">{student.phone}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )) : (
            <div className="text-center py-16">
                <p className="text-xl text-gray-400">No students found matching your search criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [page, setPage] = useState('main'); // 'main', 'allSeniors', 'gallery', 'touristSites'
  const [galleryCategory, setGalleryCategory] = useState(null);
  const scrollPositionRef = useRef(0);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    notices: useRef(null),
    links: useRef(null),
    seniors: useRef(null),
    map: useRef(null),
    gallery: useRef(null),
    achievers: useRef(null),
    contact: useRef(null),
    feedback: useRef(null),
  };

  const handleNavClick = (id) => {
    if (page !== 'main') {
      setPage('main');
      setGalleryCategory(null);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleShowAllSeniors = () => {
    scrollPositionRef.current = window.scrollY;
    setPage('allSeniors');
  };

  const handleGalleryCategoryClick = (category) => {
    scrollPositionRef.current = window.scrollY;
    setGalleryCategory(category);
    setPage('gallery');
  };

  const handleShowTouristSites = () => {
    scrollPositionRef.current = window.scrollY;
    setPage('touristSites');
  };

  const handleBackToMain = () => {
      setPage('main');
      setGalleryCategory(null);
  }

  useEffect(() => {
    if (page === 'main') {
      setTimeout(() => window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' }), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [page]);


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
      { rootMargin: '-40% 0px -60% 0px' }
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

  }, [page]);

  if (page === 'allSeniors') {
    return <AllSeniorsPage onBack={handleBackToMain} />;
  }
  
  if (page === 'gallery' && galleryCategory) {
      return <GalleryPage category={galleryCategory} onBack={handleBackToMain} />;
  }

  if (page === 'touristSites') {
    return <TouristSitesPage onBack={handleBackToMain} />;
  }

  return (
    <div className="bg-gray-900 font-sans leading-normal tracking-tight">
      <style>{`
        html { scroll-behavior: smooth; }
        .bg-grid-gray-700\\[\\/0\\.2\\] { background-image: linear-gradient(to right, rgba(55, 65, 81, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(55, 65, 81, 0.2) 1px, transparent 1px); background-size: 3rem 3rem; }
        .animate-ping { display: inline-block; vertical-align: middle; width: 2px; height: 1.5em; background-color: #67e8f9; /* cyan-300 */ animation: blink 1s step-end infinite; }
        @keyframes blink { from, to { background-color: transparent } 50% { background-color: #67e8f9; } }
        .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
        .aspect-h-9 { /* This class is used with aspect-w-16 */ }
        .aspect-w-16 > * { position: absolute; height: 100%; width: 100%; top: 0; right: 0; bottom: 0; left: 0; }
      `}</style>
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <div id="home" ref={sectionRefs.home}><Hero onNavClick={handleNavClick} /></div>
        <div id="about" ref={sectionRefs.about}><About /></div>
        <div id="notices" ref={sectionRefs.notices}><ImportantNotices /></div>
        <div id="links" ref={sectionRefs.links}><QuickLinks /></div>
        <div id="seniors" ref={sectionRefs.seniors}><Seniors onShowAllSeniors={handleShowAllSeniors} /></div>
        <div id="map" ref={sectionRefs.map}><CampusMap /></div>
        <div id="gallery" ref={sectionRefs.gallery}><Gallery onCategoryClick={handleGalleryCategoryClick} onShowTouristSites={handleShowTouristSites} /></div>
        <div id="achievers" ref={sectionRefs.achievers}><Achievers /></div>
        <div id="contact" ref={sectionRefs.contact}><Contact /></div>
        <div id="feedback" ref={sectionRefs.feedback}><Feedback /></div>
      </main>
      <Footer />
    </div>
  );
}
