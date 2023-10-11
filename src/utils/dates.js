// Today's date
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
export const fullDate = `${year}-${month}-${day}`;

function sedamDanaOdDanas() {
  const danasnjiDatum = new Date();
  danasnjiDatum.setDate(danasnjiDatum.getDate() + 20);
  const godina = danasnjiDatum.getFullYear();
  const mesec = String(danasnjiDatum.getMonth() + 1).padStart(2, "0"); // Dodajemo 1 jer su meseci bazirani na nuli (0-11)
  const dan = String(danasnjiDatum.getDate()).padStart(2, "0");
  return `${godina}-${mesec}-${dan}`;
}
export const nextSevenDays = sedamDanaOdDanas();

function sedamDanaRanije() {
  const danasnjiDatum = new Date();
  danasnjiDatum.setDate(danasnjiDatum.getDate() - 7);
  const godina = danasnjiDatum.getFullYear();
  const mesec = String(danasnjiDatum.getMonth() + 1).padStart(2, "0"); // Dodajemo 1 jer su meseci bazirani na nuli (0-11)
  const dan = String(danasnjiDatum.getDate()).padStart(2, "0");
  return `${godina}-${mesec}-${dan}`;
}

export const prevSevenDays = sedamDanaRanije();
