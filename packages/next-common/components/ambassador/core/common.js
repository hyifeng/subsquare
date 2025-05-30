import ListLayout from "next-common/components/layout/ListLayout";
import FellowshipCoreMembersSummary from "next-common/components/fellowship/core/members/summary";
import AmbassadorSummaryActions from "next-common/components/ambassador/core/summary/actions";

export default function AmbassadorCoreCommon({ children, ...props }) {
  const title = "Ambassador Members";
  const desc =
    "The core pallet controls the overall process of induction, promotion and demotion according to the ambassador rules and timelines, and handles the retention of evidence which members and candidates submit for these processes.";
  const seoInfo = { title, desc };

  const corePath = "/ambassador/members";

  return (
    <ListLayout
      seoInfo={seoInfo}
      title={title}
      description={seoInfo.desc}
      summary={<FellowshipCoreMembersSummary />}
      summaryFooter={<AmbassadorSummaryActions />}
      tabs={[
        {
          value: "members",
          label: "Members",
          url: corePath,
          urls: [corePath, "/ambassador/members/candidates"],
          exactMatch: true,
        },
        {
          value: "params",
          label: "Params",
          url: "/ambassador/members/params",
          exactMatch: true,
        },
        {
          value: "feeds",
          label: "Feeds",
          url: "/ambassador/members/feeds",
          exactMatch: true,
        },
      ]}
      {...props}
    >
      {children}
    </ListLayout>
  );
}
