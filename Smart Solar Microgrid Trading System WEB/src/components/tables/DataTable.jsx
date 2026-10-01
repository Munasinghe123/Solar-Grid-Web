import EmptyState from '../common/EmptyState';

/**
 * Simple responsive data table.
 * On small screens, horizontal scroll is used.
 */
function DataTable({ columns = [], data = [], emptyTitle = 'No records found', emptyDescription = '' }) {
  if (!data.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-offWhite bg-offWhite/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold text-deepGreen whitespace-nowrap ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="border-b border-offWhite/80 hover:bg-offWhite/40 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 text-gray-700 ${col.className || ''}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
