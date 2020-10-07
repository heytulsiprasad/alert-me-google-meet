# Alert Me - Google Meet

A Chrome Extension that notifies people when certain words are being spoken in a Google Meet Meeting opened in Chrome browser. You can set the alert words yourself with your name or any word you want to be notified for. Use it to your own advantage.

:warning: The app is in `v0.1.0-alpha` now, so you can test it and create some issues so we can make it bulletproof before publishing on the chrome store.

</br>
<center><img src="https://i.imgur.com/Gp70l45.png" alt="Not on call"/></center>

</br>
<center><img src="https://i.imgur.com/tj0HEU6.png" alt="Captions turned off warning"/></center>

</br>
<center><img src="https://i.imgur.com/7EjDcuR.png" alt="Success message"/></center>

</br>
<center><img src="https://i.imgur.com/dPmvChO.png" alt="Just notified status"/></center>

# Motivation

This is just a pet project I made to know how Chrome extensions work (which proved to be very valuable). So use it at your own risk, as if you get caught while slacking off at work meetings, I won't be held responsible.

# When is this going to be live?

Sure, I'll probably test it a bit more on large meet rooms. I'm planning to roll out a intro video on how to use it, let's see how that goes.

I'll also have to submit it for verification to chrome web store so let's say give or take 3-4 days.

# Can I test it?

Absolutely. I'd love you to do it. I'll share steps how you can install this now. Make sure to create issues if you come across any bugs, its always better to discuss tech in public.

# How to install the alpha version?

First off, download `alert-me-v0.1.0.zip` asset from the [releases](https://github.com/heytulsiprasad/alert-me-google-meet/releases/tag/v0.1.0-alpha) section.

Once downloaded, unzip the file and open Google Chrome. You can go inside **Menu > More Tools > Extensions** or visit `chrome://extensions`. Then toggle the **Developer Mode** button.

![Developer Mode Off](https://i.imgur.com/9xYv15C.png)

Once it's on you'll find some more options, like this.

![Developer Mode On](https://i.imgur.com/r1mxI4P.png)

Click on **Load unpacked** and select the unzipped folder of extension. You'll see this on your extensions list.

![Alert Me on extensions page](https://i.imgur.com/HPHhB4q.png)

You can see this added to your Chrome search bar. Click the icon to open the popup and you've to be on a Google Meet call to use this.

# Instructions

It's pretty simple, feel free to follow below steps if you get stuck:

- Once installed, it'll show the status as **Not on call**
- You have to be present on a Google Meet call to use this
- On call, you can add/remove alert words through the popup
- Make sure to **Turn on your captions** for extension to know when words are spoken
- Now the status will turn **green** and you'll get a notification when someone speaks your given alert words
