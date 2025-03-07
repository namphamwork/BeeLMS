import { VITE_ASSET_URL } from "../../layout/Header/Header";

interface Props {
  thumbnailUrl: string;
}

const Thumbnail = ({ thumbnailUrl }: Props) => {
  return (
    <div className="file-atc-box">
      <div className="ytb-image"> <img src={thumbnailUrl ? thumbnailUrl : `${VITE_ASSET_URL}/no-image.png`} alt="" /></div>
    </div>
  );
};

export default Thumbnail;
