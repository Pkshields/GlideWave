import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayerControlButtonProps {
    icon: IconProp,
    iconOnHover: IconProp
    size?: SizeProp
}

export function PlayerControlButton({ icon, iconOnHover, size }: PlayerControlButtonProps) {
    return (
        <div className="group flex items-center cursor-pointer">
            <FontAwesomeIcon icon={icon} size={size} className="group-hover:hidden"/>
            <FontAwesomeIcon icon={iconOnHover} size={size} className="hidden group-hover:block" />
        </div>
    )
}