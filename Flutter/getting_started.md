# Setting up Dev Env notes

- Guide: https://docs.flutter.dev/get-started/install/macos
- If you've done all the install stuff. You can jump to just running in the Termainal
  - 🚀  `open -a Simulator`



## Initial Install / Setting up

- Download SDK (Intel) to Downloads folder.
- `cd ~/development`
- `unzip ~/Downloads/flutter_macos_3.13.9-stable.zip`
- ```export PATH="$PATH:`pwd`/flutter/bin"```
- Run Flutter Docker:  `flutter doctor`

#### Update your path (🚨 Fixes having to do ☝️ each time to use `flutter` commands)

- `export PATH="$PATH:[PATH_OF_FLUTTER_GIT_DIRECTORY]/bin"`
  - Example: ` export PATH="$PATH:/Users/robbobfrh84/development/flutter/bin"`
- Restart Terminal or: `sudo nano /etc/paths`
- Test by closing terminal, reopening and running: `which flutter`

#### Intall Xcode tools (agree and sign in via termainl)

Make sure you've installed and updated the lates Xcode on your Mac.

- `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- `sudo xcodebuild -runFirstLaunch`
- `sudo xcodebuild -license`

#### Set up the iOS simulator

- `xcodebuild -downloadPlatform iOS`

## Deploy simulator

- 🚀 `open -a Simulator`

----

# Setting up on VS CODE

