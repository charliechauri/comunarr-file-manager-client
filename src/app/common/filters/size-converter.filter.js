export const SizeConverter = () => {
    return size => {
        let newSize = size / 1024;
        let displayInGB = false;

        if (newSize > 1024) {
            newSize = newSize / 1024;
            displayInGB = true;
        }
        return `${newSize.toFixed(3).slice(0, -1)} ${displayInGB ? 'GB' : 'MB'}`;
    };
};