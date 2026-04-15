// src/lib/chrome-actions.ts

import type { TabNode } from "@/types";


export const pinExtension = () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
};


/**
 * Closes the current popup window.
 * This function should be called by the popup itself to close.
 * If not called, the popup will remain open until the user closes it.
 * @returns {undefined}
 */
export const closePopup = () => {
  window.close();
};


/**
 * Adds the current page to the bookmarks.
 * If the page is already bookmarked, does nothing.
 * If the page is not bookmarked, creates a new bookmark with the page's title and URL.
 * @param {chrome.tabs.Tab} tab - the tab to bookmark.
 * @returns {Promise<boolean>} - whether the bookmark was successfully added.
 */
export const addCurrentPage = async (tab: TabNode) => {
  if (!tab.url) return;
  
  try {
    await chrome.bookmarks.create({
      title: tab.title,
      url: tab.url,
      
    });
    return true;
  } catch (error) {
    console.error("Failed to add bookmark:", error);
    return false;
  }
};