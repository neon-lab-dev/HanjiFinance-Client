/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import { contents } from "./contents.pribacyPolicy";

const PrivacyPolicy = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="Privacy Policy" />

      <div className="bg-gradient-terms-and-conditions py-[30px]">
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
                        <div className="flex flex-col">
                          {detail?.pointers?.map(
                            (pointer: string, index: number) => (
                              <div
                                key={index}
                                className="text-neutral-20 text-sm leading-5 mt-1 flex items-center gap-3"
                              >
                                <div className="size-1 rounded-full bg-neutral-30"></div>{" "}
                                {pointer}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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

export default PrivacyPolicy;
