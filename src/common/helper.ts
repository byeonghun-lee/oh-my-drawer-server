import * as bcrypt from 'bcrypt';

export const makeRandomId = (length: number): string => {
    const result = [];
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength)),
        );
    }

    return result.join('');
};

export const convertHashedText = async (text: string): Promise<string> => {
    const saltOrRounds = 10;

    return await bcrypt.hash(text, saltOrRounds);
};

export const compareHash = async (
    text: string,
    hashedText: string,
): Promise<boolean> => {
    return await bcrypt.compare(text, hashedText);
};
