import { useEndpoint } from "../ssr/useEndpoint";

export default async function LeadsForm() {
  const data = await useEndpoint("https://api.acme.com/leads");
  return (
    <div>
      <h1>Cadastro de Leads</h1>
      {data ? (
        <ul>
          {data.map((lead) => (
            <li key={lead.id}>{lead.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
