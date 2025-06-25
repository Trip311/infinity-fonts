import styles from "./icons.module.scss";
import Image, { StaticImageData } from "next/image";
import FilterButton from "../_components/FilterButton";


import actionImg from "@/app/assets/iconPage/action.png";
import alertImg from "@/app/assets/iconPage/alert.png";
import avImg from "@/app/assets/iconPage/av.png";
import communicationImg from "@/app/assets/iconPage/communication.png";
import contentImg from "@/app/assets/iconPage/content.png";
import deviceImg from "@/app/assets/iconPage/device.png";
import editorImg from "@/app/assets/iconPage/editor.png";
import fileImg from "@/app/assets/iconPage/file.png";
import hardwareImg from "@/app/assets/iconPage/hardware.png";
import homeImg from "@/app/assets/iconPage/home.png";
import imageImg from "@/app/assets/iconPage/image.png";
import mapsImg from "@/app/assets/iconPage/maps.png";
import navigationImg from "@/app/assets/iconPage/navigation.png";
import notificationImg from "@/app/assets/iconPage/notification.png";
import placesImg from "@/app/assets/iconPage/places.png";
import searchImg from "@/app/assets/iconPage/search.png";
import socialImg from "@/app/assets/iconPage/social.png";
import toggleImg from "@/app/assets/iconPage/toggle.png";

const iconCategories: Record<string, StaticImageData> = {
  action: actionImg,
  alert: alertImg,
  "audio & video": avImg,
  communication: communicationImg,
  content: contentImg,
  device: deviceImg,
  editor: editorImg,
  file: fileImg,
  harware: hardwareImg,
  home: homeImg,
  image: imageImg,
  maps: mapsImg,
  navigation: navigationImg,
  notification: notificationImg,
  places: placesImg,
  search: searchImg,
  social: socialImg,
  toggle: toggleImg,
};

export default function FontsPage() {
  return (
    <div className={styles.container}>
      <FilterButton>
          <div className={styles.grid}>
            {Object.entries(iconCategories).map(([name, image], key) => (
              <button key={key} className={styles.iconCube}>
                <Image src={image} alt={name} width={48} height={48} />
                <span className={styles.label}>{name}</span>
              </button>
            ))}
          </div>
      </FilterButton>
    </div>
  );
}

