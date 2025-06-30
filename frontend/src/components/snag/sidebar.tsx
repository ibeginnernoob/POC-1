import { Plus } from "lucide-react"

export default function Sidebar() {
	return (
		<div className="bg-gray-50 h-screen left-0">
			<div className="bg-gray-50 px-3 py-4 border-b border-solid border-gray-200">
				<button className="px-2 py-2 flex flex-row items-center gap-2 bg-gray-200 rounded-md hover:opacity-50 duration-200">
					<Plus size={12} />
					<p className="text-xs font-semibold">New Snag Analysis</p>
				</button>
			</div>
			<div className="px-2 mt-2">
				<p className="text-xs font-medium">Previous Snags</p>
			</div>
		</div>
	)
}