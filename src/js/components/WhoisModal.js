/* @flow */

import React from "react"
import Modal from "./Modal"
import {closeWhois} from "../actions/whois"

type Props = {
  isOpen: boolean,
  text: string,
  isFetching: boolean,
  addr: string,
  dispatch: Function
}

export default class WhoisModal extends React.Component<Props> {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onClose={() => this.props.dispatch(closeWhois())}
        className="whois-modal"
      >
        <pre>whois {this.props.addr}</pre>
        {this.props.isFetching && <p>Loading...</p>}
        {!this.props.isFetching && <pre>{this.props.text}</pre>}
      </Modal>
    )
  }
}

import {connect} from "react-redux"
import * as whois from "../reducers/whois"

const stateToProps = state => ({
  text: whois.getWhoisText(state),
  isOpen: whois.getWhoisIsOpen(state),
  isFetching: whois.getWhoisIsFetching(state),
  addr: whois.getWhoisAddr(state)
})

export const XWhoisModal = connect(stateToProps)(WhoisModal)
