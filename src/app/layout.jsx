import { ReduxProvider } from "./Provider";

import "./globals.css";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";

export const metadata = {
  title:
    "Fakhri Professionals Associations' Official Website - Fakhri Professionals Associations&#039; Official Website",
  description: "Fakhri Professionals Associations' Official Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <main id="content" role="main">
          <div className="container">
            <div className="row">
              {children}
            </div>
          </div>
        </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
