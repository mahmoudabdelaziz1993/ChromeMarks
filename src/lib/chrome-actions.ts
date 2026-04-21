import type { TabNode } from "@/types";

export const pinExtension = () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
};

export const closePopup = () => {
  window.close();
};

export const addCurrentPage = async (tab: TabNode, parentId?: string): Promise<boolean> => {
  if (!tab.url) return false;
  try {
    await chrome.bookmarks.create({
      title: tab.title,
      url: tab.url,
      parentId: parentId // لو مبعتوش، الكروم هيحطه في 'Other Bookmarks' أوتوماتيك
    });
    return true;
  } catch (error) {
    console.error("Failed to add bookmark:", error);
    return false;
  }
};

export const removeNode = async (nodeId: string): Promise<boolean> => {
  try {
    await chrome.bookmarks.removeTree(nodeId);
    return true;
  } catch (error) {
    console.error("Failed to remove:", error);
    return false;
  }
};

export const renameNode = async (nodeId: string, newTitle: string): Promise<boolean> => {
  if (!newTitle.trim()) return false;
  try {
    await chrome.bookmarks.update(nodeId, { title: newTitle });
    return true;
  } catch (error) {
    console.error("Failed to rename:", error);
    return false;
  }
};

export const moveNode = async (id: string, targetParentId: string) => {
  try {
    await chrome.bookmarks.move(id, { parentId: targetParentId });
    return true;
  } catch (error) {
    console.error("Failed to move bookmark:", error);
    return false;
  }
};