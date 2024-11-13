import { PlayerControlButtonProps } from "../hoverable-button"

export function HoverableButton({ onClick }: PlayerControlButtonProps) {
    return <button data-testid="player-control-button" onClick={onClick}>Mocked Button</button>
}