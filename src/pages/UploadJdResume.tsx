import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  extractPdfText,
  extractDocxText,
} from "../utils/fileParser";
import { uploadResumeText } from "../api/recruitmentApi";

function UploadJdResume() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [resumePreview, setResumePreview] = useState("");
  const [jdPreview, setJdPreview] = useState("");

  const navigate = useNavigate();

  // ✅ Helper to extract file text
  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "application/pdf") {
      return await extractPdfText(file);
    }

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return await extractDocxText(file);
    }

    
    // ✅ NEW: Handle TXT
    if (file.type === "text/plain") {
        return await file.text(); // built-in browser API
    }

    throw new Error("Unsupported file type");
  };

  const handleUpload = async () => {
    if (!resumeFile || !name) {
      alert("Please provide resume and candidate name");
      return;
    }

    setLoading(true);

    try {
      // ✅ Extract resume text
      const resumeText = await extractTextFromFile(resumeFile);
      setResumePreview(resumeText.slice(0, 1000));

      let finalJdText = jobDescription;

      // ✅ If JD file uploaded → override text
      if (jdFile) {
        finalJdText = await extractTextFromFile(jdFile);
        setJdPreview(finalJdText.slice(0, 1000));
      }

      if (!finalJdText) {
        alert("Please provide Job Description (text or file)");
        setLoading(false);
        return;
      }

      // ✅ Call API
      const data = await uploadResumeText(
        name,
        finalJdText,
        resumeText
      );

      console.log("API Response:", data);

      navigate("/analysis", { state: data });
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Upload Resume + JD (Enhanced)
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow w-[650px] space-y-4">
        
        {/* Candidate Name */}
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Resume Upload */}
        <div>
          <label className="font-semibold">Upload Resume</label>
          <input
            type="file"
            onChange={(e) =>
              setResumeFile(e.target.files?.[0] || null)
            }
            className="w-full"
          />
        </div>

        {/* JD Upload */}
        <div>
          <label className="font-semibold">
            Upload Job Description File (Optional)
          </label>
          <input
            type="file"
            onChange={(e) =>
              setJdFile(e.target.files?.[0] || null)
            }
            className="w-full"
          />
        </div>

        {/* JD Manual Input */}
        <textarea
          placeholder="Or paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Submit Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "AI analyzing..."
            : "Upload & Analyze (Smart)"}
        </button>

        {/* Resume Preview */}
        {resumePreview && (
          <div>
            <h2 className="font-bold mt-4">
              Resume Preview
            </h2>
            <div className="bg-gray-100 p-3 rounded text-sm max-h-40 overflow-y-auto">
              {resumePreview}
            </div>
          </div>
        )}

        {/* JD Preview */}
        {jdPreview && (
          <div>
            <h2 className="font-bold mt-4">
              JD Preview
            </h2>
            <div className="bg-gray-100 p-3 rounded text-sm max-h-40 overflow-y-auto">
              {jdPreview}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadJdResume;