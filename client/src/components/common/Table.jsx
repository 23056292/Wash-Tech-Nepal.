import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-gray-50 p-4 rounded-2xl shadow-md">
      <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="text-left py-3 px-4 font-semibold text-blue-800 border-b border-blue-200"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`transition-colors duration-200 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="py-3 px-4 text-gray-700 border-b border-blue-100"
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
