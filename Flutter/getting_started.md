# Setting up Dev Env notes
- Guide: https://docs.flutter.dev/get-started/install/macos/mobile-ios?tab=download
- If you've done all the install stuff. You can jump to just running in the Termainal
  - 🚀  `open -a Simulator`

#### Check Env Setup
- `flutter doctor` > shows what all you've installed. 

----
## Initial Install / Setting up

- Download SDK (Intel) to Downloads folder.
- `cd ~/development`
- `unzip ~/Downloads/flutter_macos_3.13.9-stable.zip`
- ```export PATH="$PATH:`pwd`/flutter/bin"```
- Run Flutter dockor:  `flutter doctor`

#### Update your path (🚨 Fixes having to do ☝️ each time to use `flutter` commands)
- Add path to your `~/.zshrc` file 
- `sudo nano ~/.zshrc`
- Add: (template) `export PATH="$PATH:[PATH_OF_FLUTTER_GIT_DIRECTORY]/bin"`
  - Example: ` export PATH="$PATH:/Users/bobmain/development/flutter/bin"`
- Restart Terminal or: `source ~/.zshrc`
- Test by closing terminal, reopening and running: `which flutter`


----
## Intall Xcode tools (agree and sign in via termainl)

Make sure you've installed and updated the lates Xcode on your Mac.
- `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- `sudo xcodebuild -runFirstLaunch`
- `sudo xcodebuild -license` > type "agree"

#### Installing on an Apple Silicon Mac, install the Rosetta translation environment.
- `sudo softwareupdate --install-rosetta --agree-to-license`

#### Set up the iOS simulator
- `xcodebuild -downloadPlatform iOS`

#### Deploy simulator
- 🚀 `open -a Simulator`

#### Install CocoaPods
- If your apps depend on Flutter plugins with native macOS code, install CocoaPods.
- `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- `brew install ruby`
- `brew install cocoapods`

#### If you wanna setup andriod
- https://developer.android.com/studio/index.html
- Download for silicon chip & go through steps to install.
- Start Andriod Studio
- Go to the above link and follow the directions under "Set up Android emulator"

Setting up for the Command-line
- Open Android Studio
- Tools Menu, SDK Manager
- In the window that comes up there are inner panels, choose SDK Tools panel
- Tick Android SDK Command-line Tools
- Choose Apply button near the bottom of the window
- `flutter doctor --android-licenses` > Select 'y' for all


----
## Setting up on VS CODE
Starting with VS CODE Guide
- https://docs.flutter.dev/get-started/install/macos/mobile-ios?tab=download
- Under Install the Flutter SDK

- Open VS Code.
- Select: Code (tab) > Settings > Extentions
- Search for "Flutter" > subtitle: "Flutter support and debugger..." INSTALL
- To open the Command Palette, press Command + Shift + P.
- In the Command Palette, type flutter.
- Select Flutter: New Project.
- VS Code prompts you to locate the Flutter SDK on your computer.
  - If you have the Flutter SDK installed, click Locate SDK.
  - If you do not have the Flutter SDK installed, click Download SDK.
- When prompted Which Flutter template?, ignore it. Press Esc. You can create a test project after checking your development setup.
