"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatText } from "./utils/formatText";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "I have joint pain, what can I take?",
    "I am struggling to get rid of a cold, what can help?",
    "What can help my blood pressure come down?",
    "Is there something that can help with lowering blood sugar?",
    "I hurt my calf playing football, what can I do to heal it quicker?",
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while searching.");
    }
    setLoading(false);
  };

  const handleExampleClick = (question: any) => {
    setQuery(question);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Holistically</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Some example Questions. Remember, you can be really specific:
          </h2>
          <ul className="space-y-2">
            {exampleQuestions.map((question, index) => (
              <li key={index}>
                <Button
                  variant="link"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleExampleClick(question)}
                >
                  {question}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-red-500">
          NOT MEDICAL ADVICE
        </h2>
        <div className="flex space-x-4 mb-4">
          <Input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        {result && (
          <div className="mt-8 p-4 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Result:</h2>
            <p>{formatText(result)}</p>
          </div>
        )}
      </div>
    </main>
  );
}
