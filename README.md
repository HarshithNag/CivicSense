# Civic Sense — Android App

This wraps the exact same Civic Sense website in a native Android app shell
using [Capacitor](https://capacitorjs.com), with a custom app icon, splash
screen and app name already configured.

## ⚠️ Read this first — about the `.apk` file

I could not hand you a finished `.apk` binary. Building one requires the
Android SDK build tools and Gradle, which have to download large components
(the Gradle distribution + the Android Gradle Plugin + Google's Maven
repository) from Google/Gradle's servers. The sandbox I build in only has
network access to a short allow-list of package registries (npm, pip, apt,
crates.io, GitHub) for security reasons — Google's and Gradle's servers
aren't on that list, so the final compile step fails here with a `403`.

Everything **up to** that final compile step is done for you:
- The native Android project is fully generated and configured
  (`android/` folder — package id `com.civicsense.app`, app name "Civic
  Sense", custom launcher icon at every density, adaptive icon, and a
  branded navy splash screen).
- The website is already copied in as the app's content (`www/`, and synced
  into `android/app/src/main/assets/public`).

You just need to run the actual build once, on a machine with normal
internet access. It takes about 2–5 minutes and no Android coding is
required.

## Get the APK (recommended: Android Studio)

1. Install **[Android Studio](https://developer.android.com/studio)** (free).
   It bundles the Android SDK and Gradle, so it handles the downloads that
   were blocked here automatically.
2. Open Android Studio → **Open** → select the `android` folder in this
   project.
3. Let it finish "Gradle sync" (first time only, a few minutes).
4. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
5. When it finishes, click **locate** in the notification, or find it at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```
6. Copy `app-debug.apk` to your phone and open it to install (you'll need to
   allow "Install unknown apps" for whichever app you use to open it —
   Android will prompt you for this automatically).

## Get the APK (command line, if you already have the Android SDK)

```bash
cd android
./gradlew assembleDebug
```
Output lands in the same place: `android/app/build/outputs/apk/debug/app-debug.apk`.

This produces a **debug APK** — perfect for installing on your own phone,
sharing with reviewers, or demoing in an interview. It's not signed for the
Play Store; that's a separate step (`./gradlew bundleRelease` + a signing
key) you'd only need if you were actually publishing it.

## Want it on your phone right now, with zero setup?

The website itself is already a fully installable app — no APK needed:
1. Host `civic-sense/` somewhere reachable from your phone (e.g. your
   EdgeOne portfolio host, GitHub Pages, Netlify, or even your laptop's IP
   on the same Wi-Fi).
2. Open it in **Chrome on Android** → menu (⋮) → **"Install app"** /
   **"Add to Home screen."**
3. It installs with its own icon, opens full-screen with no browser bar,
   and works offline after the first visit (a service worker caches it).

This is genuinely how a lot of production teams ship lightweight civic/gov
apps today, and it's worth keeping even after you have the APK.

## Editing the app afterwards

Edit the website as before, inside the `www/` folder (same files as the
standalone `civic-sense` project — `css/style.css`, `js/data.js`, etc.).
Then push your changes into the native project and rebuild:
```bash
npm run sync        # copies www/ into android/app/src/main/assets/public
# then re-run the Android Studio build step, or ./gradlew assembleDebug
```

## Project structure

```
civic-sense-app/
├── www/                    # The web app (source of truth for app content)
├── android/                 # Native Android Studio project — open this
│   └── app/src/main/
│       ├── assets/public/   # Synced copy of www/ (don't hand-edit)
│       └── res/mipmap-*/    # App icon at every density + splash screens
├── icon-src/                 # SVG sources + scripts used to (re)generate icons
├── capacitor.config.ts       # App id, name, web directory
├── node_modules/              # Required by the Gradle build — keep this folder
└── package.json
```
