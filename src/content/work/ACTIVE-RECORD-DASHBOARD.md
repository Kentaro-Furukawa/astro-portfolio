---
title: ACTIVE RECORD DASHBOARD
publishDate: 2022-05-01 00:00:00
img: /assets/active-record-dashboard.gif
img_alt: demo of the active record dashboard
description: |
  This is an activity status sharing desktop application for support desks.
  It is written in VanillaJS without using any frontend framework.
tags:
  - JavaScript
  - Electron
  - tailwindcss
---

[Github - Active Record Dashboard](https://github.com/Kentaro-Furukawa/Active-Record-Dashboard)

This is an activity status sharing desktop application for support desks. It is written in VanillaJS without using any frontend framework.

### I learned a lot

So much fun to build this app. It was a great learning experience. I learned a lot about the DOM and how to manipulate it. I also learned how to use the `localStorage` to store data. I also learned how to use the `setInterval` function to update the UI every second

It is coming out of the box! You barely need any configuration to start using it.

![overview](https://user-images.githubusercontent.com/11044479/167739530-d66e0283-eef7-4e8c-a8d8-d75051e0d8ad.gif)

---
## Installation

~~You can download from [Releases](https://github.com/Kentaro-Furukawa/Active-Record-Dashboard/releases).~~

---
## Distribution

### Prerequisites

* `nodejs`
* `git`
* `yarn` \*Recommended, but `npm` or `pnpm` should work as well.

Run the following commands in your terminal.

```bash
git clone https://github.com/Kentaro-Furukawa/Active-Record-Dashboard.git

cd Active-Record-Dashboard

yarn add // OR npm install

npx tailwindcss -i ./src/input.css -o ./output.css

yarn app:dist // OR npm run app:dist
```
Now `dist` folder is created in the root directory.

Find an application somewhere in the `dist` folder.

---
## User Guide

Active Record Dashboard is intended to build as an intuitive application, hopefully you can use without much thinking. But there are some features should be mentioned, and they may help your work.


### Basic flow

#### Select user
Select your name in the top bar.

\*In case your name is not in the option, you need to add you name from admin page. go to [Add users](#add-users)

#### Click your state
In the left sidebar, there are few buttons.

The icon at the top indicates your current state.

#### Input value
You can input what you are working on, so you can type incident number, or just type "meeting", "lunch" or anything. Once input a value in the input filed click purple button to submit. If already other user taken the incident, the top bar's color change to yellow and highlight the duplicated record in the table. If nobody taken, top bar's background change to green and update the record table.

#### Tag Record
Click Orange tag button shows modal window, and you can create a tag record. This is used for anything you want to notice others, such as "I will take care this later." or asking someone's advice.

#### When you pick a call
Click the `On call` button to update your state, if you have incident working on, the incident will be tagged with your name, so you can keep it, but in case that you want to release the incident, click the ╳ button in the tag record.

#### Recipient
If you are in charge of recipient, click recipient button, then recipient label will be shown below the top bar.

### Notable Features

#### ✨ Flash Sending ✨

![flash-sending](https://user-images.githubusercontent.com/11044479/167598964-531208e3-899a-4add-917c-debcdd1feed7.gif)

This is one click sending feature. If you have valid incident number in your clipboard, by clicking the flash button to send the incident number and updates if it is not taken.


#### ⚡️ Spark Sending ⚡️
  
  `Cmd/Ctrl + Shift + E`

This feature is even much faster than flash sending. If you have valid incident number in you clipboard, by pressing the shortcut will send your clipped incident number and updates the record table. This shortcut key is enabled globally, so you can use this shortcut while focusing on Google Chrome or any other application.




---
## Admin Guide

### Add users
When you run the application for the first time, the first thing you may want to do is adding users.

![adding-user](https://user-images.githubusercontent.com/11044479/167740741-67bde8f2-a272-4c28-8b7f-913a5b43570e.gif)

\*Initially, `Admin` is only registered username.

1. Select a user in the top bar section.
2. Click `⋯` in the bottom left corner to show admin login modal.
3. Enter password : `admin` and submit.
4. Then, admin page will be popped up.
5. Click purple edit button to enable to edit the user list.
6. Add username in the text area. \*Usernames need to be separated by new line(Enter).
7. Then click yellow save button.
8. Now user list is updated, go back to the main page and reload, now you see new users as you added in the selection.

### Export records in a JSON file
For some purposes, you may want to export records and analyze activity, tendency or something. You can easily export records by the following steps.

![exporting-json](https://user-images.githubusercontent.com/11044479/167739926-07707991-b28c-400d-a24c-2bde3bb2361a.gif)

1. Open admin page
2. Set a date range you want to export
3. Click the orange button

 If the data range is valid and target record exists, a JSON file will be generated and saved in the root directory of the application.
 
 The file name will look like... `record-[from date]-to-[end date].json`.

\*Example: `record-2022-01-01-to-2022-05-31.json`.

---

## Behind the scene

You may not need to know what is going in the backend of this application, but here are some explanations of the flow behind.

### Where and how the records and other data stored?
When you start the application, it will check if necessary directories and files exist, if not, creates accordingly.
The file structure is like this.


```
* Root is representing the application.

Root ── Contents ─┬── app-data ─┬── active ── activeRecord.json
                  ┊      ┊      │
                  ┊      ┊      ├── archive ─┬── archive-2022-01.json
                                │            ├── archive-2022-02.json
                                │            ├── archive-2022-03.json
                                │            ┊          ┊
                                │
                                ├── log ─┬── activeLog.json
                                │        ├── adminLog.json
                                │        └── errorLog.json
                                │
                                └── user ── user.json
                              
```

`activeRecord.json` is what shown in the record table, when user update record this file will be updated, and also the record will be pushed to an archive file, if it is in March 2022 → push to `archive-2022-03.json`.

`archive-year-month.json` will be created when new month starts.

`log` contains 3 files, but at the moment only uses `adminLog.json`, when someone logs in to admin page, the log data is push to `adminLog.json`.

`user.json` keeps user list, when you update user list from admin page, the data will be updated. If the user list is empty, `Admin` is automatically added. However, you don't need to keep it, since `Admin` does not have any special privilege.


---

## Dev notes

[yarn](https://yarnpkg.com/) is recommended for this project, since using electron-builder which strongly recommended to use yarn instead of [npm](https://www.npmjs.com/).

I didn't use any frontend framework, because in the first place, I was going to build a really simple desktop application. However, as it progresses I wanted to add features occasionally, such as current state, record archive, admin page and so on. Surly using a framework for the further versions.

 Also needed to be mentioned that [TAURI](https://tauri.studio/) was first choice over ELECTRON, but eventually decided to go with ELECTRON, because TAURI is quite new and ELECTRON is much simpler to use, and fairly easy to find resources. However, I still consider to use TAURI sometime.



### Tech Stack

* **ELECTRON**
    * [ELECTRON](https://www.electronjs.org/)
    * GitHub: [electron/electron](https://github.com/electron/electron)
  
* **electron-builder**
    * [electron-builder](https://www.electron.build/)
    * GitHub: [electron-userland/electron-builder](https://github.com/electron-userland/electron-builder)
  
* **tailwindcss**
    * [tailwindcss](https://tailwindcss.com/)
    * GitHub: [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)

* **Feather**
    * [Feather](https://feathericons.com/)
    * GitHub: [feathericons/feather](https://github.com/feathericons/feather)



---


