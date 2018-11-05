import React, { Component } from 'react'

import Accounts from './lib/components/accounts'
import Groups from './lib/components/groups'
import Orgs from './lib/components/orgs'
import Regions from './lib/components/regions'
import Spaces from './lib/components/spaces'

export function reduceUI(state, { type, config }) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('ibmcloud', config.ibmcloud)
    }
    default:
      break
  }

  return state
}

export function mapHyperState({ ui: { fontFamily, ibmcloud } }, map) {
  return Object.assign({}, map, {
    fontFamily,
    ibmcloud
  })
}

export function decorateHyper(Hyper) {
  return class extends Component {
    static displayName() {
      return 'Hyper'
    }

    render() {
      const bottom = this.props.ibmcloud.ui.bottom || '0';
      const opacity = this.props.ibmcloud.ui.opacity || '0.5';

      const customChildren = (
        <div>
          {this.props.customChildren}
          <div className="line" >
            <Regions sso={this.props.ibmcloud.sso} />
            <Accounts />
            <Groups />
            <Orgs />
            <Spaces />
            <style jsx>{`
              .line {
                display: flex;
                align-items: center;
                position: absolute;
                overflow: hidden;
                bottom: ${bottom};
                width: 100%;
                height: 24px;
                background: rgba(0, 0, 0, 0.08);
                margin: 2px 0;
                padding: 0 10px;
                opacity: ${opacity}
              }
            `}</style>
          </div>
        </div>
      )

      return <Hyper {...this.props} customChildren={customChildren} />
    }
  }
}

export function terminal(cmd) {
  window.rpc.emit('ibmcloud command', {
    uid: window.IBM_CLOUD_TERMINAL,
    cmd: `ibmcloud ${cmd}`
  });
}

export function onWindow(browserWindow) {
  browserWindow.rpc.on('ibmcloud command', ({uid, cmd}) => {
    browserWindow.sessions.get(uid).write(cmd + '\r');
  });
};

exports.middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'SESSION_ADD':
    case 'SESSION_SET_ACTIVE':
      if(window) {
        window.IBM_CLOUD_TERMINAL = action.uid;
      }

      break;
    case 'SESSION_USER_DATA':
      // TODO future work to respond to user submitted ibmcloud commands
      break;
  }

  next(action);
};
