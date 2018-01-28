export const SizeConverter = () => {
    return size => {
        let newSize = size / 1024;
        let displayInGB = false;

        if (newSize > 1024) {
            newSize = newSize / 1024;
            displayInGB = true;
        }
        return `${newSize.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]} ${displayInGB ? 'GB' : 'MB'}`;
    };
};