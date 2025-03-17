import { ColumnDef } from "@tanstack/react-table";
import PageContainer from "@/common/components/layout/pages";
import { Button } from "@mui/material";
import { QueryData } from "@/common/contexts/table/QueryData";
import { useTrunks } from "@/common/sdk/hooks/useTrunks";
import { ListTrunksResponse } from "@fonster/types";

const columns: ColumnDef<ListTrunksResponse>[] = [
  {
    id: "name",
    header: "Name",
    cell: (props: { row: { original: ListTrunksResponse } }) => props.row.original.name
  },
  {
    id: "sendRegister",
    header: "Send Register",
    cell: (props: { row: { original: ListTrunksResponse } }) =>
      props.row.original.sendRegister ? "True" : "False"
  },
  {
    id: "inboundUri",
    header: "Inbound SIP",
    cell: (props: { row: { original: ListTrunksResponse } }) =>
      props.row.original.inboundUri
  },
  {
    id: "outboundUri",
    header: "Outbound SIP URI",
    cell: (props: { row: { original: ListTrunksResponse } }) =>
      props.row.original.outboundUri
  }
];

export default function TrunksPage() {
  const { listTrunks } = useTrunks();

  return (
    <PageContainer>
      <PageContainer.Header
        title="Trunks"
        actions={
          <Button variant="contained" onClick={() => { }}>
            New Trunk
          </Button>
        }
      />
      <PageContainer.Subheader>
        Configure and manage your SIP trunks. Monitor trunk status and
        performance.
      </PageContainer.Subheader>

      <PageContainer.ContentTable<ListTrunksResponse>
        columns={columns}
        tableId="trunks-table"
      >
        <QueryData<ListTrunksResponse> fetchFunction={listTrunks} pageSize={10} />
      </PageContainer.ContentTable>
    </PageContainer>
  );
}
