export type ConvertFile = Blob | File

export class StringHelper {

    public static blobToBase64(blob: Blob): Promise<unknown> {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    public static async fileToBase64Image(file: ConvertFile, extension: string): Promise<string> {
        return await StringHelper.internalAnyToBase64(file, `data:image/${extension}`)
    }

    public static async fileToBase64Pdf(file: ConvertFile): Promise<string> {
        return await StringHelper.internalAnyToBase64(file, `data:application/pdf`)
    }

    public static base64ToArrayBuffer(base64: string): Uint8Array {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);

        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }

        return bytes;
    }

    private static async internalAnyToBase64(file: ConvertFile, fullExtension: string): Promise<string> {
        const base64Img = await StringHelper.blobToBase64(file)

        return (base64Img as string).replace("data:application/octet-stream", fullExtension);
    }
}