import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const uploadResume = async (
  file: File,
  name: string,
  jobDescription: string
) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("jobDescription", jobDescription);
  formData.append("resume", file); // ✅ IMPORTANT: correct key

  const response = await API.post("/upload-resume", formData);

  return response.data;
};
