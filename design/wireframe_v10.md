Goal:
  - 用 swipe 來對應最常使用的上一天、下一天 (sibling navigation)
  - 其他全部用 vertical scroll 展開來對應 (parent-child, sheetType, data navigation)
  - 移除 week view for simplicity
  - 加上如同 ibook(UIPageViewController) 的 horizontal scroll bar 切換一整年的日子

Pros:
  - intuitive to switch between parent-child and sibling note
  - use left/right swipe to switch sibling is super easy

Cons:
  - boundary of parent / child is not strong
  - the notes are always unflatten... so if not write everyday, there will be a lot of empty sheet
  - it maybe very long on month goal... maybe we could divide it into multiple sheets (decided after prototyping)


Missing Features:
  - *Customizable SheetType*
  - *Nested todo list*
  - auto summary/statistics
  - Labeling
  - multiple techou
  - customize keyboard (done & checkbox item)
  - Add images
  - Customizable Skeleton
  - meta actions => send to, export, ...
  - alarm/notification
  - global pages
  - 固定 sheet size? 有很多好處與限制。
  - Goto Today button

<img src="https://raw.githubusercontent.com/wangchou/Align/master/design/img/wireframe_v10_sketch.jpg" height="800">
<img src="https://raw.githubusercontent.com/wangchou/Align/master/design/img/wireframe_v10.jpg" height="600">
