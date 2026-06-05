import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../api/recruitmentApi";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file || !name || !jobDescription) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const data = await uploadResume(file, name, jobDescription);

      console.log("API Response:", data);

      navigate("/analysis", { state: data });
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Upload Resume
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow w-[500px] space-y-4">

        {/* Name */}
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Job Description */}
        <textarea
          placeholder="Job Description (e.g. C#, React, Node)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "AI analyzing..." : "Upload & Analyze"}
        </button>
      </div>
    </div>
  );
}

export default Upload;