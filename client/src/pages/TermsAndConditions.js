import React from "react";
import { Link } from "react-router-dom";
import { FaFileContract, FaEnvelope } from "react-icons/fa";

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <FaFileContract className="legal-hero-icon" />
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated: March 17, 2026</p>
      </div>

      <div className="container">
        <div className="legal-content">

          <div className="legal-intro">
            <p>
              Welcome to <strong>FindMyNest</strong>. These Terms &amp; Conditions
              ("Terms") govern your access to and use of the FindMyNest platform — including
              our website, mobile applications, and related services. By creating an account or
              using our platform, you agree to be bound by these Terms. Please read them carefully
              before proceeding.
            </p>
          </div>

          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using FindMyNest, you confirm that you are at least 18 years old,
              have the legal capacity to enter into a binding agreement, and accept these Terms in
              full. If you do not agree, you must not use the platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Definitions</h2>
            <ul>
              <li>
                <strong>"Platform"</strong> – The FindMyNest website, mobile app, and all
                associated services.
              </li>
              <li>
                <strong>"User"</strong> – Any individual who registers for or uses the Platform
                (tenants, property owners, and administrators).
              </li>
              <li>
                <strong>"Tenant"</strong> – A user who searches for, views, and books rental
                properties through the Platform.
              </li>
              <li>
                <strong>"Owner"</strong> – A user who lists and manages rental properties on
                the Platform.
              </li>
              <li>
                <strong>"Listing"</strong> – A property advertisement posted by an Owner on
                the Platform.
              </li>
              <li>
                <strong>"Booking"</strong> – A formal request by a Tenant to rent a property
                listed by an Owner.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. User Accounts</h2>

            <h3>3.1 Registration</h3>
            <p>
              You must register for an account to access most features of FindMyNest. You agree to
              provide accurate, current, and complete information during registration and to keep
              your account information up to date.
            </p>

            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials.
              You must notify us immediately at{" "}
              <a href="mailto:support@findmynest.com">support@findmynest.com</a> if you suspect
              unauthorised access to your account. FindMyNest is not liable for any loss resulting
              from unauthorised use of your account.
            </p>

            <h3>3.3 One Account Per Person</h3>
            <p>
              Each user may maintain only one active account. Creating multiple accounts to
              circumvent restrictions is strictly prohibited.
            </p>

            <h3>3.4 Account Termination</h3>
            <p>
              FindMyNest reserves the right to suspend or terminate accounts that violate these
              Terms, engage in fraudulent activity, or misuse the Platform in any way.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Property Listings</h2>

            <h3>4.1 Owner Responsibilities</h3>
            <p>
              By posting a listing, you as an Owner represent and warrant that:
            </p>
            <ul>
              <li>
                You are the legal owner or authorised agent of the property and have the right
                to rent it.
              </li>
              <li>
                All listing information — including photos, descriptions, pricing, and amenities
                — is accurate, truthful, and not misleading.
              </li>
              <li>
                The property complies with all applicable local laws, zoning regulations, and
                health and safety requirements.
              </li>
              <li>
                You will promptly update the listing if any information changes.
              </li>
            </ul>

            <h3>4.2 Prohibited Listings</h3>
            <p>The following types of listings are strictly prohibited:</p>
            <ul>
              <li>Properties you do not own or have authority to list.</li>
              <li>Fraudulent, misleading, or duplicate listings.</li>
              <li>Properties involved in illegal activities.</li>
              <li>
                Listings that discriminate based on race, religion, gender, nationality,
                disability, sexual orientation, or any other protected characteristic.
              </li>
            </ul>

            <h3>4.3 Content Moderation</h3>
            <p>
              FindMyNest reserves the right to remove or modify any listing that violates these
              Terms or our community standards, without prior notice.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Booking Process</h2>

            <h3>5.1 How Bookings Work</h3>
            <p>
              Tenants may submit booking requests for available properties through the Platform.
              A booking is confirmed only when the Owner accepts the request. Both parties will
              receive notification of the booking status.
            </p>

            <h3>5.2 Tenant Obligations</h3>
            <ul>
              <li>Tenants must provide accurate information when submitting a booking request.</li>
              <li>
                Tenants are responsible for reviewing property descriptions, rules, and
                pricing before submitting a request.
              </li>
              <li>
                Tenants must treat the property and its contents with care and respect during
                their stay.
              </li>
              <li>
                Any damage caused by the Tenant during the rental period is the Tenant's
                financial responsibility.
              </li>
            </ul>

            <h3>5.3 Owner Obligations</h3>
            <ul>
              <li>
                Owners must honour confirmed bookings and provide the property as described
                in the listing.
              </li>
              <li>
                Owners must ensure the property is clean, safe, and ready for occupancy on
                the agreed move-in date.
              </li>
              <li>
                Owners must promptly communicate any changes or issues to the Tenant through
                the Platform.
              </li>
            </ul>

            <h3>5.4 Cancellations</h3>
            <p>
              Cancellation policies are set by individual owners and displayed on each listing.
              FindMyNest is not responsible for enforcing cancellation terms but may assist in
              dispute resolution at its discretion.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Reviews &amp; Ratings</h2>
            <ul>
              <li>
                Tenants may leave reviews and ratings for properties after a completed or
                confirmed booking.
              </li>
              <li>
                Reviews must be honest, factual, and based on first-hand experience. False,
                defamatory, or malicious reviews are prohibited.
              </li>
              <li>
                Owners may not incentivise or coerce positive reviews in any way.
              </li>
              <li>
                FindMyNest reserves the right to remove reviews that violate our content
                guidelines.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Prohibited Conduct</h2>
            <p>Users must not:</p>
            <ul>
              <li>Use the Platform for any unlawful purpose or in violation of any regulations.</li>
              <li>Post false, misleading, or fraudulent information.</li>
              <li>
                Attempt to gain unauthorised access to other accounts, servers, or systems.
              </li>
              <li>Scrape, harvest, or collect data from the Platform without permission.</li>
              <li>
                Use automated bots, scripts, or tools to interact with the Platform without
                written consent from FindMyNest.
              </li>
              <li>
                Harass, threaten, or abuse other users through any Platform communication
                channel.
              </li>
              <li>
                Circumvent the Platform by taking transactions (payments, agreements) off-platform
                after making initial contact through FindMyNest.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Intellectual Property</h2>
            <p>
              All content on the Platform — including the FindMyNest logo, brand, design,
              software, and text — is owned by or licensed to FindMyNest and protected by
              intellectual property laws. You may not reproduce, distribute, or create derivative
              works without our express written consent.
            </p>
            <p>
              By submitting content (listings, photos, reviews), you grant FindMyNest a
              non-exclusive, royalty-free, worldwide licence to use, display, and reproduce
              that content solely for the purpose of operating and promoting the Platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              FindMyNest provides the Platform on an <strong>"as is"</strong> and{" "}
              <strong>"as available"</strong> basis without warranties of any kind, express
              or implied. We do not guarantee that:
            </p>
            <ul>
              <li>The Platform will be uninterrupted, error-free, or secure at all times.</li>
              <li>
                Listings are accurate, complete, or verified (we rely on Owner-provided
                information).
              </li>
              <li>
                Any tenant–owner transaction will result in a satisfactory rental experience.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, FindMyNest shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from:
            </p>
            <ul>
              <li>Your use of or inability to use the Platform.</li>
              <li>Disputes between tenants and property owners.</li>
              <li>Inaccurate or misleading listing information provided by owners.</li>
              <li>Property damage, theft, or personal injury during a rental period.</li>
              <li>Loss of data or unauthorised access to your account.</li>
            </ul>
            <p>
              Our total liability in any circumstance shall not exceed the amount you have paid to
              FindMyNest (if any) in the 12 months preceding the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless FindMyNest, its officers, directors,
              employees, and partners from any claims, liabilities, damages, and expenses
              (including legal fees) arising from your use of the Platform, violation of these
              Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Modifications to the Platform</h2>
            <p>
              FindMyNest reserves the right to modify, suspend, or discontinue any feature or
              aspect of the Platform at any time, with or without notice. We are not liable for
              any impact such changes may have on your use of the service.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we do, we will revise the "Last
              updated" date at the top of this page. For significant changes, we will provide
              notice via email or a prominent Platform notification. Your continued use of
              FindMyNest after the updated Terms take effect constitutes your acceptance.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms are governed by and interpreted in accordance with applicable law. Any
              dispute arising out of or in connection with these Terms shall first be attempted
              to be resolved through good-faith negotiation. If unresolved, disputes shall be
              subject to binding arbitration or the jurisdiction of the courts where FindMyNest
              is incorporated.
            </p>
          </section>

          <section className="legal-section">
            <h2>15. Contact Us</h2>
            <p>
              For questions, concerns, or reports of Terms violations, please contact us:
            </p>
            <div className="legal-contact-box">
              <FaEnvelope className="legal-contact-icon" />
              <div>
                <p><strong>FindMyNest Legal Team</strong></p>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@findmynest.com">legal@findmynest.com</a>
                </p>
                <p>Response time: within 5 business days</p>
              </div>
            </div>
          </section>

          <div className="legal-nav-links">
            <Link to="/privacy" className="btn-outline">Read Privacy Policy</Link>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
