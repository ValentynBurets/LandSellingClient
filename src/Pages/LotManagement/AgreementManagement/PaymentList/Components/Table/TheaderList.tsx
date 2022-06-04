import React from "react";
import { Trans } from "react-i18next";

function TheaderList() {
  return (
    <thead>
      <tr className="text-center">
        <th>
          <Trans i18nKey="Date">Date</Trans>
        </th>
        <th>
          <Trans i18nKey="Value">Value</Trans>
        </th>
      </tr>
    </thead>
  );
}

export default TheaderList;
