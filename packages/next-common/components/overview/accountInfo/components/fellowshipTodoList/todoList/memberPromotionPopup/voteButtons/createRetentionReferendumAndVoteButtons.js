import { SystemVoteAye, SystemVoteNay } from "@osn/icons/subsquare";
import CreateRetentionReferendumAndVoteButton from "./createRetentionReferendumAndVoteButton";
import {
  getMinRankOfClass,
  getTrackToRetainAtRank,
} from "next-common/context/post/fellowship/useMaxVoters";
import { useRankedCollectivePallet } from "next-common/context/collectives/collectives";
import useMyRank from "./useMyRank";
import useMemberRank from "./useMemberRank";
import { isNil } from "lodash-es";
import { SecondaryButtonWrapper } from "./referendumVoteButtons";

export function useRetentionButtonState(who) {
  const collectivePallet = useRankedCollectivePallet();
  const myRank = useMyRank();
  const currentRank = useMemberRank(who);

  let tooltipContent = "Create a new referendum and vote";
  let disabled = false;
  if (currentRank <= 0) {
    tooltipContent = "Rank retention is not allowed for candidates";
    disabled = true;
  } else if (isNil(myRank) || myRank < 3) {
    tooltipContent = "Only rank >= 3 can create a referendum and then vote";
    disabled = true;
  } else {
    const trackId = getTrackToRetainAtRank(currentRank);
    const requiredRank = getMinRankOfClass(trackId, collectivePallet);
    if (requiredRank > myRank) {
      tooltipContent = `Only rank >= ${requiredRank} can create a referendum and then vote`;
      disabled = true;
    }
  }

  return {
    tooltipContent,
    disabled,
  };
}

export default function CreateRetentionReferendumAndVoteButtons({ who }) {
  const { tooltipContent, disabled } = useRetentionButtonState(who);

  return (
    <div className="flex gap-[12px] h-[31px] items-center justify-end">
      <CreateRetentionReferendumAndVoteButton
        who={who}
        voteAye={false}
        disabled={disabled}
        tooltip={tooltipContent}
        ButtonComponent={SecondaryButtonWrapper}
      >
        <SystemVoteNay className="w-[16px]" />
      </CreateRetentionReferendumAndVoteButton>

      <CreateRetentionReferendumAndVoteButton
        who={who}
        voteAye={true}
        disabled={disabled}
        tooltip={tooltipContent}
        ButtonComponent={SecondaryButtonWrapper}
      >
        <SystemVoteAye className="w-[16px]" />
      </CreateRetentionReferendumAndVoteButton>
    </div>
  );
}
