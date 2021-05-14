const mapRange = (val, oldStart, oldEnd, newStart, newEnd) => {
    const normalisedVal = (val - oldStart) / (oldEnd - oldStart);
    return normalisedVal * (newEnd - newStart) + newStart;
};

const blobs = Array.from(document.querySelectorAll('.blob')).map(blobElem => {
    return {
        elem: blobElem,
        xOff: Math.random(),
        yOff: Math.random(),
    };
});

noise.seed(Math.random());
const draw = () => {
    for (const blob of blobs) {
        /**
         * we need to set eight values
         *
         * for top&bottom go clockwise
         * for left&right go counter clockwise
         * start from top left corner for both
         *
         *      |     |
         *      _______
         *  -- |       | --
         *     |       |
         *  -- |_______| --
         *      |     |
         *
         * here, only 4 values need to be generated
         * the other values are just 1-the corresponding number for that side
         * */

        const num1 = Math.round(mapRange(noise.perlin2(2 * blob.xOff, blob.yOff), -1, 1, 1, 99));
        const num2 = 100 - num1;
        const num3 = Math.round(mapRange(noise.perlin2(blob.xOff, 2 * blob.yOff), -1, 1, 1, 99));
        const num4 = 100 - num3;
        const num5 = Math.round(mapRange(noise.perlin2(3 * blob.xOff, blob.yOff), -1, 1, 1, 99));
        const num6 = 100 - num5;
        const num7 = Math.round(mapRange(noise.perlin2(blob.xOff, 3 * blob.yOff), -1, 1, 1, 99));
        const num8 = 100 - num7;

        blob.elem.style.borderRadius = `${num1}% ${num2}% ${num3}% ${num4}% / ${num5}% ${num6}% ${num7}% ${num8}%`;
        blob.elem.style.display = 'block';

        blob.xOff += 0.01;
        blob.yOff += 0.01;
    }

    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
