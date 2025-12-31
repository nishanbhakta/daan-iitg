import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Helper Components ---

/**
 * Renders an SVG icon.
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
  celebrate: "M2 6l2-2 16 16-2 2L2 6zm4 0l12 12M12 2v4m10 6h-4M2 12h4m6 10v-4"
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

  { "name": "Himanshu Paswan (EX Associate CR)", "admissionYear": 2023, "school": "JNV Udham Singh Nagar Uttarakhand", "branch": "EEE", "phone": "+916395325991", "image": "https://i.postimg.cc/qRhp5G1Z/IMG-20250720-201942.jpg" },

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

  { "name": "Adarsh Kumar (Ex CR)", "admissionYear": 2023, "school": "JNV West Champaran Bihar", "branch": "ECE", "phone": "+917667591456", "image": "https://i.postimg.cc/rsvbHZ45/Whats-App-Image-2025-07-20-at-19-09-15-d9b02464.jpg" },

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

  { "name": "Ayush Kumar Gupta (CR)", "admissionYear": 2024, "school": "JNV Jashpur Chhattisgarh", "branch": "EEE", "phone": "+916266110461", "image": "https://i.postimg.cc/ryW5TPWQ/Ayush-Kumar-Gupta.png" },

  { "name": "Vaibhav C D ", "admissionYear": 2024, "school": "JNV Mysuru Karnataka", "branch": "MNC", "phone": "+917022926590", "image": "https://i.postimg.cc/65fR24MZ/Vaibhav-C-D.png" },

  { "name": "Manish Sharma (CR)", "admissionYear": 2024, "school": "JNV Siwan Bihar", "branch": "CE", "phone": "+919931676737" }

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
 * Calculates study year relative to 2026.
 */
const getYearOfStudy = (admissionYear) => {
  const currentYear = 2026;
  const currentMonth = 0; // January 2026

  // Academic year starts in July (month index 6)
  const academicYear = currentMonth < 6 ? currentYear - 1 : currentYear;
  const yearOfStudy = academicYear - admissionYear + 1;

  if (yearOfStudy > 4) return `Alumnus/Alumna (Batch of ${admissionYear})`;
  if (yearOfStudy === 1) return "Freshman (1st Year)";
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
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center bg-gray-900/90 backdrop-blur-md border-b border-cyan-500/30 rounded-b-xl shadow-xl">
        <div className="flex items-center gap-2">
           <div className="bg-cyan-500 p-1 rounded-lg">
             <Icon path={ICONS.celebrate} className="w-5 h-5 text-gray-900" />
           </div>
           <a href="#home" onClick={() => onNavClick('home')} className="text-xl md:text-2xl font-black text-white tracking-tighter">
             DAAN <span className="text-cyan-400">2026</span>
           </a>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(link.toLowerCase().replace(/\s/g, '-'));
              }}
              className={`text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative font-semibold uppercase tracking-widest ${activeSection === link.toLowerCase().replace(/\s/g, '-') ? 'text-cyan-400' : ''}`}
            >
              {link}
              {activeSection === link.toLowerCase().replace(/\s/g, '-') && (
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
              )}
            </a>
          ))}
        </div>
        <div className="lg:hidden">
          {/* Mobile menu could go here */}
          <button className="text-white bg-gray-800 p-2 rounded-lg">
            <Icon path={ICONS.celebrate} className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};

// --- New Year Fireworks Effect ---
const Fireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = ['#22d3ee', '#ec4899', '#eab308', '#ffffff', '#ff00ff', '#00ffff'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2; 
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.95;
        this.gravity = 0.05;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const createExplosion = (x, y) => {
      const particleCount = 60;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Auto-launch fireworks
    const launchRandomFirework = () => {
        // Random x, random y in top half
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.6);
        createExplosion(x, y);
    }

    const loop = () => {
      // Trail effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Adjust opacity for trail length
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // Random spawn chance
      if (Math.random() < 0.04) { 
        launchRandomFirework();
      }

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />;
};

const Hero = ({ onNavClick }) => {
  const [typedText, setTypedText] = useState('');
  const roles = ["to the year 2026!", "to your dream campus.", "to a fresh start.", "to the DAAN family."];
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delay = 1500;

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
    timeoutId = setTimeout(type, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden pt-20">
      {/* 2026 Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-[20vw] font-black text-cyan-500/10 rotate-12">20</div>
        <div className="absolute bottom-1/4 right-1/4 text-[20vw] font-black text-pink-500/10 -rotate-12">26</div>
      </div>
       
      {/* Fireworks Animation */}
      <Fireworks />

      {/* Animated Particles via CSS */}
      <div className="sparkles absolute inset-0 z-0"></div>

      <div className="text-center z-10 p-6 max-w-4xl mx-auto relative">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-bold uppercase tracking-[0.2em] animate-pulse backdrop-blur-sm">
           New Year 2026 Edition
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter drop-shadow-lg">
          Happy New Year, <br/>
          <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent">Dakshana Scholars!</span>
        </h1>
        <p className="text-xl md:text-3xl font-medium text-gray-400 h-10 drop-shadow-md">
          Welcome {typedText}
          <span className="w-1 h-8 bg-cyan-400 inline-block ml-2 animate-blink"></span>
        </p>
        
        <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center">
          <a href="#notices" onClick={() => onNavClick('notices')} className="group relative px-10 py-4 bg-cyan-500 text-gray-900 font-black rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-cyan-500/20">
            <span className="relative z-10">EXPLORE 2026 UPDATES</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a href="#seniors" onClick={() => onNavClick('seniors')} className="px-10 py-4 bg-gray-800/80 backdrop-blur text-white font-black border border-gray-700 rounded-xl hover:bg-gray-700 transition-all">
            MEET THE SENIORS
          </a>
        </div>
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
    <section id="about" className="py-24 bg-gray-800 text-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <img
              src="https://i.postimg.cc/FsGw0LZf/IMG-20250720-WA0017.jpg"
              alt="IIT Guwahati campus"
              className="relative rounded-full shadow-2xl w-full max-w-md mx-auto border-8 border-gray-900 z-10"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none">
              A NEW YEAR, <br/>
              <span className="text-cyan-400">A NEW JOURNEY.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 font-medium">
              <p>
                As we step into 2026, the Dakshana Alumni Association Network (DAAN) at IIT Guwahati welcomes you to the most beautiful campus in India. Whether you're here to start your 1st year or continuing your path, this year is yours to conquer.
              </p>
              <p>
                DAAN is more than an alumni network; it's a family of scholars who have faced the same challenges and celebrated the same victories. In 2026, we aim to reach even greater heights together.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resources.map(resource => (
                <div key={resource.name} className="flex flex-col items-center p-6 bg-gray-900/50 border border-gray-700 rounded-2xl hover:border-cyan-500/50 transition-colors">
                  <Icon path={resource.icon} className="w-10 h-10 mb-4 text-cyan-400" />
                  <span className="font-bold uppercase text-sm tracking-widest">{resource.name}</span>
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
      title: "2026 Registration",
      content: "Jan 2026 semester registration is now live on the ERP portal. Ensure all dues are cleared.",
      color: "bg-cyan-50",
    },
    {
      icon: ICONS.suitcase,
      title: "Packing for Jan",
      content: "Winter is at its peak in Guwahati. Don't forget heavy woolens and your academic documents.",
      color: "bg-pink-50",
      link: "https://drive.google.com/file/d/1z3s7l4bjbGE1IKoXWTzkOcQGM8f6qdqg/view?usp=drivesdk",
    },
    {
      icon: ICONS.laptop,
      title: "Tech 2026 Guide",
      content: "Updated laptop recommendations for the 2026 academic standards. AI-ready specs suggested.",
      color: "bg-purple-50",
      link: "https://drive.google.com/file/d/1zH9uNXgiKLz6ayWHkarOhrkK7urjs25q/view?usp=drivesdk",
    },
    {
      icon: ICONS.scholarship,
      title: "New Year Grants",
      content: "New 2026 scholarships announced for scholars with high CGPA. Check eligibility today.",
      color: "bg-yellow-50",
      link: "https://drive.google.com/file/d/1cg59qTI1ftqwB12WW6Ex7Iwlq7I3dRsU/view?usp=sharing",
    },
  ];

  return (
    <section id="notices" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-4 leading-none">THE BULLETIN</h2>
        <p className="text-center text-gray-500 mb-16 uppercase tracking-[0.5em] font-bold">2026 Official Updates</p>
         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {notices.map((notice, index) => (
            <div
              key={index}
              className={`${notice.color} text-gray-900 p-8 rounded-3xl shadow-2xl relative group transform hover:-rotate-2 transition-transform duration-300`}
            >
              <div className="absolute -top-4 -right-4 bg-gray-900 p-3 rounded-2xl shadow-lg">
                <Icon path={notice.icon} className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{notice.title}</h3>
              <p className="text-gray-700 font-medium leading-relaxed">{notice.content}</p>
              {notice.link && (
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-black text-sm uppercase text-gray-900 border-b-2 border-gray-900 hover:gap-4 transition-all"
                >
                  DOWNLOAD PDF
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuickLinks = () => {
  const links = [
    { title: "IITG ERP 2026", href: "https://academic.iitg.ac.in/sso/", icon: ICONS.erp, desc: "Grades, attendance, and course portal." },
    { title: "IITG Automation", href: "https://online.iitg.ac.in/sso/", icon: ICONS.automation, desc: "Admin services and certifications." },
    { title: "One Stop 2.0", href: "https://play.google.com/store/apps/details?id=com.swciitg.onestop2&hl=en_IN", icon: ICONS.oneStopApp, desc: "Your mobile campus companion." },
    { title: "Admissions Hub", href: "https://www.iitg.ac.in/acad/admission/", icon: ICONS.admission, desc: "Latest seat info and joining info." },
    { title: "2026 Calendar", href: "https://drive.google.com/file/d/1P7YyDzf2xh-MYQweGl1LWi91FPBsvjBs/view?usp=sharing/", icon: ICONS.calendar, desc: "Holidays, exams, and fest dates." },
    { title: "Academic Vault", href: "https://iitgoffice-my.sharepoint.com/...", icon: ICONS.academics, desc: "Resource pool for all semesters." }
  ];

  return (
    <section id="links" className="py-24 bg-gray-800 text-white relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 tracking-tighter uppercase italic">Control Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <a href={link.href} key={index} target="_blank" rel="noopener noreferrer" className="block group p-8 bg-gray-900 rounded-3xl border border-gray-700 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="bg-gray-800 p-4 rounded-2xl group-hover:bg-cyan-500 group-hover:text-gray-900 transition-colors">
                  <Icon path={link.icon} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase">{link.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{link.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Seniors = ({ onShowAllSeniors }) => {
  const featuredSeniorNames = [
    "Manish Sharma (CR)","Ayush Kumar Gupta (CR)","Adarsh Kumar (Ex CR)",  "Himanshu Paswan (Ex Associate CR)", "Ashutosh Kumar (Ex CR)", "Brijesh Singh Bharti", "Kanak Kamini Maiti", "Vaibhav C D"
  ];

  const seniors = useMemo(() =>
    featuredSeniorNames.map(name =>
      allSeniorsData.find(s => s.name.trim() === name.trim())
    ).filter(Boolean), []);

  return (
    <section id="seniors" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tighter">OUR LEADERS</h2>
        <p className="text-center text-gray-500 mb-16 uppercase tracking-[0.5em] font-bold italic">The 2026 Representatives</p>
         
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {seniors.map((senior, index) => (
            <div key={index} className="bg-gray-800 rounded-3xl p-8 text-center border border-gray-700 hover:border-pink-500/50 hover:bg-gray-800/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur-sm opacity-50"></div>
                <img
                  src={senior.image || `https://ui-avatars.com/api/?name=${senior.name.replace(/\s/g, '+')}&background=0D9488&color=fff`}
                  alt={senior.name}
                  className="relative w-32 h-32 rounded-full border-4 border-gray-900 object-cover z-10"
                />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">{senior.name}</h3>
              <p className="text-cyan-400 font-bold text-sm mt-1">{senior.branch}</p>
              <p className="text-gray-500 text-xs font-bold uppercase mt-1">{getYearOfStudy(senior.admissionYear)}</p>
              <p className="text-gray-600 mt-4 text-xs italic">{senior.school}</p>
            </div>
          ))}
        </div>
         
        <div className="text-center mt-16">
          <button onClick={onShowAllSeniors} className="px-10 py-4 bg-white text-gray-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] uppercase tracking-widest">
            Search Student Directory
          </button>
        </div>
      </div>
    </section>
  );
};

const CampusMap = () => {
  return (
    <section id="map" className="py-24 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter italic uppercase">Navigation <span className="text-cyan-400">Hub</span></h2>
        <a
          href="https://www.iitg.ac.in/iitg_map/iitg_map.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-12 inline-flex items-center gap-3 bg-gray-900 border border-gray-700 hover:border-cyan-500 text-white px-8 py-3 rounded-2xl font-bold transition-all"
        >
          <Icon path={ICONS.download} className="w-5 h-5 text-cyan-400" />
          OFFLINE PDF MAP
        </a>
        <div className="h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-900 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.1030070297923!2d91.69779531503427!3d26.202743549625048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5aea122132c3%3A0x44767bb468a831d1!2sIIT%20Guwahati!5e0!3m2!1sen!2sin!4v1721461358423!5m2!1sen!2sin"
            className="w-full h-full grayscale invert opacity-80"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Campus Map"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-[12px] border-gray-800 rounded-[2rem]"></div>
        </div>
      </div>
    </section>
  );
};

const Gallery = ({ onCategoryClick, onShowTouristSites }) => {
  return (
    <section id="gallery" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 tracking-tighter uppercase">Visual <span className="text-pink-500">History</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(galleryData).map(([category, data]) => (
            <div 
              key={category} 
              className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
              onClick={() => onCategoryClick(category)}
            >
              <img
                src={data.thumbnail}
                alt={category}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors">{category}</h3>
                <p className="text-xs font-bold text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">View Album</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <button onClick={onShowTouristSites} className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-black py-4 px-12 rounded-2xl hover:scale-105 shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all uppercase tracking-[0.2em]">
            Guwahati Tourism 2026
          </button>
        </div>
      </div>
    </section>
  );
};

const Achievers = () => {
  const achieversData = [
    { name: "Vaibhav CD", image: "https://i.postimg.cc/65fR24MZ/Vaibhav-C-D.png", achievement: "CGPI: 8.87", branch: "MNC", year: 2024 },
    { name: "Rahul Kumar", image: "https://i.postimg.cc/C1R1QvV4/Rahul-Kumar.png", achievement: "GATE AIR 3", branch: "CSE", year: 2024 },
    { name: "Kundan Meena", image: "https://i.postimg.cc/8cMQLs4J/Kundan-Meena.png", achievement: "GATE AIR 4", branch: "CSE", year: 2021 },
    { name: "Anand Keshav", image: "https://i.postimg.cc/y8YJgTcf/Anand-Keshav.png", achievement: "GATE AIR 12", branch: "CSE", year: 2021 },
  ];

  return (
    <section id="achievers" className="py-24 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 italic tracking-tighter uppercase">Hall of <span className="text-yellow-400 underline decoration-8">Fame</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {achieversData.map((achiever, index) => (
            <div key={index} className="bg-gray-900 border-2 border-yellow-500/20 rounded-[2.5rem] p-8 text-center hover:border-yellow-400 transition-all">
              <img
                src={achiever.image}
                alt={achiever.name}
                className="w-32 h-32 rounded-3xl mx-auto mb-6 border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)] object-cover"
              />
              <h3 className="text-xl font-black uppercase tracking-tighter">{achiever.name}</h3>
              <div className="text-yellow-400 font-black text-sm mt-3 flex items-center justify-center gap-1">
                <Icon path={ICONS.star} className="w-5 h-5" />
                <span>{achiever.achievement}</span>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase mt-2">{achiever.branch} • {achiever.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const contacts = useMemo(() =>
    ["Adarsh Kumar (CR)", "Manish Sharma (CR)", "Ayush Kumar Gupta (CR)", "Kanak Kamini Maiti"]
      .map(name => allSeniorsData.find(s => s.name === name))
      .filter(Boolean), []);

  return (
    <section id="contact" className="py-24 bg-gray-900 text-white relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter leading-none">NEED <span className="text-cyan-400">HELP?</span></h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-20 uppercase font-black tracking-widest italic">We are active for the Jan 2026 Batch</p>
         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-[2rem] border-2 border-transparent hover:border-cyan-500 transition-all flex flex-col justify-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{contact.name}</h3>
              <p className="text-gray-500 text-xs font-bold uppercase mb-6 tracking-widest">{getYearOfStudy(contact.admissionYear)}</p>
              <a 
                href={`tel:${contact.phone?.replace(/\s/g, '')}`} 
                className="flex items-center justify-center gap-3 bg-cyan-500 text-gray-900 py-3 rounded-xl font-black hover:scale-105 transition-transform"
              >
                <Icon path={ICONS.phone} className="w-5 h-5" />
                CALL NOW
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Feedback = () => (
  <section id="feedback" className="py-24 bg-gray-800 text-white border-t border-gray-700">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter">Open <span className="text-green-500">2026</span> Feedback</h2>
      <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto font-medium">
        Found a bug? Have a 2026 New Year suggestion? We're listening to our scholars.
      </p>
      <a
        href="https://forms.gle/Rn5az3L5cAPwJg4W7"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-gray-900 font-black py-5 px-16 rounded-[2rem] hover:scale-110 active:scale-95 transition-all shadow-[0_15px_40px_rgba(34,197,94,0.3)] uppercase tracking-[0.2em]"
      >
        SUBMIT REVIEW
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-950 text-gray-600 py-12 border-t border-gray-900">
    <div className="container mx-auto px-6 text-center">
      <div className="flex justify-center gap-4 mb-8">
        <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
        <div className="w-12 h-1 bg-pink-500 rounded-full"></div>
        <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
      </div>
      <p className="font-black uppercase tracking-[0.3em] text-sm">© 2026 DAAN IIT Guwahati</p>
      <p className="text-xs mt-2 uppercase tracking-widest text-gray-800">Designed for Dakshana Scholars</p>
    </div>
  </footer>
);

// --- Multi-Page Sub-sections ---

const AllSeniorsPage = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSeniors = useMemo(() => {
    const years = [...new Set(allSeniorsData.map(s => s.admissionYear))].sort((a, b) => b - a);
    const lowSearch = searchTerm.toLowerCase();

    return years.map(year => ({
      year,
      students: allSeniorsData
        .filter(s => s.admissionYear === year)
        .filter(s => 
          s.name.toLowerCase().includes(lowSearch) || 
          s.branch.toLowerCase().includes(lowSearch) || 
          s.school.toLowerCase().includes(lowSearch)
        )
        .sort((a, b) => a.branch.localeCompare(b.branch))
    })).filter(g => g.students.length > 0);
  }, [searchTerm]);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="group flex items-center gap-2 mb-12 text-cyan-400 font-black uppercase text-sm tracking-widest">
          <Icon path={ICONS.arrowLeft} className="group-hover:-translate-x-2 transition-transform" />
          Exit Directory
        </button>
        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase italic leading-none">The <span className="text-cyan-400">Vault</span></h1>
        <p className="text-gray-500 font-black tracking-widest uppercase mb-12 italic">Total active records: {allSeniorsData.length}</p>

        <div className="relative mb-20">
          <input
            type="text"
            placeholder="FILTER BY NAME, BRANCH, OR JNV..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border-4 border-gray-700 p-8 pl-16 rounded-[2.5rem] text-xl font-black uppercase tracking-tighter focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-600"
          />
          <Icon path={ICONS.search} className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-600" />
        </div>

        {filteredSeniors.length > 0 ? filteredSeniors.map(({ year, students }) => (
          <div key={year} className="mb-20">
            <h2 className="text-3xl font-black text-cyan-400 mb-8 border-l-8 border-cyan-400 pl-6 uppercase tracking-tighter">
              {year === 2026 ? "2026 NEW BATCH" : `BATCH OF ${year}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((s, idx) => (
                <div key={idx} className="bg-gray-800/50 p-6 rounded-3xl border border-gray-800 hover:bg-gray-800 transition-colors flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-tighter">{s.name}</h3>
                    <p className="text-cyan-400 font-bold text-xs mt-1 uppercase tracking-widest">{s.branch} • {s.school}</p>
                  </div>
                  <a href={`tel:${s.phone}`} className="p-3 bg-gray-900 rounded-2xl text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 transition-all">
                    <Icon path={ICONS.phone} className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )) : (
          <p className="text-center py-20 text-gray-700 font-black text-2xl uppercase tracking-[0.5em]">No Data Found</p>
        )}
      </div>
    </div>
  );
};

const GalleryPage = ({ category, onBack }) => {
  const images = galleryData[category]?.images || [];
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-12 text-pink-400 font-black uppercase tracking-widest">
          <Icon path={ICONS.arrowLeft} /> Back
        </button>
        <h1 className="text-5xl md:text-8xl font-black mb-16 tracking-tighter uppercase italic text-center">{category}</h1>
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((img, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-gray-800">
                <img src={img.src} alt={img.alt} className="w-full h-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-4 border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-gray-700 font-black text-2xl uppercase tracking-[0.5em]">2026 Photos Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TouristSitesPage = ({ onBack }) => {
  const sites = [
    { name: "Kamakhya Temple", dist: "15 km", desc: "Ancient 2026 Shakti Pitha on Nilachal Hills.", map: "https://www.google.com/maps/place/Kamakhya+Temple" },
    { name: "Umananda Island", dist: "20 km", desc: "Peacock Island: Smallest river island in the world.", map: "https://www.google.com/maps/place/Umananda+Temple" },
    { name: "Assam State Zoo", dist: "23 km", desc: "Wildlife haven including the Great One-Horned Rhino.", map: "https://www.google.com/maps/place/Assam+State+Zoo" },
    { name: "Hare Krishna Mandir", dist: "2 km", desc: "Serene spiritual center near campus gates.", map: "https://www.google.com/maps/place/Hare+Krishna+Mandir" },
  ];

  return (
    <div className="bg-gray-800 text-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-12 text-cyan-400 font-black tracking-widest">
          <Icon path={ICONS.arrowLeft} /> Return
        </button>
        <h1 className="text-5xl md:text-8xl font-black mb-20 tracking-tighter uppercase text-center italic">Gateway <span className="text-cyan-400">2026</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sites.map((s, idx) => (
            <div key={idx} className="bg-gray-900 p-8 rounded-[2.5rem] border border-gray-700 hover:border-cyan-500 transition-all flex flex-col justify-between h-80">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">{s.name}</h3>
                <p className="text-cyan-400 font-bold mt-1 uppercase text-xs tracking-widest">{s.dist} FROM CAMPUS</p>
                <p className="text-gray-500 mt-6 font-medium leading-relaxed">{s.desc}</p>
              </div>
              <a href={s.map} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-2 bg-gray-800 text-white font-black py-3 rounded-xl hover:bg-cyan-500 hover:text-gray-900 transition-all">
                  MAP
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App Entry ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [page, setPage] = useState('main'); 
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

  useEffect(() => {
    if (page === 'main') {
      setTimeout(() => window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' }), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [page]);

  useEffect(() => {
    if (page !== 'main') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, [page]);

  // Routing
  if (page === 'allSeniors') return <AllSeniorsPage onBack={() => setPage('main')} />;
  if (page === 'gallery') return <GalleryPage category={galleryCategory} onBack={() => setPage('main')} />;
  if (page === 'touristSites') return <TouristSitesPage onBack={() => setPage('main')} />;

  return (
    <div className="bg-gray-900 text-white selection:bg-cyan-500 selection:text-gray-900">
      <style>{`
        html { scroll-behavior: smooth; }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { from, to { opacity: 1 } 50% { opacity: 0 } }
        
        .sparkles {
          background-image: radial-gradient(circle, white 1px, transparent 1px);
          background-size: 50px 50px;
          animation: particleMove 20s linear infinite;
        }
        @keyframes particleMove {
          from { background-position: 0 0; }
          to { background-position: 500px 1000px; }
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #111827; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
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
