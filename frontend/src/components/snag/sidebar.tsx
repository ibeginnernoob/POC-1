import {
    MessageCirclePlus,
    MessageSquare,
    Search,
    MoreHorizontal,
    Trash2,
    Edit3,
    Home,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/lovable/button';
import { Input } from '@/components/lovable/input';
import { ScrollArea } from '@/components/lovable/scroll-area';
import useFetchAllSnags from '@/hooks/useFetchSnags';
// Removed duplicate import
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/lovable/dropdown-menu';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import type { SnagDetails } from '@/types/snag';
import { useDeleteSnag } from '@/hooks/useDeleteSnag';

function formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const snagDate = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - snagDate.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        const years = Math.floor(interval);
        return years === 1 ? 'about a year ago' : `about ${years} years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        const months = Math.floor(interval);
        return months === 1
            ? 'about a month ago'
            : `about ${months} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const days = Math.floor(interval);
        return days === 1 ? 'about a day ago' : `about ${days} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        const hours = Math.floor(interval);
        return hours === 1 ? 'about an hour ago' : `about ${hours} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
        const minutes = Math.floor(interval);
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }
    return 'just now';
}

interface ChatItem {
    id: string;
    title: string;
    timestamp: string;
    activeChat?: boolean;
}
function formatSnagsForSidebar(snags: SnagDetails[]): ChatItem[] {
    return snags.map((snag) => ({
        id: snag._id,
        title: snag.query.trim(), // Clean up any trailing newline or space
        timestamp: formatTimestamp(snag.created_at),
    }));
}

export default function Sidebar({
    setSideBarOpen,
}: {
    setSideBarOpen: (open: boolean) => void;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { snags, isLoading } = useFetchAllSnags();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeChat, setActiveChat] = useState<string | null>('1');
    const { deleteSnag, loading, error } = useDeleteSnag();
    const [snagsState, setSnagsState] = useState(snags || []);
    useEffect(() => {
        if (snags) {
            setSnagsState(snags);
        }
    }, [snags]);
    const chats = formatSnagsForSidebar(snagsState);

    const filteredChats = chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChatSelect = (chatId: string) => {
        setActiveChat(chatId);
        setSideBarOpen(false);
        navigate(`/snag/${chatId}`);
    };

    interface DeleteResponse {
        success: boolean;
    }

    const handleDelete = async (id: string): Promise<void> => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this snag?'
        );
        if (!confirmed) return;

        const res: DeleteResponse = await deleteSnag(id);
        if (res.success) {
            setSnagsState((prev) => prev.filter((s) => s._id !== id));
            console.log(snags);
        }
    };

    return (
        <div className="flex flex-col h-screen w-80 bg-background border-r border-border bg-white">
            {/* Header with New Chat Button */}
            <div className="px-2 py-3 border-b border-border w-full">
                {location.pathname !== '/snag/new' && (
                    <button
                        onClick={() => {
                            navigate('/snag/new');
                        }}
                        className="px-5 py-2 w-full flex flex-row items-center gap-3 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                        <MessageCirclePlus size={16} color="darkblue" />
                        <span className="text-base font-polysans text-black">
                            New Chat
                        </span>
                    </button>
                )}
                <button
                    onClick={() => {
                        navigate('/landing');
                    }}
                    className="px-5 py-2 w-full flex flex-row items-center gap-3 rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                    <Home size={16} color="darkblue" />
                    <span className="text-base font-polysans text-black">
                        Home
                    </span>
                </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        size={16}
                    />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-gray-100 text-sm font-roboto border-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
            </div>

            {/* Chat History */}
            <div className="w-[100%] flex-1 overflow-y-auto">
                <div className="space-y-1 py-2 px-2">
                    {filteredChats.length > 0 ? (
                        filteredChats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => handleChatSelect(chat.id)}
                                className={`group relative flex items-start justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-colors hover:bg-gray-100 ${
                                    activeChat === chat.id
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <div className="flex flex-row items-start gap-3">
                                    <MessageSquare
                                        size={16}
                                        className="flex-shrink-0 mt-1.5"
                                    />
                                    <div className="">
                                        <p className="text-sm font-roboto font-medium line-clamp-1">
                                            {chat.title || 'Untitled Snag'}
                                        </p>
                                        <p className="text-xs font-roboto text-muted-foreground">
                                            {chat.timestamp}
                                        </p>
                                    </div>
                                </div>

                                {/* Chat Actions Menu */}
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-100 md:opacity-0 ml-4 md:group-hover:opacity-100 h-6 w-6 p-0 hover:bg-gray-200 rounded-full flex-shrink-0 duration-200"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreHorizontal size={14} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-52 bg-popover bg-white border border-border shadow-md"
                                        side="bottom"
                                        sideOffset={5}
                                        style={{ zIndex: 9999, opacity: 1 }}
                                    >
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(chat.id);
                                            }}
                                            className="text-black bg-white focus:text-destructive cursor-pointer flex flex-row items-center gap-2 hover:bg-gray-100"
                                        >
                                            <Trash2 size={14} />
                                            <p className="text-sm font-roboto">
                                                Delete
                                            </p>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare
                                size={24}
                                className="mx-auto mb-2 opacity-50"
                            />
                            <p className="text-base font-roboto">
                                No conversations found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
