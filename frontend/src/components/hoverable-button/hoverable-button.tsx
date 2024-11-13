import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface PlayerControlButtonProps {
    icon: IconProp
    iconOnHover: IconProp
    size?: SizeProp
    onClick: () => void
}

export function HoverableButton({ icon, iconOnHover, size, onClick }: PlayerControlButtonProps) {
    return (
        <button className="group flex items-center cursor-pointer" onClick={onClick}>
            <FontAwesomeIcon icon={icon} size={size} className="group-hover:hidden"/>
            <FontAwesomeIcon icon={iconOnHover} size={size} className="hidden group-hover:block" />
        </button>
    )
}