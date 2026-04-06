type StatusBadgeProps = {
  status: "parsed" | "processing" | "error";
};

function statusClasses(status: StatusBadgeProps["status"]) {
  switch (status) {
    case "parsed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}