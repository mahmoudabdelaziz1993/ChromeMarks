import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeNode } from "@/lib/chrome-actions";
import type { BookmarkNode } from "@/types";
import { RiDeleteBinLine, RiMore2Line, RiPencilLine } from "@remixicon/react"
import { useState } from "react";
export default function ActionsMenu({ node , edit}: { node: BookmarkNode, edit: () => void }) {
    const [open, setOpen] = useState(false);

    const handleRename = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false); // Close dropdown first
        // Use requestAnimationFrame to ensure dropdown is closed before editing
        requestAnimationFrame(() => {
            edit();
        });
    };
    
    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="icon-xs"><RiMore2Line /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"  onCloseAutoFocus={(e) => {
                    // THIS IS THE KEY - prevent auto focus when dropdown closes
                    e.preventDefault();
                }}>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleRename} >
                        <RiPencilLine /> Rename
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onClick={async (e) => { e.stopPropagation(); await removeNode(node.id); }}
                    >
                        <RiDeleteBinLine size={12} /> Remove
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
