// import { Plus } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <div className="bg-gray-50 h-screen left-0 min-w-72">
//       <div className="bg-gray-50 px-3 py-4 border-b border-solid border-gray-200">
//         <button className="px-2 py-2 flex flex-row items-center gap-2 bg-gray-200 rounded-md hover:opacity-50 duration-200">
//           <Plus size={12} />
//           <p className="text-xs font-semibold">New Snag Analysis</p>
//         </button>
//       </div>
//       <div className="px-2 mt-2">
//         <p className="text-xs font-medium">Previous Snags</p>
//       </div>
//     </div>
//   );
// }

import {
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  Trash2,
  Edit3,
} from "lucide-react";
import { useState } from "react";
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

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { snags, isLoading } = useFetchAllSnags();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>("1");

  const chats = formatSnagsForSidebar(snags);
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(snags);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    navigate(`/snag/${chatId}`);
    // Logic to load chat
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic to delete chat
  };

  const handleRenameChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic to rename chat
  };

  return (
<div className="flex flex-col h-screen w-80 bg-background border-r border-border">
      {/* Header with New Chat Button */}
      {location.pathname !== "/new" && (
        <div className="p-3 border-b border-border">
          <Button
            onClick={() => {
              navigate("/new");
            }}
            className="w-full justify-start gap-2 bg-blue-400 hover:bg-blue-600 text-primary-foreground"
          >
            <Plus size={16} />
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
            className="pl-9 bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors hover:bg-muted/50 ${
                  activeChat === chat.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.timestamp}
                  </p>
                </div>

                {/* Chat Actions Menu */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-gray-300 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-52 bg-popover border border-border shadow-md"
                    side="bottom"
                    sideOffset={5}
                    style={{ zIndex: 9999 }}
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenameChat(chat.id, e);
                      }}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <Edit3 size={14} className="mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id, e);
                      }}
                      className="text-destructive focus:text-destructive cursor-pointer hover:bg-muted"
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
      </ScrollArea>
    </div>
  );
}
