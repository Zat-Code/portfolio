const StatusBar = () => {
  return (
    <div className="h-6 bg-[#007acc] text-white/80 text-xs flex items-center px-2">
      <div className="flex items-center space-x-2">
        <span>🖥️ main</span>
        <span>📡 Connected</span>
      </div>
    </div>
  )
}

export default StatusBar 