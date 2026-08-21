type Props = {
    data: unknown;
};

export default function ResponseBody({ data }: Props) {
    return <pre className="code-block">{JSON.stringify(data, null, 2)}</pre>;
}
