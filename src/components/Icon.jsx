export default function Icon({ path, ...props }) {
    return <svg {...props} viewBox="0 0 24 24">
        <path d={path} />
    </svg>
}