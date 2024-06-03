import { Filter, Operator } from "../interfaces";

interface OperatorSelectProps {
  filter: Filter;
  operators: Operator[];
  setSelectedOperatorId: (value: string | null) => void;
}

const OperatorSelect: React.FC<OperatorSelectProps> = ({
  filter,
  operators,
  setSelectedOperatorId,
}) => {
  const { selectedOperatorId } = filter;

  const renderOperatorOptions = () => {
    return operators.map((operator) => (
      <option key={operator.id} value={operator.id}>
        {operator.text}
      </option>
    ));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOperatorId(
      event.target.value !== "" ? event.target.value : null,
    );
  };

  return (
    <select value={selectedOperatorId || ""} onChange={handleChange} aria-label="Operator Select">
      <option value="">Select Operator</option>
      {renderOperatorOptions()}
    </select>
  );
};

export default OperatorSelect;
