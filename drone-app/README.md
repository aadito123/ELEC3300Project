# PointFit Mobile App

The PointFit app is made with **Angular** for front end elements and **Ionic** to make the app compatible cross-platform.

## Installation

Clone the repository to a directory of your choice using **Git**

```bash
git clone https://github.com/PointFittech/PointFitApp.git
```

Use the [Node Package Manager (npm)](https://nodejs.org/en/download/) to install Ionic

```bash
npm i -g @ionic/cli
```

To make sure everything is working, run the following command in the repository's directory

```bash
ionic serve
```

This will eventually build the project, which will initially take a long time to build but you should eventually see the app open in the browser.

## Building for Android

**Note**: You need to have [Android Studio](https://developer.android.com/studio) installed and then use the SDK Manager to download API Level 29. You may also need to install Java and Gradle depending on any errors you get during building.

To build the app for Android, run the following command:

```bash
ionic cordova build android
```

This command will most likely not complete, but it should create a _platforms/android_ directory in your project. In that directory, you will find another _src_ folder. Copy the `google-services.json` file into that directory. Run the command again.

Now, run the following command: (for Windows)

```bash
keytool -keystore "C:\Users\<your username>\.android\debug.keystore" -list -v
```

The Mac equivalent would be similar, just input the path to your `debug.keystore` file.

Copy the resulting SHA1 key and do the following:

1. Go to [Firebase Console](https://console.firebase.google.com/u/0/project/pointfit-app/overview)
2. Go to Project Settings
3. Scroll down to `Your Apps` and click on `io.ionic.starter`
4. Click `Add Fingerprint` and paste that SHA1 key.

Finally, you can run

```bash
ionic cordova run android
```

If you have an android phone connected to your phone with USB debugging enabled, the app should be installed onto it.

Follow this [tutorial](https://ionicframework.com/docs/troubleshooting/debugging) to debug the app.

From now you can just run the command above any time you make a change to the app and need to rebuild the app.

### Simple testing can be done with just ionic serve

## Project Structure

The following are the most important parts about the project.

### Root

Mostly config files and directories with actual code

#### src/app

Most of the code base is in here.

This directory contains the code for all the different pages.
Each page will contain at least:

1. `routing.module.ts`
2. `module.ts`
3. `page.html`
4. `page.scss`
5. `page.spec.ts`
6. `page.ts`

Most of the app logic is handled in the page.ts files.

Some page directories also store components used on that page, and those components would have their logic handled in the `component.ts` files.
