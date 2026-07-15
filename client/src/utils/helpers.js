// --- Helper Functions ---

export const getYearOfStudy = (admissionYear) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  // A student admitted in 2024 is in 1st year (as of 2024/2025).
  const yearOfStudy = currentYear - admissionYear + 1;

  if (yearOfStudy > 4) return "Alumnus/Alumna";
  if (yearOfStudy === 1) return "1st Year";
  if (yearOfStudy === 2) return "2nd Year";
  if (yearOfStudy === 3) return "3rd Year";
  if (yearOfStudy === 4) return "4th Year";
  return "Graduate"; // Fallback
};

export const slugify = (label) => label.toLowerCase().replace(/\s+/g, '-');

// --- Class name merge helper (ported from style template) ---
export const cn = (...classes) => classes.filter(Boolean).join(" ");
