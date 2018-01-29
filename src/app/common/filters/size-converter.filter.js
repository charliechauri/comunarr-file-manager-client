export const SizeConverter = () => {
    return size => { // In bytes
        let newSize = size / 1000;
        let unit = 'KB';

        if (newSize > 1000) {
            newSize = newSize / 1000;
            unit = 'MB';
        }

        if (newSize > 1000) {
            newSize = newSize / 1000;
            unit = 'GB';
        }
        return `${newSize.toFixed(3).slice(0, -1)} ${unit}`;
    };
};