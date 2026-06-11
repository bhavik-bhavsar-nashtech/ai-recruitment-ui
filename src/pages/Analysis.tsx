import { useLocation } from "react-router-dom";

function Analysis() {
  const location = useLocation();
  const data: any = location.state;

  if (!data) {
    return <p>No data available</p>;
  }

  console.log("Received data in Analysis page:", data);

  const emailBody = `Dear ${data.candidate},

We are pleased to inform you that your profile has been shortlisted for the next round.

Based on your experience and skills, we would like to invite you for an interview.

Please let us know your availability.

Best regards,
HR Team`;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Candidate Analysis
      </h1>

      {/* Candidate Name */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold">Candidate</h2>
        <p>{data.candidate}</p>
      </div>

      {/* Score */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold">Score</h2>
        <p className="text-xl font-semibold mb-2">
          {data.result?.score} / 100
        </p>

        {/* Progress bar */}
        <div className="bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${data.result?.score}%` }}
          />
        </div>
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

      {/* ✅ Email Section (ONLY if shortlisted) */}
      {data.result?.decision === "Shortlisted" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-2">
            Send Interview Email
          </h2>

          {/* Email Preview */}
          <pre className="whitespace-pre-wrap text-sm mb-4">
{`Subject: Interview Invitation - ${data.candidate}

${emailBody}`}
          </pre>

          {/* Outlook / Mail Button */}
          <a
            href={`mailto:?subject=Interview Invitation - ${data.candidate}&body=${encodeURIComponent(
              emailBody
            )}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Open in Outlook
          </a>
        </div>
      )}
    </div>
  );
}

export default Analysis;