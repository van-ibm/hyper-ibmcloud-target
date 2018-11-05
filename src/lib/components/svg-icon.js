import React from 'react'
import Component from 'hyper/component'

export class AccountIcon extends Component {
  render() {
    return (
      <SvgIcon onClick={this.props.onClick}>
        <g>
          <path d="M16,1L2,15l3,3v13h22V18l3-3L16,1z M25,29H7V16l9-9l9,9V29z" />
          <circle cx="16" cy="16" r="2" />
        </g>
      </SvgIcon>
    )
  }
}

export class GroupIcon extends Component {
  render() {
    return (
      <SvgIcon onClick={this.props.onClick}>
        <g className="resource-group-icon" transform="translate(1.000000, 1.000000)">
          <path d="M29,10V8h-1h-1V7V6h-1H6H5v1v1H4H3v2H1v16h30V10H29z M6,7h20v1H6V7z M29,24H3V12h26V24z"/>
          <polygon points="19,19 20,19 20,18 20,17 19,17 19,18 13,18 13,17 12,17 12,18 12,19 13,19 	"/>
        </g>
      </SvgIcon>
    )
  }
}

export class RegionIcon extends Component {
  render() {
    return (
      <SvgIcon onClick={this.props.onClick}>
        <g>
          <path d="M8.575,18.925C10.625,20.975,13.312,22,16,22c2.531,0,5.055-0.922,7.054-2.74l0.018,0.018l0.707-0.707l-0.018-0.019
            c3.748-4.119,3.645-10.497-0.336-14.477C21.375,2.025,18.688,1,16,1c-2.531,0-5.055,0.922-7.054,2.74L8.929,3.722L8.222,4.429
            l0.018,0.019C4.491,8.567,4.595,14.944,8.575,18.925z M16,3c2.271,0,4.405,0.885,6.011,2.489c3.194,3.195,3.3,8.316,0.335,11.649
            L10.36,5.152C11.917,3.767,13.896,3,16,3z M21.64,17.848C20.083,19.233,18.104,20,16,20c-2.271,0-4.405-0.885-6.011-2.489
            c-3.194-3.194-3.3-8.315-0.335-11.649L21.64,17.848z"/>
          <path d="M26.253,1.247l-1.414,1.414C27.2,5.022,28.5,8.16,28.5,11.5s-1.3,6.479-3.661,8.839C22.479,22.699,19.34,24,16,24
            s-6.479-1.301-8.839-3.661l-1.414,1.414C8.484,24.492,12.126,26,16,26s7.516-1.508,10.253-4.247
            c2.738-2.738,4.247-6.38,4.247-10.253S28.991,3.985,26.253,1.247z"/>
          <rect x="11" y="28" width="10" height="3"/>
        </g>
      </SvgIcon>
    )
  }
}

export class OrgIcon extends Component {
  render() {
    return (
      <SvgIcon onClick={this.props.onClick}>
        <g className="org-icon" transform="translate(1.000000, 1.000000)">
          <path d="M8,23c2.762,0,5-2.238,5-5s-2.238-5-5-5s-5,2.238-5,5S5.238,23,8,23z M8,15c1.654,0,3,1.346,3,3s-1.346,3-3,3s-3-1.346-3-3S6.346,15,8,15z"/>
          <path d="M19,18c0,2.762,2.238,5,5,5s5-2.238,5-5s-2.238-5-5-5S19,15.238,19,18z M24,15c1.654,0,3,1.346,3,3s-1.346,3-3,3s-3-1.346-3-3S22.346,15,24,15z"/>
          <path d="M21,7c0-2.762-2.238-5-5-5s-5,2.238-5,5s2.238,5,5,5S21,9.762,21,7z M16,10c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S17.654,10,16,10z"/>
          <path d="M12,25H4c-1.105,0-2,0.896-2,2v3h12v-3C14,25.896,13.104,25,12,25z"/>
          <path d="M28,25h-8c-1.104,0-2,0.896-2,2v3h12v-3C30,25.896,29.104,25,28,25z"/>
        </g>
      </SvgIcon>
    )
  }
}

export class SpaceIcon extends Component {
  render() {
    return (
      <SvgIcon onClick={this.props.onClick}>
        <g className="space-icon" transform="translate(1.000000, 1.000000)">
          <path d="M1,6v20h30V6H1z M29,24H3V8h26V24z"/>
          <path d="M28,9H17v6h11V9z M27,14h-9v-4h9V14z"/>
          <rect x="4" y="9" width="11" height="6"/>
          <path d="M15,17H4v6h11V17z M14,22H5v-4h9V22z"/>
          <path d="M28,17H17v6h11V17z M27,22h-9v-4h9V22z"/>
        </g>
      </SvgIcon>
    )
  }
}

export default class SvgIcon extends Component {

  render() {
    return (
      <svg onClick={this.props.onClick} className="icon" transform="translate(1.000000, 1.000000)" x="0px" y="0px"
        width="18px" height="18px" viewBox="0 0 32 32" enable-background="new 0 0 32 32">
        {this.props.children}

        <style jsx>{`
          .icon {
            fill: #fff;
          }
        `}</style>
      </svg>
    )
  }
}
