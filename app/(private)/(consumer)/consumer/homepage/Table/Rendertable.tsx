// import { columns, Payment } from "./columns";
import { columns, consumerApplicationDataType } from "./column";
import { DataTable } from "./DataTable";

async function getData(): Promise<consumerApplicationDataType[]> {
  // Fetch data from your API here.
  return [
    {
      title: "asdasd3",
      rate: "400",
      dateApplied: "500",
      expectedTime: "within a week",
      status: "PENDING",
    },

    {
      title: "asdasd",
      rate: "200",
      dateApplied: "424",
      expectedTime: "within a week",
      status: "PENDING",
    },

    {
      title: "asdasd",
      rate: "800",
      dateApplied: "764",
      expectedTime: "within a week",
      status: "PENDING",
    },
    // ...
  ];
}

export default async function Rendertable() {
  const data = await getData();

  return (
    <div className="container border border-red-600 mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
