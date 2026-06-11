import { useLocation } from "react-router-dom";

function Analysis() {
  const location = useLocation();
  const data: any = location.state;

  if (!data) {
    return <p>No data available</p>;
  }

  console.log("Received data in Analysis page:", data);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Candidate Analysis
      </h1>

      {/* Candidate Name */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold">Candidate</h2>
        <p>{data.candidate}</p> {/* ✅ FIXED */}
      </div>

      {/* Score */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold">Score</h2>
        <p className="text-xl font-semibold">
          {data.result?.score} / 100
        </p>
      </div>

      {/* Decision */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold">Decision</h2>
        <p
          className={`font-semibold ${
            data.result?.decision === "Shortlisted"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {data.result?.decision}
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold mb-2">Summary</h2>
        <p className="text-sm whitespace-pre-wrap">
          {data.result?.summary}
        </p>
      </div>
    </div>
  );
}

export default Analysis;