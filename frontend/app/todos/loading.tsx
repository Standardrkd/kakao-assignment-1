export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 font-medium">데이터를 불러오는 중입니다...</p>
    </div>
  )
}
