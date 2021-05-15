export default ({ effects, id }) => {
    if (effects.length === 0) return null;

    return (
        <filter id={id}>
            {effects.map((effect, index) => <feColorMatrix key={index} type="matrix" values={effect} />)}
        </filter>
    );
}