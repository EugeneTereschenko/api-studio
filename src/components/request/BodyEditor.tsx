type Props = {
    value: string;
    onChange: (body: string) => void;
};

export default function BodyEditor({
    value,
    onChange,
}: Props) {
    return (
        <textarea
            rows={12}
            style={{ 
                width: "100%",
                fontFamily: "monospace",
             }}
            value={value}
            placeholder="Request body"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
