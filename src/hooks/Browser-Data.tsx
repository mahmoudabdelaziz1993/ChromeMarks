import { seed } from "@/lib/offline-seeds";
import { isUrlBookmarked } from "@/services/browser.service";
import type { BookmarkNode,  BrowserData } from "@/types";
import { useEffect, useMemo, useState, useDeferredValue } from "react";

export function useBrowserData(): BrowserData {
  const [searchTerm, setSearchTerm] = useState("");
  // الـ Deferred value بتساعد في الـ Performance وقت الكتابة السريعة
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const [data, setData] = useState<Omit<BrowserData, "currentIsBookmarked" | "searchTerm" | "setSearchTerm">>({ 
    bookmarks: [], 
    openTabs: [],
    currentTab: null,
  });

  useEffect(() => {
    const updateData = () => {
      if (typeof chrome !== "undefined" && chrome.bookmarks) {
        // البحث باستخدام API الكروم
        if (deferredSearchTerm) {
          chrome.bookmarks.search(deferredSearchTerm, (results) => {
            setData(prev => ({ 
              ...prev, 
              bookmarks: results as BookmarkNode[] 
            }));
          });
        } else {
          // جلب الشجرة كاملة
          chrome.bookmarks.getTree((tree) => {
            setData(prev => ({ 
              ...prev, 
              bookmarks: (tree[0].children as BookmarkNode[]) || [] 
            }));
          });
        }

        // جلب التابة النشطة
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            setData(prev => ({ 
              ...prev, 
              currentTab: {
                id: tabs[0].id || 0,
                title: tabs[0].title || "Untitled",
                url: tabs[0].url || "",
                favIconUrl: tabs[0].favIconUrl,
                active: tabs[0].active
              } 
            }));
          }
        });
      } else if (import.meta.env.DEV) {
        // بيئة التطوير
        const filteredBookmarks = deferredSearchTerm 
          ? seed.bookmarks.filter(b => b.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()))
          : seed.bookmarks;
        setData({ ...seed, bookmarks: filteredBookmarks });
      }
    };

    updateData();

    // إضافة الـ Listeners للتحديث اللحظي
    if (typeof chrome !== "undefined" && chrome.bookmarks) {
      const events = [
        chrome.bookmarks.onCreated,
        chrome.bookmarks.onRemoved,
        chrome.bookmarks.onChanged,
        chrome.bookmarks.onMoved
      ];
      events.forEach(e => e.addListener(updateData));
      return () => events.forEach(e => e.removeListener(updateData));
    }
  }, [deferredSearchTerm]); // التحديث يعتمد على القيمة المؤجلة

  const currentIsBookmarked = useMemo(() => 
    isUrlBookmarked(data.bookmarks, data.currentTab?.url || ""), 
    [data.bookmarks, data.currentTab]
  );

  return { 
    ...data, 
    currentIsBookmarked, 
    searchTerm, 
    setSearchTerm 
  };
}