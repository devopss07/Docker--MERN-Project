import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Helper function to get color styles based on the employee level
const getLevelBadgeStyles = (level) => {
  const levelLower = level?.toLowerCase() || "";
  switch (levelLower) {
    case "intern":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "junior":
      return "bg-green-100 text-green-800 border-green-200";
    case "mid":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "senior":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

const Record = (props) => (
  /* CHANGED: Row styling uses hover:bg-slate-50 and subtle transitions */
  <tr className="hover:bg-slate-50 transition-colors group">
    <td className="p-4 align-middle border-b border-slate-100 text-slate-800 font-medium">
      {props.record.name}
    </td>
    <td className="p-4 align-middle border-b border-slate-100 text-slate-600">
      {props.record.position}
    </td>
    <td className="p-4 align-middle border-b border-slate-100">
      {/* CHANGED: The level text is wrapped in a colored badge span */}
      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getLevelBadgeStyles(props.record.level)}`}>
        {props.record.level}
      </span>
    </td>
    <td className="p-4 align-middle border-b border-slate-100">
      <div className="flex gap-4">
         {/* CHANGED: Action buttons replaced with cleaner text links that appear on hover */}
        <Link
          className="text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors opacity-70 group-hover:opacity-100"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="text-sm font-medium text-red-600 hover:text-red-900 transition-colors opacity-70 group-hover:opacity-100"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${API_URL}/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`${API_URL}/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    /* CHANGED: Added a main container with max-width for better centering on large screens */
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* ADDED: Page Header Area with title and subtitle */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Employee Directory</h3>
        <p className="mt-1 text-sm text-slate-500">A list of all current employees, their roles, and seniority levels.</p>
      </div>

      {/* ADDED: Toolbar area for "More Options" (Search/Filter placeholders) */}
      <div className="flex justify-between items-center mb-4 p-1">
        <div className="relative w-full max-w-xs">
          <input type="text" placeholder="Search employees..." className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-slate-200 bg-white hover:bg-slate-100 h-10 px-4 py-2">
             Filter icon placeholder ▼
          </button>
        </div>
      </div>

      {/* CHANGED: Table container wrapped in a white card with shadow and rounded corners */}
      <div className="rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm text-left">
            {/* CHANGED: Header styling is uppercase, smaller, with lighter text */}
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
              <tr>
                <th className="h-10 px-4 text-left align-middle font-medium">
                  Name
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium">
                  Position
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium">
                  Level
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recordList()}
            </tbody>
          </table>
        </div>
        
        {records.length === 0 && (
          <div className="text-center p-8 text-slate-500 text-sm">
            No employee records found. Click "Add Employee" to get started.
          </div>
        )}

        {/* ADDED: Pagination Footer Placeholder */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium">{records.length}</span> results
          </div>
          <div className="flex-1 flex justify-between sm:justify-end gap-2">
             <button className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Previous</button>
             <button className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}