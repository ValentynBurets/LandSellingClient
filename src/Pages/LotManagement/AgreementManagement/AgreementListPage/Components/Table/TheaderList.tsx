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
          <Trans i18nKey="LotLink">LotLink</Trans>
        </th>
        <th>
          <Trans i18nKey="CustomerLink">CustomerLink</Trans>
        </th>
        <th>
          <Trans i18nKey="Description">Description</Trans>
        </th>
        <th>
          <Trans i18nKey="Status">Status</Trans>
        </th>
        <th>
          <Trans i18nKey="CreationDate">LotLink</Trans>
        </th>
        <th>
          <Trans i18nKey="StartDate">StartDate</Trans>
        </th>
        <th>
          <Trans i18nKey="EndDate">end date</Trans>
        </th>
      </tr>
    </thead>
  );
}

export default TheaderList;
