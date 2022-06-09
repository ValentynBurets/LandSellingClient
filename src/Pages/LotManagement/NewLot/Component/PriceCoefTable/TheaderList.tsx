import React from "react";
import { Trans } from "react-i18next";

interface TheaderListProps {
  isCustomer?: boolean;
}

function TheaderList(props: TheaderListProps) {
  return (
    <thead>
      <tr className="text-center">
        <th>
          <Trans i18nKey="Number">Number</Trans>
        </th>
        <th>
          <Trans i18nKey="Months">Months</Trans>
        </th>
        <th>
          <Trans i18nKey="Cost">Cost</Trans>
        </th>
        <th>
        </th>
      </tr>
    </thead>
  );
}

export default TheaderList;
