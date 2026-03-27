
namespace SortableBlazorHybrid;

public class OnItemDropEventArgs
{
    public string FromZoneId { get; set; } = string.Empty;
    public string ToZoneId { get; set; } = string.Empty;
    public int OldIndex { get; set; }
    public int NewIndex { get; set; }
}
