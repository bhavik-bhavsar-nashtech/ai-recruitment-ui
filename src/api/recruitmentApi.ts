import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-recruitment-api-g0eqa2ezfjb8d3fw.centralindia-01.azurewebsites.net/", //"https://localhost:5001/",
});


export const uploadResume = async (
  file: File,
  name: string,
  jobDescription: string
) => {
  const formData = new FormData();

  // ✅ ONLY file goes in FormData
  formData.append("resume", file);

  const response = await API.post("/upload-resume", formData, {
    params: {
      name: name,
      jobDescription: jobDescription,
    },
  });

  return response.data;
};


export const uploadResumeText = async (
  name: string,
  jobDescription: string,
  resumeText: string
) => {
  const response = await API.post("/upload-resume-text", {
    name,
    jobDescription,
    resumeText,
  });

  return response.data;
};
