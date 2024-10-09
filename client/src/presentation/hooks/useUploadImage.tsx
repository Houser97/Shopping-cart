import { ChangeEvent, useState } from "react";

export const useUploadImage = () => {

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
    const [previewSourceCrop, setPreviewSourceCrop] = useState('');

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0]
        if (!file) return;
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(target.value);
    }

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSourceCrop(reader.result as string)
        }
    }
}