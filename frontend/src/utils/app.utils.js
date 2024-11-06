export const formatDate = (isoDate) => {
  // Create a Date object from the ISO date string
  const date = new Date(isoDate);

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Return the formatted date
  return `${day}-${month}-${year}`;
};

// Example usage:
const isoDate = "2024-11-05T21:01:13.889+00:00";
const formattedDate = formatDate(isoDate);
console.log(formattedDate); // Output: 05-11-2024
