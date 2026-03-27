using System;
using System.Collections.Generic;
using System.Text;

namespace SortableBlazorHybrid;

public class OnDragEventArgs
{
    public int OldIndex { get; set; }
    public bool IsDisabled { get; set; }
}
