import React from 'react'
import { Footer } from 'antd/es/layout/layout'

export default function FooterMain() {
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Rentrix #tech on Tap ©{new Date().getFullYear()} Created by Rentrix Designs
    </Footer>
  )
}
