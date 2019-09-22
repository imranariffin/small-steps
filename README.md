# Small Steps
App that helps you achieve your ambitious goals by focusing on the marginal improvements towards the goals.

## origin
This app is inspired by this TED-ex talk: [How to Achieve Your Most Ambitious Goals | Stephen Duneier | TEDxTucson](https://www.youtube.com/watch?v=TQMbvJNRpLE) on Youtube. The speaker talks about his journey as an average person being able to achieve ambitious goals just by focusing on marginal improvements, one improvement at a time.

## idea
0. It's a mobile app that enables you to list down your ambitious `Goal`s
1. A `Goal` can be categorized as `Todo`, `In-progress` or `Done`
2. For each of them, break it down into tasks/habits/marginal-improvements. Let's call these `Tasks`
3. Each of these `Task`s can be further broken down into smaller `Task`s
4. You should be able to easily see this and feel that `Task`s can be broken down into smaller and smaller `Task`s
5. A task can be categorized as `Todo`, `In-progress` or `Done`
6. If all children `Task`s of a parent `Task` are `Done`, the parent task is automatically categorized as `Done`
7. If all `Task`s of a goal are `Done`, the goal is automatically categorized as `Done` (Yay!)

## development

### getting started
0. `git clone git@github.com:imranariffin/small-steps.git`
1. `cd small-steps/`
2. `yarn`
3. `yarn test`
4. Make sure an emulator is running or a device in debug mode is connected
5. `yarn android:debug`

### requirements
This app is made with React Native and supports Android only so we expect you have React Native environment for Android set up on your machine. See [here](https://facebook.github.io/react-native/docs/getting-started) for how to setup your React Native Android environment.

### build types
We currently support three different build types - debug, dev and release:

| build type | environment variable file | keystore file                             |
| ---------- | ------------------------- | ----------------------------------------- |
| debug      | `.env.debug`              | `android/app/debug.keystore`              |
| dev        | `.env.dev`                | `android/app/small-steps.dev.keystore`    |
| release    | `.env`                    | `android/app/small-steps.release.keystore`|

The environment variable file and keystore file for `debug` build is committed to the repo but the files for `dev` and `release` require request for access.
