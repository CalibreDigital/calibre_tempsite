/**
* @fileOverview
* @author Zoltan Toth
* @version 1.1.0
*/

/**
* @description
* Vanilla JavaScript Accordion
*
* @class
* @param {(string|Object)} options.element - HTML id of the accordion container
*         or the DOM element.
* @param {number} [options.openTab=1] - Start the accordion with this item opened.
* @param {boolean} [options.oneOpen=false] - Only one tab can be opened at a time.
*/
var Accordion = function(options) {
    var element = typeof options.element === 'string' ?
                    document.getElementById(options.element) : options.element,
        openTab = options.openTab,
        oneOpen = options.oneOpen || false,

        titleClass   = 'js-Accordion-title',
        contentClass = 'js-Accordion-content';

    render();

    /**
     * Initial rendering of the accordion.
     */
    function render() {
        // attach classes to buttons and containers
        [].forEach.call(element.querySelectorAll('#expandtrigger'),
            function(item) {
                item.classList.add(titleClass);
                item.nextElementSibling.classList.add(contentClass);
            });

        // attach only one click listener
        element.addEventListener('click', onClick);

        // accordion starts with all tabs closed
        closeAll();

        // sets the open tab - if defined
        if (openTab) {
            open(openTab);
        }
    }

    /**
     * Handles clicks on the accordion.
     *
     * @param {object} e - Element the click occured on.
     */
    function onClick(e) {
        if (e.target.className.indexOf(titleClass) === -1) {
            return;
        }

        if (oneOpen) {
            closeAll();
        }

        toggle(e.target);
    }

    /**
     * Closes all accordion tabs.
     */
    function closeAll() {
        [].forEach.call(element.querySelectorAll('.' + contentClass), function(item) {
            item.style.height = 0;
        });
    }

    /**
     * Toggles corresponding tab for each title clicked.
     *
     * @param {object} el - The content tab to show or hide.
     */
    function toggle(el) {

        // get the content, in order to expand it
        content = el.nextElementSibling
        // getting the height every time in case the content was updated dynamically
        var height = content.scrollHeight;

        if (content.style.height === '0px' || content.style.height === '') {
            content.style.height = height + 'px';
            el.dataset.titlecache = el.innerHTML;
            el.style.opacity = "0";
            setTimeout(function(){ 
                el.innerHTML = "Collapse this section and continue reading"; 
                el.style.opacity = "1";
            }, 600);
            
        } else {
            content.style.height = 0;
            el.style.opacity = "0";
            setTimeout(function(){ 
                el.innerHTML = el.dataset.titlecache;
                el.style.opacity = "1";
            }, 600);
        }
    }


    /**
     * Returns the corresponding accordion content element by index.
     *
     * @param {number} n - Index of tab to return
     */
    function getTarget(n) {
        return element.querySelectorAll('.' + contentClass)[n - 1];
    }

    /**
     * Opens a tab by index.
     *
     * @param {number} n - Index of tab to open.
     *
     * @public
     */
    function open(n) {
        var target = getTarget(n);

        if (target) {
            if (oneOpen) closeAll();
            target.style.height = target.scrollHeight + 'px';
        }
    }

    /**
     * Closes a tab by index.
     *
     * @param {number} n - Index of tab to close.
     *
     * @public
     */
    function close(n) {
        var target = getTarget(n);

        if (target) {
            target.style.height = 0;
        }
    }

    /**
     * Destroys the accordion.
     *
     * @public
     */
    function destroy() {
        element.removeEventListener('click', onClick);
    }

    return {
        open: open,
        close: close,
        destroy: destroy
    };
};
