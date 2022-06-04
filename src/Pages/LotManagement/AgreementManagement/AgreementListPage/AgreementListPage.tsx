import React from "react";

import style from "./AgreementListPageStyle.module.sass"
import MyLotAgreementsListAsCustomer from "./Components/MyLotAgreementsListAsCustomer/MyLotAgreementsListAsCustomer";
import MyLotAgreementsList from "./Components/MyLotAgreementsList/MyLotAgreementsList";

interface AgreementPageProps {}

function AgreementListPage(props: AgreementPageProps) {

  return (
    <div className={style.page_wraper}>
      <MyLotAgreementsList/>
      <MyLotAgreementsListAsCustomer/>
    </div>
  );
}

export default AgreementListPage;
