import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DataTable from '../../components/tables/DataTable';
import { BookingIcon, NodeIcon } from '../../components/common/Icons';
import { getOperatorStats, getReservations } from '../../services/dataService';

function OperatorDashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const [s, reservations] = await Promise.all([getOperatorStats(), getReservations()]);
      setStats(s);
      const active = reservations.filter((r) =>
        ['Pending', 'Approved', 'Current'].includes(r.status)
      );
      setRecent(active.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'prosumerName', label: 'Prosumer' },
    { key: 'nodeName', label: 'Node' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <ErrorMessage message={error} onRetry={loadData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard title="Pending Bookings" value={stats?.pendingBookings ?? 0} icon={<BookingIcon />} accent="solar" />
        <StatCard title="Current Bookings" value={stats?.currentBookings ?? 0} icon={<BookingIcon />} accent="deepGreen" />
        <StatCard title="Approved Future" value={stats?.approvedFuture ?? 0} icon={<BookingIcon />} accent="leaf" />
        <StatCard title="Available Slots" value={stats?.availableSlots ?? 0} icon={<NodeIcon />} accent="leaf" />
        <StatCard title="Occupied Slots" value={stats?.occupiedSlots ?? 0} icon={<NodeIcon />} accent="solar" />
      </div>

      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-3">
          <Link to="/operator/bookings">
            <Button variant="primary" size="sm">View Bookings</Button>
          </Link>
          <Link to="/operator/nodes">
            <Button variant="secondary" size="sm">View Nodes</Button>
          </Link>
        </div>
      </Card>

      <Card
        title="Active Bookings Overview"
        actions={
          <Link to="/operator/bookings">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        }
      >
        <DataTable columns={columns} data={recent} emptyTitle="No active bookings" />
      </Card>
    </div>
  );
}

export default OperatorDashboard;
