export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};
// Correction : la méthode native getMonth de la fonction date (date.getMonth) renvoi les numéros de mois de 0 à 11, et non de 1 à 12.
// Correction de la numétation dans la constante MONTHS

export const getMonth = (date) => MONTHS[date.getMonth()];
