import yamahaLogo from '../../assets/images/yamaha-logo.png';
import hondaLogo from '../../assets/images/honda-logo.png';
import kawasakiLogo from '../../assets/images/kawasaki-logo.png';
import suzukiLogo from '../../assets/images/suzuki-logo.png';
import touringLogo from '../../assets/images/touring-logo.png';
import cruiserLogo from '../../assets/images/cruiser-logo.png';
import sportLogo from '../../assets/images/sport-logo.png';
import standardLogo from '../../assets/images/standard-logo.png';

const categoryLogoObj: Record<string, string> = {
  Yamaha: yamahaLogo,
  Honda: hondaLogo,
  Kawasaki: kawasakiLogo,
  Suzuki: suzukiLogo,
  Touring: touringLogo,
  Sport: sportLogo,
  Standard: standardLogo,
  Cruiser: cruiserLogo,
};

Object.values(categoryLogoObj).forEach((image: string) => {
  const img = new Image();
  img.src = image;
});

export default categoryLogoObj;
