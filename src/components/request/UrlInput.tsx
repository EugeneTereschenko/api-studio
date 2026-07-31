type Props = {
    value: string;
    onChange: (url: string) => void;
};

export default function UrlInput({
    value,
    onChange,
}: Props) {
    return (
        <input
            style={{ flex: 1 }}
            value={value}
            placeholder="https://api.example.com"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}