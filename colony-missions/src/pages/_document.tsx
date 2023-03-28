import { Html, Head, Main, NextScript } from 'next/document'
import Nav from '@/components/Nav'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Nav />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

