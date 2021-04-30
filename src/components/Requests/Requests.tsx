import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from "react";
import { useTable, useExpanded } from "react-table";
import { Icon, Button } from "design-react-kit";
import Api from "../../api/backoffice";
import RequestFilter from "./RequestsFilter";
import RequestStateBadge from "./RequestStateBadge";
import RequestsDetails from "./RequestsDetails";

const Requests = () => {
  const [agreements, setAgreements] = useState<any>([]);
  const refForm = useRef();

  const getAgreementsApi = async (params?: any) => {
    const response = await Api.Agreement.getAgreements(
      params.states,
      params.assignee,
      params.profileFullName,
      params.requestDateFrom,
      params.requestDateTo,
      params.pageSize,
      params.page
    );
    return response.data.items;
  };

  const getAgreements = (params?: any) => {
    // void getAgreementsApi(params).then(response => {
    //   setAgreements(response);
    // });
    setAgreements([
      {
        id: "68681220-eddd-4ba3-8600-181bbcb773fa",
        state: "AssignedAgreement",
        profile: {
          id: "14",
          agreementId: "68681220-eddd-4ba3-8600-181bbcb773fa",
          fullName: "PagoPA S.p.A",
          referent: {
            firstName: "Mario ",
            lastName: "Rossi",
            emailAddress: "CiwCiuiB@UPbHFoxL.tc",
            telephoneNumber: "123456"
          }
        },
        discounts: [
          {
            id: "16",
            agreementId: "68681220-eddd-4ba3-8600-181bbcb773fa",
            state: "draft",
            name: "dsadsad"
          },
          {
            id: "17",
            agreementId: "68681220-eddd-4ba3-8600-181bbcb773fa",
            state: "draft",
            name: "dsadsad"
          }
        ],
        documents: [
          {
            documentType: "ManifestationOfInterest",
            documentUrl:
              "userdocuments/68681220-eddd-4ba3-8600-181bbcb773fa/manifestation_of_interest.pdf",
            creationDate: "2021-04-28"
          },
          {
            documentType: "Agreement",
            documentUrl:
              "userdocuments/68681220-eddd-4ba3-8600-181bbcb773fa/agreement.pdf",
            creationDate: "2021-04-27"
          }
        ]
      }
    ]);
  };

  useEffect(() => {
    getAgreements({});
  }, []);

  const data = useMemo(() => agreements, [agreements]);
  const columns = useMemo(
    () => [
      {
        Header: "Operatore",
        accessor: "profile.fullName"
      },
      {
        Header: "Data Richiesta",
        accessor: "requestDate"
      },
      {
        Header: "Stato",
        accessor: "state",
        Cell: ({ row }) => RequestStateBadge(row.values.state)
      },
      {
        Header: "Revisore",
        accessor: "revisore"
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <Icon icon="it-expand" color="primary" />
            ) : (
              <Icon icon="it-collapse" color="primary" />
            )}
          </span>
        )
      }
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({ row: { original } }) => (
      <RequestsDetails
        updateList={() => refForm.current.submitForm()}
        original={original}
      />
    ),
    [agreements]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false
    },
    useExpanded
  );

  return (
    <section className="mt-2 px-8 py-10 bg-white">
      <RequestFilter getAgreements={getAgreements} refForm={refForm} />
      <table
        {...getTableProps()}
        style={{ width: "100%" }}
        className="mt-2 bg-white"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{
                backgroundColor: "#F8F9F9",
                borderBottom: "1px solid #5A6772"
              }}
            >
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-2 text-sm font-weight-bold text-gray text-uppercase"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map(cell => (
                    <td
                      className="px-6 py-2 border-bottom text-sm"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr className="px-8 py-4 border-bottom text-sm font-weight-normal text-black">
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {!agreements.length &&
        (refForm.current?.dirty ? (
          <div className="m-8 d-flex flex-column align-items-center">
            <p>Nessun risultato corrisponde alla tua ricerca</p>
            <Button
              color="primary"
              outline
              tag="button"
              className="mt-3"
              onClick={() => refForm.current.resetForm()}
            >
              Reimposta Tutto
            </Button>
          </div>
        ) : (
          <div className="m-8 d-flex flex-column align-items-center">
            <p>Nessuna richiesta da elaborare</p>
          </div>
        ))}
    </section>
  );
};

export default Requests;
