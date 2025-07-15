import Container from "../../components/Reusable/Container/Container";
import ReusableHero from "../../components/Reusable/ReusableHero/ReusableHero";
import { contents } from "./contents.tc";

const TermsAndConditions = () => {
  return (
    <div className="font-Montserrat">
      <ReusableHero title="Terms and Conditions" />

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
