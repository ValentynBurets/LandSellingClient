import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export class Layout extends Component {
  static displayName = Layout.name

  render() {
    return (
      <div>
        <Header />
          <Container fluid={true}>{this.props.children}</Container>
        <Footer />
      </div>
    )
  }
}
