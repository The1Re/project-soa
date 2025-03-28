import { base64ToImage, IMAGE_NOT_FOUND } from "../utils/image"

export type ImageProps = {
    image: string
    alt: string,
    style?: string
}

function Image({ image, alt, style } : ImageProps) {
    return (
        <img
            src={base64ToImage(image)}
            alt={alt}
            onError={(e) => e.currentTarget.src = IMAGE_NOT_FOUND}
            className={ style ? style : "h-full w-full object-cover object-center group-hover:opacity-75"}
        />
    )
}

export default Image