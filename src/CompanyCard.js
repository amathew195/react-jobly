

function CompanyCard({company}) {
  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.logoUrl && <img src={`${company.logoUrl}`} alt="logo"></img>}
    </div>
  )
}

export default CompanyCard;