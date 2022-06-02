import React, { ReactNode } from 'react'
import { Container } from 'reactstrap'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface LayoutProps{
  children: ReactNode;
}

export function Layout (props: LayoutProps) {
  
    return (
      <div>
        <Header />
          <Container fluid={true}>{props.children}</Container>
        <Footer />
      </div>
    )
  
}
