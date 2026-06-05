import { useLocation } from "react-router-dom";

function Analysis() {
  const location = useLocation();
  const data: any = location.state;

  if (!data) {
    return <p>No data available</p>;
  }

<div
  dangerouslySetInnerHTML={{
    __html: data.screening.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
  }}
/>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Candidate Analysis
      </h1>

      {/* Name */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold">Candidate</h2>
        <p>{data.name}</p>
      </div>

      {/* Screening */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold mb-2">Screening Result</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {data.screening}
        </pre>
      </div>

      {/* Interview */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold mb-2">Interview Details</h2>
        <p>Date: {data.interview?.date}</p>
        <p>Time: {data.interview?.time}</p>
      </div>

      {/* Offer Letter */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-2">Offer Letter</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {data.offer}
        </pre>
      </div>
    </div>
  );
}

export default Analysis;