/* eslint-disable max-len */
export default function DragIcn({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth={stroke}>
        <circle cx="8" cy="4" r="1" transform="rotate(90 8 4)" />
        <circle cx="16" cy="4" r="1" transform="rotate(90 16 4)" />
        <circle cx="8" cy="12" r="1" transform="rotate(90 8 12)" />
        <circle cx="16" cy="12" r="1" transform="rotate(90 16 12)" />
        <circle cx="8" cy="20" r="1" transform="rotate(90 8 20)" />
        <circle cx="16" cy="20" r="1" transform="rotate(90 16 20)" />
      </g>
    </svg>
  )
}
