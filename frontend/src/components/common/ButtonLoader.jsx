export default function ButtonLoader({
  size = 18,
}) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-white border-t-transparent"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}