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

import { Plus, MessageSquare, Search, MoreHorizontal, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/lovable/button";
import { Input } from "@/components/lovable/input";
import { ScrollArea } from "@/components/lovable/scroll-area";
// Removed duplicate import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/lovable/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ChatItem {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

const mockChats: ChatItem[] = [
  { id: "1", title: "TR VIbrations", timestamp: "2 hours ago" },
  { id: "2", title: "Location Issue", timestamp: "Yesterday" },
  { id: "3", title: "MR Vibrations", timestamp: "2 days ago" },
  { id: "4", title: "Flight GPS Issue", timestamp: "3 days ago" },
  { id: "5", title: "Cruise GPS Issue", timestamp: "1 week ago" },
  { id: "6", title: "Unknown Vibrations", timestamp: "1 week ago" },
  { id: "7", title: "Oil Change", timestamp: "2 weeks ago" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>("1");

  const filteredChats = mockChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
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
      {location.pathname != "/new" && <div className="p-3 border-b border-border">
        <Button 
          onClick={()=>{navigate('/new')}}
          className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>}

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
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
                  activeChat === chat.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                </div>
                
                {/* Chat Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-background"
                    >
                      <MoreHorizontal size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={(e) => handleRenameChat(chat.id, e)}>
                      <Edit3 size={14} className="mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="text-destructive focus:text-destructive"
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