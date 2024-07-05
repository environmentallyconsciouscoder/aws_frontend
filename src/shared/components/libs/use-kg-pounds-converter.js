import { useState } from "react";

const KgPoundsConverter = () => {

    const [showPounds, setShowPounds] = useState(false);

    const kgPoundsConverter = (e) => {
      const type = e.target.id;
      if (type === "Kilograms") {
        setShowPounds(false);
      } else {
        setShowPounds(true);
      }
    };


    return {
        showPounds,
        setShowPounds,
        kgPoundsConverter
    }

}

export default KgPoundsConverter