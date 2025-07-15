import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";

const TermsAndConditions = () => {
  const content = [
    {
      title: "Acceptance of Terms",
      description:
        "By accessing this website or using our services, you agree to be bound by the following Terms and Conditions. These govern all use of <a href='https://www.hanjifinance.com' class='text-blue-500 underline'>www.hanjifinance.com </a> and its associated offerings. If you do not agree, kindly refrain from using the site.",
    },

    {
      title: "Who We Are",
      description:
        "Hanjifinance is owned and operated by Amandeep Singh Juneja, a SEBI-Registered Investment Adviser (RIA), providing services in full compliance with the SEBI (Investment Advisers) Regulations, 2013.",
      pointersTitle: "Our services include:",
      pointersSubTitle:
        "SEBI-registered investment advisory (non-discretionary, fee-based advice)",
      pointers: [
        "Educational content through courses and workshops",
        "Community-based discussions (e.g., WhatsApp group with no stock tips or calls)",
        "One-on-one financial consultation sessions",
        "Merchandise sales (apparel, mugs, posters, etc.)",
      ],
    },
    {
      title: "Payments & Pricing",
      description:
        "All prices on the website are in INR unless otherwise stated. All prices are quoted as net offering, GST and additional chargers like delivery costs (if applicable) will be charged extra at checkout unless stated otherwise. Payments are processed securely via Razorpay. We reserve the right to modify pricing, plans, or offerings without prior notice.",
    },
    {
      title: "Refund & Cancellation Policy",
      pointers: [
        "Digital products (courses, newsletters, community access, advisory consultations) are non-refundable once purchased.",
        "For merchandise, refer to the Refund Policy page.",
        "For payment errors or technical issues, contact hanjifinanceteam@gmail.com within 48 hours.",
      ],
    },
    {
      title: "Advisory Code of Conduct",
      description:
        "As a SEBI RIA, we operate under the fiduciary principle — meaning your interest comes first. We do not accept commissions, brokerage, referral fees, or any incentive-based payments.",
      pointersTitle: "All advice is:",
      pointers: [
        "Customised based on your risk profile.",
        "Issued only after completing required KYC & suitability assessment.",
        "Non-discretionary (you retain full control of execution).",
      ],
    },
    {
      title: "User Responsibilities",
      description: "You agree to:",
      pointers: [
        "Provide accurate and honest information for risk profiling.",
        "Use the services for personal use only.",
        "Not redistribute paid content or reports without permission.",
        "Respect the no-recommendation zone in community groups.",
      ],
      footerText : "Violation may result in termination of access without refund."
    },
    {
      title: "Intellectual Property",
      description: "All original content on this site (videos, PDFs, reports, templates) is the property of Hanjifinance. You may not reuse, republish, or resell any content without written consent.",
    },
    {
      title: "Limitation of Liability",
      description: "Financial markets involve risk. While advisory is provided with diligence and compliance, we do not guarantee returns or investment performance. You agree to use the information at your own discretion. Past performance is not indicative of future results.",
    },
    {
      title: "Regulatory Disclosures",
      description: "Hanjifinance is in full compliance with SEBI Investment Adviser regulations. For unresolved grievances, clients may escalate through the SEBI SCORES platform.",
    },
    {
      title: "Governing Law",
      description: "These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Gwalior , India.",
    },
    {
      title: "Contact",
      description: "<p>For any clarification or grievance, <br/> Contact: <a href='mailto:hanjifinanceteam@gmail.com' class='text-blue-500 underline'>hanjifinanceteam@gmail.com</a></p>",
    },
    {
      title: "Payments & Pricing",
      description: "All prices on the website are in INR unless otherwise stated. All prices are quoted as net offering, GST and additional chargers like delivery costs (if applicable) will be charged extra at checkout unless stated otherwise. Payments are processed securely via Razorpay. We reserve the right to modify pricing, plans, or offerings without prior notice.",
    },
  ];
  return (
    <div className="font-Montserrat">
      <ReusableHero title="Terms and Conditions" />

      <div className="bg-gradient-terms-and-conditions py-[30px]">
        <Container>
          <div className="flex flex-col gap-8">
            {content?.map((item, index) => (
              <div key={index}>
                <h1 className="text-secondary-15 text-xl font-bold leading-6">
                  {item?.title}
                </h1>
                {item?.description && (
                  <p
                    className="text-neutral-20 text-sm leading-5 mt-4"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
                {item?.pointersTitle && (
                  <p className="text-neutral-20 text-sm font-medium leading-5 mt-2">
                    {item?.pointersTitle}
                  </p>
                )}
                {item?.pointersSubTitle && (
                  <p className="text-neutral-20 text-sm leading-5 mt-1">
                    {item?.pointersSubTitle}
                  </p>
                )}
                {item?.pointers && (
                  <div className="flex flex-col">
                    {item?.pointers?.map((pointer, index) => (
                      <div
                        key={index}
                        className="text-neutral-20 text-sm leading-5 mt-1 flex items-center gap-3"
                      >
                        <div className="size-1 rounded-full bg-neutral-30"></div>{" "}
                        {pointer}
                      </div>
                    ))}
                  </div>
                )}
                {item?.footerText && (
                  <p className="text-neutral-20 text-sm leading-5 mt-1">
                    {item?.footerText}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TermsAndConditions;
