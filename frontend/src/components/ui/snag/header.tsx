import { Wrench, PanelRight } from 'lucide-react';

export default function Header({handleSidebarOpen} : {
	handleSidebarOpen: () => void;
}) {
    return (        
        <div className='h-fit w-[100%] py-3 bg-white border-b-[0.5px] border-solid border-gray-300'>
            <div className="max-w-4xl mx-auto px-4 flex flex-row items-center gap-5">
				<button
					className='flex justify-center items-center bg-white p-2 rounded-full hover:bg-gray-100 duration-200'
					onClick={handleSidebarOpen}>
					<PanelRight size={16} />
				</button>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Wrench className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">
                            AI Snag Report Analyzer
                        </h1>
                        <p className="text-sm text-slate-600">
                            Natural Language Processing for Construction
                            Management
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
