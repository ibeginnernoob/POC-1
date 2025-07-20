import {
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  Trash2,
  Edit3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/lovable/button";
import { Input } from "@/components/lovable/input";
import { ScrollArea } from "@/components/lovable/scroll-area";
import useFetchAllSnags from "@/hooks/useFetchSnags";
// Removed duplicate import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/lovable/dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { SnagDetails } from "@/types/snag";
import { formatDistanceToNow } from "date-fns";
import { useDeleteSnag } from "@/hooks/useDeleteSnag";
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
    timestamp: formatDistanceToNow(new Date(snag.timestamp), {
      addSuffix: true,
    }), // "2 days ago"
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>("1");
  const { deleteSnag, loading, error } = useDeleteSnag();
  const [snagsState, setSnagsState] = useState(snags || []);
  useEffect(() => {
    if (snags) {
      setSnagsState(snags);
    }
  }, [snags]);
  const chats = formatSnagsForSidebar(snagsState);

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
      "Are you sure you want to delete this snag?",
    );
    if (!confirmed) return;

    const res: DeleteResponse = await deleteSnag(id);
    if (res.success) {
      setSnagsState((prev) => prev.filter((s) => s._id !== id));
      console.log(snags);
    }
  };

  return (
    <div className="flex flex-col h-screen w-64 sm:w-64 bg-background border-r border-border">
      {/* Header with New Chat Button */}
      {location.pathname !== "/new" && (
        <div className="p-3 border-b border-border">
          <Button
            onClick={() => {
              navigate("/new");
            }}
            className="w-full text-sm justify-start gap-2 bg-blue-400 hover:bg-blue-600 text-primary-foreground text-white"
          >
            <Plus color="white" size={16} />
            New Chat
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-100 text-sm border-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="w-[100%]">
        <div className="space-y-1 py-2">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`group relative flex items-start justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-colors hover:bg-muted/50 ${
                  activeChat === chat.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex flex-row items-center gap-2">
                  <MessageSquare size={16} className="flex-shrink-0" />
                  <div className="">
                    <p className="text-sm font-medium truncate">
                      {chat.title.slice(0, 20) + "..." || "Untitled Snag"}
                    </p>
                    <p className="text-xs text-muted-foreground">
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
                      className="opacity-100 md:opacity-0  md:group-hover:opacity-100 h-6 w-6 p-0 hover:bg-gray-300 flex-shrink-0"
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
                      className="text-black bg-white focus:text-destructive cursor-pointer "
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
