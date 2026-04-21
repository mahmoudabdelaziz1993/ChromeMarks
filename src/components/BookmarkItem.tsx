import { useState } from "react";
import { RiFolder3Fill, RiFolder5Fill, RiGlobalLine } from "@remixicon/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import type { BookmarkNode } from "@/types";
import ActionsMenu from "./bookmarks/actions-menu";
import { useBookmarkRename } from "./bookmarks/useBookmarkRename";
import { moveNode } from "@/lib/chrome-actions";
import { cn } from "@/lib/utils";

// --- 1. Sub-Component: BookmarkLink ---
const BookmarkLink = ({ node }: { node: BookmarkNode }) => {
  const { title, inputRef, setTitle, isEditing, startEditing, handleRename } = useBookmarkRename({ nodeId: node.id, initialTitle: node.title });


  const faviconUrl = node.url
    ? `https://www.google.com/s2/favicons?domain=${new URL(node.url).hostname}&sz=32`
    : null;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("nodeId", node.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="group flex items-center justify-between group py-1 px-2 hover:bg-accent hover:text-accent-foreground cursor-pointer [&.is-dragging]:cursor-grabbing transition-colors select-none"
      onClick={() => !isEditing && node.url && window.open(node.url, "_blank")}
    >
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        <div className="w-4 h-4 flex shrink-0 items-center justify-center">
          {faviconUrl && <img src={faviconUrl} alt={node.title} className="object-contain" />}
          {!faviconUrl && <RiGlobalLine size={14} className="text-muted-foreground" />}
        </div>

        {isEditing ? (
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="h-6 py-0 px-1 text-xs focus-visible:ring-1 focus-visible:ring-primary"
          />
        ) : (
          <span className="text-xs truncate text-muted-foreground group-hover:text-foreground">
            {node.title || "Untitled"}
          </span>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ActionsMenu node={node} edit={startEditing} />
      </div>

    </div>
  );
};

// --- 2. Sub-Component: BookmarkFolder ---
const BookmarkFolder = ({ node }: { node: BookmarkNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const { startEditing, isEditing, title, handleRename, inputRef, setTitle } = useBookmarkRename({ nodeId: node.id, initialTitle: node.title });

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);

    const draggedNodeId = e.dataTransfer.getData("nodeId");

    // منع سحب العنصر لنفسه أو للأب بتاعه
    if (draggedNodeId && draggedNodeId !== node.id) {
      await moveNode(draggedNodeId, node.id);
    }
  };

  return (
    <Accordion type="single" collapsible className="max-w-xs" onValueChange={(v) => setIsOpen(!!v)}>
      <AccordionItem value={node.id} className="border-none">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOver(true);
          }}
          onDragLeave={() => setIsOver(false)}
          onDrop={handleDrop}
          className={cn("group flex items-center justify-between pr-2 hover:bg-accent hover:text-accent-foreground ",
            isOver && "bg-secondary text-secondary-foreground"
          )}
          onDoubleClick={startEditing}>
          <AccordionTrigger className="py-1 hover:no-underline flex-1 px-1">
            <div className="flex items-center gap-2 overflow-hidden">
              {isOpen ? <RiFolder5Fill className="fill-primary shrink-0" /> : <RiFolder3Fill className="fill-primary shrink-0" />}

              {isEditing ? (
                <Input
                  ref={inputRef}
                  value={title}
                  onChange={(e) => { e.stopPropagation(); setTitle(e.target.value) }}
                  onBlur={handleRename}
                  onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                  onMouseDown={(e) => e.stopPropagation()} // Critical: prevent focus theft
                  className="h-6 py-0 px-1 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                  tabIndex={0}
                />
              ) : (
                <span className="text-sm font-medium truncate">{node.title}</span>
              )}
            </div>
          </AccordionTrigger>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ActionsMenu node={node} edit={startEditing} />
          </div>
        </div>

        <AccordionContent className="ps-2 pb-0 border-l h-full ms-3 border-muted/50 flex flex-col gap-0.5 mt-0.5">
          {node.children?.map((child) => (
            <BookmarkItem key={child.id} node={child} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export function BookmarkItem({ node }: { node: BookmarkNode }) {
  if (node.children || !node.url) return <BookmarkFolder node={node} />;
  return <BookmarkLink node={node} />;
}