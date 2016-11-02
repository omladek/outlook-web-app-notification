const appConfig = {
    debug: false,
    notificationIcon: 'http://www.clker.com/cliparts/E/C/p/S/0/F/exclamation-mark-red-md.png',
    ignoredFolders: [
        'CMS hillspet',
        'Odstraněná pošta',
        'newslettery'
    ]
};

let LAST_NOTIFICATION_TEXT = '';
let UNREAD_EMAILS_TOTAL = getUnreadEmailsTotal();
let LAST_NOTIFICATION_ID = getNotificationId();

if (appConfig.debug) {
    console.log('LAST_NOTIFICATION_TEXT: ' + LAST_NOTIFICATION_TEXT);
    console.log('UNREAD_EMAILS_TOTAL: ' + UNREAD_EMAILS_TOTAL);
    console.log('LAST_NOTIFICATION_ID: ' + LAST_NOTIFICATION_ID);    
}

function notifyMe() {
    if (appConfig.debug) {
        console.log('notify');
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    } else {
        const notification = new Notification('New mail:', {
            icon: appConfig.notificationIcon,
            body: LAST_NOTIFICATION_TEXT,
        });

        notification.onclick = function() {
            window.focus();
        };
    }
}

function getUnreadEmailsTotal() {
    let total = 0;
    
    window.document.querySelectorAll('span[id*="count"]').forEach((item) => {
        // ignore these folders
        if (isIgnoredFolder(item)) {
            return;
        }

        total += parseInt(item.textContent.split(' ')[1]);
    });

    return total;
}

/**
 * @param  {HTML el} el
 * @return {bool}
 */
function isIgnoredFolder(el) {
    let isIgnored = false;

    appConfig.ignoredFolders.forEach((item) => {
        if (el.parentNode.querySelector(`[title="${ item }"]`)) {
            isIgnored = true;
        }
    });

    return isIgnored;
}

function getLatestEmailText() {
    const el = window.document.querySelector('.o365cs-notifications-notificationPopupArea .o365cs-notifications-newMailLink .o365cs-notifications-text + div');
    let text = '';
    
    if (el) {
        text = el.textContent;
    }
    
    return text;
}

/**
 * @param  {integer} currentUnread
 */
function getNotificationId(currentUnread) {
    let count = UNREAD_EMAILS_TOTAL + LAST_NOTIFICATION_TEXT;

    if (currentUnread) {
        count = currentUnread + LAST_NOTIFICATION_TEXT;
    }

    return count;
}

// select the target node
const observerTarget = window.document.querySelector('.treeHeaderContainer + div[role=tree]');

// create an observer instance
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        handleMutationChange();
    });
});

function handleMutationChange() {
    const currentMailSubject = getLatestEmailText();
    const currentUnreadEmailsTotal = getUnreadEmailsTotal();
    const newNotificationId = getNotificationId(currentUnreadEmailsTotal);
    const newState = {
        currentMailSubject: currentMailSubject,
        currentUnreadEmailsTotal: currentUnreadEmailsTotal,
        notificationId: getNotificationId()
    };

    if (appConfig.debug) {
        console.log('observe');
        console.log('UNREAD_EMAILS_TOTAL:' + UNREAD_EMAILS_TOTAL);
        console.log('currentUnreadEmailsTotal:' + currentUnreadEmailsTotal);
        console.log('newNotificationId:' + newNotificationId);
        console.log('LAST_NOTIFICATION_ID:' + LAST_NOTIFICATION_ID);        
    }

    // in case I am reading the unread email
    if (currentUnreadEmailsTotal < UNREAD_EMAILS_TOTAL) {
        setState(newState);
        return;
    }

    // in case a new mail arrived - show just one notification
    if (newNotificationId !== LAST_NOTIFICATION_ID) {
        if (currentUnreadEmailsTotal > UNREAD_EMAILS_TOTAL && UNREAD_EMAILS_TOTAL !== currentUnreadEmailsTotal) {
            setState(newState);
            notifyMe();
        }
    }
}

/**
 * @param {object} state
 */
function setState(state) {
    LAST_NOTIFICATION_TEXT = state.currentMailSubject;
    UNREAD_EMAILS_TOTAL = state.currentUnreadEmailsTotal;
    LAST_NOTIFICATION_ID = state.notificationId;
}

// configuration of the observer:
const observerConfig = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
};

// pass in the target node, as well as the observer options
observer.observe(observerTarget, observerConfig);
