# Crash Recorder 📹
An Odoo 14 app that records crashes.

## Introduction
Have users ever reported errors without any details? A copy-paste of a traceback is usually not enough to analyze and debug a problem. It takes time to explain to the user they need to provide more info. It also takes effort for the user to detail the steps they took that produced the error, and often times they don't remember exactly what they did.

This module solves this problem. It continually records to a circular buffer and saves a 1 minute screen recording when an error happens. Administrators can then view the recording and the traceback.

A staging environment meant for user testing would be an ideal place to install this module.

Before installing make sure to check your local laws and regulations regarding recording user activity.

## How to use

Crash recordings can be found in the Settings app under "Crash Recordings":

<img alt="Crash Recordings in Settings app" src="/media/settings.png" width="500">

A notice is displayed that informs user their actions could be recorded:

<img alt="Recording notice" src="/media/notice.png" width="150">

Recordings are automatically deleted after 30 days to avoid unnecessary bloat in your Odoo instance.

Here's a short screencast of the app in action:

https://user-images.githubusercontent.com/10252581/132998188-390e0461-5a47-45db-bcd4-1bfb695a1497.mov

## Acknowledgements
This relies on the excellent [rrweb library](https://www.rrweb.io) to do the hard part (the recording and playback).
