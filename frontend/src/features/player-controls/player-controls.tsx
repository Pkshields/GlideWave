import { faCirclePlay, faFolder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PlayerControls() {
    return (
        <div className="fixed bottom-0 left-0 w-full p-8 text-gray-100">
            <div className="flex space-x-14 items-center">
                <FontAwesomeIcon icon={faFolder} size="2x" />
                <div>
                    <p className="text-lg pb-3">Stream Name</p>
                    <p className="text-gray-300">Stream Description</p>
                </div>
                <FontAwesomeIcon icon={faCirclePlay} size="2x" />
                <div className="flex space-x-1 items-center">
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                    <div className="py-3 px-1 border-2 rounded border-white scale-75"></div>
                </div>
            </div>
        </div>
    )
}