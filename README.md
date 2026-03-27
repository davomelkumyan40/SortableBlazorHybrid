# 🎯 SortableBlazorHybrid

> 🚀 Powerful drag-and-drop sorting component for **Blazor Hybrid (MAUI)** and **Blazor WebAssembly** applications

[![NuGet](https://img.shields.io/nuget/v/SortableBlazorHybrid.svg?style=flat-square&logo=nuget)](https://www.nuget.org/packages/SortableBlazorHybrid/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

A lightweight, high-performance Blazor component library that brings interactive drag-and-drop sorting to your web and hybrid applications. Built on top of the popular [Sortable.js](https://sortablejs.github.io/Sortable/) library, **SortableBlazorHybrid** provides seamless integration with Blazor components.

---

## ✨ Features

- ✅ **Drag & Drop Sorting** - Intuitive item reordering with smooth animations
- ✅ **Multi-Zone Support** - Drag items between multiple drop zones
- ✅ **Nested Containers** - Support for nested sortable containers
- ✅ **Touch Support** - Works on mobile devices and touch screens
- ✅ **Event Callbacks** - Rich event system (onStart, onMove, onEnd, etc.)
- ✅ **Customization** - Extensive styling options with CSS classes
- ✅ **MAUI Compatible** - Optimized for Blazor Hybrid MAUI applications
- ✅ **WebAssembly Ready** - Full support for Blazor WebAssembly
- ✅ **Disabled Items** - Lock items to prevent dragging
- ✅ **Performance** - Minimal overhead with pointer event optimization

---

## 📦 Installation

### Via NuGet Package Manager

```bash
dotnet add package SortableBlazorHybrid
```

### Via Package Manager Console

```powershell
Install-Package SortableBlazorHybrid
```

### Via `.csproj` file

```xml
<ItemGroup>
    <PackageReference Include="SortableBlazorHybrid" Version="*" />
</ItemGroup>
```

---

## 🔧 Setup & Configuration

### Step 1: Add Script References

Add the following script references to your **`index.html`** file (in the `<head>` section):

#### For Blazor WebAssembly:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Other head content -->
    <link rel="stylesheet" href="css/app.css" />
</head>
<body>
    <div id="app"></div>

    <script src="_framework/blazor.webassembly.js"></script>
    <!-- Required: Sortable.js library -->
    <script src="sortablejs1.15.7/Sortable.min.js"></script>
    <!-- Required: SortableBlazorHybrid interop script -->
    <script src="./_content/SortableBlazorHybrid/sortable-interop.js"></script>
</body>
</html>
```

#### For Blazor Hybrid (MAUI):
Include the same script references in your `index.html` within the `wwwroot` folder.

### Step 2: Import Components

Add the following using statement to your `_Imports.razor`:

```razor
@using SortableBlazorHybrid
```

### Step 3: Include Sortable.js

Download **Sortable.js 1.15.7** and place it in your `wwwroot` folder:

```
wwwroot/
  └── sortablejs1.15.7/
      └── Sortable.min.js
```

Or reference it from a CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
```

---

## 🚀 Quick Start

### Basic Single Zone Example

```razor
@page "/drag-drop"
@using SortableBlazorHybrid

<h3>Drag & Drop Items</h3>

<DropContainer T="TodoItem" 
               Items="Items" 
               Group="todos"
               Transition="150"
               GhostClass="sortable-ghost" 
               DragClass="sortable-drag"
               OnItemDrop="@HandleDrop">
    <ChildContent>
        <DropZone T="TodoItem" Class="drop-zone" />
    </ChildContent>
    <ItemRenderer>
        <div class="todo-item">@context.Title</div>
    </ItemRenderer>
</DropContainer>

<style>
    .drop-zone {
        background-color: #f5f5f5;
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 16px;
        min-height: 200px;
    }

    .sortable-ghost {
        opacity: 0.4;
        background-color: #f0f0f0;
    }

    .sortable-drag {
        opacity: 0;
    }

    .todo-item {
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 12px;
        margin: 8px 0;
        cursor: grab;
    }

    .todo-item:active {
        cursor: grabbing;
    }
</style>

@code {
    private List<TodoItem> Items = new();

    protected override void OnInitialized()
    {
        Items = new()
        {
            new() { Id = "1", Title = "Learn Blazor" },
            new() { Id = "2", Title = "Build App" },
            new() { Id = "3", Title = "Deploy" },
        };
    }

    private async Task HandleDrop(OnItemDropEventArgs e)
    {
        Console.WriteLine($"Item moved from index {e.OldIndex} to {e.NewIndex}");
        await InvokeAsync(StateHasChanged);
    }

    public class TodoItem
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}
```

---

## 📚 Component Documentation

### `<DropContainer>` Component

The main container that manages drag-and-drop functionality.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `Items` | `List<T>` | **Required** | Collection of items to display |
| `ItemsSelector` | `Func<T, string, bool>` | **Required** | Function to filter items by zone ID |
| `ChildContent` | `RenderFragment` | **Required** | Child `<DropZone>` components |
| `ItemRenderer` | `RenderFragment<T>` | **Required** | Template for rendering individual items |
| `Group` | `string` | `"shared"` | Group name for cross-zone dragging |
| `Class` | `string` | `""` | Additional CSS classes |
| `Style` | `string` | `""` | Inline CSS styles |
| `Transition` | `int` | `150` | Animation duration in milliseconds |
| `ForceFallback` | `bool` | `true` | Use pointer events instead of HTML5 drag API |
| `DelayOnTouchOnly` | `bool` | `false` | Only delay drag on touch devices |
| `DelayOnTouch` | `int` | `150` | Touch delay in milliseconds |
| `SwapThreshold` | `float` | `1.0f` | Distance threshold for swapping items (0-1) |
| `DragHandleClass` | `string` | `""` | CSS class for drag handle element |
| `GhostClass` | `string` | `""` | CSS class for ghost element during drag |
| `ChosenClass` | `string` | `""` | CSS class for chosen element |
| `DragClass` | `string` | `""` | CSS class for dragging element |
| `DisabledItemClass` | `string` | `""` | CSS class for disabled items |
| `ItemDisabled` | `Func<T, bool>` | `null` | Predicate to determine if item is draggable |
| `FallbackOnBody` | `bool` | `false` | Append cloned element to body during drag |
| `AllowReorder` | `bool` | `false` | Automatically reorder items in list on drop |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `OnItemDrop` | `EventCallback<OnItemDropEventArgs>` | Fires when item is dropped |
| `OnItemDrag` | `EventCallback<OnDragEventArgs>` | Fires when drag starts |
| `OnItemMove` | `EventCallback<OnItemMoveEventArgs>` | Fires when item moves during drag |

---

### `<DropZone>` Component

Defines a drop zone within a `<DropContainer>`.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `Identifier` | `string` | Auto-generated | Unique zone identifier |
| `Class` | `string` | `""` | CSS classes |
| `Style` | `string` | `""` | Inline CSS styles |

---

## 📋 API Reference

### Event Arguments

#### `OnItemDropEventArgs`
Fired when an item is successfully dropped.

```csharp
public class OnItemDropEventArgs
{
    public string FromZoneId { get; set; }      // Source zone ID
    public string ToZoneId { get; set; }        // Target zone ID
    public int OldIndex { get; set; }           // Original item index
    public int NewIndex { get; set; }           // New item index
}
```

#### `OnDragEventArgs`
Fired when drag operation starts.

```csharp
public class OnDragEventArgs
{
    public int OldIndex { get; set; }           // Starting item index
    public bool IsDisabled { get; set; }        // Whether item is disabled
}
```

#### `OnItemMoveEventArgs`
Fired during drag movement.

```csharp
public class OnItemMoveEventArgs
{
    public DomRect DraggedRect { get; set; }    // Dragged element position/size
    public DomRect RelatedRect { get; set; }    // Target element position/size
    public bool WillInsertAfter { get; set; }   // Insert after or before
    public double ClientY { get; set; }         // Mouse Y position
}
```

#### `DomRect`
Represents element dimensions and position.

```csharp
public struct DomRect
{
    public double Left { get; set; }
    public double Top { get; set; }
    public double Right { get; set; }
    public double Bottom { get; set; }
}
```

---

## 💡 Examples

### Example 1: Multi-Zone Drag & Drop

Drag items between multiple independent zones.

```razor
@page "/multi-zone"
@using SortableBlazorHybrid

<h3>Multi-Zone Drag & Drop</h3>

<div style="display: flex; gap: 20px;">
    <div style="flex: 1;">
        <h4>📋 Todo</h4>
        <DropContainer T="Task" 
                       Items="Tasks" 
                       Group="tasks"
                       ItemsSelector="@((item, zoneId) => item.Status == zoneId)"
                       OnItemDrop="@HandleDrop"
                       AllowReorder="true">
            <ChildContent>
                <DropZone T="Task" Identifier="todo" Class="zone" />
            </ChildContent>
            <ItemRenderer>
                <div class="task-card">@context.Title</div>
            </ItemRenderer>
        </DropContainer>
    </div>

    <div style="flex: 1;">
        <h4>🔄 In Progress</h4>
        <DropContainer T="Task" 
                       Items="Tasks" 
                       Group="tasks"
                       ItemsSelector="@((item, zoneId) => item.Status == zoneId)"
                       OnItemDrop="@HandleDrop"
                       AllowReorder="true">
            <ChildContent>
                <DropZone T="Task" Identifier="in-progress" Class="zone" />
            </ChildContent>
            <ItemRenderer>
                <div class="task-card">@context.Title</div>
            </ItemRenderer>
        </DropContainer>
    </div>

    <div style="flex: 1;">
        <h4>✅ Done</h4>
        <DropContainer T="Task" 
                       Items="Tasks" 
                       Group="tasks"
                       ItemsSelector="@((item, zoneId) => item.Status == zoneId)"
                       OnItemDrop="@HandleDrop"
                       AllowReorder="true">
            <ChildContent>
                <DropZone T="Task" Identifier="done" Class="zone" />
            </ChildContent>
            <ItemRenderer>
                <div class="task-card">@context.Title</div>
            </ItemRenderer>
        </DropContainer>
    </div>
</div>

<style>
    .zone {
        background-color: #f9f9f9;
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 12px;
        min-height: 300px;
    }

    .task-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 12px;
        margin: 8px 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>

@code {
    private List<Task> Tasks = new();

    protected override void OnInitialized()
    {
        Tasks = new()
        {
            new() { Id = "1", Title = "Design UI", Status = "todo" },
            new() { Id = "2", Title = "Code Features", Status = "in-progress" },
            new() { Id = "3", Title = "Write Tests", Status = "todo" },
            new() { Id = "4", Title = "Deploy", Status = "done" },
        };
    }

    private async Task HandleDrop(OnItemDropEventArgs e)
    {
        var item = Tasks[e.OldIndex];
        item.Status = e.ToZoneId;
        await InvokeAsync(StateHasChanged);
    }

    public class Task
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
```

### Example 2: Nested Containers

Create hierarchical sortable structures.

```razor
@page "/nested"
@using SortableBlazorHybrid

<h3>Nested Drag & Drop</h3>

<DropContainer T="ProjectItem" 
               Items="Projects" 
               Group="projects"
               ItemsSelector="@((item, zoneId) => item.ParentId == zoneId)">
    <ChildContent>
        <DropContainer T="Section" 
                       Items="Sections" 
                       Group="projects"
                       ItemsSelector="@((item, zoneId) => true)">
            <ChildContent>
                <DropZone T="Section" Class="section" />
            </ChildContent>
            <ItemRenderer>
                <div class="section-header">
                    <strong>@context.Name</strong>
                    <DropZone T="ProjectItem" 
                              Identifier="@context.Id" 
                              Class="subsection" />
                </div>
            </ItemRenderer>
        </DropContainer>
    </ChildContent>
    <ItemRenderer>
        <div class="project-item">@context.Title</div>
    </ItemRenderer>
</DropContainer>

@code {
    // Implementation...
}
```

### Example 3: Disabled Items

Prevent certain items from being dragged.

```razor
<DropContainer T="Permission" 
               Items="Permissions" 
               Group="perms"
               ItemDisabled="@(item => item.IsAdmin)"
               DisabledItemClass="disabled-item">
    <ChildContent>
        <DropZone T="Permission" Class="zone" />
    </ChildContent>
    <ItemRenderer>
        <div class="permission-item">
            @if (context.IsAdmin)
            {
                <span class="badge">🔒 System</span>
            }
            @context.Name
        </div>
    </ItemRenderer>
</DropContainer>

<style>
    .disabled-item {
        opacity: 0.5;
        background-color: #f0f0f0 !important;
        cursor: not-allowed !important;
    }
</style>
```

### Example 4: Drag Handle

Make items draggable only from a specific element.

```razor
<DropContainer T="Item" 
               Items="Items"
               DragHandleClass="drag-handle">
    <ChildContent>
        <DropZone T="Item" Class="zone" />
    </ChildContent>
    <ItemRenderer>
        <div class="item">
            <span class="drag-handle">☰</span>
            <span>@context.Name</span>
        </div>
    </ItemRenderer>
</DropContainer>

<style>
    .drag-handle {
        cursor: grab;
        color: #999;
        margin-right: 8px;
    }

    .drag-handle:active {
        cursor: grabbing;
    }
</style>
```

---

## 🎨 Styling Guide

### CSS Classes for Customization

| Class | Purpose |
|-------|---------|
| `.drop-container` | Container wrapper |
| `.sortable-ghost` | Ghost element during drag |
| `.sortable-chosen` | Selected element |
| `.sortable-drag` | Element being dragged |

Example styling:

```css
.sortable-ghost {
    opacity: 0.4;
    background-color: #f0f0f0;
    border-radius: 4px;
}

.sortable-chosen {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sortable-drag {
    opacity: 0;
}
```

---

## ⚙️ Advanced Configuration

### Performance Tips

1. **Use `AllowReorder="true"`** for automatic list reordering only when needed
2. **Set appropriate `Transition`** values (150-300ms) for smooth animations
3. **Use `swapThreshold`** to control swap sensitivity
4. **Lazy-load items** for large lists

### Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE 11 | ⚠️ Limited |

---

## 🤝 Contributing

Found a bug or have a feature request? We'd love to hear from you!

- **Report Issues**: [GitHub Issues](https://github.com/yourusername/SortableBlazorHybrid/issues)
- **Pull Requests**: We welcome contributions!

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🔗 Resources

- [Sortable.js Documentation](https://sortablejs.github.io/Sortable/)
- [Blazor Documentation](https://docs.microsoft.com/blazor/)
- [MAUI Documentation](https://learn.microsoft.com/maui/)

---

## 💬 Support

Need help? Check out our:
- 📖 [Documentation](https://github.com/yourusername/SortableBlazorHybrid/wiki)
- 💬 [Discussions](https://github.com/yourusername/SortableBlazorHybrid/discussions)
- 🐛 [Issue Tracker](https://github.com/yourusername/SortableBlazorHybrid/issues)

---

**Made with ❤️ for Blazor developers**