import React, { FC, useState } from "react";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}
const TruncatedText: FC<TruncatedTextProps> = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState<boolean>(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      {showFullText ? (
        <p>{text}</p>
      ) : (
        <p>
          {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
        </p>
      )}
      {text.length > maxLength && (
        <button className="btn btn-sm btn-dark" onClick={toggleText}>
          {showFullText ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
