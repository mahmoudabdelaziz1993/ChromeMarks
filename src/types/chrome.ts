// src/types/chrome.ts

export interface BookmarkNode {
  id: string;
  title: string;
  index: number;
  parentId?: string;
  dateAdded: number;
  url?: string;             // لو موجود يبقى ده لينك (Leaf)
  children?: BookmarkNode[]; // لو موجود يبقى ده مجلد (Branch)
  dateGroupModified?: number;
  dateLastUsed?: number;

}

export interface TabNode {
  id: number;
  title: string;
  url: string;             
  favIconUrl?: string;
  active: boolean;
}

export interface BrowserData {
  bookmarks: BookmarkNode[];
  openTabs: TabNode[];
  currentTab: TabNode | null;
  currentIsBookmarked: boolean;
  searchTerm: string; // عشان لو حبيت تعرضه في الـ UI
  setSearchTerm: (term: string) => void;
}