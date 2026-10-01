const statusStyles = {
  Active: 'bg-leaf/15 text-leaf',
  Inactive: 'bg-gray-200 text-gray-600',
  Pending: 'bg-solar/30 text-deepGreen',
  Approved: 'bg-leaf/15 text-leaf',
  Current: 'bg-deepGreen/15 text-deepGreen',
  Completed: 'bg-offWhite text-deepGreen',
  Cancelled: 'bg-red-100 text-red-700',
  Error: 'bg-red-100 text-red-700',
};

function StatusBadge({ status }) {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
