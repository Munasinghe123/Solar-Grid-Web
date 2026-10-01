function Card({ children, className = '', title, actions }) {
  return (
    <div className={`bg-white rounded-xl border border-offWhite shadow-sm ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-offWhite">
          {title && <h3 className="text-base font-semibold text-deepGreen">{title}</h3>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export default Card;
