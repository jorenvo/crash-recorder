# Crash Recorder 📹
An Odoo 14 app that records crashes.

## Introduction
Have users ever reported errors to you without any details? A copy-paste of a traceback is usually not enough to analyze and debug a problem. It takes back and forth with the user to explain they need to provide more info, and it takes effort for the user to detail the steps they took that produced the error.

This module is designed to solve this problem. It continually records to a circular buffer and saves when an error happens. Administrators can then view the recording. 

A staging environment meant for user testing would be an ideal place to install this module.

Before installing make sure to check your local laws and regulations regarding recording user activity.

## How to use

Crash recordings can be found in the Settings app under "Crash Recordings":

![Crash Recordings in Settings app](/media/settings.png)

A notice is displayed that informs user their behavior could be recorded:

![Recording notice](/media/notice.png)

Here's a short screencast of the app in action:

https://user-images.githubusercontent.com/10252581/132998188-390e0461-5a47-45db-bcd4-1bfb695a1497.mov

## Acknowledgements
This relies on the excellent [rrweb library](https://www.rrweb.io) to do the hard part (the recording and playback).
