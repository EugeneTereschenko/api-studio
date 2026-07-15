type Props = {
    data: unknown;
};

export default function ResponseBody({ data }: Props) {
    return (
        <pre
            style={{
                background: "#222",
                color: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                overflow: "auto",
            }}
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}