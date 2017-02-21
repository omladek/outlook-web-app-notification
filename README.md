# Outlook Web App Notifications for Google Chrome
Show notification when new email arrives.

# Compatibility
* Microsoft Exchange Server 2013 web interface
* Google Chrome 54.0.2840.71 m +

# Setup
1. [Download](https://github.com/omladek/outlook-web-app-notification/archive/master.zip) and extract this repository
2. Got to the extension folder and in the root directory in file `manifest.json` replace `xxx.example.tld` with your mail server info.
2. In Chrome (desktop) go to: Settings > Extensions
3. Check the option `Developer mode`
4. Click on `Load unpacked extension`
5. Go to the location where is the extension from the point 1
6. Go to the URL of your webmail and log in
7. Whenever new mail arrives a notification will appear in the bottom right corner of your screen. When you click on it, the window will be focused.

# List of ignored folders
If you do not want to show the notification for each new email, you can exclude  the folder(s) in the extension settings.

1. In the browser toolbar click on the extension's icon and select `Settings`
2. Or go directly to `chrome://extensions/` - find the extension and click on `Settings`
3. In the settings popup you can add/remove folders which should be ignored.
4. The browser tab in which the Outlook Web App is running must be reloaded after you change the extensions settings.

# License
Do whatever you want.

# Extension icon
Icon by: [https://www.iconfinder.com/icons/520567/alarm_alert_bell_notification_ring_icon#size=48](https://www.iconfinder.com/icons/520567/alarm_alert_bell_notification_ring_icon#size=48)
