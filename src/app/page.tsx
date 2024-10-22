'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SHEET_ID = '1tjgqBAEq9U3ZQjV5sV9L6u9pkq3um1V8xUjXlAa5IN8';
const API_KEY = 'AIzaSyBH3DBh6KjH1vUWoMgc6Bl9SOs_iP-NSRw';
const SHEET_NAME = 'Home'

export default function Home() {


  const [data, setData] = useState([])
  console.log("data ===> ", data);
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        const result = await response.json();
        setData(result.values);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSheetData();
  }, []);


  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        Initial Page...
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <Link href={`/${item[0]}`}>{item[0]}</Link><br />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
