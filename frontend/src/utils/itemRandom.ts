export const getRandomItems = <T>(list: T[], count: number): T[] => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};