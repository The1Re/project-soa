export const IMAGE_NOT_FOUND = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s";

export const base64ToImage = (image: string) => {
    return `data:image/jpeg;base64,${image}`;
}

export const imageToBase64 = (image: string) => {
    return image.split(',')[1];
}
