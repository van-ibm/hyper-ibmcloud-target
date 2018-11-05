Hyper IBM Cloud Target
=========

Hyper IBM Cloud Target is a status line plugin for [Hyper](https://hyper.is/).

- Displays [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview) configured targets
- Automatically fetches accounts, resource groups, orgs, and spaces when targets change
- Select a target to run the corresponding CLI command

![](screenshot.png)

(Shown with [IBM Cloud theme](https://www.npmjs.com/package/hyper-ibmcloud-theme))

## Install

To install, edit `~/.hyper.js` and add `"hyper-ibmcloud-target"` to the `plugins` list.

```json
plugins: [
  "hyper-ibmcloud-target",
],
```

## Configuration

To configure the plugin, add the following to your `config` property in `~/.hyper.js`.

```json
ibmcloud: {
  sso: true,
  ui: {
    bottom: "15px"
  }
}
```

- **sso**: append the `--sso` flag to the plugin's login command
- **bottom**: offset the plugin `#px` from the bottom of screen

## Contributors

This project is forked from [Hyperline](https://github.com/Hyperline/hyperline). To also use Hyperline, adjust the `ui.bottom` property to move the Target plugin above Hyperline.
