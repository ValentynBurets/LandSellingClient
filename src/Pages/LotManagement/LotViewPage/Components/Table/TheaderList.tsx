import React from "react";
import { Trans } from "react-i18next";

function TheaderList() {
  return (
    <thead>
      <tr className="text-center">
        <th>
          <Trans i18nKey="Number">Number</Trans>
        </th>
        <th>
          <Trans i18nKey="LotViewMonths">Months</Trans>
        </th>
        <th>
          <Trans i18nKey="LotViewPrice">Price</Trans>
        </th>
        <th></th>
      </tr>
    </thead>
  );
}

export default TheaderList;
