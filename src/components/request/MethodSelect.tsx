import type { HttpMethod } from "../../types/HttpMethod";

type Props = {
    value: HttpMethod;
    onChange: (method: HttpMethod) => void;
};

export default function MethodSelect({
    value,
    onChange,
}: Props) {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value as HttpMethod)
            }
        >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
        </select>
    );
}