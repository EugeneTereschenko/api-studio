import KeyValueTable from "./KeyValueTable";

import type { KeyValuePair } from "../../types/ApiRequest";

type Props = {
    items: KeyValuePair[];
    onChange: (items: KeyValuePair[]) => void;
};

export default function QueryParamsEditor({
    items,
    onChange,
}: Props) {
    return (
        <div>
            <h3>Query Parameters</h3>

            <KeyValueTable
                items={items}
                onChange={onChange}
            />
        </div>
    );
}