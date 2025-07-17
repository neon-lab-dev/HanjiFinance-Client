/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import ReadyToInvest from "../../components/Shared/ReadyToInvest/ReadyToInvest";
import { contents } from "./content.aboutUs";

const AboutUs = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="About Us" />

      <div className="bg-gradient-terms-and-conditions pt-[30px]">
        <Container>
          <div className="flex flex-col gap-8">
            {contents?.map((item, index) => (
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
                <div>
                  {item?.details?.map((detail: any, index: number) => (
                    <div key={index}>
                      {detail?.pointersMainHeading && (
                        <p className="text-neutral-20 text-sm font-semibold leading-5 mt-2">
                          {detail?.pointersMainHeading}
                        </p>
                      )}
                      {detail?.pointersTitle && (
                        <p className="text-neutral-20 text-sm font-medium leading-5 mt-2">
                          {detail?.pointersTitle}
                        </p>
                      )}
                      {detail?.pointersSubTitle && (
                        <p className="text-neutral-20 text-sm leading-5 mt-1">
                          {detail?.pointersSubTitle}
                        </p>
                      )}
                      {detail?.pointers && (
                        <div className="flex flex-col mt-4">
                          {detail?.pointers?.map(
                            (pointer: string, index: number) => (
                              <div
                                key={index}
                                className="text-neutral-20 text-sm leading-5"
                              >
                                {pointer}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
          <div className="bg-gradient-section-blur h-[113px] w-full"></div>
      </div>
      <ReadyToInvest />
    </div>
  );
};

export default AboutUs;
