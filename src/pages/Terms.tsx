import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Terms = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    document.title = "Terms & Conditions - McDone";
  }, []);

  const termsContent = `
McDONE ENTERPRISES
TERMS AND CONDITIONS OF SERVICE
================================================================================

Effective Date: December 2024
Document Version: 2.0

================================================================================
PART A: GENERAL PROVISIONS
================================================================================

ARTICLE 1: INTRODUCTION AND ACCEPTANCE OF TERMS

1.1 PARTIES TO THIS AGREEMENT
These Terms and Conditions ("Terms", "Agreement") constitute a legally binding contract between:
(a) McDone Enterprises, a company registered under the laws of the Republic of Kenya ("McDone", "Company", "we", "us", "our"); and
(b) Any individual or entity accessing or using the McDone Platform ("User", "you", "your").

1.2 ACCEPTANCE
By accessing, browsing, or using the McDone platform, website, mobile applications, or any related services (collectively, the "Platform"), you:
(a) Acknowledge that you have read and understood these Terms in their entirety;
(b) Agree to be legally bound by these Terms;
(c) Represent that you have the legal capacity and authority to enter into this Agreement;
(d) Accept all terms without modification.

1.3 REJECTION OF TERMS
If you do not agree to these Terms, you must immediately:
(a) Cease all use of the Platform;
(b) Delete any downloaded applications;
(c) Close your account if applicable.

================================================================================
ARTICLE 2: DEFINITIONS AND INTERPRETATION

2.1 DEFINITIONS
In these Terms, unless the context requires otherwise:

"Accommodation" means any lodging, property, or premises listed on the Platform, including but not limited to hotels, apartments, houses, villas, guesthouses, hostels, bed and breakfasts, and similar establishments.

"Booking" means a confirmed reservation of Accommodation made through the Platform, evidenced by a booking confirmation number and receipt of payment.

"Booking Confirmation" means the written confirmation issued by McDone upon successful completion of a Booking.

"Cancellation" means the termination of a Booking before the scheduled check-in date.

"Check-in Date" means the agreed date on which the Guest is entitled to occupy the Accommodation.

"Check-out Date" means the agreed date on which the Guest must vacate the Accommodation.

"Guest" or "Traveler" means any individual who makes or benefits from a Booking through the Platform.

"Host" means any individual or entity that lists Accommodation on the Platform for booking by Guests.

"Listing" means any Accommodation advertised on the Platform by a Host.

"No-Show" means a Guest's failure to arrive at the Accommodation on the Check-in Date without prior Cancellation.

"Platform" means the McDone website, mobile applications, and all related services, APIs, and technologies.

"Service Fee" means the fees charged by McDone for facilitating Bookings and providing Platform services.

2.2 INTERPRETATION
(a) Headings are for convenience only and do not affect interpretation;
(b) Words in singular include plural and vice versa;
(c) References to legislation include amendments and replacements;
(d) "Including" means "including but not limited to".

================================================================================
ARTICLE 3: ELIGIBILITY AND REGISTRATION

3.1 AGE REQUIREMENT
You must be at least eighteen (18) years of age to use the Platform. Minors may only use the Platform under adult supervision.

3.2 LEGAL CAPACITY
By using the Platform, you warrant that you have full legal capacity to enter into contracts under applicable law.

3.3 ACCOUNT REGISTRATION
(a) Accurate Information: You must provide accurate, current, and complete information during registration;
(b) Account Security: You are solely responsible for maintaining the confidentiality of your login credentials;
(c) Account Activities: You accept full responsibility for all activities under your account;
(d) Unauthorized Access: You must notify McDone immediately of any unauthorized account access.

3.4 ACCOUNT SUSPENSION
McDone reserves the right to suspend or terminate accounts that:
(a) Violate these Terms;
(b) Provide false or misleading information;
(c) Engage in fraudulent activities;
(d) Harm other users or McDone's reputation.

================================================================================
PART B: BOOKING AND PAYMENT TERMS
================================================================================

ARTICLE 4: BOOKING PROCESS

4.1 BOOKING CREATION
(a) Bookings are created when a Guest selects an Accommodation, chooses dates, and initiates payment;
(b) A Booking is only confirmed upon successful payment and receipt of Booking Confirmation;
(c) McDone acts as an intermediary and does not own or operate Accommodations.

4.2 BOOKING OBLIGATIONS
Upon Booking confirmation:
(a) The Guest is obligated to pay the agreed amount;
(b) The Host is obligated to provide the Accommodation as described;
(c) Both parties must comply with these Terms.

4.3 SPECIAL REQUESTS
(a) Special requests (early check-in, dietary requirements, etc.) are not guaranteed;
(b) Fulfillment depends on Host availability and discretion;
(c) No additional liability arises from unfulfilled special requests.

================================================================================
ARTICLE 5: PAYMENT TERMS

5.1 ACCEPTED PAYMENT METHODS
McDone accepts the following payment methods:
(a) M-Pesa mobile money transfer (Primary method for Kenya);
(b) Credit and debit cards (Visa, Mastercard) via Stripe;
(c) Other payment methods as may be added from time to time.

5.2 CURRENCY AND PRICING
(a) All prices are displayed in Kenyan Shillings (KES) unless otherwise stated;
(b) Prices include applicable taxes unless explicitly stated otherwise;
(c) Exchange rates for international payments are determined by payment processors;
(d) McDone is not responsible for exchange rate fluctuations.

5.3 SERVICE FEES
(a) McDone charges Service Fees for facilitating Bookings;
(b) Service Fees will be clearly disclosed before payment confirmation;
(c) Service Fees are non-refundable except as expressly provided.

5.4 PAYMENT SECURITY
(a) All payments are processed through secure, encrypted channels;
(b) McDone does not store complete credit card information;
(c) M-Pesa transactions are secured by Safaricom protocols.

5.5 PAYMENT DISPUTES
(a) Disputed transactions must be reported within seven (7) days;
(b) McDone will investigate and respond within fourteen (14) business days;
(c) Chargebacks without prior communication may result in account suspension.

================================================================================
ARTICLE 6: CANCELLATION AND REFUND POLICY

6.1 GUEST CANCELLATION
(a) Free Cancellation: Cancellations made more than 48 hours before Check-in Date are eligible for full refund, less any non-refundable Service Fees;
(b) Late Cancellation: Cancellations within 48 hours of Check-in Date are subject to a cancellation fee of 50% of the total Booking amount;
(c) Same-Day Cancellation: Cancellations on the Check-in Date will be charged 100% of the Booking amount.

6.2 HOST CANCELLATION
(a) Hosts who cancel confirmed Bookings may face penalties including:
    - Reduced search visibility;
    - Warning notices;
    - Account suspension for repeated cancellations;
(b) Guests will receive full refunds for Host cancellations;
(c) McDone may provide alternative Accommodation at its discretion.

6.3 REFUND PROCESSING
(a) Eligible refunds will be processed within 7-14 business days;
(b) M-Pesa refunds will be credited to the original payment phone number;
(c) Card refunds will be credited to the original payment card;
(d) Refund processing times may vary by payment provider.

6.4 NON-REFUNDABLE BOOKINGS
Certain Listings may be marked as non-refundable with:
(a) Discounted pricing;
(b) No cancellation refunds;
(c) Clear disclosure at time of Booking.

================================================================================
PART C: USER RESPONSIBILITIES
================================================================================

ARTICLE 7: HOST RESPONSIBILITIES

7.1 LISTING ACCURACY
Hosts must:
(a) Provide complete, accurate, and truthful listing information;
(b) Upload genuine photographs of the Accommodation;
(c) Accurately describe amenities, facilities, and services;
(d) Promptly update listings to reflect changes.

7.2 ACCOMMODATION STANDARDS
Hosts must:
(a) Maintain Accommodations in clean, safe, and habitable condition;
(b) Ensure all advertised amenities are functional;
(c) Provide basic necessities (clean linens, running water, etc.);
(d) Address maintenance issues promptly.

7.3 LEGAL COMPLIANCE
Hosts must:
(a) Comply with all applicable local, regional, and national laws;
(b) Obtain necessary permits, licenses, and registrations;
(c) Pay applicable taxes on rental income;
(d) Maintain adequate insurance coverage.

7.4 HOST INDEMNIFICATION
Hosts agree to indemnify, defend, and hold harmless McDone from any claims, damages, losses, or expenses arising from:
(a) Inaccurate listing information;
(b) Accommodation defects or safety issues;
(c) Violation of laws or regulations;
(d) Disputes with Guests.

================================================================================
ARTICLE 8: GUEST RESPONSIBILITIES

8.1 PROPERTY RESPECT
Guests must:
(a) Treat Accommodations with reasonable care;
(b) Not cause damage beyond normal wear and tear;
(c) Respect neighboring properties and residents;
(d) Maintain cleanliness during their stay.

8.2 OCCUPANCY LIMITS
(a) Guests must not exceed the maximum occupancy stated in the Listing;
(b) Unauthorized additional guests may result in eviction without refund;
(c) Events or gatherings require explicit Host approval.

8.3 HOUSE RULES
(a) Guests must comply with House Rules specified in the Listing;
(b) Common House Rules include noise restrictions, pet policies, and smoking prohibitions;
(c) Violation of House Rules may result in eviction without refund.

8.4 DAMAGE REPORTING
(a) Guests must report any pre-existing damage upon check-in;
(b) Any damage caused during the stay must be reported immediately;
(c) Guests are liable for repair or replacement costs for damages caused.

8.5 ILLEGAL ACTIVITIES
Guests are strictly prohibited from:
(a) Engaging in illegal activities on the premises;
(b) Storing illegal substances or materials;
(c) Using Accommodation for commercial purposes without authorization;
(d) Subletting or transferring the Booking.

================================================================================
ARTICLE 9: PROHIBITED ACTIVITIES

9.1 ALL USERS ARE PROHIBITED FROM:
(a) Posting false, misleading, or fraudulent content;
(b) Impersonating other individuals or entities;
(c) Harassing, threatening, or discriminating against other users;
(d) Attempting to circumvent Platform payment systems;
(e) Collecting user data without authorization;
(f) Distributing malware or engaging in cyber attacks;
(g) Violating intellectual property rights;
(h) Using automated systems to access the Platform without permission;
(i) Manipulating reviews or ratings;
(j) Price manipulation or bid rigging.

================================================================================
PART D: LIABILITY AND DISCLAIMERS
================================================================================

ARTICLE 10: MCDONE'S ROLE AND LIMITATIONS

10.1 INTERMEDIARY STATUS
(a) McDone operates as a neutral intermediary platform;
(b) McDone does not own, operate, manage, or control listed Accommodations;
(c) McDone does not employ Hosts or guarantee Host conduct.

10.2 NO GUARANTEES
McDone does not guarantee:
(a) The quality, safety, legality, or suitability of Accommodations;
(b) The accuracy or completeness of Listing information;
(c) The reliability, conduct, or identity of Hosts or Guests;
(d) Uninterrupted or error-free Platform operation.

================================================================================
ARTICLE 11: LIMITATION OF LIABILITY

11.1 DISCLAIMER OF WARRANTIES
THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

11.2 LIMITATION OF DAMAGES
TO THE MAXIMUM EXTENT PERMITTED BY LAW, MCDONE SHALL NOT BE LIABLE FOR:
(a) Any indirect, incidental, special, consequential, or punitive damages;
(b) Loss of profits, revenue, data, or business opportunities;
(c) Personal injury or property damage arising from Accommodation use;
(d) Actions or omissions of Hosts, Guests, or third parties;
(e) Platform interruptions, errors, or security breaches;
(f) Content posted by users;
(g) Third-party services or links.

11.3 MAXIMUM LIABILITY
McDone's total cumulative liability shall not exceed the greater of:
(a) The Service Fees paid by you in the twelve (12) months preceding the claim; or
(b) One Hundred United States Dollars (USD 100).

11.4 ESSENTIAL TERMS
The limitations in this Article are essential terms of this Agreement without which McDone would not provide the Platform.

================================================================================
ARTICLE 12: INDEMNIFICATION

12.1 USER INDEMNIFICATION
You agree to indemnify, defend, and hold harmless McDone, its officers, directors, employees, agents, affiliates, and partners from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including attorney's fees) arising from:
(a) Your use of the Platform;
(b) Your violation of these Terms;
(c) Your violation of any third-party rights;
(d) Your violation of any applicable law;
(e) Content you post or transmit through the Platform;
(f) Your negligent or wrongful conduct.

================================================================================
PART E: DISPUTE RESOLUTION
================================================================================

ARTICLE 13: DISPUTE RESOLUTION PROCEDURES

13.1 INFORMAL RESOLUTION
Before initiating formal proceedings, parties agree to:
(a) Attempt direct resolution through good-faith negotiation;
(b) Contact McDone customer support for mediation assistance;
(c) Allow thirty (30) days for informal resolution attempts.

13.2 FORMAL ARBITRATION
If informal resolution fails:
(a) Disputes shall be resolved through binding arbitration;
(b) Arbitration shall be conducted in accordance with the Arbitration Act of Kenya;
(c) The arbitration seat shall be Nairobi, Kenya;
(d) Proceedings shall be in English;
(e) The arbitrator's decision shall be final and binding.

13.3 CLASS ACTION WAIVER
YOU AGREE TO RESOLVE DISPUTES ONLY ON AN INDIVIDUAL BASIS AND WAIVE ANY RIGHT TO PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS, OR REPRESENTATIVE ACTIONS.

13.4 SMALL CLAIMS COURT
Notwithstanding the above, either party may bring individual claims in small claims court where applicable.

================================================================================
PART F: INTELLECTUAL PROPERTY
================================================================================

ARTICLE 14: INTELLECTUAL PROPERTY RIGHTS

14.1 MCDONE'S INTELLECTUAL PROPERTY
All content on the Platform, including but not limited to:
(a) Logos, trademarks, and service marks;
(b) Website design and user interface;
(c) Software, algorithms, and code;
(d) Text, graphics, and multimedia content;
is the exclusive property of McDone or its licensors and is protected by intellectual property laws.

14.2 USER CONTENT LICENSE
By posting content on the Platform, you grant McDone a:
(a) Non-exclusive, royalty-free, worldwide license;
(b) Right to use, copy, modify, distribute, and display such content;
(c) License that survives account termination for archival purposes.

14.3 RESTRICTIONS
Users may not:
(a) Copy, reproduce, or distribute Platform content without permission;
(b) Reverse engineer or decompile Platform software;
(c) Remove or alter proprietary notices;
(d) Use McDone's trademarks without authorization.

================================================================================
PART G: PRIVACY AND DATA PROTECTION
================================================================================

ARTICLE 15: PRIVACY AND DATA PROTECTION

15.1 PRIVACY POLICY
Your use of the Platform is also governed by our Privacy Policy, which is incorporated herein by reference.

15.2 DATA PROTECTION COMPLIANCE
McDone complies with:
(a) The Kenya Data Protection Act, 2019;
(b) Applicable data protection regulations;
(c) Industry-standard security practices.

15.3 DATA COLLECTION
McDone collects and processes personal data as necessary to:
(a) Provide Platform services;
(b) Process payments;
(c) Communicate with users;
(d) Improve services;
(e) Comply with legal obligations.

================================================================================
PART H: GENERAL PROVISIONS
================================================================================

ARTICLE 16: MODIFICATIONS TO TERMS

16.1 RIGHT TO MODIFY
McDone reserves the right to modify these Terms at any time at its sole discretion.

16.2 NOTIFICATION
Material changes will be notified through:
(a) Email to registered users;
(b) Platform notifications;
(c) Website announcements.

16.3 ACCEPTANCE OF CHANGES
Continued use of the Platform after notification constitutes acceptance of modified Terms.

================================================================================
ARTICLE 17: TERMINATION

17.1 TERMINATION BY USER
You may terminate your account at any time by:
(a) Using the account deletion feature;
(b) Contacting customer support.

17.2 TERMINATION BY MCDONE
McDone may terminate or suspend your account:
(a) For violation of these Terms;
(b) For fraudulent or illegal activity;
(c) At its sole discretion with reasonable notice;
(d) Immediately for serious violations.

17.3 EFFECT OF TERMINATION
Upon termination:
(a) Your right to use the Platform ceases;
(b) Existing Booking obligations remain enforceable;
(c) Provisions intended to survive termination shall survive.

================================================================================
ARTICLE 18: GOVERNING LAW AND JURISDICTION

18.1 GOVERNING LAW
These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya, without regard to conflict of law principles.

18.2 JURISDICTION
Subject to the arbitration provisions, any legal proceedings shall be brought exclusively in the courts of the Republic of Kenya, and you hereby consent to such jurisdiction.

================================================================================
ARTICLE 19: MISCELLANEOUS PROVISIONS

19.1 ENTIRE AGREEMENT
These Terms, together with the Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and McDone.

19.2 SEVERABILITY
If any provision is found invalid or unenforceable, the remaining provisions shall continue in full force and effect.

19.3 WAIVER
Failure to enforce any provision shall not constitute a waiver of that provision or any other provision.

19.4 ASSIGNMENT
McDone may assign its rights and obligations without restriction. You may not assign your rights without written consent.

19.5 NOTICES
Notices to McDone should be sent to: legal@mcdone.co.ke
Notices to users will be sent to the email address on file.

19.6 FORCE MAJEURE
McDone shall not be liable for delays or failures due to circumstances beyond reasonable control.

================================================================================
PART I: USER ACKNOWLEDGMENT AND AGREEMENT
================================================================================

ARTICLE 20: ACKNOWLEDGMENT OF RISKS AND RESPONSIBILITIES

20.1 BOOKING RESPONSIBILITY
You acknowledge and agree that:
(a) It is YOUR SOLE RESPONSIBILITY to arrive at the booked Accommodation on the confirmed Check-in Date;
(b) You must maintain communication with the Host regarding arrival times;
(c) You are responsible for arranging your own transportation to the Accommodation.

20.2 NO-SHOW CONSEQUENCES
YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT:
(a) If you fail to appear at the booked Accommodation on the Check-in Date ("No-Show"), you will forfeit the entire Booking amount;
(b) McDone shall not be held liable for any losses, costs, or inconveniences resulting from your No-Show;
(c) No refunds will be provided for No-Shows regardless of the reason for non-arrival.

20.3 FORCE MAJEURE AFFECTING GUEST
YOU ACKNOWLEDGE THAT:
(a) Personal emergencies, travel disruptions, weather conditions, or other unforeseen circumstances affecting your ability to arrive do not entitle you to a refund;
(b) Travel insurance is strongly recommended to cover such circumstances;
(c) McDone expressly disclaims any liability for circumstances preventing your arrival.

================================================================================
ARTICLE 21: WAIVER OF CLAIMS AND LEGAL PROTECTION

21.1 COMPREHENSIVE WAIVER
BY USING THE MCDONE PLATFORM AND/OR MAKING A BOOKING, YOU EXPRESSLY ACKNOWLEDGE, AGREE, AND WARRANT THAT:

(a) MCDONE ENTERPRISES SHALL NOT BE HELD RESPONSIBLE, LIABLE, OR ACCOUNTABLE IN ANY COURT OF LAW, TRIBUNAL, OR ARBITRATION FORUM FOR:
    - Your failure to appear at a booked Accommodation;
    - Any travel disruptions, delays, or cancellations affecting your ability to arrive;
    - Any personal, medical, or family emergencies preventing your arrival;
    - Any financial losses incurred due to your inability to use a Booking;
    - Any consequential damages arising from unused Bookings;
    - Disputes between you and Hosts regarding Accommodation quality;
    - Acts of God, natural disasters, or force majeure events;
    - Third-party actions or failures (airlines, transport providers, etc.);
    - Loss or theft of personal belongings at Accommodations;
    - Personal injury occurring at Accommodations (except due to gross negligence).

(b) YOU WAIVE ANY AND ALL CLAIMS against McDone relating to the matters described above and agree not to initiate legal proceedings against McDone for such matters.

(c) YOU ACKNOWLEDGE that this waiver is a material inducement for McDone to provide its services to you and that McDone has relied upon this waiver in entering into this Agreement.

21.2 ACKNOWLEDGMENT OF LEGAL EFFECT
YOU ACKNOWLEDGE THAT:
(a) You have read and fully understand this waiver;
(b) You have had the opportunity to seek independent legal advice;
(c) You voluntarily agree to this waiver with full knowledge of its consequences;
(d) This waiver is binding upon you, your heirs, successors, and assigns.

21.3 SURVIVAL
The waivers and limitations of liability contained in this Agreement shall survive termination of your account and remain in effect indefinitely.

================================================================================
ARTICLE 22: CONTACT INFORMATION

For questions, concerns, or complaints regarding these Terms or the Platform, contact:

McDone Enterprises
Legal Department
Email: legal@mcdone.co.ke
Customer Support: support@mcdone.co.ke
Phone: +254 700 000 000
Physical Address: Nairobi, Kenya

================================================================================

ACKNOWLEDGMENT

BY CLICKING "I AGREE" OR BY ACCESSING AND USING THE MCDONE PLATFORM, YOU ACKNOWLEDGE THAT:

1. You have read these Terms and Conditions in their entirety;
2. You understand all provisions contained herein;
3. You agree to be legally bound by these Terms;
4. You accept the limitations of liability and waivers described herein;
5. You will not hold McDone Enterprises liable in any court of law for matters covered by these Terms, including but not limited to no-shows, travel disruptions, or Accommodation disputes.

================================================================================
© ${new Date().getFullYear()} McDone Enterprises. All Rights Reserved.
Document Version 2.0 | Effective: December 2024
================================================================================
  `.trim();

  const downloadPDF = () => {
    const blob = new Blob([termsContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "McDone_Terms_and_Conditions.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Terms & Conditions downloaded successfully");
  };

  const handleAcceptTerms = () => {
    if (agreed) {
      toast.success("You have accepted the Terms & Conditions");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-24 max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
            <Button onClick={downloadPDF} variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Download PDF
            </Button>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              <strong>Effective Date:</strong> December 2024 | <strong>Version:</strong> 2.0
            </p>

            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Important Legal Notice</p>
                  <p className="text-sm text-muted-foreground">
                    Please read these Terms carefully before using McDone. By using our Platform, you agree to be legally bound by these Terms, including limitations of liability and waivers.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Part A: General Provisions</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 1: Introduction and Acceptance</h3>
            <p>These Terms and Conditions ("Terms") constitute a legally binding agreement between you and McDone Enterprises ("McDone"), governing your access to and use of the McDone booking platform, website, mobile applications, and related services.</p>
            <p><strong>By using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.</strong></p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 2: Definitions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Accommodation"</strong> - Any property listed on the Platform (hotels, apartments, villas, guesthouses, etc.)</li>
              <li><strong>"Booking"</strong> - A confirmed reservation made through the Platform</li>
              <li><strong>"Host"</strong> - Any individual or entity that lists Accommodation</li>
              <li><strong>"Guest/Traveler"</strong> - Any individual who makes a Booking</li>
              <li><strong>"No-Show"</strong> - Guest's failure to arrive without prior cancellation</li>
              <li><strong>"Service Fee"</strong> - Fees charged by McDone for facilitating Bookings</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 3: Eligibility</h3>
            <p>You must be at least 18 years old and have legal capacity to enter into contracts. You are responsible for maintaining account security and for all activities under your account.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Part B: Booking and Payment Terms</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 4: Booking Process</h3>
            <p>Bookings are confirmed upon successful payment and receipt of confirmation. McDone acts as an intermediary and does not own or operate Accommodations.</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 5: Payment Terms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Payment Methods:</strong> M-Pesa (primary), Credit/Debit Cards via Stripe</li>
              <li><strong>Currency:</strong> All prices in Kenyan Shillings (KES) unless stated otherwise</li>
              <li><strong>Service Fees:</strong> Disclosed before payment confirmation, non-refundable</li>
              <li><strong>Security:</strong> All payments processed through secure, encrypted channels</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 6: Cancellation and Refund Policy</h3>
            <div className="bg-muted p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Free Cancellation:</strong> More than 48 hours before check-in - Full refund (less Service Fees)</li>
                <li><strong>Late Cancellation:</strong> Within 48 hours - 50% cancellation fee</li>
                <li><strong>Same-Day Cancellation:</strong> 100% of booking amount charged</li>
                <li><strong>No-Shows:</strong> Full booking amount forfeited, NO REFUND</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Part C: User Responsibilities</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 7: Host Responsibilities</h3>
            <p>Hosts must provide accurate listing information, maintain Accommodations in advertised condition, comply with all applicable laws, obtain necessary permits, and maintain adequate insurance.</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 8: Guest Responsibilities</h3>
            <p>Guests must treat Accommodations with care, not exceed occupancy limits, comply with House Rules, report any damage immediately, and refrain from illegal activities.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Part D: Liability and Disclaimers</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 10: McDone's Role</h3>
            <p>McDone operates as a neutral intermediary platform. We do not own, operate, or control listed Accommodations and do not guarantee their quality, safety, or legality.</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Article 11: Limitation of Liability</h3>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
              <p className="font-semibold text-destructive mb-2">IMPORTANT LIMITATIONS:</p>
              <p>THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES. McDone shall not be liable for:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Personal injury or property damage at Accommodations</li>
                <li>Actions of Hosts, Guests, or third parties</li>
                <li>Platform interruptions or security breaches</li>
              </ul>
              <p className="mt-2"><strong>Maximum Liability:</strong> Service Fees paid in the preceding 12 months or USD 100, whichever is greater.</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Part E: Dispute Resolution</h2>
            <p>Disputes shall first be resolved through good-faith negotiation. If unresolved, binding arbitration shall be conducted in Nairobi, Kenya under Kenyan law. You waive any right to class action.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Part F: Governing Law</h2>
            <p>These Terms are governed by the laws of the Republic of Kenya. Legal proceedings shall be brought exclusively in Kenyan courts.</p>

            <h2 className="text-xl font-semibold mt-8 mb-3">Part I: User Acknowledgment and Agreement</h2>

            <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6 my-6">
              <h3 className="text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                CRITICAL: Waiver of Claims and Legal Protection
              </h3>
              
              <p className="font-semibold mb-3">BY USING THE MCDONE PLATFORM, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT:</p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">20.1 Booking Responsibility</p>
                  <p>It is YOUR SOLE RESPONSIBILITY to arrive at the booked Accommodation on the confirmed Check-in Date. McDone shall not be held liable for any No-Shows.</p>
                </div>
                
                <div>
                  <p className="font-semibold">20.2 No-Show Consequences</p>
                  <p>If you fail to appear at the booked Accommodation on the Check-in Date, you will forfeit the entire Booking amount. NO REFUNDS will be provided for No-Shows regardless of the reason.</p>
                </div>
                
                <div>
                  <p className="font-semibold">21.1 Comprehensive Waiver</p>
                  <p><strong>MCDONE ENTERPRISES SHALL NOT BE HELD RESPONSIBLE, LIABLE, OR ACCOUNTABLE IN ANY COURT OF LAW, TRIBUNAL, OR ARBITRATION FORUM FOR:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Your failure to appear at a booked Accommodation</li>
                    <li>Any travel disruptions, delays, or cancellations affecting your arrival</li>
                    <li>Personal, medical, or family emergencies preventing your arrival</li>
                    <li>Financial losses from inability to use a Booking</li>
                    <li>Disputes between you and Hosts regarding Accommodation quality</li>
                    <li>Acts of God, natural disasters, or force majeure events</li>
                    <li>Third-party failures (airlines, transport providers, etc.)</li>
                    <li>Loss or theft of personal belongings at Accommodations</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-semibold">21.2 Acknowledgment of Legal Effect</p>
                  <p>You acknowledge that this waiver is binding, you have had opportunity to seek legal advice, and you voluntarily agree with full knowledge of its consequences.</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Contact Information</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>McDone Enterprises - Legal Department</strong></p>
              <p>Email: legal@mcdone.co.ke</p>
              <p>Customer Support: support@mcdone.co.ke</p>
              <p>Phone: +254 700 000 000</p>
              <p>Address: Nairobi, Kenya</p>
            </div>

            {/* Agreement Checkbox Section */}
            <div className="mt-10 p-6 bg-primary/5 border-2 border-primary rounded-lg">
              <h3 className="text-xl font-bold mb-4">Acknowledgment and Agreement</h3>
              
              <div className="flex items-start space-x-3 mb-4">
                <Checkbox
                  id="terms-agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                  className="mt-1"
                />
                <label htmlFor="terms-agreement" className="text-sm leading-relaxed cursor-pointer">
                  <strong>I have read, understood, and agree to be bound by these Terms and Conditions.</strong> I acknowledge that:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>It is my sole responsibility to arrive at booked Accommodations on time</li>
                    <li>No-shows will result in full forfeiture of the booking amount with no refund</li>
                    <li>McDone Enterprises shall not be held liable in any court of law for inconveniences including but not limited to my failure to appear at premises, travel disruptions, or Accommodation disputes</li>
                    <li>I waive any and all claims against McDone for matters covered by these Terms</li>
                    <li>This agreement is legally binding upon me, my heirs, successors, and assigns</li>
                  </ul>
                </label>
              </div>
              
              <Button 
                onClick={handleAcceptTerms}
                disabled={!agreed}
                className="w-full md:w-auto"
                size="lg"
              >
                I Accept the Terms & Conditions
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              © {new Date().getFullYear()} McDone Enterprises. All Rights Reserved. | Document Version 2.0
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;