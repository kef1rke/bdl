import Header from "./public/components/header"
import Footer from "./public/components/footer"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <title>MyApp</title>
    </head>
    <body className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </body>
  </html>
  )
}
