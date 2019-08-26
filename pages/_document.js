import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body style={{width: '100vw', height: '100vh', margin: '0px'}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
} 

export default MyDocument