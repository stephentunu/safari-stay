import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - McDone";
  }, []);

  const downloadPDF = () => {
    // Create PDF content
    const content = `
McDONE ENTERPRISES
TERMS AND CONDITIONS OF SERVICE

Last Updated: December 2024

1. INTRODUCTION AND ACCEPTANCE OF TERMS

1.1 These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "Guest", "Host", or "you") and McDone Enterprises ("McDone", "we", "us", or "our"), governing your access to and use of the McDone booking platform, website, mobile applications, and related services (collectively, the "Platform").

1.2 By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately discontinue use of the Platform.

2. DEFINITIONS

2.1 "Accommodation" means any property listed on the Platform, including but not limited to hotels, apartments, houses, villas, guesthouses, and hostels.

2.2 "Booking" means a confirmed reservation made through the Platform.

2.3 "Host" means any individual or entity that lists Accommodation on the Platform.

2.4 "Guest" means any individual who makes a Booking through the Platform.

2.5 "Listing" means any Accommodation advertised on the Platform.

3. ELIGIBILITY

3.1 You must be at least 18 years of age to use the Platform.

3.2 By using the Platform, you represent and warrant that you have the legal capacity to enter into binding contracts.

4. ACCOUNT REGISTRATION

4.1 To access certain features, you must create an account with accurate, current, and complete information.

4.2 You are responsible for maintaining the confidentiality of your account credentials.

4.3 You accept responsibility for all activities that occur under your account.

5. BOOKING AND PAYMENTS

5.1 Booking Confirmation: A booking is only confirmed upon receipt of full payment and confirmation from the Host.

5.2 Payment Methods: We accept payments via M-Pesa and credit/debit cards through secure payment processors.

5.3 Pricing: All prices are displayed in Kenyan Shillings (KES) unless otherwise stated and include applicable taxes.

5.4 Service Fees: McDone may charge service fees for facilitating bookings. These fees will be disclosed before payment.

6. CANCELLATION AND REFUND POLICY

6.1 Cancellation by Guest:
    a) Free cancellation up to 48 hours before check-in for most properties
    b) Cancellations within 48 hours may incur a cancellation fee as specified in the listing
    c) No-shows will be charged the full booking amount

6.2 Cancellation by Host:
    a) Hosts who cancel confirmed bookings may face penalties including reduced visibility
    b) Guests will receive a full refund for Host cancellations

6.3 Refund Processing:
    a) Refunds will be processed within 7-14 business days
    b) M-Pesa refunds will be credited to the original payment number
    c) Card refunds will be credited to the original card

7. HOST RESPONSIBILITIES

7.1 Hosts must:
    a) Provide accurate and truthful listing information
    b) Maintain the Accommodation in the condition advertised
    c) Comply with all applicable laws and regulations
    d) Obtain necessary permits and licenses
    e) Maintain adequate insurance coverage

7.2 Hosts agree to indemnify McDone against any claims arising from their listings.

8. GUEST RESPONSIBILITIES

8.1 Guests must:
    a) Use Accommodations responsibly and respectfully
    b) Not exceed the maximum occupancy stated in the listing
    c) Report any damage immediately
    d) Comply with House Rules specified by the Host
    e) Not engage in illegal activities

8.2 Guests are liable for any damage caused during their stay.

9. PROHIBITED ACTIVITIES

9.1 Users shall not:
    a) Post false, misleading, or fraudulent content
    b) Use the Platform for illegal purposes
    c) Harass or discriminate against other users
    d) Attempt to circumvent payment systems
    e) Copy, modify, or distribute Platform content without permission
    f) Use automated systems to access the Platform

10. INTELLECTUAL PROPERTY

10.1 All content on the Platform, including logos, designs, and software, is the property of McDone or its licensors.

10.2 Users retain ownership of content they post but grant McDone a license to use such content for Platform operations.

11. LIMITATION OF LIABILITY

11.1 McDone provides the Platform "as is" and disclaims all warranties to the maximum extent permitted by law.

11.2 McDone shall not be liable for:
    a) The quality, safety, or legality of Accommodations
    b) The accuracy of listing information provided by Hosts
    c) The actions or inactions of Hosts or Guests
    d) Any indirect, incidental, or consequential damages

11.3 Our total liability shall not exceed the amount of service fees paid by you in the 12 months preceding the claim.

12. DISPUTE RESOLUTION

12.1 Users agree to first attempt to resolve disputes directly with the other party.

12.2 If direct resolution fails, users may request mediation through McDone's customer support.

12.3 Unresolved disputes shall be submitted to binding arbitration under Kenyan law.

12.4 The arbitration shall take place in Nairobi, Kenya.

13. INDEMNIFICATION

13.1 You agree to indemnify and hold harmless McDone, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Platform or violation of these Terms.

14. PRIVACY AND DATA PROTECTION

14.1 Your use of the Platform is also governed by our Privacy Policy.

14.2 We comply with the Kenya Data Protection Act and applicable data protection laws.

15. MODIFICATIONS TO TERMS

15.1 McDone reserves the right to modify these Terms at any time.

15.2 Material changes will be notified via email or Platform notification.

15.3 Continued use of the Platform after modifications constitutes acceptance of updated Terms.

16. TERMINATION

16.1 Either party may terminate this agreement at any time.

16.2 McDone may suspend or terminate accounts for violations of these Terms.

16.3 Termination does not affect existing booking obligations.

17. GOVERNING LAW

17.1 These Terms shall be governed by the laws of the Republic of Kenya.

17.2 Any disputes shall be subject to the exclusive jurisdiction of Kenyan courts.

18. SEVERABILITY

18.1 If any provision of these Terms is found invalid, the remaining provisions shall continue in effect.

19. CONTACT INFORMATION

For questions regarding these Terms, contact us at:

McDone Enterprises
Email: legal@mcdone.co.ke
Phone: +254 700 000 000
Address: Nairobi, Kenya

20. ACKNOWLEDGMENT

By using the McDone Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.

---
© ${new Date().getFullYear()} McDone Enterprises. All rights reserved.
    `.trim();

    // Create blob and download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "McDone_Terms_and_Conditions.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
            <Button onClick={downloadPDF} variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Download PDF
            </Button>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">Last Updated: December 2024</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction and Acceptance of Terms</h2>
            <p>These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "Guest", "Host", or "you") and McDone Enterprises ("McDone", "we", "us", or "our"), governing your access to and use of the McDone booking platform.</p>
            <p>By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Accommodation"</strong> means any property listed on the Platform</li>
              <li><strong>"Booking"</strong> means a confirmed reservation made through the Platform</li>
              <li><strong>"Host"</strong> means any individual or entity that lists Accommodation</li>
              <li><strong>"Guest"</strong> means any individual who makes a Booking</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Eligibility</h2>
            <p>You must be at least 18 years of age to use the Platform. By using the Platform, you represent and warrant that you have the legal capacity to enter into binding contracts.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Booking and Payments</h2>
            <p>A booking is only confirmed upon receipt of full payment. We accept payments via M-Pesa and credit/debit cards. All prices are in Kenyan Shillings (KES) unless otherwise stated.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Cancellation and Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free cancellation up to 48 hours before check-in for most properties</li>
              <li>Cancellations within 48 hours may incur fees as specified</li>
              <li>No-shows will be charged the full booking amount</li>
              <li>Refunds processed within 7-14 business days</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Host Responsibilities</h2>
            <p>Hosts must provide accurate listing information, maintain Accommodation as advertised, comply with all applicable laws, and maintain adequate insurance coverage.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Guest Responsibilities</h2>
            <p>Guests must use Accommodations responsibly, not exceed maximum occupancy, report any damage immediately, and comply with House Rules.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitation of Liability</h2>
            <p>McDone provides the Platform "as is" and shall not be liable for the quality, safety, or legality of Accommodations, or the actions of Hosts or Guests.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Dispute Resolution</h2>
            <p>Disputes shall first be resolved directly between parties. Unresolved disputes shall be submitted to binding arbitration under Kenyan law in Nairobi, Kenya.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the Republic of Kenya.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Information</h2>
            <p>
              McDone Enterprises<br />
              Email: legal@mcdone.co.ke<br />
              Phone: +254 700 000 000<br />
              Address: Nairobi, Kenya
            </p>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                By using the McDone Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
