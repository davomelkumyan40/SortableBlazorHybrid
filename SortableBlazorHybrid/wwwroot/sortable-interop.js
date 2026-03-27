const instances = {};


async function loadSortable() {
    if (window.Sortable) return; // loaded

    await new Promise((res, rej) => {
        const script = document.createElement('script');
        script.src = './_content/SortableBlazorHybrid/sortablejs1.15.7/Sortable.min.js';
        script.onload = res;
        script.onerror = rej;
        document.head.appendChild(script);
    });
}

export async function initSortable(zoneId, options, dotNetRef) {
    const el = document.getElementById(zoneId);
    if (!el) {
        console.warn(`[Sortable] Element not found for zone: ${zoneId}`);
        return;
    }

    if (instances[zoneId]) {
        console.log(`[Sortable] Destroying existing instance for zone: ${zoneId}`);
        destroy(zoneId);
    }

    console.log(`[Sortable] Initializing zone: ${zoneId}, group: ${options.Group}, handle: ${options.Handle}, filter: ${options.Filter}`);

    const {
        group,
        animation,
        ghostClass,
        chosenClass,
        dragClass,
        handle,
        forceFallback,
        fallbackTolerance,
        delay,
        delayOnTouchOnly,
        filter
    } = options;

    instances[zoneId] = new Sortable(el, {
        group,
        filter,
        animation,
        ghostClass,
        chosenClass,
        dragClass,
        handle,
        //These 4 options fix MAUI WebView
        forceFallback,       // Use pointer events, NOT html5 drag API
        fallbackTolerance,      // Pixels finger must move before drag starts
        delay,                // ms hold before drag activates (prevents misfire)
        delayOnTouchOnly,    // Apply delay only on touch, not mouse

        onStart: function (/**Event*/evt) {
            console.log(`[Sortable] onStart - zone: ${zoneId}, oldIndex: ${evt.oldIndex}`);
            if (!dotNetRef) return;

            dotNetRef.invokeMethodAsync('OnDrag', {
                oldIndex: evt.oldIndex,
                isDisabled: false
            });
        },

        // Attempt to drag a filtered element
        onFilter: function (/**Event*/evt) {
            console.log(`[Sortable] onFilter - zone: ${zoneId}, oldIndex: ${evt.oldIndex}`);
            if (!dotNetRef) return;

            dotNetRef.invokeMethodAsync('OnDrag', {
                oldIndex: evt.oldIndex,
                isDisabled: true
            });
        },

        // Event when you move an item in the list or between lists
        onMove: function (/**Event*/evt, /**Event*/originalEvent) {
            if (!dotNetRef) return;

            dotNetRef.invokeMethodAsync('OnMove', {
                draggedRect: {
                    left: evt.draggedRect.left,
                    top: evt.draggedRect.top,
                    right: evt.draggedRect.right,
                    bottom: evt.draggedRect.bottom
                },
                relatedRect: {
                    left: evt.relatedRect.left,
                    top: evt.relatedRect.top,
                    right: evt.relatedRect.right,
                    bottom: evt.relatedRect.bottom
                },
                willInsertAfter: evt.willInsertAfter,
                clientY: originalEvent.clientY
            });
        },

        onEnd: function (evt) {
            console.log(`[Sortable] onEnd - zone: ${zoneId}, from: ${evt.from.id}, to: ${evt.to.id}, oldIndex: ${evt.oldIndex}, newIndex: ${evt.newIndex}`);
            if (!dotNetRef) return;

            dotNetRef.invokeMethodAsync('OnDrop', {
                fromZoneId: evt.from.id,
                toZoneId: evt.to.id,
                oldIndex: evt.oldIndex,
                newIndex: evt.newIndex
            });
        }
    });
    console.log(`[Sortable] Successfully initialized zone: ${zoneId}`);
};

export function destroy(zoneId) {
    instances[zoneId]?.destroy();
    delete instances[zoneId];
};
