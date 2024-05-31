import { Operator } from '../interfaces';

interface OperatorSelectProps {
    selectedOperatorId: string | null;
    operators: Operator[];
    setSelectedOperatorId: React.Dispatch<React.SetStateAction<string | null>>;
}

const OperatorSelect: React.FC<OperatorSelectProps> = ({ selectedOperatorId, operators, setSelectedOperatorId }) => {
    const renderOperatorOptions = () => {
        return operators.map(operator => (
            <option key={operator.id} value={operator.id}>
                {operator.text}
            </option>
        ));
    };

    return (
        <select value={selectedOperatorId ?? ''} onChange={(event) => setSelectedOperatorId(event.target.value)}>
            <option value="">Select Operator</option>
            {renderOperatorOptions()}
        </select>
    );
};

export default OperatorSelect;
