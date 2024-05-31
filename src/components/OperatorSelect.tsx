import { Operator } from '../interfaces';

interface OperatorSelectProps {
    selectedOperatorId: string | null;
    operators: Operator[];
    handleOperatorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OperatorSelect: React.FC<OperatorSelectProps> = ({ selectedOperatorId, operators, handleOperatorChange }) => {
    const renderOperatorOptions = () => {
        return operators.map(operator => (
            <option key={operator.id} value={operator.id}>
                {operator.text}
            </option>
        ));
    };

    return (
        <select value={selectedOperatorId !== null ? selectedOperatorId : ''} onChange={handleOperatorChange}>
            <option value="">Select Operator</option>
            {renderOperatorOptions()}
        </select>
    );
};

export default OperatorSelect;
