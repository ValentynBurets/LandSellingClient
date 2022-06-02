import TextData from "../../../../../../Assets/jsonData/TextData/TextData.json"

function TheaderList() {
    return (
        <thead>
            <tr className='text-center'>
                <th>{TextData.AgreementsListPage.TableOptions.Number}</th>
                <th>{TextData.AgreementsListPage.TableOptions.LotLink}</th>
                <th>{TextData.AgreementsListPage.TableOptions.CustomerLink}</th>
                <th>{TextData.AgreementsListPage.TableOptions.Description}</th>
                <th>{TextData.AgreementsListPage.TableOptions.Status}</th>
                <th>{TextData.AgreementsListPage.TableOptions.CreationDate}</th>
                <th>{TextData.AgreementsListPage.TableOptions.StartDate}</th>
                <th>{TextData.AgreementsListPage.TableOptions.EndDate}</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    )
}

export default TheaderList
