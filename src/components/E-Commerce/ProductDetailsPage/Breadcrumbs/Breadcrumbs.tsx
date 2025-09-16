
interface BreadcrumbItem {
  label: string;
  link?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <div className="mt-8 font-Montserrat">
      <ol className="flex flex-wrap gap-2 text-[#888] text-base font-medium leading-6">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          return (
            <li key={index} className="flex items-center capitalize">
              {!isLastItem ? (
                <span className="">
                  {item.label}
                </span>
              ) : (
                <span className="font-semibold text-[#454545]">
                  {item.label}
                </span>
              )}
              {!isLastItem && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default Breadcrumbs;
