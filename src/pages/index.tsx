import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [localValue, setLocalValue] = useState<any>(null)
  const [retrievalsLog, setRetrievalsLog] = useState<any[]>([]);
  
  const handleRetrieveValue = () => {
    const retrievedValue = localStorage.getItem('kronos');
    setLocalValue(retrievedValue )
    addToRetrievalsLog({date: new Date(), value: retrievedValue})
  }

  const addToRetrievalsLog = (log: any) => {
    setRetrievalsLog([log, ...retrievalsLog]);
  }
  
  return (
    <>
    <div>
      <h1>retrieve values test</h1>
      <button onClick={handleRetrieveValue}>retrieve</button>
      <p>value: </p>
      <p>{String(localValue)}</p>
      <h3>logs</h3>
      <ul>
        {retrievalsLog.map(log => <li key={log.date.getTime()}>
          <span>value: {String(log.value)} - {log.date.toString()}</span>
        </li>)}
      </ul>
    </div>
    </>
  )
}
