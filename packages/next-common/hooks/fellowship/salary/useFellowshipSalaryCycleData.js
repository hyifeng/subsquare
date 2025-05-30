import { isNil } from "lodash-es";
import { useCollectivesContext } from "next-common/context/collectives/collectives";
import { backendApi } from "next-common/services/nextApi";
import {
  ambassadorSalaryCycleApi,
  fellowshipSalaryCycleApi,
} from "next-common/services/url";
import { useEffect, useState } from "react";

export function useFellowshipSalaryCycleData(index) {
  const { section } = useCollectivesContext();
  let apiUrl;
  if (section === "fellowship") {
    apiUrl = fellowshipSalaryCycleApi(index);
  } else if (section === "ambassador") {
    apiUrl = ambassadorSalaryCycleApi(index);
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    if (isNil(index)) {
      return;
    }

    backendApi.fetch(apiUrl).then((resp) => {
      setData(resp.result);
    });
  }, [apiUrl, index]);

  return data;
}
