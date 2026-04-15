import { useState } from "react";
import { RiFolder3Fill, RiFolder5Fill,  RiGlobalLine } from "@remixicon/react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import type { BookmarkNode } from "@/types";
import { Badge } from "./ui/badge";

// --- 1. Sub-Component: BookmarkLink ---
const BookmarkLink = ({ node }: { node: BookmarkNode }) => {
  const faviconUrl = node.url 
    ? `https://www.google.com/s2/favicons?domain=${new URL(node.url).hostname}&sz=32`
    : null;

  return (
    <div 
      className="flex items-center gap-2 py-1.5 h-auto px-2 hover:bg-secondary cursor-pointer group transition-colors"
      onClick={() => node.url && window.open(node.url, "_blank")}
    >
      <div className="w-4 h-4 flex shrink-0 items-center justify-center">
        {faviconUrl ? (
          <img 
            src={faviconUrl} 
            alt="" 
            className="w-4 h-4 object-contain "
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <RiGlobalLine size={14} className={`text-muted-foreground ${faviconUrl ? 'hidden' : ''}`} />
      </div>
      <span className="text-xs  truncate text-muted-foreground group-hover:text-foreground">
        {node.title || "Untitled"}
      </span>
    </div>
  );
};

// --- 2. Sub-Component: BookmarkFolder ---
const BookmarkFolder = ({ node }: { node: BookmarkNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion type="single" collapsible className="w-full max-w-80" onValueChange={(v) => setIsOpen(!!v)}>
      <AccordionItem value={node.id} className="border-none">
        <AccordionTrigger  className="py-1 hover:no-underline hover:bg-secondary  px-1">
          <div className="flex items-end gap-2">
            {isOpen ? (
              <RiFolder5Fill className="fill-primary"  />
            ) : (
              <RiFolder3Fill className="fill-primary" />
            )}
            <span className="text-sm font-medium truncate ">{node.title} </span>
            <Badge className=" w-2 h-min text-[.7em] " variant={'ghost'}>{node.children?.length || 0}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="ps-2 pb-0 border-l ms-4 border-muted flex flex-col gap-0.5 mt-0.5 h-auto!">
          {node.children?.map((child) => (
            <BookmarkItem key={child.id} node={child} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

// --- 3. Main Component: BookmarkItem (Exported) ---
export function BookmarkItem({ node }: { node: BookmarkNode }) {
  // لو فيه Children يبقى ده فولدر، غير كده يبقى لينك
  if (node.children || !node.url) {
    return <BookmarkFolder node={node} />;
  }
  
  return <BookmarkLink node={node} />;
}