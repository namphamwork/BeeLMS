import React, { ChangeEvent, useState } from "react";
import { Input } from "@material-tailwind/react";

interface Props {
    id: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setVideoUrl: React.Dispatch<React.SetStateAction<string[]>>;
    setThumbnailUrl: React.Dispatch<React.SetStateAction<string[]>>;
    videoUrl: string[]; 
    thumbnailUrl: string[]; 
}

const InputURL: React.FC<Props> = ({
    id,
    setVideoUrl,
    setThumbnailUrl,
    videoUrl,
}: Props) => {
    const [invalidLink, setInvalidLink] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value.trim();

        setVideoUrl((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[id] = newUrl;
            return updatedUrls;
        });

        setInvalidLink(false);

        if (newUrl !== "") {
            fetchThumbnail(newUrl);
        }
    };

    const fetchThumbnail = async (url: string) => {
        try {
            const idRegex =
                /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(idRegex);

            if (!match) {
                throw new Error("Invalid YouTube video URL");
            }

            const videoId = match[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

            setThumbnailUrl((prevThumbnails) => {
                const updatedThumbnails = [...prevThumbnails];
                updatedThumbnails[id] = thumbnailUrl;
                return updatedThumbnails;
            });
        } catch (error) {
            setInvalidLink(true);
        }
    };

    return (
        <>
            <Input
                color="purple"
                crossOrigin={undefined}
                type="url"
                label={`Link video`}
                placeholder={invalidLink ? "Invalid Video URL" : "Enter Video URL here"}
                value={videoUrl[id] || ""}
                onChange={handleInputChange}
                onClick={() => {
                    setVideoUrl((prevUrls) => {
                        const updatedUrls = [...prevUrls];
                        updatedUrls[id] = "";
                        return updatedUrls;
                    });
                    setThumbnailUrl((prevThumbnails) => {
                        const updatedThumbnails = [...prevThumbnails];
                        updatedThumbnails[id] = "";
                        return updatedThumbnails;
                    });
                    setInvalidLink(false);
                }}
            />
            {invalidLink && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                    Please enter a valid YouTube video URL.
                </p>
            )}
        </>
    );
};

export default InputURL;
