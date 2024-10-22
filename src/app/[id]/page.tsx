 




'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SHEET_ID = '1tjgqBAEq9U3ZQjV5sV9L6u9pkq3um1V8xUjXlAa5IN8';
const API_KEY = 'AIzaSyBH3DBh6KjH1vUWoMgc6Bl9SOs_iP-NSRw';
const SHEET_NAME = 'Home';

export default function Page() {
  const params = useParams(); // Use useParams to access the params object
  const { id } = params as { id: string };

  const [rowData, setRowData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRowData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        const result: { values: string[][] } = await response.json();

        console.log("resultresultresult ===========> ", result?.values);

        // Find and set the row data based on the `id`
        const matchingRow = result?.values?.find((item: string[]) => item[0] === id);
        if (matchingRow) {
          setRowData(matchingRow);
        } else {
          setRowData(null); // No matching row
        }
      } catch (error) {
        console.error('Error fetching row data:', error);
        setRowData(null);
      } finally {
        setLoading(false); // Set loading to false when data fetch is complete
      }
    };

    fetchRowData();
  }, [id]);

  return (
    <div>
      {loading ? (
        // Show loader while data is being fetched
        <div>Loading...</div>
      ) : rowData ? (
        // Display data once loaded
        <div>
          <h1>Data for Row {id}</h1>
          <ul>
            {rowData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        </div>
      ) : (
        // If no data is available after fetch
        <p>No data available for this row</p>
      )}
    </div>
  );
}
