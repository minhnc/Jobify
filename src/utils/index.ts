export const checkImageURL = (url) => {
    if (!url) return false;
    else {
        const pattern = new RegExp(
            "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
            "i"
        );
        return pattern.test(url);
    }
};

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
