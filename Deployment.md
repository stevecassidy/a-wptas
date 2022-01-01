# Notes on Deployment to App Stores

Once development is complete, build the project and copy over to native versions:

```[sh]
yarn run build
npx cap copy
```

## Apple App Store

[This summary is useful](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/).

Open the project in XCode:

```[sh]
npx cap open ios
```

Ensure that app signing is set up in XCode: Click on 'App' in the left navigation menu to get a configurataion screen and if required _Add Account_ and then select that account as the _Team_ for the app.  

Test the app locally with a build to run on an emulator or local device. 

Select "Any IOS Device" as the build target (top centre of the window), then build and bundle the project via the _Product_ menu _Archive_ option.  Select the option to publish to the App Store/Testflight and follow the prompts through the process. Upload the app to the app store. 



## Android

Open the project in Android Studio:

```[sh]
npx cap open android
```

For each release we need to increment the versionCode counter in build.gradle, this is an integer counter for releases, not the same as the versionName and not shown externally. 

To build the project select _Build_ > _Generate Signed Bundle/APK_. 

Then go to [the Google Play Console](https://play.google.com/console) and add a new production release, upload the .aab file that was generated. 

Add some release notes and Save, then submit for review. 
