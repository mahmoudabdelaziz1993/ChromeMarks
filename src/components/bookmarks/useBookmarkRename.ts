// hooks/useBookmarkRename.ts
import { useState, useRef, useEffect } from "react";
import { renameNode } from "@/lib/chrome-actions";

interface UseBookmarkRenameProps {
    nodeId: string;
    initialTitle: string;
}

export function useBookmarkRename({ nodeId, initialTitle }: UseBookmarkRenameProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    const handleRename = async () => {
        if (title.trim() && title !== initialTitle) {
            await renameNode(nodeId, title);
        } else {
            setTitle(initialTitle);
        }
        setIsEditing(false);
    };

    const startEditing = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        e?.preventDefault()
        setIsEditing(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            handleRename();
        }
    };

    // Reset title when initialTitle changes externally
    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle]);

    return {
        isEditing,
        title,
        inputRef,
        startEditing,
        handleRename,
        handleKeyDown,
        setTitle,
    };
}