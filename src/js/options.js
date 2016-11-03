/**
 * Globals
 */
let IGNORED_FOLDERS = [];
const STATUS_HIDDEN_CLASS = 'hidden';
const STATUS_TIMEOUT = 3000;
let STATUS;

/**
 * Listeners.
 */
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('click', handleClick);

/**
 * Init the variable and load options from the Chrome storage.
 */
function init() {
    STATUS = document.getElementById('status');

    restoreOptions();
}

/**
 * Restores the values using the preferences stored in chrome.storage.
 */
function restoreOptions() {
    let foldersHtml = '';
    IGNORED_FOLDERS = [];

    // Use default value
    chrome.storage.sync.get({
        folders: 'example'
    }, function(items) {
        const arr = items.folders.split(',');

        arr.forEach((item) => {
            if (item !== '') {
                IGNORED_FOLDERS.push(item);
                foldersHtml += getOptionHtml(true, item);
            }
        });

        if (foldersHtml === '') {
            foldersHtml = 'None.';
        }

        document.getElementById('ignored-folders').innerHTML = foldersHtml;
        document.getElementById('add-new').innerHTML = getOptionHtml(false, '');
    });
}

/**
 * [getOptionHtml description]
 * @param  {[type]} add [description]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function getOptionHtml(add, val) {
    const remove = add ? false : true;
    const html = `<div class="form-group">
                    <input type="text" value="${ val }" ${ remove ? 'placeholder="Folder name..."' : 'readonly' }>
                    <button class="btn-${ remove ? 'add' : 'remove' }">
                        ${ remove ? 'Add' : 'Remove' }
                    </button>
                </div>`;
    return html;
}

/**
 * Saves options to chrome.storage.sync.
 *
 * @param  {string} folder
 */
function saveOption(folder) {
    IGNORED_FOLDERS.push(folder);

    updateChromeStorage(`Folder <strong>"${ folder }"</strong> was added to the list.`);
}

/**
 * Remove folder from the chrome.storage.sync.
 *
 * @param  {string} folder
 */
function removeOption(folder) {
    IGNORED_FOLDERS.splice(IGNORED_FOLDERS.indexOf(folder), 1);

    updateChromeStorage(`Folder <strong>"${ folder }"</strong> was removed from the list.`);
}

/**
 * [updateChromeStorage description]
 * @param  {string} status
 */
function updateChromeStorage(status) {
    chrome.storage.sync.set({
        folders: IGNORED_FOLDERS.join(',')
    }, function() {
        showStatus(status);
        restoreOptions();
    });
}

/**
 * Show notification.
 *
 * @param  {string} text
 */
function showStatus(text) {
    STATUS.innerHTML = text;
    STATUS.classList.remove(STATUS_HIDDEN_CLASS);

    setTimeout(() => {
        hideStatus();
    }, STATUS_TIMEOUT);
}

/**
 * Hide status notification.
 */
function hideStatus() {
    STATUS.classList.add(STATUS_HIDDEN_CLASS);
}

/**
 * @param  {HTML el} el
 */
function addFolder(el) {
    const input = el.parentNode.querySelector('input');

    if (input.value === '') {
        return;
    }

    saveOption(input.value);
    input.value = '';
}

/**
 * @param  {HTML el} el
 */
function removeFolder(el) {
    el.parentNode.classList.add('removed');
    setTimeout(() => {
        removeOption(el.parentNode.querySelector('input').value);
        el.parentNode.remove();
    }, 500);
}

/**
 * @param  {object} e
 */
function handleClick(e) {
    const target = e.target;

    if (target.classList.contains('btn-add')) {
        e.preventDefault();
        addFolder(target);
    }

    if (target.classList.contains('btn-remove')) {
        e.preventDefault();
        removeFolder(target);
    }
}
