import KeyValueTable from "./KeyValueTable";

import type { KeyValuePair } from "../../types/ApiRequest";

type Props = {
    value: KeyValuePair[];
    onChange: (items: KeyValuePair[]) => void;
};

export default function QueryParamsEditor({
    value,
    onChange,
}: Props) {
    return (
        <KeyValueTable
            items={value}
            onChange={onChange}
        />
    );
}