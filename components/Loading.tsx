// components/Loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-[#00eaff]/20"></div>
        <div className="space-y-2">
          <div className="h-4 bg-[#00eaff]/20 rounded w-32"></div>
          <div className="h-4 bg-[#00eaff]/20 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}