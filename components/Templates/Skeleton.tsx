export default function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white w-full shadow/5 rounded-2xl p-5 space-y-4 animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="w-24 h-3 bg-gray-200 rounded"></div>
              <div className="w-40 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
            <div className="w-12 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}
