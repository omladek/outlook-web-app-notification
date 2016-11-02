let lastNotificationText = '';
let unreadEmailsTotal = getUnreadEmailsTotal();
let lastNotificationId = getNotificationId();

console.log('lastNotificationText: ' + lastNotificationText);
console.log('unreadEmailsTotal: ' + unreadEmailsTotal);
console.log('lastNotificationId: ' + lastNotificationId);

function notifyMe() {
    console.log('notify');
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    } else {
        const notification = new Notification('New mail:', {
            icon: 'http://www.clker.com/cliparts/E/C/p/S/0/F/exclamation-mark-red-md.png',
            body: lastNotificationText,
        });

        notification.onclick = function() {
            document.querySelector('.o365cs-notifications-notificationPopupArea .o365cs-notifications-newMailLink').click();
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
    const ignoredFolders = [
        'CMS hillspet',
        'Odstraněná pošta',
        'newslettery'
    ];

    ignoredFolders.forEach((item) => {
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
    let count = unreadEmailsTotal + lastNotificationText;

    if (currentUnread) {
        count = currentUnread + lastNotificationText;
    }

    return count;
}

// select the target node
const observerTarget = window.document.querySelector('[aria-label="Podokno složek"]');

// create an observer instance
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        handleMutationChange();
    });
});

function handleMutationChange() {
    let currentMailSubject = getLatestEmailText();
    let currentUnreadEmailsTotal = getUnreadEmailsTotal();
    let canContinue = false;
    let newNotificationId = getNotificationId(currentUnreadEmailsTotal);

    console.log('observe');
    console.log('unreadEmailsTotal:' + unreadEmailsTotal);
    console.log('currentUnreadEmailsTotal:' + currentUnreadEmailsTotal);
    console.log('newNotificationId:' + newNotificationId);
    console.log('lastNotificationId:' + lastNotificationId);

    // in case I am reading the unread email
    if (currentUnreadEmailsTotal < unreadEmailsTotal) {
        lastNotificationText = currentMailSubject;
        unreadEmailsTotal = currentUnreadEmailsTotal;
        lastNotificationId = getNotificationId();
        return;
    }

    // in case a new mail arrived - show just one notification
    if (newNotificationId !== lastNotificationId) {
        if (currentUnreadEmailsTotal > unreadEmailsTotal && unreadEmailsTotal !== currentUnreadEmailsTotal) {
            lastNotificationText = currentMailSubject;
            unreadEmailsTotal = currentUnreadEmailsTotal;
            lastNotificationId = getNotificationId();
            notifyMe();
        }
    }
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
