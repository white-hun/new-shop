// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKE,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDE,
  appId: process.env.RREACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const db = getFirestore(app);

//login
export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

// Logout
export async function logout() {
  return signOut(auth).catch(console.error);
}

// 사용자 관리
export function onUserStateChange(callback) {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    // const updatedUser = user ? await adminUser(user) : null;

    callback(user);
    // setUserData();
  });
}

export async function setUserInfo(uid, user) {
  uid === process.env.REACT_APP_ADMIN_UID
    ? await setDoc(doc(db, "users", "admin", `${uid}`, "adminInfo"), {
        name: user.displayName,
        email: user.email,
      })
    : await setDoc(doc(db, "users", "user", `${uid}`, "userInfo"), {
        name: user.displayName,
        email: user.email,
      });
}

// 제품 추가
export async function addNewProduct(product, imageUrl) {
  const id = uuidv4();
  const products = collection(db, "products", "product", "items");
  return await addDoc(products, {
    ...product,
    id,
    imageUrl,
    title: product.title,
    price: product.price,
    category: product.category,
    size: {
      default: {
        small: product.size.includes("s") === true && "S",
        medium: product.size.includes("m") === true && "M",
        large: product.size.includes("l") === true && "L",
        extralarge: product.size.includes("xl") === true && "XL",
        doubleextralarge: product.size.includes("xxl") === true && "XXL",
      },
    },
    description: product.description,
  });
}