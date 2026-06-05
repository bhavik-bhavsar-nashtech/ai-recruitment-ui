import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Card from "./components/Card";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Recruitment Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Candidates" value="120" />
        <Card title="Shortlisted" value="25" />
        <Card title="Rejected" value="95" />
      </div>
    </div>
  );
}


// function Upload() {
//   return <h1>Upload Page</h1>;
// }

// function Analysis() {
//   return <h1>Analysis Page</h1>;
// }

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;