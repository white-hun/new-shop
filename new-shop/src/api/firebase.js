// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKE,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.RREACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
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
    callback(user);
  });
}

// 유저 정보 저장
export async function setUserInfo(user) {
  user && user.uid === process.env.REACT_APP_ADMIN_UID
    ? await setDoc(
        doc(db, "users", "admin", `${user.uid}`, "adminInfo"),
        {
          name: user.displayName,
          email: user.email,
        },
        { merge: true }
      )
    : await setDoc(
        doc(db, "users", "user", `${user.uid}`, "userInfo"),
        {
          name: user.displayName,
          email: user.email,
        },
        { merge: true }
      );
}

// 제품 추가
export async function addNewProduct(product, imageUrl) {
  const id = uuidv4();
  const products = collection(db, "products", "items", "product");
  await addDoc(
    products,
    {
      ...product,
      id,
      imageUrl,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      size: product.size.split(","),
    },
    { merge: true }
  );
}

// 제품 가져오기
export async function getProduct() {
  const q = query(collection(db, "products", "items", "product"));
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

// 카트 추가
export async function addToCart(uid, product) {
  const carts = collection(db, "users", "user", `${uid}`, "userBasket", "basket");
  await addDoc(
    carts,
    {
      ...product,
      id: product.id,
      imageUrl: product.imageUrl,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      size: product.selected,
      quantity: product.quantity,
    },
    { merge: true }
  );
}

// 카트 제거
export async function removeFromCart(uid, id) {
  const querySnapshot = query(doc(db, "users", "user", `${uid}`, "userBasket", "basket", `${id}`));
  await deleteDoc(querySnapshot);
}

// 카트 가져오기
export async function getCart(uid) {
  const q = query(collection(db, "users", "user", `${uid}`, "userBasket", "basket"));
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
