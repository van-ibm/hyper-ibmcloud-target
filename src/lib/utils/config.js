import * as fs from 'fs'
import * as os from 'os'

const cfFile = `${os.homedir()}/.bluemix/.cf/config.json`;
let cfConfig = {};

const ibmFile = `${os.homedir()}/.bluemix/config.json`;
let ibmConfig = {};

const listeners = [];

// set the initial config
let config = {};
load();
watch();

export function settings () {
  return config;
}

export function isLoggedIn () {
  return config.accountGuid !== '';
}

export function load () {
  let json = fs.readFileSync(ibmFile);
  
  // use toString() to prevent empty files from returning a Buffer and being truthy

  if (json.toString() !== '') {
    ibmConfig = JSON.parse(json);

    config = {
      ...config, 
      ...{
        accountGuid: ibmConfig.Account.GUID,
        accountName: ibmConfig.Account.Name,
        regionName: ibmConfig.Region,
        resourceGroupId: ibmConfig.ResourceGroup.GUID,
        resourceGroupName: ibmConfig.ResourceGroup.Name
      }
    }
  }
  
  json = fs.readFileSync(cfFile);
  if (json.toString() !== '') {
    cfConfig = JSON.parse(json);

    config = {
      ...config, 
      ...{
        cfTarget: cfConfig.Target,
        orgGuid: cfConfig.OrganizationFields.GUID,
        orgName: cfConfig.OrganizationFields.Name,
        spaceGuid: cfConfig.SpaceFields.GUID,
        spaceName: cfConfig.SpaceFields.Name
      }
    }
  }
}

function watch () {
  fs.watch(ibmFile, () => fileChanged());
  fs.watch(cfFile, () => fileChanged()); // FIXME file is recreated so subsequent watching stops
}

function fileChanged () {
  load();
  notifyListeners();
}

export function addListener(component) {
  listeners.push(component);
}

export function notifyListeners() {
  listeners.forEach(component => {
    try {
      component.init();
    } catch (e) {
      console.error(e);
    }
  });
}
