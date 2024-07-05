import React from "react";

export const formatText = (text: string): React.ReactNode[] => {
  // Split into paragraphs
  const paragraphs = text.split("\n\n");

  return paragraphs.map((paragraph, index) => {
    // Check if the paragraph is a numbered list
    if (paragraph.match(/^\d+\./m)) {
      // Split into list items
      const items = paragraph.split("\n");

      const listItems = items.map((item, i) => (
        <li key={i} className="my-2">
          {item.replace(/^\d+\.\s*/, "")}
        </li>
      ));

      return (
        <ul key={index} className="list-disc list-inside my-4">
          {listItems}
        </ul>
      );
    } else {
      // Regular paragraph or already bulleted list
      return (
        <p key={index} className="my-4">
          {paragraph}
        </p>
      );
    }
  });
};
