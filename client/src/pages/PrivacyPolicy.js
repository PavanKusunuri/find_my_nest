import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <FaShieldAlt className="legal-hero-icon" />
        <h1>Privacy Policy</h1>
        <p>Last updated: March 17, 2026</p>
      </div>

      <div className="container">
        <div className="legal-content">

          <div className="legal-intro">
            <p>
              At <strong>FindMyNest</strong>, your privacy matters to us. This Privacy Policy explains
              how we collect, use, disclose, and protect your personal information when you use our
              platform to find, list, or book rental properties. By using FindMyNest, you agree to
              the practices described in this policy.
            </p>
          </div>

          <section className="legal-section">
            <h2>1. Information We Collect</h2>

            <h3>1.1 Information You Provide</h3>
            <ul>
              <li>
                <strong>Account Information:</strong> Name, email address, password, and role
                (tenant or property owner) when you register.
              </li>
              <li>
                <strong>Profile Details:</strong> Contact number, profile photo, and any
                additional details you add to your account.
              </li>
              <li>
                <strong>Property Listings:</strong> Property details, descriptions, photos,
                pricing, and location information submitted by owners.
              </li>
              <li>
                <strong>Booking Information:</strong> Move-in/move-out dates, number of
                occupants, and special requests made during the booking process.
              </li>
              <li>
                <strong>Reviews &amp; Ratings:</strong> Feedback and ratings submitted for
                properties or tenants.
              </li>
              <li>
                <strong>Communications:</strong> Messages sent through our platform between
                tenants and property owners.
              </li>
            </ul>

            <h3>1.2 Information Collected Automatically</h3>
            <ul>
              <li>
                <strong>Usage Data:</strong> Pages visited, search queries, filters applied,
                listings viewed, and time spent on the platform.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type and version,
                operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies &amp; Tracking:</strong> Session tokens, preference cookies,
                and analytics cookies to improve your experience.
              </li>
              <li>
                <strong>Location Data:</strong> Approximate location derived from your IP
                address for localised search results (with your permission).
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>
                <strong>Account Management:</strong> Creating, maintaining, and securing your
                FindMyNest account and authenticating your identity.
              </li>
              <li>
                <strong>Platform Services:</strong> Facilitating property searches, listing
                management, booking requests, and communication between tenants and owners.
              </li>
              <li>
                <strong>Personalisation:</strong> Displaying relevant property recommendations
                based on your search history and preferences.
              </li>
              <li>
                <strong>Notifications:</strong> Sending booking confirmations, status updates,
                review reminders, and important account alerts.
              </li>
              <li>
                <strong>Safety &amp; Trust:</strong> Verifying user identities, detecting
                fraudulent activity, and resolving disputes.
              </li>
              <li>
                <strong>Platform Improvement:</strong> Analysing usage patterns to improve
                features, fix bugs, and enhance the overall user experience.
              </li>
              <li>
                <strong>Legal Compliance:</strong> Fulfilling legal obligations and responding
                to lawful requests from authorities.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Sharing Your Information</h2>
            <p>
              We do <strong>not sell</strong> your personal information. We may share your
              information only in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Between Users:</strong> Property owners can see tenant names and
                contact details for confirmed bookings. Tenants can view owner profiles and
                contact information for listed properties.
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who assist in operating
                our platform (e.g., cloud hosting, email delivery, analytics) under strict
                confidentiality agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or
                government authority, or to protect the rights and safety of our users.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or
                sale of assets, your data may transfer to the new entity under the same
                privacy protections.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Cookies &amp; Tracking Technologies</h2>
            <p>
              FindMyNest uses cookies and similar technologies to provide a seamless experience:
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for authentication (keeping you
                logged in) and core platform functionality.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings, such as search
                filters and display preferences, across sessions.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how users interact with
                the platform so we can improve it.
              </li>
            </ul>
            <p>
              You can manage or disable cookies through your browser settings. Note that
              disabling essential cookies may affect your ability to use certain features.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul>
              <li>Encrypted data transmission using HTTPS/TLS.</li>
              <li>Bcrypt password hashing — we never store plain-text passwords.</li>
              <li>JWT-based authentication with token expiry.</li>
              <li>Role-based access controls (tenant vs. owner vs. admin).</li>
              <li>Regular security audits and vulnerability assessments.</li>
            </ul>
            <p>
              While we take reasonable precautions, no system is completely secure. Please
              use a strong, unique password and notify us immediately at{" "}
              <a href="mailto:security@findmynest.com">security@findmynest.com</a> if you
              suspect any unauthorised access.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed
              to provide our services. Specifically:
            </p>
            <ul>
              <li>
                <strong>Active Accounts:</strong> Data is kept while your account remains
                active and for up to 90 days after deletion.
              </li>
              <li>
                <strong>Booking Records:</strong> Retained for 3 years for legal and financial
                compliance purposes.
              </li>
              <li>
                <strong>Usage Logs:</strong> Anonymised analytics data may be retained
                indefinitely for platform improvement.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate or incomplete information.
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your account and associated data
                (subject to legal retention requirements).
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a structured, machine-readable
                format.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Where processing is based on consent, you may
                withdraw it at any time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@findmynest.com">privacy@findmynest.com</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Children's Privacy</h2>
            <p>
              FindMyNest is not intended for use by individuals under the age of 18. We do not
              knowingly collect personal information from minors. If you believe a minor has
              provided us with their data, please contact us and we will promptly delete it.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites (e.g., map services, payment
              processors). We are not responsible for the privacy practices of these sites and
              encourage you to review their respective privacy policies.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices
              or legal requirements. We will notify you of significant changes via email or a
              prominent notice on the platform. Continued use of FindMyNest after the effective
              date constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy,
              please reach out to us:
            </p>
            <div className="legal-contact-box">
              <FaEnvelope className="legal-contact-icon" />
              <div>
                <p><strong>FindMyNest Privacy Team</strong></p>
                <p>
                  Email:{" "}
                  <a href="mailto:privacy@findmynest.com">privacy@findmynest.com</a>
                </p>
                <p>Response time: within 5 business days</p>
              </div>
            </div>
          </section>

          <div className="legal-nav-links">
            <Link to="/terms" className="btn-outline">Read Terms &amp; Conditions</Link>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
