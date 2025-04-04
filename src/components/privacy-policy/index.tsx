import Link from "next/link"

import { Container } from "../common/container"

export const PrivacyPolicy = () => {
  return (
    <Container className="w-full space-y-6 py-8">
      <div className="space-y-1">
        <h2 className="text-primary text-center text-2xl font-bold">
          Privacy Policy
        </h2>
        <h3 className="text-center text-lg font-normal whitespace-nowrap text-black dark:text-white">
          Privacy Policy
        </h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Privacy Policy</h2>
          <div className="space-y-1">
            <p>Last updated: April 2025</p>
            <p>
              Colsgen {'("we")'} value your privacy and are committed to
              protecting your personal data. We aim to handle your information
              responsibly and in accordance with the purposes stated in this
              policy.
            </p>
            <p>
              By using the Colsgen website and services, you accept the terms
              outlined in this Privacy Policy.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">1. Information We Collect</h3>
          <div className="space-y-1 indent-8">
            <p>
              We may collect the following personal information that you
              voluntarily provide:
            </p>
            <ul className="list-inside list-disc">
              <li>API key used to connect</li>
              <li>CSV files you upload</li>
            </ul>
            <p>
              Additionally, we may collect non-personal information such as:
            </p>
            <ul className="list-inside list-disc">
              <li>Browser type</li>
              <li>Website usage data (through cookies and analytics tools)</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">2. Purpose of Data Usage</h3>
          <div className="space-y-1 indent-8">
            <p>The data we collect is used for the following purposes:</p>
            <ul className="list-inside list-disc">
              <li>To provide AI generation for your CSV files</li>
              <li>To process your data and return results in CSV format</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">3. Data We Do Not Store</h3>
          <div className="space-y-1 indent-8">
            <p>
              Colsgen does not store any personal data or files you upload. All
              processing is done directly in your browser, and no data is sent
              to our servers.
            </p>
            <p>
              We do not store CSV files or the results you generate. Everything
              is processed locally in your browser.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">4. Data Retention</h3>
          <div className="space-y-1 indent-8">
            <p>
              All data you upload is stored in your browser and will not be
              stored or sent to our servers. We do not retain any user data.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">5. Cookies</h3>
          <div className="space-y-1 indent-8">
            <p>
              We may use cookies to help remember your usage when you return and
              to analyze user behavior. You can choose to disable cookies in
              your browser settings.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">6. Third-Party Services</h3>
          <div className="space-y-1 indent-8">
            <p>We use third-party services such as:</p>
            <ul className="list-inside list-disc">
              <li>Gemini or OpenAI API for AI processing</li>
            </ul>
            <p>
              These third-party services have their own privacy policies and
              only access the necessary data to provide the service.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">7. Data Security</h3>
          <div className="space-y-1 indent-8">
            <p>
              We use appropriate technical and organizational measures to
              protect your data from unauthorized access, disclosure, or
              destruction. However, no system can guarantee 100% security over
              the internet.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">8. Policy Changes</h3>
          <div className="space-y-1 indent-8">
            <p>
              Colsgen reserves the right to modify or update this Privacy Policy
              at any time without prior notice. We recommend you check this page
              periodically for any changes.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">9. Contact Information</h3>
          <div className="space-y-1 indent-8">
            <p>
              If you have any questions or concerns about this Privacy Policy,
              feel free to contact us:
            </p>
            <ul className="list-inside list-disc">
              <li>
                Email:{" "}
                <Link href="mailto:boom9387@hotmail.com" className="underline">
                  boom9387@hotmail.com
                </Link>
              </li>
              <li>
                Github:{" "}
                <Link
                  href="https://github.com/boomchanotai"
                  className="underline"
                >
                  boomchanotai
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}
