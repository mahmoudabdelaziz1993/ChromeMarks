import type { BookmarkNode } from "@/types";


/**
 * Checks if the given URL is bookmarked in the given array of nodes.
 * It checks if the URL matches any node's URL or if the URL is bookmarked
 * in any of the node's children.
 * @param {BookmarkNode[]} nodes - The array of nodes to check.
 * @param {string} targetUrl - The URL to check for.
 * @returns {boolean} True if the URL is bookmarked, false otherwise.
 */
export const isUrlBookmarked = (nodes: BookmarkNode[], targetUrl: string): boolean => {
    for (const node of nodes) {
        //    1. لو الـ node ده URL
        if (node.url === targetUrl) return true;

        // 2. لو الـ node ده فولدر، ندور جوه الـ children بتوعه
        if (node.children && node.children.length > 0) {
            if (isUrlBookmarked(node.children, targetUrl)) return true;
        }
    }
    return false;
};