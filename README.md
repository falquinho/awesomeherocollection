# Awesome Hero Collection

An Android App for viewing a collection of comics of your favorite hero!

## Running

This is a  bare React Native project.
Make sure you have the Android SDK set.

Clone this repo:

```bash
git clone https://github.com/falquinho/awesomeherocollection.git
```

Enter the newly created directory:

```bash
cd awesomeherocollection
```

Install dependencies:

```bash
npm i
```

Start React Native in one terminal:

```bash
npx react-native start
```

Run the app in another terminal:

```bash
npx react-native run-android
```

## Building
### Debug
Make sure the app is able to run and then run the following commands within the project folder:
```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

```bash
cd android
```

```bash
./gradlew assembleDebug
```

Generated .apk is located at ```android/app/build/outputs/apk/debug```