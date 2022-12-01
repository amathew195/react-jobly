import { useNavigate } from 'react-router-dom';
import './CompanyCard.css';
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

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/companies/${company.handle}`);
  }

  return (
    <div onClick={handleClick} className="CompanyCard card">
      <div className="card-body">
        <h6>{company.name}</h6>
        <p><small>{company.description}</small></p>
        {company.logoUrl &&
          <img
            src={company.logoUrl}
            alt="logo"
            className="float-end ms-5 position-absolute top-0 end-0 p-2"></img>}
      </div>
    </div>
  );
}

export default CompanyCard;