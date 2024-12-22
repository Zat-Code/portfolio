import { FiFile, FiSearch, FiGitBranch, FiSettings } from 'react-icons/fi'

const ActivityBar = () => {
  return (
    <div className="w-12 bg-[#333333] flex flex-col items-center py-2">
      <button className="p-3 text-white/60 hover:text-white">
        <FiFile size={24} />
      </button>
      <button className="p-3 text-white/60 hover:text-white">
        <FiSearch size={24} />
      </button>
      <button className="p-3 text-white/60 hover:text-white">
        <FiGitBranch size={24} />
      </button>
      <div className="flex-1" />
      <button className="p-3 text-white/60 hover:text-white">
        <FiSettings size={24} />
      </button>
    </div>
  )
}

export default ActivityBar 