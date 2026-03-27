using System;
using System.Collections.Generic;
using System.Text;

namespace SortableBlazorHybrid;

public class OnItemMoveEventArgs
{
    // dragged element info
    public DomRect DraggedRect { get; set; } = new();

    // target element info
    public DomRect RelatedRect { get; set; } = new();

    // insertion hint
    public bool WillInsertAfter { get; set; }

    // mouse position from originalEvent
    public double ClientY { get; set; }
}
