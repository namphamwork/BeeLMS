import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Video } from "../../types/Video";
import { VITE_ASSET_URL } from "../../layout/Header/Header";

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>, duration: string) => void;
    video?: Video;
}

const InputURL: React.FC<Props> = ({
    onChange,video,
}: Props) => {
    const [invalidLink, setInvalidLink] = useState(false);
    const [event, setEvent] = useState<ChangeEvent<HTMLInputElement> | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [duration, setDuration] = useState("");

    useEffect(() => {if (video) {
          const firstVideoUrl = video.urlVideo;
          fetchInfoVideo(firstVideoUrl);
        }
      }, [video]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value.trim();
        if (newUrl !== "") {
            fetchInfoVideo(newUrl);
        }
        setEvent(e);
    };

    useEffect(() => {
        if (duration !== "" && event !== null) {
            onChange(event, duration);
        }
    }, [duration, event]);
    

    const fetchInfoVideo = async (url: string) => {
        try {
            const idRegex =
                /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(idRegex);

            if (!match) {
                throw new Error("Invalid YouTube video URL");
            }

            const videoId = match[1];
            setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
            await getVideoDuration(videoId);
        } catch (error) {
            setInvalidLink(true);
        }
    };


    var googleApiKey = "AIzaSyDMoIIGvHOEs310gfBoNsOVaRRoYkkNkn8";

    const getVideoDuration = async (videoId: string): Promise<any> => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/youtube/v3/videos?id=" +
                videoId +
                "&part=contentDetails&key=" +
                googleApiKey
            );
            const result = await response.json();

            if (result && result.items && result.items.length > 0) {
                const item = result.items[0];
                const durationVideo = item?.contentDetails?.duration;

                if (durationVideo) {
                    const seconds = convert_time(durationVideo);
                    setDuration(seconds);
                }
            }
        } catch (error) {
            console.error("Error fetching video duration:", error);
        }
    };


    const convert_time = (duration: string) => {
        var total = 0;
        var hours = duration.match(/(\d+)H/);
        var minutes = duration.match(/(\d+)M/);
        var seconds = duration.match(/(\d+)S/);
        if (hours) total += parseInt(hours[1]) * 3600;
        if (minutes) total += parseInt(minutes[1]) * 60;
        if (seconds) total += parseInt(seconds[1]);
        return total.toString();
    }

    return (
        <>
            <div className="col-span-12">
                <div className="mt-2">
                    <Input
                        color="purple"
                        crossOrigin={undefined}
                        label={`Link video`}
                         defaultValue={video ? video.urlVideo : ""}
                        placeholder={invalidLink ? "Invalid Video URL" : "Enter Video URL here"}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    {invalidLink && (
                        <p className="text-red-500 text-sm mt-1 ml-2">
                            Please enter a valid YouTube video URL.
                        </p>
                    )}
                </div>
            </div>
            <div className="row-span-2">
                <div className="file-atc-box">
                    <div className="ytb-image"> <img src={thumbnailUrl ? thumbnailUrl : `${VITE_ASSET_URL}/no-image.png`} alt="" /></div>
                </div>
            </div>
        </>
    );
};

export default InputURL;
