
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImageUrl("");
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      { inputs: prompt },
      {
        headers: {
          Authorization: "Bearer YOUR_HUGGINGFACE_API_KEY",
        },
        responseType: "blob",
      }
    );

    const url = URL.createObjectURL(response.data);
    setImageUrl(url);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>
      <input
        type="text"
        className="w-full max-w-md p-2 rounded text-black"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="mt-6 max-w-md rounded" />
      )}
    </div>
  );
};

export default App;
