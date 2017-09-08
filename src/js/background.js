/**
 * Show notification when new email arrives.
 *
 * Usage: const app = App();
 */
const App = () => {
    /**
     * Configuration.
     */
    const icon64 = 'data:image/png;base64,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';

    let appConfig = {
        debug: true,
        notificationIcon: icon64
    };

    /**
     * Global state of the app.
     */
    let appState = {
        LAST_NOTIFICATION_TEXT: '',
        UNREAD_EMAILS_TOTAL: 0,
        LAST_NOTIFICATION_ID: 0
    }

    /**
     * Check if the OWA is loaded.
     */
    isOutlookWebAppLoaded();

    /**
     * Check if the Outlook Web app has loaded (the folder tree exists), if not check again later.
     */
    function isOutlookWebAppLoaded() {
        if (getFoldersTree()) {
            debug('isOutlookWebAppLoaded: yes');

            isConfigReady();
        } else {
            debug('isOutlookWebAppLoaded: no');

            setTimeout(() => {
                debug('isOutlookWebAppLoaded: run again');

                isOutlookWebAppLoaded();
            }, 1500);
        }
    }

    /**
     * Get the ignored folders from the Chrome storage
     */
    function isConfigReady() {
        getIgnoredFolders();

        if (appConfig.ignoredFolders === undefined) {
            debug('isConfigReady: no');

            setTimeout(() => {
                debug('isConfigReady: run again');

                isConfigReady();
            }, 1500);
        } else {
            debug('isConfigReady: yes');

            setupApp();
        }
    }

    /**
     * Get this info from the extension's options.
     */
    function getIgnoredFolders() {
        chrome.storage.sync.get({
            folders: ''
        }, function(items) {
            setIgnoredFolders(items.folders);
        });
    }

    /**
     * @param {string} string
     *
     * @return {array}
     */
    function setIgnoredFolders(string) {
        let arr = [];
        const folders = string.split(',');

        debug(`ignored folders: ${folders}`);

        folders.forEach((folder) => {
            debug(`ignored folder: ${folder}`);

            arr.push(folder);
        });

        appConfig.ignoredFolders = arr;
    }

    /**
     * Attach observer to the folders tree and watch for the mutations.
     */
    function setupApp() {
        appState.LAST_NOTIFICATION_TEXT = '';
        appState.UNREAD_EMAILS_TOTAL = getUnreadEmailsTotal();
        appState.LAST_NOTIFICATION_ID = getNotificationId();

        debug(`appState.LAST_NOTIFICATION_TEXT: ${appState.LAST_NOTIFICATION_TEXT}`);
        debug(`appState.UNREAD_EMAILS_TOTAL: ${appState.UNREAD_EMAILS_TOTAL}`);
        debug(`appState.LAST_NOTIFICATION_ID: ${appState.LAST_NOTIFICATION_ID}`);

        // configuration of the observer:
        const observerConfig = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        };

        // target
        const observerTarget = getFoldersTree();

        // init
        initObserver(observerTarget, observerConfig);
    }

    /**
     * @param  {html el} observerTarget
     * @param  {object} observerConfig
     */
    function initObserver(observerTarget, observerConfig) {
        // create an observer instance
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // catch only the mutation of the label containing the number of unread emails
                const id = parseInt(mutation.target.textContent);

                !isNaN(id) && handleMutationChange();
            });
        });

        // pass in the target node, as well as the observer options
        observer.observe(observerTarget, observerConfig);
    }

    /**
     * Show notification.
     *
     */
    function notifyMe() {
        debug('notifyMe');

        if (Notification.permission !== 'granted') {
            debug('notifyMe: request permission');

            Notification.requestPermission();
        } else {
            debug('notifyMe: permission granted');

            const notification = new Notification('New mail:', {
                icon: appConfig.notificationIcon,
                body: appState.LAST_NOTIFICATION_TEXT,
            });

            notification.onclick = function() { window.focus(); };
        }
    }

    /**
     * Iterate through all folders and get the total of unread emails.
     *
     * @return {integer}
     */
    function getUnreadEmailsTotal() {
        let total = 0;

        getFoldersTree().querySelectorAll('span[id*="count"]').forEach((item) => {
            // ignore these folders
            if (isIgnoredFolder(item)) {
                return;
            }

            total += parseInt(item.textContent.split(' ')[1]);
        });

        // it happens on the page load, that the elements are empty
        if (isNaN(total)) {
            total = 0;
        }

        return total;
    }

    /**
     * Returns true if the current html element is child of the ignored folder.
     *
     * @param  {HTML el} el
     * @return {bool}
     */
    function isIgnoredFolder(el) {
        let isIgnored = false;

        appConfig.ignoredFolders.forEach((item) => {
            if (el.parentNode.querySelector(`[title="${item}"]`)) {
                isIgnored = true;
            }
        });

        return isIgnored;
    }

    /**
     * Create text which should be displayed in the notification.
     *
     * @return {string}
     */
    function getLatestEmailText() {
        const el = document.querySelector('.o365cs-notifications-notificationPopupArea .o365cs-notifications-newMailLink .o365cs-notifications-text + div');
        let text = '';

        if (el) {
            text = el.textContent;
        }

        return text;
    }

    /**
     * Generate notification ID.
     *
     * @param  {integer} currentUnread
     * @return {string}
     */
    function getNotificationId(currentUnread) {
        let id = appState.UNREAD_EMAILS_TOTAL + appState.LAST_NOTIFICATION_TEXT;

        if (currentUnread) {
            id = currentUnread + appState.LAST_NOTIFICATION_TEXT;
        }

        return id;
    }

    /**
     * Returns the folders panel.
     *
     * @return {html el}
     */
    function getFoldersTree() {
        const tree = document.querySelector('[role=tree] .subfolders');

        debug(`getFoldersTree: ${tree}`);

        return tree;
    }

    /**
     * Handle mutation change, if there are new unread emails, then show the nofitication.
     */
    function handleMutationChange() {
        const currentMailSubject = getLatestEmailText();
        const currentUnreadEmailsTotal = getUnreadEmailsTotal();
        const newNotificationId = getNotificationId(currentUnreadEmailsTotal);
        const newState = {
            currentMailSubject: currentMailSubject,
            currentUnreadEmailsTotal: currentUnreadEmailsTotal,
            notificationId: getNotificationId()
        };

        debug('mutation change');
        debug(`appState.UNREAD_EMAILS_TOTAL: ${appState.UNREAD_EMAILS_TOTAL}`);
        debug(`currentUnreadEmailsTotal: ${currentUnreadEmailsTotal}`);
        debug(`newNotificationId: ${newNotificationId}`);
        debug(`appState.LAST_NOTIFICATION_ID: ${appState.LAST_NOTIFICATION_ID}`);

        // in case I am reading the unread email
        if (currentUnreadEmailsTotal < appState.UNREAD_EMAILS_TOTAL) {
            setState(newState);
            return;
        }

        // in case a new mail arrived - show just one notification
        if (newNotificationId !== appState.LAST_NOTIFICATION_ID) {
            if (currentUnreadEmailsTotal > appState.UNREAD_EMAILS_TOTAL && appState.UNREAD_EMAILS_TOTAL !== currentUnreadEmailsTotal) {
                setState(newState);
                notifyMe();
            }
        }
    }

    /**
     * @param {object} state
     */
    function setState(state) {
        appState.LAST_NOTIFICATION_TEXT = state.currentMailSubject;
        appState.UNREAD_EMAILS_TOTAL = state.currentUnreadEmailsTotal;
        appState.LAST_NOTIFICATION_ID = state.notificationId;
    }

    /**
     * @param  {string} message
     */
    function debug(message) {
        appConfig.debug && console.log(message);
    }

    return null;
}

// init
const app = App();
