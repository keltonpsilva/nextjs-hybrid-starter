export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 ${className}`}
    >
      Coming Soon
    </span>
  );
}
