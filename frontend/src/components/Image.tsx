import { MouseEventHandler } from "react"
import { base64ToImage, IMAGE_NOT_FOUND } from "../utils/image"

export type ImageProps = {
    image: string
    alt: string,
    style?: string,
    onClick?: MouseEventHandler<HTMLImageElement>
}

function Image({ image, alt, style, onClick } : ImageProps) {
    return (
        <img
            onClick={onClick}
            src={base64ToImage(image)}
            alt={alt}
            onError={(e) => e.currentTarget.src = IMAGE_NOT_FOUND}
            className={ style ? style : "h-full w-full object-cover object-center "}
        />
    )
}

export default Image