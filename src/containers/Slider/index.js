import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
    //   Correction : inversion du signe dans la fonction de comparaison afin qu'on obtienne les slide dans l'ordre du plus récent ou plus ancien.
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    //   Correction : byDateDesc.lengh => il faut lui enlever 1
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
        {byDateDesc?.map((event, idx) => (
            <div
                key={event.title}
                className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
                }`}
            >
                <img src={event.cover} alt="forum" />
                <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div>{getMonth(new Date(event.date))}</div>
                </div>
                </div>
            </div>
        ))}
        {/* Correction : Sortie du bloc de pagination du premier map pour éviter la répition et le bug du bouton radio */}
        <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
                {byDateDesc?.map((event, radioIdx) => (
                <input
                    key={event.title}
                    type="radio"
                    name="radio-button"
                    // passage de "checked" à "defaultChecked" (champ non contrôlé)
                    defaultChecked={index === radioIdx}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

export default Slider;
