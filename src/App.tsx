import { Button } from "@/components/ui/button"
import { SearchInput } from "./components/search"
import { ButtonGroup } from "./components/ui/button-group"
import { RiCloseLargeLine, RiStarFill } from "@remixicon/react"
import { Kbd } from "./components/ui/kbd"
import { H4, TypographyMuted } from "./components/ui/Typography"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "./components/ui/alert"
import { useBrowserData } from "./hooks/Browser-Data"
import { BookmarkItem } from "./components/BookmarkItem"
import { ScrollArea } from "./components/ui/scroll-area"
import { addCurrentPage, closePopup } from "./lib/chrome-actions"

export function App() {

  const { bookmarks, openTabs, currentTab, currentIsBookmarked ,searchTerm, setSearchTerm } = useBrowserData();
  console.log('bookmars', bookmarks)
  console.log('openTabs', openTabs)

  const currentOpenTab = openTabs.find(tab => tab.active)
  console.log('currentOpenTab', currentOpenTab);

  return (
    <div className="flex flex-col mx-h-150 w-95 gap-2 py-3 px-2 text-sm leading-loose border  shadow-sm bg-background">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <H4>BookMarks Tab Manger</H4>
        <ButtonGroup>

          <Button variant="outline" size="icon" onClick={closePopup} ><RiCloseLargeLine /></Button>

        </ButtonGroup>
      </div>
      {/* bookmark current tab alert */}
      {!currentIsBookmarked && currentTab && <Alert className="max-w-md flex gap-2">
        <span className="relative size-9 " ><img src={currentTab.favIconUrl} alt={currentTab.title} className=" object-contain" /></span>
       <div className="grid ">
        <AlertTitle className="font-semibold">{currentTab.title}</AlertTitle>
        <AlertDescription className="truncate whitespace-nowrap ">
          {currentTab.url}
        </AlertDescription>
        <AlertAction>
          <Button variant="default" size="xs" onClick={() => addCurrentPage(currentTab)}><RiStarFill /> Bookmark</Button>
        </AlertAction>
        </div>
      </Alert>}
      {/* Search */}
      <SearchInput value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} />
      {/* bookmarks */}
      <div className="flex-1 p-3 bg-card text-card-foreground border">
        {/* <H4 className="font-medium">Project ready!</H4> */}
        {/* here goes the list of bookmarks recursively */}
        <div className="flex-1 min-h-0 flex flex-col relative"> {/* الـ container ده مهم عشان الـ scroll يشتغل صح */}
          <ScrollArea className="h-80 flex flex-col pe-4">
            <div className="flex flex-col gap-1 h-auto min-h-full pb-4">
              {bookmarks.length > 0 ? (
                bookmarks.map((node) => (
                  <BookmarkItem key={node.id} node={node} />
                ))
              ) : (
                <TypographyMuted className="text-center py-10">
                  No bookmarks found.
                </TypographyMuted>
              )}
            </div>
          </ScrollArea>
        </div>

      </div>
      <TypographyMuted >
        (Press <Kbd>d</Kbd> to toggle dark mode)
      </TypographyMuted>
    </div>
  )
}

export default App
