import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">AI Recruiter</h1>

        <nav className="flex flex-col gap-3">
          <a href="/" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
          <a href="/upload" className="hover:bg-gray-700 p-2 rounded">
            Upload Resume
          </a>
          <a href="/upload-jd-resume" className="hover:bg-gray-700 p-2 rounded">
            Upload JD & Resume
          </a>
          <a href="/analysis" className="hover:bg-gray-700 p-2 rounded">
            Analysis
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;