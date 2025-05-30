import { SubscribeTip, TitleExtra } from "next-common/components/overview";
import ListLayout from "../ListLayout";
import Gov2SummaryFooter from "next-common/components/summary/gov2SummaryFooter";
import { useUser } from "next-common/context/user";
import { useRouter } from "next/router";
import { useChainSettings } from "next-common/context/chain";
import dynamic from "next/dynamic";

const Gov2Summary = dynamic(
  () => import("next-common/components/summary/gov2Summary"),
  { ssr: false },
);

function HeadContent() {
  return (
    <div className="md:hidden">
      <SubscribeTip />
    </div>
  );
}

/**
 * @param {import("../ListLayout").ListLayoutProps & {summaryData: Record<string, any>}} props
 * @description layout for referenda page
 */
export default function ReferendaLayout({ summaryData, ...props }) {
  const user = useUser();
  const router = useRouter();
  const { modules } = useChainSettings();

  return (
    <ListLayout
      titleExtra={<TitleExtra />}
      summary={<Gov2Summary summary={summaryData} />}
      summaryFooter={<Gov2SummaryFooter />}
      headContent={<HeadContent />}
      description="All active and history referenda of various tracks."
      tabs={[
        {
          value: "referenda",
          label: "Referenda",
          url: "/referenda",
        },
        {
          value: "tracks",
          label: "Tracks Stats",
          url: "/referenda/tracks",
        },
        user?.address && {
          value: "my_votes",
          label: "My Votes",
          url: "/referenda/votes",
        },
        {
          value: "statistics",
          label: "Statistics",
          url: "/referenda/statistics",
        },
        modules.whales && {
          value: "whales",
          label: "Whales",
          url: "/referenda/whales",
          active: router.pathname.startsWith("/referenda/whales"),
        },
      ].filter(Boolean)}
      {...props}
    >
      {props.children}
    </ListLayout>
  );
}
