import React from "react";
import { Trans } from "react-i18next";

function TheaderList() {
  return (
    <thead>
      <tr className="text-center">
        <th>
          <Trans i18nKey="AdminLotListLotLink">lot link</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListOwnerLink">owner link</Trans>
        </th>
        <th style={{minWidth: "10rem"}}>
          <Trans i18nKey="AdminLotListHeader">Header</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListStatus">Status</Trans>
        </th>
        <th style={{minWidth: "30rem"}}>
          <Trans i18nKey="AdminLotListDescription">Description</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListViews">Views</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListPublicationDate">PublicationDate</Trans>
        </th>
        <th style={{minWidth: "10rem"}}>
          <Trans i18nKey="AdminLotListBuyPrice">BuyPrice</Trans>
        </th>
        <th style={{minWidth: "10rem"}}>
          <Trans i18nKey="AdminLotListMinBidPrice">MinBidPrice</Trans>
        </th>
        <th style={{minWidth: "10rem"}}>
          <Trans i18nKey="AdminLotListMinBidStep">MinBidStep</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListAuctionDuration">AuctionDuration</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListisRent">isRent</Trans>
        </th>
        <th>
          <Trans i18nKey="AdminLotListisAuction">isAuction</Trans>
        </th>
        <th style={{minWidth: "20rem"}}>
          <Trans i18nKey="AdminLotListlocation">location</Trans>
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  );
}

export default TheaderList;
