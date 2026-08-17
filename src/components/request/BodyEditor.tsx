type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function BodyEditor({
    value,
    onChange,
}: Props) {
    return (
        <div>
            <h3>Request Body</h3>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Request body..."
                rows={10}
                style={{
                    width: "100%",
                    fontFamily: "monospace",
                    padding: "10px",
                    boxSizing: "border-box",
                }}
            />
        </div>
    );
}