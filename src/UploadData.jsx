import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const players = [
  { number: 1, name: "fone_th", status: "official", position: "GK"},
  { number: 3, name: "HarryPPung", status: "official", position: "DEF" },
  { number: 4, name: "AwayLikeIce", status: "official", position: "MID" },
  { number: 5, name: "JowA0mza", status: "official", position: "DEF" },
  { number: 6, name: "dunk17", status: "official", position: "DEF" },
  { number: 7, name: "AndyX_WSP", status: "official", position: "MID" },
  { number: 9, name: "pisitmic", status: "official", position: "FWD" },
  { number: 11, name: "Diogodaluar", status: "official", position: "FWD" },
  { number: 13, name: "SnnyyD", status: "official", position: "MID" },
  { number: 19, name: "Sniperzoom0", status: "official", position: "MID" },
  { number: 23, name: "FR4NKFURTS", status: "official", position: "DEF" },
  { number: 24, name: "JuiOnThe6ix", status: "official", position: "MID" },
  { number: 69, name: "JAV16K", status: "official", position: "DEF" },
  { number: 93, name: "WSNW07", status: "official", position: "DEF" },
  { number: 96, name: "HuAnGJui", status: "official", position: "MID" },
  { number: 99, name: "Thaninjr1994", status: "official", position: "FWD" },
  { number: 0, name: "Ryugxz", status: "spare", position: "DEF" },
  { number: 0, name: "nine1870", status: "spare", position: "DEF" }
];

export const uploadPlayers = async () => {
  try {
    const playersCol = collection(db, "players");
    for (const player of players) {
      await addDoc(playersCol, player);
      console.log(`Added: ${player.name}`);
    }
    alert("อัปโหลดรายชื่อนักเตะเรียบร้อยแล้ว!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};