import React from "react";

const getUserColor = (name) => {
    const colors = [
        "#1f77b4", // Dark Blue
        "#ff7f0e", // Dark Orange
        "#2ca02c", // Dark Green
        "#d62728", // Dark Red
        "#9467bd", // Dark Purple
        "#8c564b", // Dark Brown
        "#e377c2", // Dark Pink
        "#7f7f7f", // Dark Gray
        "#bcbd22", // Olive Green
        "#17becf", // Teal
        "#aec7e8", // Light Blue
        "#ffbb78", // Light Orange
        "#98df8a", // Light Green
        "#ff9896", // Light Red
        "#c5b0d5", // Light Purple
        "#c49c94", // Light Brown
        "#f7b6d2", // Light Pink
        "#c7c7c7", // Light Gray
        "#dbdb8d", // Light Yellow
        "#9edae5"  // Pale Blue
        // Add more colors as needed
      ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[hash % colors.length];
};
const ColorfulText = ({ name, className }) => {
  const color = getUserColor(name);
  return (
    <div className={className} style={{ backgroundColor: color }}>
      {name.substring(0, 1).toUpperCase()}
    </div>
  );
};

export default ColorfulText;
