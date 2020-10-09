# Alert Me - Google Meet

<a href="https://github.com/heytulsiprasad/alert-me-google-meet/issues">
  <img alt="Issues" src="https://img.shields.io/github/issues/heytulsiprasad/alert-me-google-meet?color=0088ff" />
</a>

<a href="https://github.com/heytulsiprasad/alert-me-google-meet/issues">
  <img alt="Contributions" src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg" />
</a>

<a href="https://www.gnu.org/licenses/gpl-3.0">
  <img alt="License" src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
</a>

</br>

A Chrome Extension that notifies people when certain words are being spoken in a Google Meet Meeting opened in Chrome browser. You can set the alert words yourself with your name or any word you want to be notified for. Use it to your own advantage.

**This doesn't recognize the voice in the meeting by itself, that's done by Google when you turn your captions on, so if it doesn't work as shown here, try checking if your voice is recognized by Google**.

</br>
<p align="center">
<img src="https://i.imgur.com/7EjDcuR.png" alt="Success Home Popup" />
<p align="center">Popup interface to add/remove alert words</p>
</p>
</br>

</br>
<p align="center">
<img src="https://i.imgur.com/l64QxGH.png" alt="Notifications in Windows" />
<p align="center">Notifications appear when those words are spoken in meeting</p>
</p>
</br>

:warning: The app is in pre-release now, so feel free test it and create some issues so we can make it bulletproof before publishing on the chrome store.

## Motivation (User Story)

This is a pet project I made to know how Chrome extensions work (which proved to be very valuable 😅). You can use it at your own risk, as if you get caught while slacking off at work meetings, I won't be held responsible.

## How to install the latest version?

First off, download latest zip asset from the [releases](https://github.com/heytulsiprasad/alert-me-google-meet/releases) section.

Once downloaded, unzip the file and open Google Chrome. You can go inside **Menu > More Tools > Extensions** or visit `chrome://extensions`. Then toggle the **Developer Mode** button.

![Developer Mode Off](https://i.imgur.com/9xYv15C.png)

Once it's on you'll find some more options, like this.

![Developer Mode On](https://i.imgur.com/r1mxI4P.png)

Click on **Load unpacked** and select the unzipped folder of extension. You'll see this on your extensions list.

![Alert Me on extensions page](https://i.imgur.com/HPHhB4q.png)

You can see this added to your Chrome search bar. Click the icon to open the popup and you've to be on a Google Meet call to use this.

## Instructions

It's pretty simple, feel free to follow below steps if you get stuck:

- Join a Google Meet call
- Add/remove alert words through the popup
- Make sure to **Turn on your captions** for extension to know when words are spoken
- You'll get a notification when someone speaks your alert words

## Why it's not working?

- You might not have your notifications turned on for browser.

  - For Windows, go to **Start > Notifications & actions**, turn on Google Chrome notifications.

- Still not working? Check the console if there are any errors, then please open an issue [here](https://github.com/heytulsiprasad/alert-me-google-meet/issues).

## Contributions

You can contribute to this project by solving existing issues or adding a new feature. Create an [Issue](https://github.com/heytulsiprasad/alert-me-google-meet/issues) to discuss.

## License

[GNU General Public License v3.0](https://github.com/heytulsiprasad/alert-me-google-meet/blob/main/LICENSE)
