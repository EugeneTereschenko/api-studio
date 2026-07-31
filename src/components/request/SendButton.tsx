type Props = {
    onClick: () => void;
};

export default function SendButton({
    onClick,
}: Props) {
    return (
        <button onClick={onClick}>
            Send
        </button>
    );
}