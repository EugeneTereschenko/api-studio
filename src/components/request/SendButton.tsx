type Props = {
    onClick: () => void;
    loading?: boolean;
};

export default function SendButton({
    onClick,
    loading = false,
}: Props) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
        >
            {loading ? "Sending..." : "Send"}
        </button>
    );
}