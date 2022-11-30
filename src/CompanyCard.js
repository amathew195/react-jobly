
/**
 * This component renders details for each company.
 *
 * Props: company (object containing company details)
 *  Ex. {description, handle,logoUrl, name, numEmployees}
 *
 * State: none
 *
 * Company List -> Company Card
 */

function CompanyCard({ company }) {

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.logoUrl && <img src={`${company.logoUrl}`} alt="logo"></img>}
    </div>
  );
}

export default CompanyCard;