// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBwrGQDe7uN1i8ihuRMjaWnG0mugt1i5zs',
  authDomain: 'interventional-cardiology.firebaseapp.com',
  projectId: 'interventional-cardiology',
  storageBucket: 'interventional-cardiology.appspot.com',
  messagingSenderId: '1060177607346',
  appId: '1:1060177607346:web:859ed113c2a68a7ee867ab',
  measurementId: 'G-H1HCBEZWL4'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
