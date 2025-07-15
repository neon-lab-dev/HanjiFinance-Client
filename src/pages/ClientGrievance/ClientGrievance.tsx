import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";

const ClientGrievance = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="Client Grievance Redressal Mechanism" />

      <div className="bg-gradient-terms-and-conditions py-[30px]">
        <Container>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-secondary-15 text-xl font-bold leading-6">
                Step 1
              </h1>
              <h2 className="text-neutral-20 text-[17px] font-semibold leading-5 mt-4">
                Internal Resolution
              </h2>
              <p className="text-neutral-20 text-sm leading-5 mt-2">
                Email your concern to hanjifinanceteam@gmail.com with subject
                line “Grievance – [Your Name] – [Order/Client ID]”. We aim to
                resolve all issues within 15 working days.
              </p>
            </div>

            <div>
              <h1 className="text-secondary-15 text-xl font-bold leading-6">
                Step 2
              </h1>
              <h2 className="text-neutral-20 text-[17px] font-semibold leading-5 mt-4">
                Escalation
              </h2>
              <p className="text-neutral-20 text-sm leading-5 mt-2">
                If you are not satisfied with our response, write to:
              </p>
              <p className="text-neutral-20 text-sm leading-5 mt-2">
                Grievance Officer
                <br />
                Amandeep Singh Juneja
                <br />
                Email:hanjifinanceteam@gmail.com
              </p>
            </div>

            <div>
              <h1 className="text-secondary-15 text-xl font-bold leading-6">
                Step 3
              </h1>
              <h2 className="text-neutral-20 text-[17px] font-semibold leading-5 mt-4">
                SEBI SCORES Platform
              </h2>
              <p className="text-neutral-20 text-sm leading-5 mt-2">
                For advisory-related complaints that remain unresolved after 30
                days, registered clients may escalate via SEBI SCORES
                (https://scores.gov.in) quoting our RIA Registration Number.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ClientGrievance;
