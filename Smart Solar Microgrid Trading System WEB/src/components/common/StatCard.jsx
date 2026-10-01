function StatCard({ title, value, icon, accent = 'leaf' }) {
  const accents = {
    leaf: 'bg-leaf/10 text-leaf',
    solar: 'bg-solar/20 text-deepGreen',
    deepGreen: 'bg-deepGreen/10 text-deepGreen',
  };

  return (
    <div className="bg-white rounded-xl border border-offWhite shadow-sm p-5 flex items-start gap-4">
      {icon && (
        <div className={`rounded-lg p-3 ${accents[accent] || accents.leaf}`}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-deepGreen mt-1">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
